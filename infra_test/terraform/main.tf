terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-3"

  default_tags {
    tags = {
      Project   = "InfrastructureTest"
      ManagedBy = "Terraform"
      Owner     = "YuraInoue"
    }
  }
}

locals {
  common_js = templatefile(
    "${path.module}/template/common.js.tftpl",
    {
      lambda_function_url = aws_lambda_function_url.issue_url.function_url
    }
  )
}

resource "local_file" "common_js" {
  filename = "${path.module}/static/common.js"

  content = templatefile(
    "${path.module}/templates/common.js.tftpl",
    {
      lambda_function_url = aws_lambda_function_url.issue_url.function_url
    }
  )
}
