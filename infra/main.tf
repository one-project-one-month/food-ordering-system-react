# S3 bucket for frontend app
resource "aws_s3_bucket" "frontend" {
  bucket = var.bucket_name

}


#private s3 for secure access 
resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


/*------------------------------- Cloud Front -----------------------------------------*/

# Origin Access Control for CloudFront to access S3 securely
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = var.oac_name
  origin_access_control_origin_type = var.origin_access_control_origin_type
  #CloudFront will always sign every request it sends to the origin (your S3 bucket). 
  signing_behavior = "always"
  signing_protocol = "sigv4"

}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  default_root_object = var.default_root_object
  price_class         = var.price_class

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = var.origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    allowed_methods  = var.allowed_methods
    cached_methods   = var.allowed_methods
    target_origin_id = var.target_origin_id

    viewer_protocol_policy = var.viewer_protocol_policy

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name = var.aws_cloudfront_distribution_name
  }
}

# S3 Bucket Policy to Allow Access ONLY from CloudFront OAC
data "aws_cloudfront_origin_access_identity" "dummy" {
  # required to bypass validation, not actually used due to OAC
  id         = "E1EXAMPLE1234" # placeholder
  depends_on = [aws_cloudfront_origin_access_control.oac]
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "AllowCloudFrontAccessOnly",
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action   = ["s3:GetObject"],
        Resource = "${aws_s3_bucket.frontend.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      }
    ]
  })
}


