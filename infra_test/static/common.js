/* =========================================================
   common.js
   ITインフラ問題集（全70問）共通ライブラリ
   ---------------------------------------------------------
   ・実施者名の管理
   ・実施結果の記録（ブラウザのlocalStorageに蓄積）
   ・複数選択時の連続出題（キュー）管理
   ・結果一覧のExcel（.xlsx）出力
   ・自動保存（フォルダ／ダウンロード）、S3連携（署名付きURLのオンデマンド発行）
   ・出題エンジン（renderQuestion/renderStep/judge/finishQuestionの1セット）
   問題データそのもの（メタデータ・出題内容）は questions.js の QUESTIONS_DATA に
   分離してあり、common.js は一切持たない（問題の追加・修正はquestions.jsのみ編集すればよい）。

   index.html / exam.html から、questions.jsとあわせて読み込む：
     <script src="common.js"></script>
     <script src="questions.js"></script>

   フォルダ構成（S3配置）：
     index.html   … 問題一覧・選択・結果一覧・S3アクセスリクエスト
     exam.html    … 出題画面（全問題共通、1ファイルのみ）
     common.js    … 本ファイル
     questions-meta.js    … 一覧表示用メタデータ（Excelから自動生成、手編集しない）
     questions-content.js … 問題本文データ（シナリオ・STEP・正解など、手動編集する）
     results/{実施者名}_{問題番号}_{タイムスタンプ}.csv  （非公開、署名付きURL経由でのみアクセス）
   ========================================================= */

/* ---- 1. 問題データ取得ヘルパー（questions-meta.js と questions-content.js をidでマージして参照） ----
   問題データは2ファイルに分離している。
     questions-meta.js    … id / category / title / shubetsu（一覧画面用。Excelから自動生成）
     questions-content.js … id / scenario / status / manual / steps / resultText（問題本文。手動編集）
   common.js 側ではどちらのデータも持たず、実行時に id をキーとしてマージするだけ
   （問題の追加・修正時に common.js を触らずに済むようにするため）。
   common.js より先に、または後にこれら2ファイルを読み込んでいてもよい
   （関数呼び出し時点で参照できていれば問題ない）。
*/
var _questionsDataCache = null;

/** questions-meta.js と questions-content.js をidでマージした全問題データを返す（初回のみ計算しキャッシュする） */
function getAllQuestionsData() {
  if (_questionsDataCache) return _questionsDataCache;
  var metaList = (typeof QUESTIONS_META !== "undefined") ? QUESTIONS_META : [];
  var contentMap = {};
  (typeof QUESTIONS_CONTENT !== "undefined" ? QUESTIONS_CONTENT : []).forEach(function (c) {
    contentMap[c.id] = c;
  });
  _questionsDataCache = metaList.map(function (m) {
    var c = contentMap[m.id] || {};
    return {
      id: m.id,
      category: m.category,
      title: m.title,
      shubetsu: m.shubetsu,
      scenario: c.scenario || "",
      status: c.status || "",
      manual: c.manual || [],
      steps: c.steps || [],
      resultText: c.resultText || ""
    };
  });
  return _questionsDataCache;
}

function getQuestionData(qid) {
  qid = Number(qid);
  return getAllQuestionsData().find(function (q) { return q.id === qid; }) || null;
}

const CATEGORY_ORDER = ["OS", "NW", "Cloud", "Monitoring", "Security", "Design", "IaC"];

const STORAGE_KEYS = {
  RESULTS: "infraTest_results",     // 実施結果の蓄積（このブラウザ内）
  NAME: "infraTest_userName",       // 実施者名
  QUEUE: "infraTest_queue",         // 連続出題キュー（localStorageで永続化）
  AUTOSAVE_MODE: "infraTest_autoSaveMode" // 自動保存モード: off / fs / download
};

