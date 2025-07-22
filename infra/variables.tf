variable "aws_region" {
  description = "The AWS region where the resources will be deployed"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "The name of the S3 bucket for the frontend application"
  type        = string

}

variable "oac_name" {
  description = "The name for the CloudFront Origin Access Control"
  type        = string
  default     = "s3-oac"

}

variable "origin_access_control_origin_type" {
  description = "The type of origin for the CloudFront Origin Access Control"
  type        = string
}

variable "default_root_object" {
  description = "The default root object for the CloudFront distribution"
  type        = string
  default     = "index.html"

}

variable "price_class" {
  description = "The price class for the CloudFront distribution"
  type        = string
  default     = "PriceClass_100"

}

variable "origin_id" {
  description = "The ID for the origin in the CloudFront distribution"
  type        = string
  default     = "s3Origin"

}

variable "allowed_methods" {
  description = "The allowed methods for the CloudFront distribution"
  type        = list(string)
  default     = ["GET", "HEAD"]

}


variable "cached_methods" {
  description = "The cached methods for the CloudFront distribution"
  type        = list(string)
  default     = ["GET", "HEAD"]

}


variable "target_origin_id" {
  description = "The target origin ID for the CloudFront distribution"
  type        = string
  default     = "s3Origin"

}
