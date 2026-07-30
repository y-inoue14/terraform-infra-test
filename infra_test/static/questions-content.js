/* =========================================================
   questions-content.js
   問題本文データ（シナリオ・状況・手順書・STEP・正解・結果説明文）
   ---------------------------------------------------------
   問題の追加・修正は、このファイルだけを編集すればよい
   （一覧画面用のメタデータは questions-meta.js 側にあり、こちらには置かない）。
   各問題：
     id         … 問題番号（questions-meta.js と同じidで対応付けられる）
     scenario   … シナリオ本文
     status     … 状況本文（「状況：」は付けない）
     manual     … 手順書の各行（配列）
     steps      … [{ title, choices:[{value,text}], answers:[] }, ...]
     resultText … 完了画面に表示する結び文
   steps が空配列（[]）の問題は「未変換（準備中）」として扱われる。
   ========================================================= */

const QUESTIONS_CONTENT = [
  {
    "id": 1,
    "scenario": "Webサーバ（Linux）のCPU使用率が高騰している（90%以上）",
    "status": "CPU使用率90%超",
    "manual": [
      "① SSH接続",
      "② top / ps でプロセス確認",
      "③ kill / systemctl で対応",
      "④ /var/log/messages または journalctl でログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：接続",
        "choices": [
          { "value": "browser", "text": "ブラウザ接続" },
          { "value": "ssh", "text": "ssh user@server" },
          { "value": "rdp", "text": "RDP接続" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["ssh"]
      },
      {
        "title": "STEP2：プロセス確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "ps", "text": "ps aux" },
          { "value": "df", "text": "df -h" },
          { "value": "net", "text": "netstat" }
        ],
        "answers": ["top", "ps"]
      },
      {
        "title": "STEP3：対応",
        "choices": [
          { "value": "kill", "text": "kill -9 PID" },
          { "value": "svc", "text": "systemctl restart service" },
          { "value": "ping", "text": "ping" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["kill", "svc"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "journal", "text": "journalctl -xe" },
          { "value": "top", "text": "top" },
          { "value": "msg", "text": "/var/log/messages" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["msg", "journal"]
      }
    ],
    "resultText": "解説：ssh → (top / ps) → (kill / systemctl) → (messages / journal)"
  },
  {
    "id": 2,
    "scenario": "Webサーバ（Linux）からDBサーバ（Linux）へ接続できない",
    "status": "DB接続エラー発生中",
    "manual": [
      "① pingで疎通確認",
      "② netstat / ss でポート確認",
      "③ iptables / firewalld でFW確認",
      "④ /var/log/messages または journalctl でログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：疎通確認",
        "choices": [
          { "value": "tr", "text": "traceroute" },
          { "value": "top", "text": "top" },
          { "value": "df", "text": "df -h" },
          { "value": "ping", "text": "ping 192.168.1.10" }
        ],
        "answers": ["ping"]
      },
      {
        "title": "STEP2：ポート確認",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "ps", "text": "ps aux" },
          { "value": "net", "text": "netstat -an" },
          { "value": "ss", "text": "ss -lnt" }
        ],
        "answers": ["net", "ss"]
      },
      {
        "title": "STEP3：FW確認",
        "choices": [
          { "value": "ipt", "text": "iptables -L" },
          { "value": "fw", "text": "systemctl status firewalld" },
          { "value": "kill", "text": "kill" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["ipt", "fw"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "journal", "text": "journalctl -xe" },
          { "value": "msg", "text": "/var/log/messages" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["msg", "journal"]
      }
    ],
    "resultText": "解説：ping → (netstat / ss) → (iptables / firewalld) → (messages / journal)"
  },
  {
    "id": 3,
    "scenario": "サーバのディスク容量が不足し、ファイル保存できない",
    "status": "ディスク使用率 100%",
    "manual": [
      "① df / lsblk で容量確認",
      "② du / ncdu で使用量特定",
      "③ rm / logrotate で対応",
      "④ /var/log/messages または journalctl でログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：容量確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "lsblk", "text": "lsblk" },
          { "value": "free", "text": "free" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["df", "lsblk"]
      },
      {
        "title": "STEP2：使用量確認",
        "choices": [
          { "value": "du", "text": "du -sh" },
          { "value": "ping", "text": "ping" },
          { "value": "ncdu", "text": "ncdu" },
          { "value": "ps", "text": "ps aux" }
        ],
        "answers": ["du", "ncdu"]
      },
      {
        "title": "STEP3：対応",
        "choices": [
          { "value": "rm", "text": "rm -rf" },
          { "value": "logrotate", "text": "logrotate" },
          { "value": "top", "text": "top" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["rm", "logrotate"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "journal", "text": "journalctl -xe" },
          { "value": "msg", "text": "/var/log/messages" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["msg", "journal"]
      }
    ],
    "resultText": "(df / lsblk) → (du / ncdu) → (rm / logrotate) → (messages / journal)"
  },
  {
    "id": 4,
    "scenario": "サーバのメモリ使用率が高騰し、動作が遅くなっている（レスポンス低下）",
    "status": "メモリ使用率 95%",
    "manual": [
      "① free / vmstat でメモリ状況確認",
      "② top / ps でプロセス確認",
      "③ kill で不要プロセス停止",
      "④ /var/log/messages または journalctl でログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：メモリ確認",
        "choices": [
          { "value": "df", "text": "df -h" },
          { "value": "vmstat", "text": "vmstat" },
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free -m" }
        ],
        "answers": ["free", "vmstat"]
      },
      {
        "title": "STEP2：プロセス確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "ps", "text": "ps aux" },
          { "value": "ping", "text": "ping" },
          { "value": "ls", "text": "ls" }
        ],
        "answers": ["top", "ps"]
      },
      {
        "title": "STEP3：対応",
        "choices": [
          { "value": "kill", "text": "kill -9 PID" },
          { "value": "df", "text": "df -h" },
          { "value": "oom", "text": "OOM対応（プロセス調整）" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["kill", "oom"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "msg", "text": "/var/log/messages" },
          { "value": "ip", "text": "ip a" },
          { "value": "top", "text": "top" },
          { "value": "journal", "text": "journalctl -xe" }
        ],
        "answers": ["msg", "journal"]
      }
    ],
    "resultText": "(free / vmstat) → (top / ps) → (kill / 調整) → (messages / journal)"
  },
  {
    "id": 5,
    "scenario": "Webサービスが停止し、アクセスできない",
    "status": "Webサーバ応答なし",
    "manual": [
      "① systemctl status でサービス状態確認",
      "② ps でプロセス確認",
      "③ systemctl start / restart で再起動",
      "④ journalctl または /var/log/messages でログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：サービス状態確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "status", "text": "systemctl status" },
          { "value": "service", "text": "service status" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["status", "service"]
      },
      {
        "title": "STEP2：プロセス確認",
        "choices": [
          { "value": "ps", "text": "ps aux" },
          { "value": "ping", "text": "ping" },
          { "value": "top", "text": "top" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["ps", "top"]
      },
      {
        "title": "STEP3：再起動",
        "choices": [
         { "value": "kill", "text": "kill" }, 
          { "value": "restart", "text": "systemctl restart" },
          { "value": "rm", "text": "rm" },
          { "value": "start", "text": "systemctl start" }
        ],
        "answers": ["start", "restart"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "journal", "text": "journalctl -u" },
          { "value": "msg", "text": "/var/log/messages" },
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["journal", "msg"]
      }
    ],
    "resultText": "(status) → (ps/top) → (restart) → (log)"
  },
  {
    "id": 6,
    "scenario": "新入社員用のユーザアカウントを作成し、適切な権限を付与する",
    "status": "アカウント未作成",
    "manual": [
      "① net user /add またはGUIでユーザ作成",
      "② net localgroup でグループ追加",
      "③ lusrmgr.msc で確認",
      "④ ログオンテストで検証"
    ],
    "steps": [
      {
        "title": "STEP1：ユーザ作成",
        "choices": [
          { "value": "ip", "text": "ipconfig" },
          { "value": "ping", "text": "ping" },
          {"value": "gui", "text": "GUI" },
          { "value": "net", "text": "net user" }
        ],
        "answers": ["net", "gui"]
      },
      {
        "title": "STEP2：権限付与",
        "choices": [
          { "value": "dir", "text": "dir" },
          { "value": "ps", "text": "ps" },
          { "value": "task", "text": "tasklist" },
          { "value": "group", "text": "net localgroup" }
        ],
        "answers": ["group"]
      },
      {
        "title": "STEP3：動作確認",
        "choices": [
          { "value": "lusr", "text": "lusrmgr.msc" },
          { "value": "top", "text": "top" },
          { "value": "ping", "text": "ping" },
          { "value": "route", "text": "route print" }
        ],
        "answers": ["lusr"]
      },
      {
        "title": "STEP4：最終確認",
        "choices": [
          { "value": "logon", "text": "ログオン確認" },
          { "value": "rm", "text": "rm -rf" },
          { "value": "netstat", "text": "netstat" },
          { "value": "task", "text": "tasklist" }
        ],
        "answers": ["logon"]
      }
    ],
    "resultText": "(作成)→(権限)→(確認)→(検証)"
  },
  {
    "id": 7,
    "scenario": "サーバの動作が極端に遅くなっている。原因プロセスを特定し対処する",
    "status": "CPU使用率が高騰",
    "manual": [
      "① tasklist / タスクマネージャで確認",
      "② CPU・メモリ使用率の高いプロセス特定",
      "③ taskkill / タスク終了",
      "④ 再発有無を確認"
    ],
    "steps": [
      {
        "title": "STEP1：状況確認",
        "choices": [
          { "value": "ip", "text": "ipconfig" },
          { "value": "tasklist", "text": "tasklist" },
          { "value": "tm", "text": "タスクマネージャ" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["tasklist", "tm"]
      },
      {
        "title": "STEP2：原因特定",
        "choices": [
          { "value": "net", "text": "netstat" },
          { "value": "mem", "text": "メモリ使用率確認" },
          { "value": "cpu", "text": "CPU使用率確認" },
          { "value": "dir", "text": "dir" }
        ],
        "answers": ["cpu", "mem"]
      },
      {
        "title": "STEP3：対処",
        "choices": [
          { "value": "kill", "text": "taskkill" },
          { "value": "tmkill", "text": "タスク終了（GUI）" },
          { "value": "ping", "text": "ping" },
          { "value": "route", "text": "route print" }
        ],
        "answers": ["kill", "tmkill"]
      },
      {
        "title": "STEP4：再確認",
        "choices": [
          { "value": "tasklist", "text": "tasklist" },
          { "value": "netstat", "text": "netstat" },
          { "value": "ip", "text": "ipconfig" },
          { "value": "tm", "text": "タスクマネージャ" }
        ],
        "answers": ["tasklist", "tm"]
      }
    ],
    "resultText": "(確認)→(特定)→(終了)→(再確認)"
  },
  {
    "id": 8,
    "scenario": "Webアプリが起動していない。サービスの状態を確認し復旧する",
    "status": "サービス停止によりアプリ利用不可",
    "manual": [
      "① services.msc または sc query で状態確認",
      "② 停止サービス特定",
      "③ sc start / サービス開始",
      "④ スタートアップ設定確認"
    ],
    "steps": [
      {
        "title": "STEP1：サービス状態確認",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "sc", "text": "sc query" },
          { "value": "ip", "text": "ipconfig" },
          { "value": "svc", "text": "services.msc" }
        ],
        "answers": ["svc", "sc"]
      },
      {
        "title": "STEP2：原因特定",
        "choices": [
          { "value": "stop", "text": "停止サービス確認" },
          { "value": "name", "text": "サービス名確認" },
          { "value": "net", "text": "netstat" },
          { "value": "dir", "text": "dir" }
        ],
        "answers": ["stop", "name"]
      },
      {
        "title": "STEP3：復旧",
        "choices": [
          { "value": "start", "text": "sc start" },
          { "value": "route", "text": "route print" },
          { "value": "gui", "text": "GUIで開始" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["start", "gui"]
      },
      {
        "title": "STEP4：再発防止確認",
        "choices": [
          { "value": "auto", "text": "自動起動設定" },
          { "value": "svc", "text": "services.msc" },
          { "value": "task", "text": "tasklist" },
          { "value": "ip", "text": "ipconfig" }
        ],
        "answers": ["auto", "svc"]
      }
    ],
    "resultText": "(確認)→(特定)→(起動)→(防止)"
  },
  {
    "id": 9,
    "scenario": "システム障害が発生。原因特定のためログを確認する",
    "status": "エラー発生、原因不明",
    "manual": [
      "① イベントビューアでログ確認",
      "② アプリケーション/システムログを確認",
      "③ エラー内容・発生時刻を特定",
      "④ 関連サービスやプロセスとの関連確認"
    ],
    "steps": [
      {
        "title": "STEP1：ログ確認手段",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "powershell", "text": "Get-EventLog" },
          { "value": "ip", "text": "ipconfig" },
          { "value": "event", "text": "イベントビューア" }
        ],
        "answers": ["event", "powershell"]
      },
      {
        "title": "STEP2：対象ログ選定",
        "choices": [
          { "value": "net", "text": "netstat" },
          { "value": "sys", "text": "システムログ" },
          { "value": "app", "text": "アプリケーションログ" },
          { "value": "dir", "text": "dir" }
        ],
        "answers": ["app", "sys"]
      },
      {
        "title": "STEP3：原因特定",
        "choices": [
          { "value": "error", "text": "エラーログ確認" },
          { "value": "time", "text": "発生時刻確認" },
          { "value": "ping", "text": "ping" },
          { "value": "route", "text": "route print" }
        ],
        "answers": ["error", "time"]
      },
      {
        "title": "STEP4：関連確認",
        "choices": [
          { "value": "dir", "text": "dir" },
          { "value": "proc", "text": "プロセス確認" },
          { "value": "ip", "text": "ipconfig" },
          { "value": "svc", "text": "サービス状態確認" }
        ],
        "answers": ["svc", "proc"]
      }
    ],
    "resultText": "(確認)→(選定)→(特定)→(関連確認)"
  },
  {
    "id": 10,
    "scenario": "サーバの動作が遅い。CPU負荷を確認し原因を特定・対処する",
    "status": "CPU使用率が高い",
    "manual": [
      "① tasklist / タスクマネージャで確認",
      "② CPU使用率の高いプロセス特定",
      "③ taskkillで停止 or 負荷軽減",
      "④ 再度CPU状態確認"
    ],
    "steps": [
      {
        "title": "STEP1：状態確認",
        "choices": [
          { "value": "tasklist", "text": "tasklist" },
          { "value": "tm", "text": "タスクマネージャ" },
          { "value": "ip", "text": "ipconfig" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["tasklist", "tm"]
      },
      {
        "title": "STEP2：原因特定",
        "choices": [
          { "value": "cpu", "text": "CPU確認" },
          { "value": "dir", "text": "dir" },
          { "value": "proc", "text": "高負荷プロセス特定" },
          { "value": "route", "text": "route print" }
        ],
        "answers": ["cpu", "proc"]
      },
      {
        "title": "STEP3：対処",
        "choices": [
          { "value": "kill", "text": "taskkill" },
          { "value": "ping", "text": "ping" },
          { "value": "ip", "text": "ipconfig" },
          { "value": "tmkill", "text": "タスク終了" }
        ],
        "answers": ["kill", "tmkill"]
      },
      {
        "title": "STEP4：再確認",
        "choices": [
          { "value": "tasklist", "text": "tasklist" },
          { "value": "tm", "text": "タスクマネージャ" },
          { "value": "net", "text": "netstat" },
          { "value": "dir", "text": "dir" }
        ],
        "answers": ["tasklist", "tm"]
      }
    ],
    "resultText": "(確認)→(特定)→(対処)→(再確認)"
  },
  {
    "id": 11,
    "scenario": "複数のサーバで同じコマンドを繰り返し実行しており、作業が非効率になっている",
    "status": "毎回手動でコマンド実行",
    "manual": [
      "① bashスクリプト作成",
      "② 実行権限付与",
      "③ 変数・ループで自動化",
      "④ cronなどで定期実行"
    ],
    "steps": [
      {
        "title": "STEP1：スクリプト作成",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "python", "text": "python script" },
          { "value": "bash", "text": "bash script" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["bash"]
      },
      {
        "title": "STEP2：権限付与",
        "choices": [
          { "value": "chmod", "text": "chmod +x" },
          { "value": "chown", "text": "chown" },
          { "value": "kill", "text": "kill" },
          { "value": "ps", "text": "ps" }
        ],
        "answers": ["chmod"]
      },
      {
        "title": "STEP3：自動化処理",
        "choices": [
          { "value": "loop", "text": "for loop" },
          { "value": "var", "text": "変数使用" },
          { "value": "ping", "text": "ping" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["loop", "var"]
      },
      {
        "title": "STEP4：定期実行",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "cron", "text": "cron" },
          { "value": "systemd", "text": "systemd timer" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["cron", "systemd"]
      }
    ],
    "resultText": "(script) → (chmod) → (loop/var) → (cron)"
  },
  {
    "id": 12,
    "scenario": "サーバ同士が通信できず、ネットワーク接続に問題がある",
    "status": "ping応答なし",
    "manual": [
      "① IPアドレス確認（ip a / ifconfig）",
      "② ネットワーク設定確認",
      "③ pingで疎通確認",
      "④ 物理・L2接続確認"
    ],
    "steps": [
      {
        "title": "STEP1：IP確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "ip", "text": "ip a" },
          { "value": "ifconfig", "text": "ifconfig" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["ip", "ifconfig"]
      },
      {
        "title": "STEP2：設定確認",
        "choices": [
          { "value": "ps", "text": "ps" },
          { "value": "kill", "text": "kill" },
          { "value": "config", "text": "設定ファイル確認" },
          { "value": "nmcli", "text": "nmcli" }
        ],
        "answers": ["config", "nmcli"]
      },
      {
        "title": "STEP3：疎通確認",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "free", "text": "free" },
          { "value": "top", "text": "top" },
          { "value": "traceroute", "text": "traceroute" }
        ],
        "answers": ["ping", "traceroute"]
      },
      {
        "title": "STEP4：L2確認",
        "choices": [
          { "value": "cable", "text": "ケーブル確認" },
          { "value": "link", "text": "link状態確認" },
          { "value": "top", "text": "top" },
          { "value": "ps", "text": "ps" }
        ],
        "answers": ["cable", "link"]
      }
    ],
    "resultText": "(IP) → (設定) → (ping) → (L2)"
  },
  {
    "id": 13,
    "scenario": "同一ネットワーク内で通信できない（VLANミス疑い）",
    "status": "ping応答なし",
    "manual": [
      "① VLAN確認",
      "② ポート確認",
      "③ 疎通確認",
      "④ 設定修正"
    ],
    "steps": [
      {
        "title": "STEP1：VLAN確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "ip", "text": "ip a" },
          { "value": "showvlan", "text": "show vlan" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["showvlan"]
      },
      {
        "title": "STEP2：ポート確認",
        "choices": [
          { "value": "ps", "text": "ps" },
          { "value": "trunk", "text": "trunk確認" },
          { "value": "port", "text": "switchport" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["port", "trunk"]
      },
      {
        "title": "STEP3：疎通確認",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "arp", "text": "arp" },
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["ping", "arp"]
      },
      {
        "title": "STEP4：設定修正",
        "choices": [
          { "value": "vlan", "text": "VLAN設定" },
          { "value": "top", "text": "top" },
          { "value": "tag", "text": "tag設定" },
          { "value": "ps", "text": "ps" }
        ],
        "answers": ["vlan", "tag"]
      }
    ],
    "resultText": "(VLAN)→(port)→(ping)→(config)"
  },
  {
    "id": 14,
    "scenario": "特定宛先のみ通信できない",
    "status": "一部通信不可",
    "manual": [
      "① ping確認",
      "② traceroute実行",
      "③ 経路確認",
      "④ 原因切り分け"
    ],
    "steps": [
      {
        "title": "STEP1：疎通確認",
        "choices": [
          { "value": "df", "text": "df" },
          { "value": "ip", "text": "ip a" },
          { "value": "top", "text": "top" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["ping"]
      },
      {
        "title": "STEP2：経路確認",
        "choices": [
          { "value": "kill", "text": "kill" },
          { "value": "tracepath", "text": "tracepath" },
          { "value": "ps", "text": "ps" },
          { "value": "trace", "text": "traceroute" }
        ],
        "answers": ["trace", "tracepath"]
      },
      {
        "title": "STEP3：途中確認",
        "choices": [
          { "value": "free", "text": "free" },
          { "value": "router", "text": "ルータ確認" },
          { "value": "top", "text": "top" },
          { "value": "ttl", "text": "TTL確認" }
        ],
        "answers": ["ttl", "router"]
      },
      {
        "title": "STEP4：原因切り分け",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "route", "text": "ルート設定" },
          { "value": "fw", "text": "FW確認" },
          { "value": "ps", "text": "ps" }
        ],
        "answers": ["fw", "route"]
      }
    ],
    "resultText": "(ping)→(trace)→(経路)→(原因)"
  },
  {
    "id": 15,
    "scenario": "IPアドレスとCIDRからネットワーク範囲を判断する",
    "status": "192.168.1.10/24",
    "manual": [
      "① CIDRからサブネットマスクを求める",
      "② ネットワークアドレス特定",
      "③ ブロードキャスト算出",
      "④ 利用可能IP範囲確認"
    ],
    "steps": [
      {
        "title": "STEP1：サブネットマスク",
        "choices": [
          { "value": "a", "text": "255.255.255.0" },
          { "value": "b", "text": "255.255.0.0" },
          { "value": "c", "text": "255.0.0.0" },
          { "value": "d", "text": "255.255.255.128" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：ネットワークアドレス",
        "choices": [
          { "value": "a", "text": "192.168.1.0" },
          { "value": "b", "text": "192.168.0.0" },
          { "value": "c", "text": "192.168.1.255" },
          { "value": "d", "text": "192.168.255.0" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：ブロードキャスト",
        "choices": [
          { "value": "b", "text": "192.168.1.0" },
          { "value": "a", "text": "192.168.1.255" },
          { "value": "c", "text": "192.168.0.255" },
          { "value": "d", "text": "192.168.255.255" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP4：利用可能IP範囲",
        "choices": [
          { "value": "b", "text": "192.168.1.0〜192.168.1.255" },
          { "value": "c", "text": "192.168.0.1〜192.168.1.254" },
          { "value": "a", "text": "192.168.1.1〜192.168.1.254" },
          { "value": "d", "text": "192.168.1.2〜192.168.1.200" }
        ],
        "answers": ["a"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 16,
    "scenario": "通信経路が正しいか確認する",
    "status": "外部に接続できない",
    "manual": [
      "① ip route / route確認",
      "② default gateway確認",
      "③ tracerouteで経路確認",
      "④ 設定修正"
    ],
    "steps": [
      {
        "title": "STEP1：ルート確認",
        "choices": [
          { "value": "a", "text": "ip route" },
          { "value": "c", "text": "ps" },
          { "value": "b", "text": "netstat -rn" },
          { "value": "d", "text": "top" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP2：GW確認",
        "choices": [
          { "value": "a", "text": "default via" },
          { "value": "b", "text": "/etc/hosts" },
          { "value": "c", "text": "ping localhost" },
          { "value": "d", "text": "df -h" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：経路確認",
        "choices": [
          { "value": "d", "text": "free" },
          { "value": "b", "text": "ping" },
          { "value": "c", "text": "top" },
          { "value": "a", "text": "traceroute" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP4：修正",
        "choices": [
          { "value": "a", "text": "route add default gw" },
          { "value": "b", "text": "rm -rf" },
          { "value": "c", "text": "kill" },
          { "value": "d", "text": "chmod" }
        ],
        "answers": ["a"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 17,
    "scenario": "利用者からWebサーバ(10.0.1.10)へアクセスできない",
    "status": "Firewall設定を確認して原因を特定する",
    "manual": [
      "① 通信可否確認",
      "② FWルール確認",
      "③ 許可/拒否ポート確認",
      "④ ルール修正後に再確認"
    ],
    "steps": [
      {
        "title": "STEP1：疎通確認",
        "choices": [
          { "value": "useradd", "text": "useradd" },
          { "value": "curl", "text": "curl" },
          { "value": "ping", "text": "ping" },
          { "value": "passwd", "text": "passwd" }
        ],
        "answers": ["ping", "curl"]
      },
      {
        "title": "STEP2：FW確認",
        "choices": [
          { "value": "iptables", "text": "iptables -L" },
          { "value": "free", "text": "free" },
          { "value": "df", "text": "df -h" },
          { "value": "firewall", "text": "firewall-cmd --list-all" }
        ],
        "answers": ["iptables", "firewall"]
      },
      {
        "title": "STEP3：HTTP許可ポート",
        "choices": [
          { "value": "80", "text": "TCP/80" },
          { "value": "21", "text": "TCP/21" },
          { "value": "443", "text": "TCP/443" },
          { "value": "25", "text": "TCP/25" }
        ],
        "answers": ["80", "443"]
      },
      {
        "title": "STEP4：修正後確認",
        "choices": [
          { "value": "test", "text": "再度curl実行" },
          { "value": "log", "text": "FWログ確認" },
          { "value": "reboot", "text": "OS再インストール" },
          { "value": "format", "text": "ディスク初期化" }
        ],
        "answers": ["test", "log"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 18,
    "scenario": "WebサイトへURLで接続できないがIP指定では接続できる",
    "status": "DNS設定を確認して原因を特定する",
    "manual": [
      "① DNS名前解決確認",
      "② DNSサーバ確認",
      "③ hosts確認",
      "④ 解決後に再テスト"
    ],
    "steps": [
      {
        "title": "STEP1：名前解決確認",
        "choices": [
          { "value": "nslookup", "text": "nslookup" },
          { "value": "df", "text": "df -h" },
          { "value": "top", "text": "top" },
          { "value": "dig", "text": "dig" }
        ],
        "answers": ["nslookup", "dig"]
      },
      {
        "title": "STEP2：DNS設定確認",
        "choices": [
          { "value": "fstab", "text": "/etc/fstab" },
          { "value": "nm", "text": "NetworkManager設定" },
          { "value": "passwd", "text": "/etc/passwd" },
          { "value": "resolv", "text": "/etc/resolv.conf" }
        ],
        "answers": ["resolv", "nm"]
      },
      {
        "title": "STEP3：hosts確認",
        "choices": [
          { "value": "mkfs", "text": "mkfs" },
          { "value": "cache", "text": "DNSキャッシュ確認" },
          { "value": "rm", "text": "rm -rf" },
          { "value": "hosts", "text": "/etc/hosts" }
        ],
        "answers": ["hosts", "cache"]
      },
      {
        "title": "STEP4：確認テスト",
        "choices": [
          { "value": "format", "text": "フォーマット" },
          { "value": "shutdown", "text": "shutdown" },
          { "value": "test", "text": "再度nslookup実行" },
          { "value": "access", "text": "ブラウザアクセス確認" }
        ],
        "answers": ["test", "access"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 19,
    "scenario": "通信遅延が発生しており、パケット内容の確認が必要",
    "status": "パケットキャプチャ結果から原因を調査する",
    "manual": [
      "① パケット取得",
      "② プロトコル確認",
      "③ ポート確認",
      "④ 通信内容確認"
    ],
    "steps": [
      {
        "title": "STEP1：パケット取得ツール",
        "choices": [
          { "value": "useradd", "text": "useradd" },
          { "value": "wireshark", "text": "Wireshark" },
          { "value": "tcpdump", "text": "tcpdump" },
          { "value": "df", "text": "df -h" }
        ],
        "answers": ["tcpdump", "wireshark"]
      },
      {
        "title": "STEP2：プロトコル確認",
        "choices": [
          { "value": "tcp", "text": "TCP" },
          { "value": "reboot", "text": "reboot" },
          { "value": "mkfs", "text": "mkfs" },
          { "value": "udp", "text": "UDP" }
        ],
        "answers": ["tcp", "udp"]
      },
      {
        "title": "STEP3：Web通信ポート",
        "choices": [
          { "value": "21", "text": "21" },
          { "value": "23", "text": "23" },
          { "value": "80", "text": "80" },
          { "value": "443", "text": "443" }
        ],
        "answers": ["80", "443"]
      },
      {
        "title": "STEP4：分析",
        "choices": [
          { "value": "rtt", "text": "応答時間確認" },
          { "value": "format", "text": "フォーマット" },
          {"value": "retry", "text": "再送確認" },
          { "value": "shutdown", "text": "shutdown" }
        ],
        "answers": ["rtt", "retry"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 20,
    "scenario": "サーバへ接続できない。ネットワーク経路を確認する",
    "status": "どこで通信が止まっているか調査する",
    "manual": [
      "① IP確認",
      "② ping確認",
      "③ 経路確認",
      "④ ポート確認"
    ],
    "steps": [
      {
        "title": "STEP1：IP確認",
        "choices": [
            {"value": "ipa", "text": "ip a"},
            {"value": "top", "text": "top"},
            {"value": "ipconfig", "text": "ipconfig"},
            {"value": "free", "text": "free"}
        ],
        "answers": ["ipa", "ipconfig"]
      },
      {
          "title": "STEP2：疎通確認",
          "choices": [
              {"value": "ping", "text": "ping"},
              {"value": "userdel", "text": "userdel"},
              {"value": "traceroute", "text": "traceroute前確認"},
              {"value": "passwd", "text": "passwd"}
          ],
          "answers": ["ping", "traceroute"]
      },
      {
        "title": "STEP3：経路確認",
        "choices": [
            {"value": "trace", "text": "traceroute"},
            {"value": "path", "text": "pathping"},
            {"value": "mkfs", "text": "mkfs"},
            {"value": "rm", "text": "rm -rf"}
        ],
        "answers": ["trace", "path"]
      },
      {
        "title": "STEP4：ポート確認",
        "choices": [
            {"value": "shutdown", "text": "shutdown"},
            {"value": "nc", "text": "nc"},
            {"value": "format", "text": "format"},
            {"value": "telnet", "text": "telnet"}
        ],
        "answers": ["telnet", "nc"]
      }
    ],
    "resultText": "IP確認 → ping → 経路確認 → ポート確認"
  },
  {
    "id": 21,
    "scenario": "AWS上でWebシステムを構築することになった。VPC構成と通信要件を確認する",
    "status": "ネットワーク設計の妥当性を判断する",
    "manual": [
      "① VPC確認",
      "② Webサーバ配置確認",
      "③ DBサーバ配置確認",
      "④ アクセス制御"
    ],
    "steps": [
      {
        "title": "STEP1：VPCの役割",
        "choices": [
            {"value": "isolation", "text": "ネットワーク分離"},
            {"value": "useradd", "text": "ユーザ作成"},
            {"value": "format", "text": "ディスク初期化"},
            {"value": "address", "text": "IPアドレス管理"}
        ],
        "answers": ["isolation", "address"]
      },
      {
        "title": "STEP2：Webサーバ配置場所",
        "choices": [
            {"value": "public", "text": "パブリックサブネット"},
            {"value": "igw", "text": "Internet Gateway利用"},
            {"value": "fstab", "text": "/etc/fstab"},
            {"value": "mkfs", "text": "mkfs"}
        ],
        "answers": ["public", "igw"]
      },
      {
        "title": "STEP3：DBサーバ配置",
        "choices": [
            {"value": "telnet", "text": "telnet公開"},
            {"value": "nointernet", "text": "直接公開しない"},
            {"value": "private", "text": "プライベートサブネット"},
            {"value": "ftp", "text": "FTP公開"}
        ],
        "answers": ["private", "nointernet"]
      },
      {
        "title": "STEP4：アクセス制御",
        "choices": [
            {"value": "sg", "text": "セキュリティグループ"},
            {"value": "nacl", "text": "Network ACL"},
            {"value": "rm", "text": "rm -rf"},
            {"value": "format", "text": "format"}
        ],
        "answers": ["sg", "nacl"]
      }
    ],
    "resultText": "VPC → Subnet → Routing → Security"
  },
  {
    "id": 22,
    "scenario": "EC2インスタンスを構築し接続したい",
    "status": "サーバ未接続",
    "manual": [
      "① EC2起動",
      "② SSH接続",
      "③ セキュリティ設定",
      "④ 動作確認"
    ],
    "steps": [
      {
        "title": "STEP1：インスタンス",
        "choices": [
          { "value": "c", "text": "CloudWatch" },
          { "value": "b", "text": "IAM作成" },
          { "value": "a", "text": "EC2起動" },
          { "value": "d", "text": "S3" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：接続",
        "choices": [
          { "value": "a", "text": "SSH" },
          { "value": "b", "text": "RDP" },
          { "value": "c", "text": "ping" },
          { "value": "d", "text": "ftp" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：セキュリティ設定",
        "choices": [
          { "value": "a", "text": "セキュリティグループ" },
          { "value": "b", "text": "ポート22" },
          { "value": "c", "text": "Route53" },
          { "value": "d", "text": "Lambda" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP4：動作確認",
        "choices": [
          { "value": "c", "text": "AMI削除" },
          { "value": "b", "text": "ログイン確認" },
          { "value": "a", "text": "コマンド実行" },
          { "value": "d", "text": "VPC削除" }
        ],
        "answers": ["a", "b"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 23,
    "scenario": "AWS上のWindows Serverへ接続できない",
    "status": "EC2と接続設定を確認する",
    "manual": [
      "①EC2状態確認",
      "②通信許可",
      "③接続方法確認",
      "④接続確認"
    ],
    "steps": [
      {
        "title": "STEP1：EC2状態",
        "choices": [
          { "value": "mkfs", "text": "mkfs" },
          { "value": "status", "text": "ステータスチェック確認" },
          { "value": "run", "text": "Running確認" },
          { "value": "rm", "text": "rm -rf" }
        ],
        "answers": ["run", "status"]
      },
      {
        "title": "STEP2：通信許可",
        "choices": [
          { "value": "sg", "text": "セキュリティグループ" },
          { "value": "21", "text": "FTP公開" },
          { "value": "3389", "text": "TCP3389許可" },
          { "value": "23", "text": "Telnet公開" }
        ],
        "answers": ["sg", "3389"]
      },
      {
        "title": "STEP3：接続方法",
        "choices": [
          { "value": "ssh", "text": "SSH必須" },
          { "value": "ftp", "text": "FTP接続" },
          { "value": "rdp", "text": "RDP接続" },
          { "value": "pass", "text": "Administratorパスワード取得" }
        ],
        "answers": ["rdp", "pass"]
      },
      {
        "title": "STEP4：接続確認",
        "choices": [
          { "value": "shutdown", "text": "shutdown" },
          { "value": "event", "text": "イベントログ確認" },
          { "value": "format", "text": "format" },
          { "value": "login", "text": "ログイン確認" }
        ],
        "answers": ["login", "event"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 24,
    "scenario": "S3へファイルを保存する構成を確認する",
    "status": "S3とストレージ機能を理解する",
    "manual": [
      "①S3確認",
      "②バケット作成",
      "③アクセス権確認",
      "④アップロード確認"
    ],
    "steps": [
      {
        "title": "STEP1：S3の機能",
        "choices": [
          { "value": "os", "text": "OS管理" },
          { "value": "cpu", "text": "CPU監視" },
          { "value": "object", "text": "オブジェクトストレージ" },
          { "value": "durable", "text": "高耐久性" }
        ],
        "answers": ["object", "durable"]
      },
      {
        "title": "STEP2：保存先",
        "choices": [
          { "value": "kernel", "text": "カーネル更新" },
          { "value": "name", "text": "一意な名称設定" },
          { "value": "user", "text": "ユーザ作成" },
          { "value": "bucket", "text": "Bucket作成" }
        ],
        "answers": ["bucket", "name"]
      },
      {
        "title": "STEP3：アクセス制御",
        "choices": [
          { "value": "ftp", "text": "ftp" },
          { "value": "policy", "text": "バケットポリシー" },
          { "value": "telnet", "text": "telnet" },
          { "value": "iam", "text": "IAM権限" }
        ],
        "answers": ["iam", "policy"]
      },
      {
        "title": "STEP4：利用確認",
        "choices": [
          { "value": "upload", "text": "ファイルアップロード" },
          { "value": "format", "text": "format" },
          { "value": "download", "text": "ダウンロード確認" },
          { "value": "shutdown", "text": "shutdown" }
        ],
        "answers": ["upload", "download"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 25,
    "scenario": "RDSに接続できない",
    "status": "DBタイムアウト",
    "manual": [
      "① セキュリティグループ確認",
      "② エンドポイント確認",
      "③ ポート疎通確認",
      "④ DBユーザ・パスワード確認"
    ],
    "steps": [
      {
        "title": "STEP1：SG確認",
        "choices": [
          { "value": "iam", "text": "IAM確認" },
          { "value": "vpc", "text": "VPC作成" },
          { "value": "s3", "text": "S3確認" },
          { "value": "sg", "text": "セキュリティグループ" }
        ],
        "answers": ["sg"]
      },
      {
        "title": "STEP2：接続先確認",
        "choices": [
          { "value": "ami", "text": "AMI" },
          { "value": "bucket", "text": "バケット" },
          { "value": "lambda", "text": "Lambda" },
          { "value": "ep", "text": "エンドポイント" }
        ],
        "answers": ["ep"]
      },
      {
        "title": "STEP3：疎通確認",
        "choices": [
          { "value": "ssh", "text": "ssh" },
          { "value": "ping", "text": "ping" },
          { "value": "telnet", "text": "telnet" },
          { "value": "ftp", "text": "ftp" }
        ],
        "answers": ["telnet"]
      },
      {
        "title": "STEP4：認証確認",
        "choices": [
          { "value": "user", "text": "ユーザ" },
          { "value": "pass", "text": "パスワード" },
          { "value": "cpu", "text": "CPU" },
          { "value": "ram", "text": "メモリ" }
        ],
        "answers": ["user", "pass"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 26,
    "scenario": "APIが正常応答しない",
    "status": "500エラー",
    "manual": [
      "① API Gateway設定確認",
      "② Lambdaログ確認",
      "③ リクエスト形式確認",
      "④ 権限確認"
    ],
    "steps": [
      {
        "title": "STEP1：GW確認",
        "choices": [
          { "value": "gw", "text": "API Gateway" },
          { "value": "s3", "text": "S3" },
          { "value": "ec2", "text": "EC2" },
          { "value": "rds", "text": "RDS" }
        ],
        "answers": ["gw"]
      },
      {
        "title": "STEP2：ログ確認",
        "choices": [
          { "value": "vpc", "text": "VPC" },
          { "value": "cloudfront", "text": "CloudFront" },
          { "value": "lambda", "text": "Lambdaログ" },
          { "value": "dns", "text": "DNS" }
        ],
        "answers": ["lambda"]
      },
      {
        "title": "STEP3：リクエスト形式確認",
        "choices": [
          { "value": "format", "text": "JSON形式" },
          { "value": "cpu", "text": "CPU" },
          { "value": "mem", "text": "メモリ" },
          { "value": "disk", "text": "ディスク" }
        ],
        "answers": ["format"]
      },
      {
        "title": "STEP4：権限確認",
        "choices": [
          { "value": "ram", "text": "RAM" },
          { "value": "policy", "text": "ポリシー" },
          { "value": "iam", "text": "IAMロール" },
          { "value": "gpu", "text": "GPU" }
        ],
        "answers": ["iam", "policy"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 27,
    "scenario": "EC2からS3にアクセスできない",
    "status": "AccessDenied",
    "manual": [
      "① IAMロール確認",
      "② ポリシー確認",
      "③ アタッチ確認",
      "④ バケットポリシー確認"
    ],
    "steps": [
      {
        "title": "STEP1：ロール確認",
        "choices": [
          { "value": "dns", "text": "DNS" },
          { "value": "sg", "text": "SG" },
          { "value": "vpc", "text": "VPC" },
          { "value": "role", "text": "IAMロール" }
        ],
        "answers": ["role"]
      },
      {
        "title": "STEP2：ポリシー確認",
        "choices": [
          { "value": "route", "text": "ルートテーブル" },
          {"value": "policy", "text": "IAMポリシー" },
          { "value": "elb", "text": "ELB" },
          { "value": "ami", "text": "AMI" }
        ],
        "answers": ["policy"]
      },
      {
        "title": "STEP3：アタッチ確認",
        "choices": [
          { "value": "attach", "text": "ロール付与" },
          { "value": "disk", "text": "ディスク" },
          { "value": "ram", "text": "RAM" },
          { "value": "cpu", "text": "CPU" }
        ],
        "answers": ["attach"]
      },
      {
        "title": "STEP4：リソース側確認",
        "choices": [
          { "value": "mem", "text": "メモリ" },
          { "value": "bucket", "text": "バケットポリシー" },
          { "value": "gpu", "text": "GPU" },
          { "value": "log", "text": "ログ" }
        ],
        "answers": ["bucket"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 28,
    "scenario": "Lambdaが実行されない",
    "status": "トリガーが反応しない",
    "manual": [
      "① トリガー設定確認",
      "② CloudWatch Logs確認",
      "③ 関数設定確認",
      "④ IAM権限確認"
    ],
    "steps": [
      {
        "title": "STEP1：トリガー確認",
        "choices": [
          { "value": "rds", "text": "RDS" },
          { "value": "ec2", "text": "EC2" },
          { "value": "trigger", "text": "トリガー設定" },
          { "value": "sg", "text": "SG" }
        ],
        "answers": ["trigger"]
      },
      {
        "title": "STEP2：ログ確認",
        "choices": [
          { "value": "logs", "text": "CloudWatch Logs" },
          { "value": "s3", "text": "S3" },
          { "value": "route", "text": "Route" },
          { "value": "dns", "text": "DNS" }
        ],
        "answers": ["logs"]
      },
      {
        "title": "STEP3：設定確認",
        "choices": [
          { "value": "config", "text": "関数設定" },
          { "value": "cpu", "text": "CPU" },
          { "value": "mem", "text": "メモリ" },
          { "value": "disk", "text": "ディスク" }
        ],
        "answers": ["config"]
      },
      {
        "title": "STEP4：権限確認",
        "choices": [
          { "value": "gpu", "text": "GPU" },
          { "value": "ram", "text": "RAM" },
          { "value": "iam", "text": "IAMロール" },
          { "value": "policy", "text": "ポリシー" }
        ],
        "answers": ["iam", "policy"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 29,
    "scenario": "AWS上でWebシステムの全体構成を設計することになった",
    "status": "要件に合ったAWS構成を選定する",
    "manual": [
      "① ネットワーク設計",
      "② Webサーバ配置",
      "③ DB配置",
      "④ 可用性確認"
    ],
    "steps": [
      {
        "title": "STEP1：ネットワーク設計",
        "choices": [
          { "value": "format", "text": "フォーマット" },
          { "value": "subnet", "text": "サブネット分割" },
          { "value": "vpc", "text": "VPC作成" },
          { "value": "useradd", "text": "ユーザ作成" }
        ],
        "answers": ["vpc", "subnet"]
      },
      {
        "title": "STEP2：Webサーバ配置",
        "choices": [
          { "value": "ec2", "text": "EC2配置" },
          { "value": "alb", "text": "ALB配置" },
          { "value": "ftp", "text": "FTP公開" },
          { "value": "telnet", "text": "Telnet公開" }
        ],
        "answers": ["ec2", "alb"]
      },
      {
        "title": "STEP3：DB層",
        "choices": [
          { "value": "rds", "text": "RDS配置" },
          { "value": "anonymous", "text": "匿名接続許可" },
          { "value": "public", "text": "インターネット公開" },
          { "value": "private", "text": "Private Subnet配置" }
        ],
        "answers": ["rds", "private"]
      },
      {
        "title": "STEP4：可用性確認",
        "choices": [
          { "value": "multi", "text": "Multi-AZ" },
          { "value": "noreserve", "text": "冗長化なし" },
          { "value": "single", "text": "単一障害点放置" },
          { "value": "backup", "text": "バックアップ設定" }
        ],
        "answers": ["multi", "backup"]
      }
    ],
    "resultText": "VPC → ALB+EC2 → RDS → Multi-AZ"
  },
  {
    "id": 30,
    "scenario": "Azureで安全なネットワークを設計する",
    "status": "通信制御が必要",
    "manual": [
      "①VNet作成",
      "②サブネット分割",
      "③NSG設定",
      "④疎通確認"
    ],
    "steps": [
      {
        "title": "STEP1：VNet作成",
        "choices": [
          { "value": "b", "text": "IAM" },
          { "value": "a", "text": "VNet作成" },
          { "value": "c", "text": "S3" },
          { "value": "d", "text": "Lambda" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：サブネット分割",
        "choices": [
          { "value": "b", "text": "統合" },
          { "value": "a", "text": "分割" },
          { "value": "c", "text": "削除" },
          { "value": "d", "text": "IAM" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：セキュリティ設定",
        "choices": [
          { "value": "a", "text": "NSG" },
          { "value": "b", "text": "FW" },
          { "value": "c", "text": "IAM" },
          { "value": "d", "text": "Storage" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP4：疎通確認",
        "choices": [
          { "value": "c", "text": "df" },
          { "value": "b", "text": "tracert" },
          { "value": "a", "text": "ping" },
          { "value": "d", "text": "top" }
        ],
        "answers": ["a", "b"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 31,
    "scenario": "Linux VMを構築しSSH接続する",
    "status": "接続できない状態",
    "manual": [
      "①VM作成",
      "②NSGで22許可",
      "③IP確認",
      "④SSH接続"
    ],
    "steps": [
      {
        "title": "STEP1：VM作成",
        "choices": [
          { "value": "d", "text": "IAM" },
          { "value": "b", "text": "S3" },
          { "value": "c", "text": "Lambda" },
          { "value": "a", "text": "Azure VM" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：ネットワーク許可",
        "choices": [
          { "value": "a", "text": "NSG 22許可" },
          { "value": "b", "text": "閉じる" },
          { "value": "c", "text": "削除" },
          { "value": "d", "text": "IAM" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：IP確認",
        "choices": [
          { "value": "c", "text": "IAM" },
          { "value": "b", "text": "Private IP" },
          { "value": "a", "text": "Public IP" },
          { "value": "d", "text": "Storage" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP4：接続",
        "choices": [
          { "value": "a", "text": "ssh" },
          { "value": "b", "text": "rdp" },
          { "value": "c", "text": "ping" },
          { "value": "d", "text": "top" }
        ],
        "answers": ["a"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 32,
    "scenario": "Windows VMへRDP接続する",
    "status": "リモート接続不可",
    "manual": [
      "①VM作成",
      "②NSGで3389許可",
      "③IP確認",
      "④RDP接続"
    ],
    "steps": [
      {
        "title": "STEP1：VM作成",
        "choices": [
          { "value": "d", "text": "IAM" },
          { "value": "b", "text": "S3" },
          { "value": "c", "text": "Lambda" },
          { "value": "a", "text": "Azure VM" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：ポート許可",
        "choices": [
          { "value": "d", "text": "443" },
          { "value": "b", "text": "22" },
          { "value": "c", "text": "80" },
          { "value": "a", "text": "3389" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：IP確認",
        "choices": [
          { "value": "c", "text": "IAM" },
          { "value": "b", "text": "Private IP" },
          { "value": "a", "text": "Public IP" },
          { "value": "d", "text": "Storage" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP4：接続",
        "choices": [
          { "value": "a", "text": "RDP" },
          { "value": "b", "text": "ssh" },
          { "value": "c", "text": "ping" },
          { "value": "d", "text": "top" }
        ],
        "answers": ["a"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 33,
    "scenario": "Azure Storageにデータを保存・管理する",
    "status": "ストレージが利用できない",
    "manual": [
      "①ストレージ作成",
      "②Blob利用",
      "③アクセス設定",
      "④確認"
    ],
    "steps": [
      {
        "title": "STEP1：ストレージ作成",
        "choices": [
          { "value": "b", "text": "EC2" },
          { "value": "a", "text": "Storage Account" },
          { "value": "c", "text": "Lambda" },
          { "value": "d", "text": "IAM" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：データ保存",
        "choices": [
          { "value": "c", "text": "IAM" },
          { "value": "b", "text": "Queue" },
          { "value": "a", "text": "Blob" },
          { "value": "d", "text": "NSG" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：アクセス設定",
        "choices": [
          { "value": "a", "text": "SAS" },
          { "value": "d", "text": "VM" },
          { "value": "c", "text": "IAM" },
          { "value": "b", "text": "URL" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP4：確認",
        "choices": [
          { "value": "c", "text": "df" },
          { "value": "d", "text": "top" },
          { "value": "a", "text": "HTTPアクセス" },
          { "value": "b", "text": "Portal確認" }
        ],
        "answers": ["a", "b"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 34,
    "scenario": "データベースへ接続して操作する",
    "status": "接続できない",
    "manual": [
      "①DB作成",
      "②接続許可",
      "③接続情報確認",
      "④接続テスト"
    ],
    "steps": [
      {
        "title": "STEP1：DB作成",
        "choices": [
          { "value": "a", "text": "Azure SQL" },
          { "value": "b", "text": "S3" },
          { "value": "c", "text": "Lambda" },
          { "value": "d", "text": "EC2" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：接続許可",
        "choices": [
          { "value": "a", "text": "IP許可" },
          { "value": "b", "text": "拒否" },
          { "value": "c", "text": "削除" },
          { "value": "d", "text": "再作成" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：接続情報確認",
        "choices": [
          { "value": "c", "text": "IAM" },
          { "value": "b", "text": "ID/PW" },
          { "value": "a", "text": "接続文字列" },
          { "value": "d", "text": "S3" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP4：接続テスト",
        "choices": [
          { "value": "a", "text": "SSMS" },
          { "value": "b", "text": "アプリ接続" },
          { "value": "c", "text": "df" },
          { "value": "d", "text": "top" }
        ],
        "answers": ["a", "b"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 35,
    "scenario": "APIを安全に公開・管理する",
    "status": "API設定が完了していない",
    "manual": [
      "①APIM作成",
      "②API登録",
      "③認証設定",
      "④テスト"
    ],
    "steps": [
      {
        "title": "STEP1：サービス作成",
        "choices": [
          { "value": "c", "text": "Storage" },
          { "value": "b", "text": "VM" },
          { "value": "a", "text": "API Management" },
          { "value": "d", "text": "NSG" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：API登録",
        "choices": [
          { "value": "c", "text": "停止" },
          { "value": "b", "text": "削除" },
          { "value": "a", "text": "APIインポート" },
          { "value": "d", "text": "NSG" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：セキュリティ設定",
        "choices": [
          { "value": "a", "text": "APIキー" },
          { "value": "c", "text": "削除" },
          { "value": "b", "text": "JWT" },
          { "value": "d", "text": "VM" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP4：確認",
        "choices": [
          { "value": "c", "text": "df" },
          { "value": "d", "text": "top" },
          { "value": "a", "text": "テストコンソール" },
          { "value": "b", "text": "curl" }
        ],
        "answers": ["a", "b"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 36,
    "scenario": "アクセス権限を適切に設定する",
    "status": "ユーザが操作できない",
    "manual": [
      "①ユーザ確認",
      "②ロール付与",
      "③スコープ設定",
      "④確認"
    ],
    "steps": [
      {
        "title": "STEP1：対象",
        "choices": [
          { "value": "a", "text": "ユーザ" },
          { "value": "b", "text": "VM" },
          { "value": "c", "text": "Storage" },
          { "value": "d", "text": "API" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：権限付与",
        "choices": [
          { "value": "c", "text": "削除" },
          { "value": "b", "text": "Contributor" },
          { "value": "a", "text": "Reader" },
          { "value": "d", "text": "停止" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP3：スコープ設定",
        "choices": [
          { "value": "a", "text": "Resource Group" },
          { "value": "b", "text": "Subscription" },
          { "value": "c", "text": "削除" },
          { "value": "d", "text": "VMのみ" }
        ],
        "answers": ["a", "b"]
      },
      {
        "title": "STEP4：確認",
        "choices": [
          { "value": "a", "text": "アクセス確認" },
          { "value": "d", "text": "top" },
          { "value": "c", "text": "df" },
          { "value": "b", "text": "ログ確認" }
        ],
        "answers": ["a", "b"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 37,
    "scenario": "ファイルアップロード時に自動処理を実行するサーバレス構成を作成する",
    "status": "AWS Lambdaの仕組みと構成を理解する",
    "manual": [
      "① Lambda作成",
      "② トリガー設定",
      "③ IAM権限確認",
      "④ 実行結果確認"
    ],
    "steps": [
      {
        "title": "STEP1：Lambdaの特徴",
        "choices": [
          { "value": "serverless", "text": "サーバレス実行" },
          { "value": "physical", "text": "物理サーバ購入" },
          { "value": "os", "text": "OSログイン必須" },
          { "value": "event", "text": "イベント駆動" }
        ],
        "answers": ["serverless", "event"]
      },
      {
        "title": "STEP2：実行トリガー",
        "choices": [
          { "value": "mkfs", "text": "mkfs" },
          { "value": "api", "text": "API Gateway" },
          { "value": "format", "text": "ディスク初期化" },
          { "value": "s3", "text": "S3イベント" }
        ],
        "answers": ["s3", "api"]
      },
      {
        "title": "STEP3：権限設定",
        "choices": [
          { "value": "ftp", "text": "FTP公開" },
          { "value": "policy", "text": "実行ポリシー" },
          { "value": "telnet", "text": "Telnet許可" },
          { "value": "iam", "text": "IAMロール" }
        ],
        "answers": ["iam", "policy"]
      },
      {
        "title": "STEP4：動作確認",
        "choices": [
          { "value": "test", "text": "テスト実行" },
          { "value": "log", "text": "CloudWatch Logs確認" },
          { "value": "shutdown", "text": "shutdown" },
          { "value": "format", "text": "format" }
        ],
        "answers": ["test", "log"]
      }
    ],
    "resultText": "Lambda → Trigger → IAM → CloudWatch"
  },
  {
    "id": 38,
    "scenario": "Webシステム構成を設計する",
    "status": "高可用性が必要",
    "manual": [
      "① VNet設計",
      "② VM or App Service選定",
      "③ LB設置",
      "④ 冗長化"
    ],
    "steps": [
      {
        "title": "STEP1：ネットワーク設計",
        "choices": [
          { "value": "df", "text": "df" },
          { "value": "subnet", "text": "Subnet" },
          { "value": "vnet", "text": "VNet" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["vnet", "subnet"]
      },
      {
        "title": "STEP2：サーバ選定",
        "choices": [
          { "value": "vm", "text": "VM" },
          { "value": "ping", "text": "ping" },
          { "value": "app", "text": "AppService" },
          { "value": "ip", "text": "ip" }
        ],
        "answers": ["vm", "app"]
      },
      {
        "title": "STEP3：負荷分散",
        "choices": [
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" },
          { "value": "lb", "text": "LoadBalancer" },
          { "value": "gw", "text": "Gateway" }
        ],
        "answers": ["lb", "gw"]
      },
      {
        "title": "STEP4：冗長化",
        "choices": [
          { "value": "free", "text": "free" },
          { "value": "multi", "text": "複数台構成" },
          { "value": "top", "text": "top" },
          { "value": "zone", "text": "AZ配置" }
        ],
        "answers": ["zone", "multi"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 39,
    "scenario": "EC2のCPU高騰を検知したい",
    "status": "負荷増加に気づけない",
    "manual": [
      "① メトリクス確認",
      "② CPU選択",
      "③ アラーム設定",
      "④ 通知設定"
    ],
    "steps": [
      {
        "title": "STEP1：メトリクス確認",
        "choices": [
          { "value": "df", "text": "df" },
          { "value": "log", "text": "Logs" },
          { "value": "metrics", "text": "Metrics" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["metrics"]
      },
      {
        "title": "STEP2：CPU選択",
        "choices": [
          { "value": "cpu", "text": "CPUUtilization" },
          { "value": "mem", "text": "Memory" },
          { "value": "net", "text": "Network" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["cpu"]
      },
      {
        "title": "STEP3：アラーム設定",
        "choices": [
          { "value": "threshold", "text": "しきい値設定" },
          { "value": "80", "text": "80%以上設定" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["threshold", "80"]
      },
      {
        "title": "STEP4：通知設定",
        "choices": [
          { "value": "sns", "text": "SNS通知" },
          { "value": "free", "text": "free" },
          { "value": "top", "text": "top" },
          { "value": "mail", "text": "メール通知" }
        ],
        "answers": ["sns", "mail"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 40,
    "scenario": "メモリ不足を検知したい",
    "status": "サーバが頻繁に遅延",
    "manual": [
      "① Agent導入",
      "② メトリクス送信",
      "③ グラフ確認",
      "④ アラーム設定"
    ],
    "steps": [
      {
        "title": "STEP1：Agent導入",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "vm", "text": "VM確認" },
          { "value": "cpu", "text": "CPU確認" },
          { "value": "agent", "text": "CloudWatch Agent" }
        ],
        "answers": ["agent"]
      },
      {
        "title": "STEP2：メトリクス送信",
        "choices": [
          { "value": "cpu", "text": "CPU" },
          { "value": "mem", "text": "mem_used_percent" },
          { "value": "net", "text": "Network" },
          { "value": "rm", "text": "rm" }
        ],
        "answers": ["mem"]
      },
      {
        "title": "STEP3：可視化",
        "choices": [
          { "value": "graph", "text": "グラフ確認" },
          { "value": "df", "text": "df" },
          { "value": "dashboard", "text": "ダッシュボード" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["graph", "dashboard"]
      },
      {
        "title": "STEP4：アラーム設定",
        "choices": [
          { "value": "free", "text": "free" },
          { "value": "80", "text": "80%閾値" },
          { "value": "kill", "text": "kill" },
          { "value": "alert", "text": "アラーム設定" }
        ],
        "answers": ["alert", "80"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 41,
    "scenario": "ディスク容量不足を検知したい",
    "status": "突然サービス停止",
    "manual": [
      "① Agent導入",
      "② Diskメトリクス取得",
      "③ 使用率確認",
      "④ アラーム設定"
    ],
    "steps": [
      {
        "title": "STEP1：Agent導入",
        "choices": [
          { "value": "cpu", "text": "CPU" },
          { "value": "agent", "text": "CloudWatch Agent" },
          { "value": "ping", "text": "ping" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["agent"]
      },
      {
        "title": "STEP2：Disk取得",
        "choices": [
          { "value": "disk", "text": "disk_used_percent" },
          { "value": "mem", "text": "mem" },
          { "value": "net", "text": "network" },
          { "value": "rm", "text": "rm" }
        ],
        "answers": ["disk"]
      },
      {
        "title": "STEP3：使用率確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "dashboard", "text": "ダッシュボード" },
          { "value": "df", "text": "df" },
          { "value": "graph", "text": "グラフ" }
        ],
        "answers": ["graph", "dashboard"]
      },
      {
        "title": "STEP4：アラーム設定",
        "choices": [
          { "value": "free", "text": "free" },
          { "value": "80", "text": "80%閾値" },
          { "value": "kill", "text": "kill" },
          { "value": "alert", "text": "アラーム" }
        ],
        "answers": ["alert", "80"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 42,
    "scenario": "CPU高負荷を検知したい",
    "status": "性能劣化が発生",
    "manual": [
      "① メトリクス確認",
      "② CPU選択",
      "③ アラート設定",
      "④ 通知設定"
    ],
    "steps": [
      {
        "title": "STEP1：メトリクス",
        "choices": [
          { "value": "metrics", "text": "Metrics" },
          { "value": "log", "text": "Log" },
          { "value": "df", "text": "df" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["metrics"]
      },
      {
        "title": "STEP2：CPU",
        "choices": [
          { "value": "cpu", "text": "CPU Percentage" },
          { "value": "mem", "text": "Memory" },
          { "value": "net", "text": "Network" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["cpu"]
      },
      {
        "title": "STEP3：アラート",
        "choices": [
          { "value": "alert", "text": "Alertルール" },
          { "value": "kill", "text": "kill" },
          { "value": "80", "text": "80%閾値" },
          { "value": "rm", "text": "rm" }
        ],
        "answers": ["alert", "80"]
      },
      {
        "title": "STEP4：通知",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free" },
          { "value": "action", "text": "ActionGroup" },
          { "value": "mail", "text": "メール" }
        ],
        "answers": ["action", "mail"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 43,
    "scenario": "メモリ枯渇を検知したい",
    "status": "アプリが頻繁に落ちる",
    "manual": [
      "① メトリクス確認",
      "② メモリ選択",
      "③ アラート設定",
      "④ 通知設定"
    ],
    "steps": [
      {
        "title": "STEP1：メトリクス",
        "choices": [
          { "value": "df", "text": "df" },
          { "value": "log", "text": "Log" },
          { "value": "top", "text": "top" },
          { "value": "metrics", "text": "Metrics" }
        ],
        "answers": ["metrics"]
      },
      {
        "title": "STEP2：メモリ",
        "choices": [
          { "value": "ping", "text": "ping" },
          { "value": "cpu", "text": "CPU" },
          { "value": "disk", "text": "Disk" },
          { "value": "mem", "text": "Available Memory" }
        ],
        "answers": ["mem"]
      },
      {
        "title": "STEP3：アラート設定",
        "choices": [
          { "value": "alert", "text": "Alertルール" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" },
          { "value": "20", "text": "残20%" }
        ],
        "answers": ["alert", "20"]
      },
      {
        "title": "STEP4：通知設定",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "mail", "text": "メール" },
          { "value": "action", "text": "ActionGroup" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["action", "mail"]
      }
    ],
    "resultText": ""
  },
 {
    "id": 44,
    "scenario": "ストレージ容量や性能を監視したい",
    "status": "遅延や容量逼迫が発生",
    "manual": [
      "① Insights確認",
      "② メトリクス選択",
      "③ 閾値設定",
      "④ 通知設定"
    ],
    "steps": [
      {
        "title": "STEP1：Insights",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "df", "text": "df" },
          { "value": "insights", "text": "Storage Insights" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["insights"]
      },
      {
        "title": "STEP2：メトリクス",
        "choices": [
          { "value": "capacity", "text": "容量" },
          { "value": "latency", "text": "遅延" },
          { "value": "cpu", "text": "CPU" },
          { "value": "mem", "text": "Memory" }
        ],
        "answers": ["capacity", "latency"]
      },
      {
        "title": "STEP3：閾値設定",
        "choices": [
          { "value": "80", "text": "80%容量" },
          { "value": "kill", "text": "kill" },
          { "value": "rm", "text": "rm" },
          { "value": "alert", "text": "Alert" }
        ],
        "answers": ["80", "alert"]
      },
      {
        "title": "STEP4：通知設定",
        "choices": [
          { "value": "action", "text": "ActionGroup" },
          { "value": "mail", "text": "メール" },
          { "value": "df", "text": "df" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["action", "mail"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 45,
    "scenario": "ZabbixでCPU使用率アラートが発生",
    "status": "CPU高騰アラート通知あり",
    "manual": [
      "① CPUグラフ確認",
      "② プロセス確認",
      "③ 負荷軽減対応",
      "④ ログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：CPU使用率確認",
        "choices": [
          { "value": "df", "text": "df -h" },
          { "value": "uptime", "text": "uptime" },
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["top", "uptime"]
      },
      {
        "title": "STEP2：原因プロセス特定",
        "choices": [
          { "value": "ip", "text": "ip a" },
          { "value": "top", "text": "top" },
          { "value": "ping", "text": "ping" },
          { "value": "ps", "text": "ps aux --sort=-%cpu" }
        ],
        "answers": ["ps", "top"]
      },
      {
        "title": "STEP3：負荷対応",
        "choices": [
          { "value": "mkdir", "text": "mkdir" },
          { "value": "nice", "text": "renice" },
          { "value": "kill", "text": "kill" },
          { "value": "rm", "text": "rm" }
        ],
        "answers": ["kill", "nice"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "log", "text": "/var/log/messages" },
          { "value": "journal", "text": "journalctl" },
          { "value": "df", "text": "df" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["log", "journal"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 46,
    "scenario": "Zabbixでメモリ使用率アラートが発生",
    "status": "メモリ逼迫アラート通知あり",
    "manual": [
      "① メモリ状況確認",
      "② プロセス確認",
      "③ メモリ解放対応",
      "④ ログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：メモリ使用率確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free" },
          { "value": "df", "text": "df -h" },
          { "value": "uptime", "text": "uptime" }
        ],
        "answers": ["top", "uptime"]
      },
      {
        "title": "STEP2：原因プロセス特定",
        "choices": [
          { "value": "ps", "text": "ps aux --sort=-%mem" },
          { "value": "top", "text": "top" },
          { "value": "ping", "text": "ping" },
          { "value": "ip", "text": "ip a" }
        ],
        "answers": ["ps", "top"]
      },
      {
        "title": "STEP3：負荷対応",
        "choices": [
          { "value": "mkdir", "text": "mkdir" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" },
          { "value": "nice", "text": "renice" }
        ],
        "answers": ["kill", "nice"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "log", "text": "/var/log/messages" },
          { "value": "df", "text": "df" },
          { "value": "journal", "text": "journalctl" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["log", "journal"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 47,
    "scenario": "ディスク容量逼迫アラートが発生",
    "status": "/varの使用率が90%以上",
    "manual": [
      "① df -hで容量確認",
      "② du -shで大容量フォルダ特定",
      "③ 不要ファイル削除",
      "④ Zabbixで監視継続"
    ],
    "steps": [
      {
        "title": "STEP1：容量確認",
        "choices": [
          { "value": "chage", "text": "chage" },{
           "value": "df", "text": "df -h" },
          { "value": "ps", "text": "ps" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["df"]
      },
      {
        "title": "STEP2：原因特定",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "ls", "text": "ls -l" },
          { "value": "du", "text": "du -sh" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["du", "ls"]
      },
      {
        "title": "STEP3：不要ファイル削除",
        "choices": [
          { "value": "reboot", "text": "reboot" },
          { "value": "compress", "text": "gzip" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["rm", "compress"]
      },
      {
        "title": "STEP4：監視継続",
        "choices": [
          { "value": "zabbix", "text": "Zabbix確認" },
          { "value": "free", "text": "free" },
          { "value": "top", "text": "top" },
          { "value": "alert", "text": "アラート確認" }
        ],
        "answers": ["zabbix", "alert"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 48,
    "scenario": "不正ログイン対策が必要",
    "status": "脆弱なパスワードのユーザが存在",
    "manual": [
      "① passwdで変更",
      "② chageで期限設定",
      "③ /etc/login.defs確認",
      "④ ログ確認"
    ],
    "steps": [
      {
        "title": "STEP1：パスワード変更",
        "choices": [
          { "value": "systemctl", "text": "systemctl" },
          { "value": "passwd", "text": "passwd" },
          { "value": "top", "text": "top" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["passwd"]
      },
      {
        "title": "STEP2：期限設定",
        "choices": [
          { "value": "chmod", "text": "chmod" },
          { "value": "chage", "text": "chage" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["chage"]
      },
      {
        "title": "STEP3：設定確認",
        "choices": [
          { "value": "free", "text": "free" },
          { "value": "pam", "text": "PAM設定" },
          { "value": "top", "text": "top" },
          { "value": "login", "text": "/etc/login.defs" }
        ],
        "answers": ["login", "pam"]
      },
      {
        "title": "STEP4：ログ確認",
        "choices": [
          { "value": "ps", "text": "ps" },
          { "value": "df", "text": "df" },
          { "value": "log", "text": "/var/log/secure" },
          { "value": "journal", "text": "journalctl" }
        ],
        "answers": ["log", "journal"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 49,
    "scenario": "ファイルにアクセスできない問題が発生",
    "status": "Permission denied エラー",
    "manual": [
      "① ls -lで権限確認",
      "② chmodで権限変更",
      "③ chownで所有者変更",
      "④ 再確認"
    ],
    "steps": [
      {
        "title": "STEP1：ファイル権限確認",
        "choices": [
          { "value": "ls", "text": "ls -l" },
          { "value": "top", "text": "top" },
          { "value": "stat", "text": "stat" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["ls", "stat"]
      },
      {
        "title": "STEP2：権限変更",
        "choices": [
          { "value": "kill", "text": "kill" },
          { "value": "cat", "text": "cat" },
          { "value": "rm", "text": "rm" },
          { "value": "chmod", "text": "chmod" }
        ],
        "answers": ["chmod"]
      },
      {
        "title": "STEP3：所有者変更",
        "choices": [
          { "value": "free", "text": "free" },
          { "value": "id", "text": "id" },
          { "value": "top", "text": "top" },
          { "value": "chown", "text": "chown" }
        ],
        "answers": ["chown"]
      },
      {
        "title": "STEP4：再確認",
        "choices": [
          { "value": "access", "text": "アクセス確認" },
          { "value": "ping", "text": "ping" },
          { "value": "top", "text": "top" },
          { "value": "test", "text": "cat 実行" }
        ],
        "answers": ["access", "test"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 50,
    "scenario": "不審なログイン試行が疑われる",
    "status": "大量のログイン失敗",
    "manual": [
      "① /var/log/secure確認",
      "② grepで失敗ログ抽出",
      "③ journalctlで確認",
      "④ 対応検討"
    ],
    "steps": [
      {
        "title": "STEP1：ログ確認",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "auth", "text": "/var/log/auth.log" },
          { "value": "secure", "text": "/var/log/secure" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["secure", "auth"]
      },
      {
        "title": "STEP2：失敗ログ抽出",
        "choices": [
          { "value": "grep", "text": "grep\"Failed password\"" },
          { "value": "cat", "text": "cat log" },
          { "value": "ps", "text": "ps" },
          { "value": "ping", "text": "ping" }
        ],
        "answers": ["grep", "cat"]
      },
      {
        "title": "STEP3：詳細確認",
        "choices": [
          { "value": "journal", "text": "journalctl" },
          { "value": "top", "text": "top" },
          { "value": "service", "text": "journalctl -u sshd" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["journal", "service"]
      },
      {
        "title": "STEP4：対応",
        "choices": [
          { "value": "df", "text": "df" },
          { "value": "fail2ban", "text": "fail2ban" },
          { "value": "top", "text": "top" },
          { "value": "fw", "text": "FW遮断検討" }
        ],
        "answers": ["fw", "fail2ban"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 51,
    "scenario": "脆弱性対応のためパッチ適用が必要",
    "status": "古いパッケージが存在",
    "manual": [
      "① パッケージ一覧更新",
      "② 更新対象確認",
      "③ パッチ適用",
      "④ 動作確認"
    ],
    "steps": [
      {
        "title": "STEP1：パッケージ更新",
        "choices": [
          { "value": "ps", "text": "ps" },
          { "value": "yumupdate", "text": "yum update" },
          { "value": "aptupdate", "text": "apt update" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["aptupdate", "yumupdate"]
      },
      {
        "title": "STEP2：更新対象確認",
        "choices": [
          { "value": "list", "text": "apt list --upgradable" },
          { "value": "ip", "text": "ip a" },
          { "value": "ping", "text": "ping" },
          { "value": "check", "text": "yum check-update" }
        ],
        "answers": ["list", "check"]
      },
      {
        "title": "STEP3：パッチ適用",
        "choices": [
          { "value": "upgrade", "text": "apt upgrade" },
          { "value": "yum", "text": "yum upgrade" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["upgrade", "yum"]
      },
      {
        "title": "STEP4：動作確認",
        "choices": [
          { "value": "ver", "text": "バージョン確認" },
          { "value": "reboot", "text": "再起動検討" },
          { "value": "top", "text": "top" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["ver", "reboot"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 52,
    "scenario": "不正アクセス防止のため通信制御が必要",
    "status": "不要ポートが開いている",
    "manual": [
      "① 現在ルール確認",
      "② 不要通信遮断",
      "③ 必要通信許可",
      "④ 再確認"
    ],
    "steps": [
      {
        "title": "STEP1：現在ルール確認",
        "choices": [
          { "value": "ps", "text": "ps" },
          { "value": "firewalld", "text": "firewall-cmd --list-all" },
          { "value": "iptables", "text": "iptables -L" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["iptables", "firewalld"]
      },
      {
        "title": "STEP2：通信遮断",
        "choices": [
          { "value": "drop", "text": "DROP設定" },
          { "value": "ping", "text": "ping" },
          { "value": "top", "text": "top" },
          { "value": "deny", "text": "deny設定" }
        ],
        "answers": ["drop", "deny"]
      },
      {
        "title": "STEP3：通信許可",
        "choices": [
          { "value": "allowport", "text": "ポート許可" },
          { "value": "service", "text": "サービス許可" },
          { "value": "top", "text": "top" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["allowport", "service"]
      },
      {
        "title": "STEP4：確認",
        "choices": [
          { "value": "list", "text": "ルール再確認" },
          { "value": "top", "text": "top" },
          { "value": "test", "text": "通信確認" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["list", "test"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 53,
    "scenario": "新入社員が入社したため、Windowsサーバへログインするためのアカウントを作成する",
    "status": "認証・パスワード制御の基本を確認する",
    "manual": [
      "① ユーザ作成",
      "② グループ・権限確認",
      "③ パスワード管理",
      "④ ログイン確認"
    ],
    "steps": [
      {
        "title": "STEP1：ユーザ作成",
        "choices": [
          { "value": "shutdown", "text": "シャットダウン" },
          { "value": "ad", "text": "Active Directoryユーザ作成" },
          { "value": "format", "text": "ディスク初期化" },
          { "value": "local", "text": "ローカルユーザ作成" }
        ],
        "answers": ["local", "ad"]
      },
      {
        "title": "STEP2：グループ・権限確認",
        "choices": [
          { "value": "users", "text": "Usersグループ確認" },
          { "value": "ftp", "text": "FTP公開" },
          { "value": "admins", "text": "Administrators確認" },
          { "value": "telnet", "text": "Telnet有効化" }
        ],
        "answers": ["users", "admins"]
      },
      {
        "title": "STEP3：パスワード管理",
        "choices": [
          { "value": "blank", "text": "空パスワード許可" },
          { "value": "share", "text": "共有アカウント利用" },
          { "value": "strong", "text": "複雑なパスワード設定" },
          { "value": "policy", "text": "パスワードポリシー確認" }
        ],
        "answers": ["strong", "policy"]
      },
      {
        "title": "STEP4：ログイン確認",
        "choices": [
          { "value": "format", "text": "format" },
          { "value": "event", "text": "イベントログ確認" },
          { "value": "login", "text": "ログインテスト" },
          { "value": "delete", "text": "OS削除" }
        ],
        "answers": ["login", "event"]
      }
    ],
    "resultText": "ユーザ作成 → 権限設定 → パスワード管理 → ログイン確認"
  },
  {
    "id": 54,
    "scenario": "共有フォルダの権限を適切に制御する",
    "status": "誰でもアクセス可能になっている",
    "manual": [
      "① 権限確認",
      "② 不要権限削除",
      "③ 必要権限付与",
      "④ 動作確認"
    ],
    "steps": [
      {
        "title": "STEP1：確認",
        "choices": [
          { "value": "icacls", "text": "icacls フォルダ" },
          { "value": "dir", "text": "dir" },
          { "value": "ping", "text": "ping" },
          { "value": "who", "text": "whoami" }
        ],
        "answers": ["icacls"]
      },
      {
        "title": "STEP2：権限削除",
        "choices": [
          { "value": "ls", "text": "ls" },
          { "value": "deny", "text": "icacls /deny" },
          { "value": "top", "text": "top" },
          { "value": "remove", "text": "icacls /remove" }
        ],
        "answers": ["remove", "deny"]
      },
      {
        "title": "STEP3：権限付与",
        "choices": [
          { "value": "grant", "text": "icacls /grant" },
          { "value": "owner", "text": "icacls /setowner" },
          { "value": "free", "text": "free" },
          { "value": "ps", "text": "ps" }
        ],
        "answers": ["grant", "owner"]
      },
      {
        "title": "STEP4：確認",
        "choices": [
          { "value": "check", "text": "再確認" },
          { "value": "test", "text": "アクセス確認" },
          { "value": "top", "text": "top" },
          { "value": "df", "text": "df" }
        ],
        "answers": ["check", "test"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 55,
    "scenario": "Windowsサーバで不正ログオンの疑いがある。イベントログから原因を調査する",
    "status": "深夜帯にログオン失敗が大量発生している。",
    "manual": [
      "① イベントビューアでセキュリティログを確認",
      "② ログオン失敗(Event ID 4625)を確認",
      "③ 発生元IP・アカウント・発生時刻を調査",
      "④ 不審アクセスかどうか判断"
    ],
    "steps": [
      {
        "title": "STEP1：確認するログ",
        "choices": [
          { "value": "security", "text": "セキュリティログ" },
          { "value": "system", "text": "システムログ" },
          { "value": "app", "text": "アプリケーションログ" },
          { "value": "setup", "text": "セットアップログ" }
        ],
        "answers": ["security"]
      },
      {
        "title": "STEP2：ログオン失敗イベントID",
        "choices": [
          { "value": "4625", "text": "4625" },
          { "value": "4624", "text": "4624" },
          { "value": "6005", "text": "6005" },
          { "value": "1074", "text": "1074" }
        ],
        "answers": ["4625"]
      },
      {
        "title": "STEP3：調査対象",
        "choices": [
          { "value": "ip", "text": "送信元IP" },
          { "value": "user", "text": "アカウント名" },
          { "value": "wallpaper", "text": "壁紙設定" },
          { "value": "time", "text": "発生時刻" }
        ],
        "answers": ["ip", "user", "time"]
      },
      {
        "title": "STEP4：不審アクセス判断材料",
        "choices": [
          { "value": "success", "text": "通常ログオン成功" },
          { "value": "repeat", "text": "同一IPから連続試行" },
          { "value": "midnight", "text": "深夜の大量失敗" },
          { "value": "theme", "text": "テーマ変更" }
        ],
        "answers": ["midnight", "repeat"]
      }
    ],
    "resultText": "(Security Log) → (4625) → (IP/ユーザ/時刻確認) → (不審アクセス判定)"
  },
 {
    "id": 56,
    "scenario": "Windowsサーバに重要なセキュリティ更新が未適用で脆弱性が指摘されている",
    "status": "Windows Updateの適用状況を確認し更新を実施する",
    "manual": [
      "① 更新履歴確認",
      "② Windows Update適用確認",
      "③ 更新プログラム適用",
      "④ 再起動後に適用確認"
    ],
    "steps": [
      {
        "title": "STEP1：更新確認ツール",
        "choices": [
          { "value": "wu", "text": "Windows Update" },
          { "value": "paint", "text": "Paint" },
          { "value": "calc", "text": "電卓" },
          { "value": "note", "text": "メモ帳" }
        ],
        "answers": ["wu"]
      },
      {
        "title": "STEP2：確認項目",
        "choices": [
          { "value": "history", "text": "更新履歴" },
          { "value": "wall", "text": "壁紙" },
          { "value": "pending", "text": "未適用更新" },
          { "value": "theme", "text": "テーマ" }
        ],
        "answers": ["history", "pending"]
      },
      {
        "title": "STEP3：更新後に必要な作業",
        "choices": [
          { "value": "delete", "text": "削除" },
          { "value": "shutdown", "text": "電源断のみ" },
          { "value": "format", "text": "初期化" },
          { "value": "reboot", "text": "再起動" }
        ],
        "answers": ["reboot"]
      },
      {
        "title": "STEP4：適用確認方法",
        "choices": [
          { "value": "history", "text": "更新履歴確認" },
          { "value": "color", "text": "色確認" },
          { "value": "img", "text": "画像確認" },
          { "value": "kb", "text": "KB番号確認" }
        ],
        "answers": ["history", "kb"]
      }
    ],
    "resultText": "(Windows Update)→(更新確認)→(再起動)→(適用確認)"
  },
  {
    "id": 57,
    "scenario": "共有フォルダに不要なアクセス権が付与されている",
    "status": "適切なアクセス権へ修正する",
    "manual": [
      "① セキュリティ設定確認",
      "② NTFS権限修正",
      "③ 動作確認",
      "④ 最小権限の原則に基づいて権限付与"
    ],
    "steps": [
      {
        "title": "STEP1：設定確認",
        "choices": [
          { "value": "sec", "text": "セキュリティタブ" },
          { "value": "display", "text": "画面設定" },
          { "value": "sound", "text": "サウンド" },
          { "value": "date", "text": "日付設定" }
        ],
        "answers": ["sec"]
      },
      {
        "title": "STEP2：削除対象になりやすい権限",
        "choices": [
          { "value": "admin", "text": "管理者権限" },
          { "value": "user", "text": "業務ユーザ読取" },
          { "value": "everyone", "text": "Everyone フルコントロール" },
          { "value": "backup", "text": "バックアップ権限" }
        ],
        "answers": ["everyone"]
      },
      {
        "title": "STEP3：動作確認",
        "choices": [
          { "value": "test", "text": "アクセス確認" },
          { "value": "format", "text": "初期化" },
          { "value": "delete", "text": "削除" },
          { "value": "move", "text": "移動" }
        ],
        "answers": ["test"]
      },
      {
        "title": "STEP4：最小権限の原則",
        "choices": [
          { "value": "all", "text": "全員に管理者権限" },
          { "value": "min", "text": "必要最小限の権限付与" },
          { "value": "free", "text": "制限なし" },
          { "value": "guest", "text": "Guest許可" }
        ],
        "answers": ["min"]
      }
    ],
    "resultText": "(権限確認)→(不要権限削除)→(アクセス確認)→(最小権限)"
  },
  {
    "id": 58,
    "scenario": "顧客へシステム構成を説明する",
    "status": "Web3層構成の役割を回答する",
    "manual": [
      "①Webサーバの役割確認",
      "②APサーバの役割確認",
      "③DBサーバの役割確認",
      "④通信順序の説明"
    ],
    "steps": [
      {
        "title": "STEP1：Webサーバの役割",
        "choices": [
          { "value": "d", "text": "バックアップのみ" },
          { "value": "b", "text": "DB保存" },
          { "value": "c", "text": "印刷" },
          { "value": "a", "text": "HTTP受付" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP2：APサーバの役割",
        "choices": [
          { "value": "b", "text": "電源供給" },
          { "value": "a", "text": "業務処理" },
          { "value": "c", "text": "DNS権威" },
          { "value": "d", "text": "画面設定" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP3：DBサーバの役割",
        "choices": [
          { "value": "a", "text": "データ保存" },
          { "value": "b", "text": "メール送信専用" },
          { "value": "c", "text": "画面表示" },
          { "value": "d", "text": "FW設定" }
        ],
        "answers": ["a"]
      },
      {
        "title": "STEP4：通信順序",
        "choices": [
          { "value": "a", "text": "Web→AP→DB" },
          { "value": "b", "text": "DB→Web→AP" },
          { "value": "c", "text": "AP→DB→Web" },
          { "value": "d", "text": "DB→AP→Web" }
        ],
        "answers": ["a"]
      }
    ],
    "resultText": ""
  },
  {
    "id": 59,
    "scenario": "ECサイトを24時間稼働させる必要があるため、単一障害点を減らす設計を選択する",
    "status": "可用性向上が求められている",
    "manual": [
      "① Web冗長化を検討",
      "② DB冗長化を検討",
      "③ NW冗長化を検討",
      "④ 単一障害点"
    ],
    "steps": [
      {
        "title": "STEP1：Web冗長化",
        "choices": [
          { "value": "stop", "text": "停止運用" },
          { "value": "single", "text": "1台のみ" },
          { "value": "local", "text": "ローカル保存のみ" },
          { "value": "lb", "text": "ロードバランサ配下で複数台" }
        ],
        "answers": ["lb"]
      },
      {
        "title": "STEP2：DB冗長化",
        "choices": [
          { "value": "none", "text": "未実施" },
          { "value": "single", "text": "単一DB" },
          { "value": "csv", "text": "CSV保管" },
          { "value": "rep", "text": "レプリケーション構成" }
        ],
        "answers": ["rep"]
      },
      {
        "title": "STEP3：NW冗長化",
        "choices": [
          { "value": "dual", "text": "回線二重化" },
          { "value": "one", "text": "単一回線" },
          { "value": "wifi", "text": "Wi‑Fiのみ" },
          { "value": "off", "text": "考慮なし" }
        ],
        "answers": ["dual"]
      },
      {
        "title": "STEP4：単一障害点",
        "choices": [
          { "value": "ignore", "text": "無視する" },
          { "value": "remove", "text": "SPOF排除を確認" },
          { "value": "cost", "text": "コストのみ確認" },
          { "value": "user", "text": "利用者依存" }
        ],
        "answers": ["remove"]
      }
    ],
    "resultText": "Web → DB → NW → SPOF確認"
  },
  {
    "id": 60,
    "scenario": "クラウド利用料を見直し、無駄なコストを削減したい",
    "status": "月額費用の最適化が必要",
    "manual": [
      "① 利用状況確認",
      "② リソースサイズ最適化",
      "③ 未使用リソース削除",
      "④ 予約・割引制度確認"
    ],
    "steps": [
      {
        "title": "STEP1：利用状況確認",
        "choices": [
          { "value": "fix", "text": "固定設定" },
          { "value": "guess", "text": "推測で判断" },
          { "value": "ignore", "text": "未確認" },
          { "value": "monitor", "text": "利用率確認" }
        ],
        "answers": ["monitor"]
      },
      {
        "title": "STEP2：サイズ最適化",
        "choices": [
          { "value": "right", "text": "適正サイズへ変更" },
          { "value": "max", "text": "常に最大構成" },
          { "value": "dup", "text": "重複作成" },
          { "value": "none", "text": "未実施" }
        ],
        "answers": ["right"]
      },
      {
        "title": "STEP3：不要リソース",
        "choices": [
          { "value": "delete", "text": "削除する" },
          { "value": "keep", "text": "全て保持" },
          { "value": "copy", "text": "複製する" },
          { "value": "hide", "text": "隠す" }
        ],
        "answers": ["delete"]
      },
      {
        "title": "STEP4：割引活用",
        "choices": [
          { "value": "manual", "text": "手動のみ" },
          { "value": "ondemand", "text": "常にオンデマンド" },
          { "value": "ignore", "text": "無視する" },
          { "value": "reserve", "text": "予約/長期割引活用" }
        ],
        "answers": ["reserve"]
      }
    ],
    "resultText": "利用確認 → 適正化 → 削除 → 割引活用"
  },
  {
    "id": 61,
    "scenario": "新システム基盤を選定するため、各構成案のメリット・デメリットを比較する必要がある",
    "status": "最適な構成を説明する",
    "manual": [
      "① 比較対象を整理",
      "② 性能・可用性を比較",
      "③ コストを比較",
      "④ 要件に最適な案を選定"
    ],
    "steps": [
      {
        "title": "STEP1：比較準備",
        "choices": [
          { "value": "skip", "text": "比較しない" },
          { "value": "random", "text": "ランダム選択" },
          { "value": "req", "text": "要件整理" },
          { "value": "none", "text": "資料なし" }
        ],
        "answers": ["req"]
      },
      {
        "title": "STEP2：性能・可用性比較",
        "choices": [
          { "value": "perf", "text": "性能と可用性を比較" },
          { "value": "color", "text": "色で比較" },
          { "value": "name", "text": "名前で比較" },
          { "value": "owner", "text": "担当者で比較" }
        ],
        "answers": ["perf"]
      },
      {
        "title": "STEP3：コスト比較",
        "choices": [
          { "value": "ignore", "text": "コスト無視" },
          ,{ "value": "cost", "text": "導入・運用コスト比較" },
          { "value": "guess", "text": "推測のみ" },
          { "value": "user", "text": "利用者数のみ" }
        ],
        "answers": ["cost"]
      },
      {
        "title": "STEP4：最終選定",
        "choices": [
          { "value": "cheap", "text": "最安案のみ選択" },
          { "value": "best", "text": "要件に最適な案を選択" },
          { "value": "famous", "text": "有名な製品を選択" },
          { "value": "random", "text": "抽選で決定" }
        ],
        "answers": ["best"]
      }
    ],
    "resultText": "要件整理 → 性能・可用性比較 → コスト比較 → 最適案選定"
  },
  {
    "id": 62,
    "scenario": "Linuxサーバ10台へ同一コマンドを実行したい。効率的な実施方法を選択する",
    "status": "複数台へ一括実行が必要",
    "manual": [
      "① SSH接続確認",
      "② 複数ホストへの一括実行方式選定",
      "③ 実行結果確認",
      "④ エラー確認"
    ],
    "steps": [
      {
        "title": "STEP1：接続方式",
        "choices": [
          { "value": "ssh", "text": "SSH" },
          { "value": "rdp", "text": "RDP" },
          { "value": "ftp", "text": "FTP" },
          { "value": "smtp", "text": "SMTP" }
        ],
        "answers": ["ssh"]
      },
      {
        "title": "STEP2：一括実行",
        "choices": [
          { "value": "excel", "text": "Excel" },
          { "value": "pssh", "text": "pssh" },
          { "value": "for", "text": "for文+ssh" },
          { "value": "paint", "text": "Paint" }
        ],
        "answers": ["for", "pssh"]
      },
      {
        "title": "STEP3：結果確認",
        "choices": [
          { "value": "stdout", "text": "標準出力確認" },
          { "value": "reboot", "text": "再起動" },
          { "value": "log", "text": "ログ出力確認" },
          { "value": "format", "text": "フォーマット" }
        ],
        "answers": ["stdout", "log"]
      },
      {
        "title": "STEP4：エラー確認",
        "choices": [
          { "value": "mouse", "text": "マウス設定" },
          { "value": "perm", "text": "権限エラー" },
          { "value": "wall", "text": "壁紙設定" },
          { "value": "ssherr", "text": "SSH接続エラー" }
        ],
        "answers": ["ssherr", "perm"]
      }
    ],
    "resultText": "SSH → 一括実行 → 結果確認 → エラー確認"
  },
  {
    "id": 63,
    "scenario": "Windowsサーバ10台へ同一コマンドを実行したい。効率的な実施方法を選択する",
    "status": "複数台へ一括実行が必要",
    "manual": [
      "① 接続方法確認",
      "② PowerShell活用",
      "③ 実行結果確認",
      "④ エラー確認"
    ],
    "steps": [
      {
        "title": "STEP1：接続方式",
        "choices": [
          { "value": "http", "text": "HTTP" },
          { "value": "rdp", "text": "RDP" },
          { "value": "ftp", "text": "FTP" },
          { "value": "winrm", "text": "WinRM" }
        ],
        "answers": ["winrm", "rdp"]
      },
      {
        "title": "STEP2：一括実行",
        "choices": [
          { "value": "invoke", "text": "Invoke-Command" },
          { "value": "pssession", "text": "PSSession" },
          { "value": "notepad", "text": "Notepad" },
          { "value": "calc", "text": "Calc" }
        ],
        "answers": ["invoke", "pssession"]
      },
      {
        "title": "STEP3：結果確認",
        "choices": [
          { "value": "bgm", "text": "BGM設定" },
          { "value": "theme", "text": "テーマ変更" },
          { "value": "event", "text": "イベントログ確認" },
          { "value": "output", "text": "出力結果確認" }
        ],
        "answers": ["output", "event"]
      },
      {
        "title": "STEP4：エラー確認",
        "choices": [
          { "value": "auth", "text": "認証エラー" },
          { "value": "font", "text": "フォント設定" },
          { "value": "firewall", "text": "Firewall設定" },
          { "value": "display", "text": "画面設定" }
        ],
        "answers": ["auth", "firewall"]
      }
    ],
    "resultText": "WinRM/PowerShell → 一括実行 → 結果確認 → エラー確認"
  },
  {
    "id": 64,
    "scenario": "Linuxサーバの日次ログバックアップ処理を自動化したい",
    "status": "定期運用作業の自動化が必要",
    "manual": [
      "① シェルスクリプト作成",
      "② 実行権限付与",
      "③ cron登録",
      "④ 実行結果確認"
    ],
    "steps": [
      {
        "title": "STEP1：作成",
        "choices": [
          { "value": "bat", "text": "BATファイル" },
          { "value": "sh", "text": "シェルスクリプト" },
          { "value": "xls", "text": "Excel" },
          { "value": "ppt", "text": "PowerPoint" }
        ],
        "answers": ["sh"]
      },
      {
        "title": "STEP2：実行権限",
        "choices": [
          { "value": "del", "text": "rm" },
          { "value": "chown", "text": "chown" },
          { "value": "chmod", "text": "chmod +x" },
          { "value": "mkfs", "text": "mkfs" }
        ],
        "answers": ["chmod"]
      },
      {
        "title": "STEP3：定期実行",
        "choices": [
          { "value": "cron", "text": "crontab" },
          { "value": "ping", "text": "ping" },
          { "value": "at", "text": "at" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["cron", "at"]
      },
      {
        "title": "STEP4：結果確認",
        "choices": [
          { "value": "wall", "text": "壁紙変更" },
          { "value": "file", "text": "バックアップファイル確認" },
          { "value": "log", "text": "ログ確認" },
          { "value": "mouse", "text": "マウス設定" }
        ],
        "answers": ["log", "file"]
      }
    ],
    "resultText": "シェルスクリプト → 権限付与 → Cron → 確認"
  },
  {
    "id": 65,
    "scenario": "Windowsサーバの日次ログ収集処理を自動化したい",
    "status": "定期運用作業の自動化が必要",
    "manual": [
      "① PowerShell作成",
      "② 実行ポリシー確認",
      "③ タスクスケジューラ設定",
      "④ 結果確認"
    ],
    "steps": [
      {
        "title": "STEP1：スクリプト作成",
        "choices": [
          { "value": "excel", "text": "Excel" },
          { "value": "bash", "text": "Bash" },
          { "value": "ps", "text": "PowerShell" },
          { "value": "paint", "text": "Paint" }
        ],
        "answers": ["ps"]
      },
      {
        "title": "STEP2：実行設定",
        "choices": [
          { "value": "exec", "text": "ExecutionPolicy" },
          { "value": "sign", "text": "署名確認" },
          { "value": "theme", "text": "テーマ変更" },
          { "value": "font", "text": "フォント変更" }
        ],
        "answers": ["exec", "sign"]
      },
      {
        "title": "STEP3：定期実行",
        "choices": [
          { "value": "task", "text": "タスクスケジューラ" },
          { "value": "notepad", "text": "Notepad" },
          { "value": "calc", "text": "Calc" },
          { "value": "schtasks", "text": "schtasks" }
        ],
        "answers": ["task", "schtasks"]
      },
      {
        "title": "STEP4：結果確認",
        "choices": [
          { "value": "bg", "text": "背景設定" },
          { "value": "file", "text": "出力ファイル確認" },
          { "value": "disp", "text": "画面設定" },
          { "value": "log", "text": "ログ確認" }
        ],
        "answers": ["log", "file"]
      }
    ],
    "resultText": "PowerShell → 実行設定 → タスクスケジューラ → 確認"
  },
  {
    "id": 66,
    "scenario": "AWS上にVPCとEC2をTerraformで構築したい",
    "status": "IaCによる環境構築が必要",
    "manual": [
      "① Provider設定",
      "② VPC定義",
      "③ EC2定義",
      "④ terraform applyを実行してデプロイ"
    ],
    "steps": [
      {
        "title": "STEP1：AWS接続設定",
        "choices": [
          { "value": "excel", "text": "Excel" },
          { "value": "region", "text": "リージョン設定" },
          { "value": "provider", "text": "provider aws" },
          { "value": "word", "text": "Word" }
        ],
        "answers": ["provider", "region"]
      },
      {
        "title": "STEP2：ネットワーク構築",
        "choices": [
          { "value": "calc", "text": "Calc" },
          { "value": "subnet", "text": "サブネット" },
          { "value": "paint", "text": "Paint" },
          { "value": "vpc", "text": "VPC" }
        ],
        "answers": ["vpc", "subnet"]
      },
      {
        "title": "STEP3：サーバ構築",
        "choices": [
          { "value": "ec2", "text": "EC2インスタンス" },
          { "value": "ppt", "text": "PowerPoint" },
          { "value": "sg", "text": " セキュリティグループ" },
          { "value": "mail", "text": "Mail" }
        ],
        "answers": ["ec2", "sg"]
      },
      {
        "title": "STEP4：デプロイ",
        "choices": [
          { "value": "reboot", "text": "reboot" },
          { "value": "format", "text": "format c:" },
          { "value": "init", "text": "terraform init" },
          { "value": "apply", "text": "terraform apply" }
        ],
        "answers": ["init", "apply"]
      }
    ],
    "resultText": "Provider → VPC → EC2 → Apply"
  },
  {
    "id": 67,
    "scenario": "Azure上にVNetとVMをTerraformで構築したい",
    "status": "IaCによる環境構築が必要",
    "manual": [
      "① Azure Provider設定",
      "② VNet定義",
      "③ VM定義",
      "④ terraform applyを実行してデプロイ"
    ],
    "steps": [
      {
        "title": "STEP1：Azure接続設定",
        "choices": [
          { "value": "provider", "text": "azurerm provider" },
          { "value": "word", "text": "Word" },
          { "value": "excel", "text": "Excel" },
          { "value": "subs", "text": "subscription設定" }
        ],
        "answers": ["provider", "subs"]
      },
      {
        "title": "STEP2：ネットワーク構築",
        "choices": [
          { "value": "paint", "text": "Paint" },
          { "value": "calc", "text": "Calc" },
          { "value": "vnet", "text": "azurerm_virtual_network" },
          { "value": "subnet", "text": "azurerm_subnet" }
        ],
        "answers": ["vnet", "subnet"]
      },
      {
        "title": "STEP3：VM構築",
        "choices": [
          { "value": "ppt", "text": "PowerPoint" },
          { "value": "nic", "text": "Network Interface" },
          { "value": "vm", "text": "azurerm_linux_virtual_machine" },
          { "value": "mail", "text": "Mail" }
        ],
        "answers": ["vm", "nic"]
      },
      {
        "title": "STEP4：デプロイ",
        "choices": [
          { "value": "init", "text": "terraform init" },
          { "value": "reboot", "text": "reboot" },
          { "value": "apply", "text": "terraform apply" },
          { "value": "format", "text": "format c:" }
        ],
        "answers": ["init", "apply"]
      }
    ],
    "resultText": "Provider → VNet → VM → Apply"
  },
  {
    "id": 68,
    "scenario": "複数Linuxサーバへユーザ作成とSSH設定を自動適用したい",
    "status": "Ansible管理サーバあり",
    "manual": [
      "① inventory確認",
      "② ansible all -m pingで疎通確認",
      "③ playbook作成",
      "④ ansible-playbook実行"
    ],
    "steps": [
      {
        "title": "STEP1：対象ホスト定義",
        "choices": [
          { "value": "df", "text": "df -h" },
          { "value": "httpd", "text": "httpd.conf" },
          { "value": "inventory", "text": "inventory" },
          { "value": "fstab", "text": "fstab" }
        ],
        "answers": ["inventory"]
      },
      {
        "title": "STEP2：疎通確認",
        "choices": [
          { "value": "play", "text": "ansible-playbook" },
          { "value": "ping", "text": "ansible all -m ping" },
          { "value": "tr", "text": "traceroute" },
          { "value": "top", "text": "top" }
        ],
        "answers": ["ping"]
      },
      {
        "title": "STEP3：設定定義",
        "choices": [
          { "value": "yml", "text": "playbook(yml)" },
          { "value": "bat", "text": "bat" },
          { "value": "exe", "text": "exe" },
          { "value": "rpm", "text": "rpm" }
        ],
        "answers": ["yml"]
      },
      {
        "title": "STEP4：配布実行",
        "choices": [
          { "value": "run", "text": "ansible-playbook" },
          { "value": "reboot", "text": "reboot" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["run"]
      }
    ],
    "resultText": "inventory → ping → playbook → ansible-playbook"
  },
  {
    "id": 69,
    "scenario": "複数のLinuxサーバへApache(httpd)をAnsibleで展開したい",
    "status": "ミドルウェア自動導入作業",
    "manual": [
      "① inventory確認",
      "② playbook作成",
      "③ packageモジュールでhttpd導入",
      "④ serviceモジュールで起動・自動起動設定"
    ],
    "steps": [
      {
        "title": "STEP1：対象サーバ定義",
        "choices": [
          { "value": "inv", "text": "inventory" },
          { "value": "df", "text": "df -h" },
          { "value": "ping", "text": "ping" },
          { "value": "free", "text": "free" }
        ],
        "answers": ["inv"]
      },
      {
        "title": "STEP2：Playbook作成",
        "choices": [
          { "value": "play", "text": "playbook.yml" },
          { "value": "rm", "text": "rm" },
          { "value": "hosts", "text": "hosts指定" },
          { "value": "useradd", "text": "useradd" }
        ],
        "answers": ["play", "hosts"]
      },
      {
        "title": "STEP3：httpd導入",
        "choices": [
          { "value": "pkg", "text": "package/yum/apt" },
          { "value": "reboot", "text": "reboot" },
          { "value": "kill", "text": "kill" },
          { "value": "httpd", "text": "httpd" }
        ],
        "answers": ["pkg", "httpd"]
      },
      {
        "title": "STEP4：サービス起動",
        "choices": [
          { "value": "top", "text": "top" },
          { "value": "enable", "text": "enabled=yes" },
          { "value": "service", "text": "service module" },
          { "value": "ls", "text": "ls" }
        ],
        "answers": ["service", "enable"]
      }
    ],
    "resultText": "inventory → playbook → package(httpd) → service"
  },
 {
    "id": 70,
    "scenario": "複数のWindowsサーバへ共通設定を自動適用したい",
    "status": "Windows設定自動化",
    "manual": [
      "① inventory設定",
      "② Playbook準備",
      "③ win_feature等で設定投入",
      "④ 実行結果確認"
    ],
    "steps": [
      {
        "title": "STEP1：接続準備",
        "choices": [
          { "value": "df", "text": "df -h" },
          { "value": "fstab", "text": "fstab" },
          { "value": "inv", "text": "inventory" },
          { "value": "winrm", "text": "WinRM" }
        ],
        "answers": ["inv", "winrm"]
      },
      {
        "title": "STEP2：Playbook準備",
        "choices": [
          { "value": "play", "text": "playbook.yml" },
          { "value": "grep", "text": "grep" },
          { "value": "hosts", "text": "hosts指定" },
          { "value": "chmod", "text": "chmod" }
        ],
        "answers": ["play", "hosts"]
      },
      {
        "title": "STEP3：設定適用",
        "choices": [
          { "value": "feature", "text": "win_feature" },
          { "value": "user", "text": "win_user" },
          { "value": "rm", "text": "rm" },
          { "value": "kill", "text": "kill" }
        ],
        "answers": ["feature", "user"]
      },
      {
        "title": "STEP4：結果確認",
        "choices": [
          { "value": "ansible", "text": "ansible-playbook結果" },
          { "value": "top", "text": "top" },
          { "value": "event", "text": "イベントログ" },
          { "value": "mount", "text": "mount" }
        ],
        "answers": ["ansible", "event"]
      }
    ],
    "resultText": "WinRM → Playbook → Windows設定 → 結果確認"
  }
];