/* ---- 2. 実施者名の管理 ---- */
function getUserName() {
  return localStorage.getItem(STORAGE_KEYS.NAME) || "";
}
function setUserName(name) {
  localStorage.setItem(STORAGE_KEYS.NAME, (name || "").trim());
}

/* ---- 3. 実施結果の記録 ---- */
function getResults() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS) || "[]");
  } catch (e) {
    return [];
  }
}

function saveAllResults(list) {
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(list));
}

function formatTimestamp(date) {
  var p = function (n) { return String(n).padStart(2, "0"); };
  return date.getFullYear() + "/" + p(date.getMonth() + 1) + "/" + p(date.getDate()) +
    " " + p(date.getHours()) + ":" + p(date.getMinutes()) + ":" + p(date.getSeconds());
}

/**
 * 1問分の結果を記録する。
 * @param {number} qid 問題番号
 * @param {number} score 獲得点数
 * @param {number} maxScore 満点
 * @param {boolean} manualUsed 手順書を開いたかどうか
 */
function recordResult(qid, score, maxScore, manualUsed) {
  var meta = getQuestionData(qid);
  var entry = {
    qid: Number(qid),
    category: meta ? meta.category : "",
    title: meta ? meta.title : "",
    score: score,
    maxScore: maxScore,
    name: getUserName(),
    timestamp: formatTimestamp(new Date()),
    manualUsed: manualUsed ? "はい" : "いいえ"
  };
  var list = getResults();
  list.push(entry);
  saveAllResults(list);
  autoSaveEntry(entry); // 自動保存が有効な場合、1件ずつフォルダ／ダウンロードへ書き出す（非同期・失敗しても結果一覧には影響しない）
  // S3への送信は呼び出し元（各問題ファイルのfinishQuestion）で明示的に uploadResultsToS3() を呼び、
  // 送信結果を画面に表示できるようにする（詳細は uploadResultsToS3 のコメント参照）
  return entry;
}

function clearResults() {
  localStorage.removeItem(STORAGE_KEYS.RESULTS);
}

/* ---- 4. 連続出題キュー管理（問題一覧→複数問題を順番に実施） ----
   localStorageに保存するため、ブラウザ／タブを閉じても残りの出題予定が失われない。
   キューには「これから実施する（まだ完了していない）問題番号」を、現在実施中のものも含めて保持する。
   完了時に popCompletedFromQueue() で先頭を取り除いてから次へ進む。
*/
function getQueue() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUEUE) || "[]");
  } catch (e) {
    return [];
  }
}
function setQueue(arr) {
  localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(arr));
}
function clearQueue() {
  localStorage.removeItem(STORAGE_KEYS.QUEUE);
}

/** 完了した問題番号をキューの先頭から取り除く */
function popCompletedFromQueue(qid) {
  var q = getQueue();
  var idx = q.indexOf(Number(qid));
  if (idx !== -1) q.splice(idx, 1);
  setQueue(q);
  return q;
}

/** 完了後、キューに残りがあれば次の問題（exam.html）へ、なければ一覧に戻る。
    exam.html は1ファイルのみで、どの問題を出題するかはキューの先頭を見て自身で判断する。
    そのため、次の問題番号をURLに含める必要はない（常に同じ "exam.html" へ遷移する）。 */
function goToNextInQueue(qid) {
  var remaining = popCompletedFromQueue(qid);
  if (remaining.length === 0) {
    clearQueue();
    localStorage.setItem("infraTest_lastQid", qid);
    window.location.href = "index.html";
    return;
  }
  window.location.href = "exam.html";
}

/** 現在実施中の問題を除いた、キュー内の残り問題数 */
function queueRemainingAfter(qid) {
  return getQueue().filter(function (id) { return Number(id) !== Number(qid); }).length;
}

/**
 * 途中で解答を終了する。
 * 直前に完了した問題（qid）の結果はすでに recordResult() で記録・自動保存済みのため、
 * ここでは残りの出題予定（キュー）を破棄して問題一覧に戻るだけでよい。
 */
