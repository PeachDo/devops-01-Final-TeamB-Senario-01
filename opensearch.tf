resource "aws_opensearch_domain" "reservations" {
  domain_name    = "reservations"
  engine_version = "OpenSearch_1.2"

  encrypt_at_rest {
    enabled = true
  }

  node_to_node_encryption {
    enabled = true
  }

  domain_endpoint_options {
    enforce_https = true
    tls_security_policy = "Policy-Min-TLS-1-0-2019-07"
  }


/*
  auto_tune_options {
    desired_state = "NO_ROLLBACK"
  }
*/

  ebs_options {
    ebs_enabled = true
    volume_size = 10
    volume_type = "gp2"
    }

/*
  vpc_options {
    subnet_ids = [aws_subnet.subnet_private1.id]
  }

  */

advanced_security_options {
    enabled                        = true
    internal_user_database_enabled = true
    master_user_options {
      master_user_name     = "admin"
      master_user_password = "Aa!12341234"
      # You can also use IAM role/user ARN
      # master_user_arn = "arn:aws:iam::351954682436:user/terraform"
    }
}

  cluster_config {
    dedicated_master_enabled = false
    # zone_awareness_enabled = true
    # availability_zone_count = 1
    instance_type = "t3.small.search"
    instance_count = 1
  }

node_to_node_encryption {
    enabled = true
  }

  access_policies = <<POLICIES

   {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::351954682436:user/terraform"
      },
      "Action": "es:ESHttpGet",
      "Resource": "arn:aws:es:ap-northeast-2:351954682436:domain/test2-opensearch/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:ap-northeast-2:351954682436:domain/test2-opensearch/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "218.235.89.144/32"
        }
      }
    }
  ]
}
    POLICIES

    }

  elasticsearch_configuration {
    domain_arn = aws_opensearch_domain.truck.arn
    role_arn = aws_iam_role.firehose_role.arn
    index_name = "opensearch-index"
    retry_duration = 60
    index_rotation_period = "NoRotation"
    buffering_interval = 60
    buffering_size = 5

    cloudwatch_logging_options {
      enabled = true
      log_group_name = "firehose-log"
      log_stream_name = "stream-log"
    }
  }