resource "aws_opensearch_domain" "reservations" {
  domain_name    = "reservations"
  engine_version = "OpenSearch_1.2"

  cluster_config {
    dedicated_master_enabled = false
    # zone_awareness_enabled = true
    # availability_zone_count = 1
    instance_type = "t3.small.search"
    instance_count = 1
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 10
    volume_type = "gp2"
    }

  advanced_security_options {
    enabled                        = true
    internal_user_database_enabled = true
    master_user_options {
       master_user_name     = "admin"
       master_user_password = "Aa!12341234"
      # You can also use IAM role/user ARN
      # master_user_arn = ""
    }
  }
}
encrypt_at_rest {
    enabled = true
  }

domain_endpoint_options {
   # enforce_https       = false
   tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

node_to_node_encryption {
    enabled = true
  }

resource "aws_opensearch_domain_policy" "main" {
  domain_name = aws_opensearch_domain.reservations.domain_name

 access_policies = <<POLICIES
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ""
      },
      "Action": "es:",
      "Condition": {
          "IpAddress": {"aws:SourceIp": "218.235.89.144/32"}
      },
      "Resource": "${aws_opensearch_domain.reservations.arn}/*"
    }
  ]
}
POLICIES
}
    


elasticsearch_configuration {
    domain_arn = aws_opensearch_domain.reservations.arn
    index_name = "opensearch-index"
    retry_duration = 60
    index_rotation_period = "NoRotation"
    buffering_interval = 60
    buffering_size = 5

    cloudwatch_logging_options {
      enabled = true
      log_group_name = "ec2-test.log"
      log_stream_name = "stream-log"
    }
}