function endTestNow(qid) {
  popCompletedFromQueue(qid);
  clearQueue();
  localStorage.setItem("infraTest_lastQid", qid);
  window.location.href = "index.html";
}

/* ---- 5. Excel（.xlsx）出力 ---- */
function exportResultsToExcel() {
  var results = getResults();
  if (results.length === 0) {
    alert("出力する結果がありません。問題を実施してください。");
    return;
  }
  if (typeof XLSX === "undefined") {
    alert("Excel出力ライブラリの読み込みに失敗しました。インターネット接続を確認してください。");
    return;
  }
  var rows = results.map(function (r) {
    return {
      "問題番号": r.qid,
      "カテゴリ": r.category,
      "タイトル": r.title,
      "スコア": r.score + " / " + r.maxScore,
      "実施者": r.name,
      "実施日時": r.timestamp,
      "手順書を開いたか": r.manualUsed
    };
  });
  var ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 8 }, { wch: 12 }, { wch: 30 }, { wch: 10 }, { wch: 14 }, { wch: 20 }, { wch: 16 }
  ];
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "テスト結果");

  var name = getUserName() || "未入力";
  var now = new Date();
  var p = function (n) { return String(n).padStart(2, "0"); };
  var stamp = now.getFullYear() + p(now.getMonth() + 1) + p(now.getDate()) + "_" + p(now.getHours()) + p(now.getMinutes());
  var filename = "テスト結果_" + name + "_" + stamp + ".xlsx";
  XLSX.writeFile(wb, filename);
}

/* =========================================================
   7. 自動保存（1問完了ごとにCSVを書き出す）
   ---------------------------------------------------------
   モード:
     "off"      … 自動保存しない（従来どおり一覧からExcel出力のみ）
     "fs"       … File System Access API でユーザーが選択した
                   フォルダへ直接1問ごとにCSVを書き込む（Chrome/Edge）
                   ※フォルダにSharePoint/OneDrive同期フォルダを指定すれば、
                     各PCでの実施結果が自動的にクラウドへ集約される。
     "download" … ブラウザの既定のダウンロード先へ1問ごとCSVを自動保存
                   （全ブラウザ対応の代替手段。ダウンロード先をあらかじめ
                     共有フォルダに設定しておくと同様に集約できる）
   いずれのモードでも、Excelでの「フォルダから読み込み(Power Query)」で
   複数CSVを1つの表に自動結合できる。
   ========================================================= */

var IDB_NAME = "infraTestDB";
var IDB_STORE = "kv";

function idbOpen() {
  return new Promise(function (resolve, reject) {
    var req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = function () { req.result.createObjectStore(IDB_STORE); };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error); };
  });
}
function idbSet(key, value) {
  return idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}
function idbGet(key) {
  return idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(IDB_STORE, "readonly");
      var req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  });
}

function getAutoSaveMode() {
  return localStorage.getItem(STORAGE_KEYS.AUTOSAVE_MODE) || "off";
}
function setAutoSaveMode(mode) {
  localStorage.setItem(STORAGE_KEYS.AUTOSAVE_MODE, mode);
}

/** フォルダを選択して「fs」モードを有効化する（要ユーザー操作／Chrome・Edgeのみ対応） */
async function enableFolderAutoSave() {
  if (!("showDirectoryPicker" in window)) {
    alert("お使いのブラウザはフォルダへの自動保存に対応していません（Chrome/Edge推奨）。\n代わりに「完了ごとに自動ダウンロード」をご利用ください。");
    return null;
  }
  try {
    var handle = await window.showDirectoryPicker({ mode: "readwrite" });
    await idbSet("autoSaveDirHandle", handle);
    setAutoSaveMode("fs");
    return handle;
  } catch (e) {
    return null; // ユーザーがキャンセルした場合など
  }
}

/** 「download」モード（全ブラウザ対応の代替手段）を有効化する */
function enableDownloadAutoSave() {
  setAutoSaveMode("download");
}

