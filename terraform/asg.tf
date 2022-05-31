resource "aws_autoscaling_group" "final_project4_asg" {
    desired_capacity          = 1
    health_check_grace_period = 100
    health_check_type         = "EC2"
    max_size                  = 3
    min_size                  = 1
    name                      = "final_project4_asg"
    vpc_zone_identifier       = [aws_subnet.subnet_public1.id, aws_subnet.subnet_public2.id]


  launch_template {
    id      = aws_launch_template.init_template.id
    version = "$Latest"
  }
}

resource "aws_autoscaling_attachment" "asg_attachment" {
  autoscaling_group_name = aws_autoscaling_group.final_project4_asg.id
  lb_target_group_arn = aws_lb_target_group.project4_tg.arn
}
