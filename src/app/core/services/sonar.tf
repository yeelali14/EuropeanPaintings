resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  acl    = "private"

  tags = {
    Name        = "My Test Bucket"
    Environment = "Dev"
  }

  versioning {
    enabled = false
    mfa_delete = false
  }
}


# Server Side Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "sse_example" {
  bucket = aws_s3_bucket.example.bucket

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.testkey.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_kms_key" "testkey" {
  description             = "This is a test key that is used to encrypt bucket objects"
  deletion_window_in_days = 10
  
  tags = {
    Name = "my_kms_key"
    TestTag = "Value"
  }
  
  policy = <<EOF
{
    "Id": "key-123",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::111111:user/test-user"
            },
            "Resource": [
                "arn:aws:kms:us-west-2:1111111:key/1234abcd-12ab-34cd-56ef-1234567890ab",
                "arn:aws:kms:us-east-2:1111111:key/0987dcba-09fe-87dc-65ba-ab0987654321"
            ]
            "Action": "kms:*",
        }
    ]
}
EOF
}