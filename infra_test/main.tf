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