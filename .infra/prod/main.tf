terraform {
    backend "s3" {
    bucket = "tayyabjavedstate"
    key    = "talkfs"
    region = "eu-west-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.89.0"
    }
  }
}


provider "aws" {
  region     = "eu-west-1"
}

resource "aws_key_pair" "talkfskey" {
  key_name   = "talkfs"
  public_key = file("~/.ssh/talkfs.pub")
}

resource "aws_security_group" "talkfs_sg"{
    name        = "talkfs_sg"
    description = "Allow HTTP and SSH inbound traffic"
     
    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}



resource "aws_instance" "talkfs_instance" {
  ami           = "ami-0df368112825f8d8f"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.talkfskey.key_name
    security_groups = [aws_security_group.talkfs_sg.name]

  tags = {
    Name = "talkfs-website"
  }
}

resource "local_file" "ansible_hosts" {
  filename = "out/ansible_hosts"
  content = templatefile("templates/ansible_hosts.tftpl", {
    serverip = aws_instance.talkfs_instance.public_ip,
    ssh_user      = "ubuntu",
    ssh_key_file  = "~/.ssh/talkfs"
  })
}

data "aws_route53_zone" "primary" {
  name = "maeplet.com"
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "talkfs.maeplet.com"
  type    = "A"
  ttl     = 300
  records = [aws_instance.talkfs_instance.public_ip]
}

output "public_ip" {
  value = aws_instance.talkfs_instance.public_ip
}