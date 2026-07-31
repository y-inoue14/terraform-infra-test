#####################################
# Lambda ZIP
#####################################

data "archive_file" "lambda_zip" {

  type = "zip"

  source_dir = "${path.module}/lambda"

  output_path = "${path.module}/lambda.zip"

}

#####################################
# Lambda Function
#####################################

resource "aws_lambda_function" "issue_url" {

  function_name = "infra-test-2026-issue-url"

  filename = data.archive_file.lambda_zip.output_path

  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  role = aws_iam_role.lambda_role.arn

  handler = "issue_url.handler"

  runtime = "python3.12"

  timeout = 10

  environment {

    variables = {

      BUCKET_NAME   = aws_s3_bucket.storage.bucket

      EXPIRES_HOURS = "48"

    }

  }

}

#####################################
# Lambda Function URL
#####################################

resource "aws_lambda_function_url" "issue_url" {

  function_name = aws_lambda_function.issue_url.function_name

  authorization_type = "NONE"

  cors {

    allow_origins = [
      aws_s3_bucket_website_configuration.website.website_endpoint == "" ?
      "*" :
      "http://${aws_s3_bucket_website_configuration.website.website_endpoint}"
    ]

    allow_methods = [
      "GET",
      "POST"
    ]

    allow_headers = [
      "*"
    ]

    max_age = 3000
  }

}

#####################################
# Public Invoke
#####################################

resource "aws_lambda_permission" "function_url" {

  statement_id = "AllowPublicInvoke"

  action = "lambda:InvokeFunctionUrl"

  function_name = aws_lambda_function.issue_url.function_name

  principal = "*"

  function_url_auth_type = "NONE"

}

#####################################
# CloudWatch Logs
#####################################

resource "aws_cloudwatch_log_group" "lambda" {

  name = "/aws/lambda/${aws_lambda_function.issue_url.function_name}"

  retention_in_days = 30

}
