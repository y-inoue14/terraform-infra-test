locals {
  static_files = fileset("${path.module}/static", "**")
}

resource "aws_s3_object" "static" {

  for_each = local.static_files

  bucket = aws_s3_bucket.site.id

  key = each.value

  source = "${path.module}/static/${each.value}"

  etag = filemd5("${path.module}/static/${each.value}")

}