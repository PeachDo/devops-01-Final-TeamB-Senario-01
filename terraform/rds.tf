# 서브넷 그룹 생성
resource "aws_db_subnet_group" "final_project4_sg" {
    name        = "final_project4_sg"
    description = "Managed by Terraform"
    subnet_ids  = [aws_subnet.subnet_private2.id, aws_subnet.subnet_private1.id]
}

# DB 인스턴스 생성
resource "aws_db_instance" "final_project_teamb" {
  db_name              = "final_project_teamb"
  engine               = "mysql"
  engine_version       = "8.0.28"
  multi_az             = true
  username             = "admin"
  password             = "asdf1234"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  db_subnet_group_name = "aws_db_subnet_group.final_project4_sg"
  vpc_security_group_ids = [aws_security_group.final_project4_private_sg.id]

  skip_final_snapshot  = true

  # Optional and default
  max_allocated_storage = 0
  license_model         = "general-public-license"
  port                  = 3306
  publicly_accessible   = false
  storage_encrypted     = false
  storage_type          = "gp2"
  parameter_group_name  = "default.mysql8.0"
}
