"""
Lambda関数URL（API Gatewayなし）として動かす、署名付きURLのオンデマンド発行API。

環境変数：
  BUCKET_NAME    ... 結果保存用のS3バケット名（アプリ本体を置くバケットとは分離。例: infra-test-2026-isbb-storage）
  EXPIRES_HOURS  ... 発行するURLの有効期限（時間、既定48）

実行ロールに必要な権限：
  s3:PutObject（対象バケットの results/* に対して）

リクエスト：
  ① 疎通確認（アクセスリクエスト時）： GET/POST ?id=山田太郎
     → S3への署名は発行せず、idの形式チェックのみ行って {"ok": true, "id": "山田太郎"} を返す
  ② 結果アップロード用URL発行（1問完了ごと）： GET/POST ?id=山田太郎&qid=5
     → その問題専用の一意なキー（results/{id}_{qid}_{タイムスタンプ}.csv）に対する
       署名付きPUT URLを発行して返す

  - id は実施者名（日本語氏名を想定。英数字も可）
  - スペース（半角/全角、先頭・末尾・途中すべて）の除去はLambda側でも行う
    （フロントエンド側の正規化とは独立に、直接APIを叩かれた場合でも表記ゆれが起きないようにするため）
  - 署名付きURLは発行された時点の1つのキーに固定される。1問ごとに別ファイルへ保存するには、
    問題を完了するたびにこのAPIを呼び、その都度新しいキー・新しいURLを取得する必要がある
    （同じURLを使い回すと同じファイルに上書きされてしまうため）
  - 名簿・データベースは持たない。受け取った名前・問題番号からキーを計算して返すだけの
    ステートレスな処理

レスポンス（JSON）：
  ①のとき： { "ok": true, "id": "山田太郎" }
  ②のとき： { "putUrl": "...", "id": "山田太郎", "qid": "5", "key": "results/...", "expiresHours": 48 }
"""

import json
import os
import re
from datetime import datetime, timezone

import boto3

s3 = boto3.client("s3")
BUCKET = os.environ["BUCKET_NAME"]
EXPIRES_HOURS = int(os.environ.get("EXPIRES_HOURS", "48"))

# 実施者名として許容する文字セット（英数字・ひらがな・カタカナ・漢字・長音符・アンダースコア・ハイフン）
VALID_ID_PATTERN = re.compile(r"^[0-9A-Za-zぁ-んァ-ヶ一-龠ー_-]{1,100}$")
# 問題番号として許容する文字セット（数字のみ）
VALID_QID_PATTERN = re.compile(r"^[0-9]{1,10}$")


def cors_headers():
    return {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "*",
    }


def respond(status, body_dict):
    return {
        "statusCode": status,
        "body": json.dumps(body_dict, ensure_ascii=False),
    }


def normalize_id(raw: str) -> str:
    """スペース（半角/全角、先頭・末尾・途中すべて）を除去する（表記ゆれ対策）"""
    return re.sub(r"\s+", "", raw or "")


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    params = event.get("queryStringParameters") or {}
    pid = normalize_id(params.get("id") or "")
    qid = (params.get("qid") or "").strip()

    if not pid:
        return respond(400, {"error": "id is required"})
    if not VALID_ID_PATTERN.match(pid):
        return respond(400, {"error": "invalid id format"})

    # qid が無い場合は「アクセスをリクエスト」時の疎通確認のみ。S3への署名は発行しない。
    if not qid:
        return respond(200, {"ok": True, "id": pid})

    if not VALID_QID_PATTERN.match(qid):
        return respond(400, {"error": "invalid qid format"})

    # 問題ごと・送信ごとに一意なキーを生成する（同じ問題を再送信しても上書きされない）
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%f")
    key = f"results/{pid}/{pid}_{qid}_{timestamp}.csv"
    expires_seconds = EXPIRES_HOURS * 3600

    put_url = s3.generate_presigned_url(
        ClientMethod="put_object",
        Params={"Bucket": BUCKET, "Key": key, "ContentType": "text/csv"},
        ExpiresIn=expires_seconds,
    )

    return respond(200, {"putUrl": put_url, "id": pid, "qid": qid, "key": key, "expiresHours": EXPIRES_HOURS})