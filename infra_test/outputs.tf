output "website_bucket" {
  value = aws_s3_bucket.website.bucket
}

output "storage_bucket" {
  value = aws_s3_bucket.storage.bucket
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "lambda_function_url" {
  value = aws_lambda_function_url.issue_url.function_url
}