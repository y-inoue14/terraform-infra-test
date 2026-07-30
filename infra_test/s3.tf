########################################
# 静的サイト用S3
########################################

resource "aws_s3_bucket" "site" {
  bucket = "infra-test-2026-isbb-osaka"
}

resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id

  depends_on = [
    aws_s3_bucket_public_access_block.site
  ]

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = "*"

        Action = [
          "s3:GetObject"
        ]

        Resource = [
          "${aws_s3_bucket.site.arn}/*"
        ]
      }
    ]
  })
}

########################################
# staticフォルダを自動アップロード
########################################

locals {
  static_files = fileset("${path.module}/static", "**")
}

resource "aws_s3_object" "static" {

  for_each = local.static_files

  bucket = aws_s3_bucket.site.id

  key = each.value

  source = "${path.module}/static/${each.value}"

  etag = filemd5("${path.module}/static/${each.value}")

  content_type = lookup(
    {
      html = "text/html"
      js   = "application/javascript"
      css  = "text/css"
      json = "application/json"
      png  = "image/png"
      jpg  = "image/jpeg"
      jpeg = "image/jpeg"
      svg  = "image/svg+xml"
    },
    reverse(split(".", each.value))[0],
    "binary/octet-stream"
  )
}

########################################
# CSV保存用S3
########################################

resource "aws_s3_bucket" "storage" {
  bucket = "infra-test-2026-isbb-osaka-storage"
}

resource "aws_s3_bucket_cors_configuration" "storage" {

  bucket = aws_s3_bucket.storage.id

  cors_rule {

    allowed_methods = [
      "PUT",
      "GET",
      "HEAD"
    ]

    allowed_headers = [
      "*"
    ]

    allowed_origins = [
      aws_s3_bucket_website_configuration.site.website_endpoint
    ]

    expose_headers = [
      "ETag"
    ]

    max_age_seconds = 3000
  }
}