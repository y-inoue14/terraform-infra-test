########################################
# Lambda実行ロール
########################################

resource "aws_iam_role" "lambda_role" {

  name = "issue-url-role"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Principal = {

          Service = "lambda.amazonaws.com"

        }

        Action = "sts:AssumeRole"

      }

    ]
  })
}

########################################
# CloudWatch Logs
########################################

resource "aws_iam_role_policy_attachment" "logs" {

  role = aws_iam_role.lambda_role.name

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

########################################
# S3 PutObject権限
########################################

resource "aws_iam_policy" "lambda_s3" {

  name = "issue-url-s3"

  policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Action = [

          "s3:PutObject"

        ]

        Resource = [

          "${aws_s3_bucket.storage.arn}/results/*"

        ]

      }

    ]

  })
}

resource "aws_iam_role_policy_attachment" "lambda_s3" {

  role = aws_iam_role.lambda_role.name

  policy_arn = aws_iam_policy.lambda_s3.arn
}