/** 自動保存をオフにする */
function disableAutoSave() {
  setAutoSaveMode("off");
}

/** 保存済みのフォルダハンドルに対する書き込み権限を確認・必要なら再要求する */
async function ensureFolderPermission(handle) {
  if (!handle) return false;
  var opts = { mode: "readwrite" };
  try {
    if ((await handle.queryPermission(opts)) === "granted") return true;
    return (await handle.requestPermission(opts)) === "granted";
  } catch (e) {
    return false;
  }
}

function csvEscape(v) {
  v = v === undefined || v === null ? "" : String(v);
  if (/[",\n]/.test(v)) v = '"' + v.replace(/"/g, '""') + '"';
  return v;
}

/** 1件の結果を、ヘッダ付き1行CSV文字列に変換する（Excelで文字化けしないようBOM付き） */
function entryToCsv(entry) {
  var header = ["問題番号", "カテゴリ", "タイトル", "スコア", "満点", "実施者", "実施日時", "手順書を開いたか"];
  var row = [entry.qid, entry.category, entry.title, entry.score, entry.maxScore, entry.name, entry.timestamp, entry.manualUsed];
  return "\uFEFF" + header.map(csvEscape).join(",") + "\r\n" + row.map(csvEscape).join(",") + "\r\n";
}

function buildResultFilename(entry, ext) {
  var safeName = (entry.name || "未入力").replace(/[\\/:*?"<>|]/g, "_");
  var now = new Date();
  var p = function (n) { return String(n).padStart(2, "0"); };
  var stamp = now.getFullYear() + p(now.getMonth() + 1) + p(now.getDate()) + "_" +
    p(now.getHours()) + p(now.getMinutes()) + p(now.getSeconds()) + String(now.getMilliseconds()).padStart(3, "0");
  return "結果_" + String(entry.qid).padStart(3, "0") + "_" + safeName + "_" + stamp + "." + ext;
}

/** recordResult() から呼び出される。自動保存が有効な場合のみ動作する。失敗しても例外を投げない。 */
async function autoSaveEntry(entry) {
  var mode = getAutoSaveMode();
  if (mode === "off") return;

  if (mode === "fs") {
    try {
      var handle = await idbGet("autoSaveDirHandle");
      var ok = await ensureFolderPermission(handle);
      if (!ok) { console.warn("自動保存フォルダへの書き込み許可がありません。問題一覧で再設定してください。"); return; }
      var fileHandle = await handle.getFileHandle(buildResultFilename(entry, "csv"), { create: true });
      var writable = await fileHandle.createWritable();
      await writable.write(entryToCsv(entry));
      await writable.close();
    } catch (e) {
      console.warn("自動保存（フォルダ）に失敗しました", e);
    }
    return;
  }

  if (mode === "download") {
    try {
      var blob = new Blob([entryToCsv(entry)], { type: "text/csv" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = buildResultFilename(entry, "csv");
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    } catch (e) {
      console.warn("自動保存（ダウンロード）に失敗しました", e);
    }
  }
}

/** 一覧画面用：現在の自動保存フォルダ名と権限状態を返す（fsモード時のみ意味がある） */
async function getAutoSaveFolderStatus() {
  var handle = await idbGet("autoSaveDirHandle");
  if (!handle) return { name: null, permission: "none" };
  var permission = "prompt";
  try {
    permission = await handle.queryPermission({ mode: "readwrite" });
  } catch (e) { /* noop */ }
  return { name: handle.name, permission: permission };
}

/* =========================================================
   8. S3連携（オンデマンド発行方式）
   ---------------------------------------------------------
   実施者が一覧画面で実施者名を入力し「アクセスをリクエスト」すると、
   Lambda関数URL（S3_ACCESS_REQUEST_URL）に疎通確認だけを行い（id のみ送信、
   この時点ではS3への署名は発行されない）、実施者名をlocalStorageに保存する。

   署名付きURLは「発行された時点の1つのキー」に固定される性質があるため、
   1問ごとに別ファイルへ保存するには、問題を完了するたびに毎回Lambdaを呼んで
   その問題専用の新しい署名付きPUT URLを取得し直す必要がある
   （＝事前に1回だけ取得したURLを使い回すと、同じファイルに上書きされてしまう。
   これは過去に実際に発生した不具合で、その修正として現在のこの実装になっている）。

   結果は1問完了ごとにCSV形式で1ファイルずつS3へアップロードする。
   個人がS3から自分の結果をダウンロードする機能（Excel化）は廃止済み。
   管理者はS3上のCSV群を集めてPower BIデスクトップ版に手動インポートして分析する運用とする。
   名簿・データベースは持たない（Lambdaは受け取った名前・問題番号からキーを計算して
   署名するだけのステートレスな処理）。

   S3連携に関するどの設定も無い場合は、何もせず従来通りPC専用モードとして動作する。
   ========================================================= */

var S3_KEYS = { PID: "infraTest_s3Pid", ENABLED: "infraTest_s3Enabled" };

/** Lambda関数URL（署名付きURLのオンデマンド発行API）。デプロイ後にここへ設定する。 */
var S3_ACCESS_REQUEST_URL = "https://jik42iga2gzxuwtyr7jtsciuum0xcalm.lambda-url.ap-northeast-1.on.aws/"; // 例: "https://xxxxxxxxxxxx.lambda-url.ap-northeast-1.on.aws/"

/** 実施者名からスペース（半角・全角、先頭・末尾・途中すべて）を除去する（表記ゆれ対策） */
function normalizeName(raw) {
  return (raw || "").replace(/[\s\u3000]+/g, "");
}

/** 実施者名（正規化済み）でLambdaに疎通確認を行い、成功したらS3連携を有効化する（この時点ではS3への署名は発行しない） */
async function requestS3Access(id, name) {
  if (!S3_ACCESS_REQUEST_URL) {
    return { ok: false, error: "S3_ACCESS_REQUEST_URL が設定されていません（common.js を確認してください）。" };
  }
  try {
    var res = await fetch(S3_ACCESS_REQUEST_URL + "?id=" + encodeURIComponent(id));
    if (!res.ok) {
      var errBody = await res.json().catch(function () { return {}; });
      return { ok: false, error: errBody.error || ("リクエストに失敗しました（status:" + res.status + "）") };
    }
    var data = await res.json();
    localStorage.setItem(S3_KEYS.PID, data.id || id);
    localStorage.setItem(S3_KEYS.ENABLED, "1");
    if (name) setUserName(name);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "通信エラーが発生しました：" + e.message };
  }
}

function getS3Pid() { return localStorage.getItem(S3_KEYS.PID) || ""; }
function hasS3Config() { return localStorage.getItem(S3_KEYS.ENABLED) === "1" && !!getS3Pid(); }
function clearS3Config() {
  localStorage.removeItem(S3_KEYS.PID);
  localStorage.removeItem(S3_KEYS.ENABLED);
}

/** Lambdaに、指定した問題番号専用の署名付きPUT URLを新規発行してもらう（毎回新しいキーになる） */
async function requestS3PutUrlForQuestion(qid) {
  var pid = getS3Pid();
  if (!pid) return null;
  try {
    var res = await fetch(S3_ACCESS_REQUEST_URL + "?id=" + encodeURIComponent(pid) + "&qid=" + encodeURIComponent(qid));
    if (!res.ok) return null;
    var data = await res.json();
    return data.putUrl || null;
  } catch (e) {
    return null;
  }
}

/** 1問分の結果を、CSV形式でS3へアップロードする（1問1ファイル）。
    finishQuestion()から、記録したentryを渡してawaitで呼び出す想定。戻り値(true/false)を画面に表示する。
    問題ごとにLambdaへ新しい署名付きPUT URLを requestS3PutUrlForQuestion() で取得してからPUTする。
    S3連携が設定されていない場合は何もせず true を返す（PC専用モードとの後方互換）。 */
async function uploadResultsToS3(entry) {
  if (!hasS3Config()) return true;
  try {
    var putUrl = await requestS3PutUrlForQuestion(entry.qid);
    if (!putUrl) {
      console.warn("S3への結果保存用URLの取得に失敗しました。");
      return false;
    }
    var csv = entryToCsv(entry);
    var res = await fetch(putUrl, {
      method: "PUT",
      headers: { "Content-Type": "text/csv" },
      body: csv
    });
    if (!res.ok) {
      console.warn("S3への結果保存に失敗しました（status:" + res.status + "）。URLの有効期限切れの可能性があります。");
      return false;
    }
    return true;
  } catch (e) {
    console.warn("S3への結果保存でエラーが発生しました", e);
    return false;
  }
}

/* =========================================================
   9. 出題エンジン（exam.html から利用する汎用処理）
   ---------------------------------------------------------
   問題ごとの step1()/c1() のような個別関数は持たない。questions.js の
   QUESTIONS_DATA をもとに、renderQuestion() / renderStep() / judge() /
   finishQuestion() の1セットだけで全70問を処理する。
   問題の追加・修正は questions.js を編集するだけでよく、common.js /
   exam.html には一切手を入れる必要がない。
   ========================================================= */

var examState = { qid: null, data: null, stepIndex: 0, score: 0, manualOpened: false };

/** exam.html の起動時に呼び出す。実施者名とキューを確認し、キュー先頭の問題を出題する。 */
function bootExam() {
  var name = getUserName();
  if (!name) {
    alert("実施者名が未入力です。問題一覧から氏名を入力して開始してください。");
    window.location.href = "index.html";
    return;
  }
  var queue = getQueue();
  if (queue.length === 0) {
    alert("出題予定がありません。問題一覧から問題を選択してください。");
    window.location.href = "index.html";
    return;
  }
  setText("who", "実施者：" + name);
  startExam(queue[0]);
}

/** 指定した問題番号の出題を開始する（questions.js にデータが無い/未変換の場合は準備中表示にする） */
function startExam(qid) {
  var data = getQuestionData(qid);
  examState = { qid: Number(qid), data: data, stepIndex: 0, score: 0, manualOpened: false };

  if (!data || !data.steps || data.steps.length === 0) {
    renderNotReady(qid);
    return;
  }

  renderQuestion(data);
  renderStep(0);
}

/** ヘッダー部分（タイトル・シナリオ・状況・手順書・スコア表示の初期化）を描画する */
function renderQuestion(data) {
  setText("examTitle", "問題" + data.id + "：" + (data.title || "（タイトル未設定）"));
  setText("examScenario", data.scenario || "");
  setText("examStatusText", data.status ? ("状況：" + data.status) : "");

  var manualEl = document.getElementById("manual");
  if (manualEl) {
    manualEl.innerHTML = (data.manual || []).join("<br>");
    manualEl.style.display = "none";
  }

  updateScore();
}

function setText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updateScore() {
  var el = document.getElementById("score");
  if (el && examState.data) el.textContent = examState.score + " / " + examState.data.steps.length;
}

/** 手順書の開閉。開いたことを examState に記録する（結果に「手順書を開いたか」として残る）。 */
function toggleManual() {
  var m = document.getElementById("manual");
  if (!m) return;
  m.style.display = m.style.display === "none" ? "block" : "none";
  if (m.style.display === "block") examState.manualOpened = true;
}

function escapeHtml(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** 指定インデックスのSTEPを描画する（チェックボックス群＋次/完了ボタン） */
function renderStep(index) {
  var step = examState.data.steps[index];
  var isLast = index === examState.data.steps.length - 1;
  var q = document.getElementById("q");
  if (!q) return;

  var choicesHtml = step.choices.map(function (c) {
    return '<input type="checkbox" value="' + escapeHtml(c.value) + '">' + escapeHtml(c.text) + "<br>";
  }).join("");

  q.innerHTML =
    escapeHtml(step.title) + "<br>" +
    choicesHtml +
    '<button onclick="nextStep()">' + (isLast ? "完了" : "次") + "</button>" +
    '<p id="r"></p>';
}

/** チェックした値の集合が正解セットと一致するか判定する（正解を1つ以上含み、不正解を1つも含まない） */
function judge(selectedValues, answerSet) {
  var hasCorrect = selectedValues.some(function (v) { return answerSet.indexOf(v) !== -1; });
  var hasWrong = selectedValues.some(function (v) { return answerSet.indexOf(v) === -1; });
  return hasCorrect && !hasWrong;
}

/** 現在のSTEPの回答を採点し、次のSTEPへ進む（最後のSTEPなら finishQuestion() へ） */
function nextStep() {
  var q = document.getElementById("q");
  var checked = Array.prototype.map.call(q.querySelectorAll("input:checked"), function (e) { return e.value; });
  var step = examState.data.steps[examState.stepIndex];
  var ok = judge(checked, step.answers);
  if (ok) examState.score++;

  var r = document.getElementById("r");
  if (r) r.innerHTML = ok ? "OK" : "NG";
  updateScore();

  setTimeout(function () {
    examState.stepIndex++;
    if (examState.stepIndex < examState.data.steps.length) {
      renderStep(examState.stepIndex);
    } else {
      finishQuestion();
    }
  }, 700);
}

/** 全STEP終了後の結果表示・記録・自動保存・S3送信・次の問題への導線（旧: 各問題ファイルのfinishQuestion） */
async function finishQuestion() {
  var qid = examState.qid;
  var maxScore = examState.data.steps.length;
  var entry = recordResult(qid, examState.score, maxScore, examState.manualOpened);

  var remaining = queueRemainingAfter(qid);
  var buttonsHtml;
  if (remaining > 0) {
    buttonsHtml =
      '<button onclick="goToNextInQueue(' + qid + ')">次の問題へ（残り' + remaining + '問）</button>' +
      '<button onclick="endTestNow(' + qid + ')" style="background:#fff;color:#c53030;border:1px solid #c53030;">解答を終了する</button>';
  } else {
    buttonsHtml = '<button onclick="goToNextInQueue(' + qid + ')">問題一覧に戻る</button>';
  }

  var s3StatusHtml = hasS3Config() ? '<p id="s3SendStatus">☁ S3へ送信中…</p>' : "";

  var q = document.getElementById("q");
  q.innerHTML =
    "<b>結果</b><br>スコア：" + examState.score + "/" + maxScore + "<br>" +
    "手順書使用：" + (examState.manualOpened ? "あり" : "なし") + "<br><br>" +
    escapeHtml(examState.data.resultText || "") + "<br>" +
    s3StatusHtml +
    buttonsHtml;

  if (hasS3Config()) {
    var ok = await uploadResultsToS3(entry);
    var statusEl = document.getElementById("s3SendStatus");
    if (statusEl) {
      statusEl.textContent = ok
        ? "☁ S3へ送信しました"
        : "⚠ S3への送信に失敗しました（通信状況やURLの有効期限をご確認ください。次の問題完了時に再送信されます）";
      statusEl.style.color = ok ? "#2f855a" : "#c53030";
    }
  }
}

/** questions.js にまだデータが無い（steps が空）問題が選ばれた場合の表示 */
function renderNotReady(qid) {
  var q = document.getElementById("q");
  if (q) {
    q.innerHTML =
      "<b>この問題（" + qid + "番）はまだ準備中です。</b><br>" +
      '<button onclick="goToNextInQueue(' + Number(qid) + ')">次へ進む</button>';
  }
}
