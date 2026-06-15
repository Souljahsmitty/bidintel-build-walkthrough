# Prerequisites And Account Notes

Use this before watching the walkthrough. The goal is to prevent the usual beginner stall: missing tools, wrong folder, surprise AWS bill, or unclear start state.

## Fast Track Tools

Install on your local machine:

- Git
- Docker Desktop
- Python 3.11+
- Node.js LTS and npm
- VS Code or another editor

Verify:

```bash
git --version
docker --version
python3 --version
node --version
npm --version
```

Expected: every command prints a version. If Docker says it cannot connect, open Docker Desktop and wait until it is running.

## Expert Track Accounts

Needed only for AWS deployment modules:

- AWS account with billing enabled
- IAM Identity Center access
- Bedrock model access in the selected Region
- Permission to create IAM roles, ECR repos, ECS services, S3 buckets, CloudFront distributions, Secrets Manager secrets, and CloudWatch logs

## Cost Boundary

Most of the course should be done locally first. AWS services can cost money, especially ECS/Fargate, RDS/Aurora, Application Load Balancer, NAT Gateway, Bedrock calls, S3, CloudFront, CloudWatch logs, and Secrets Manager.

Use mock mode until the local app works:

```bash
LOCAL_MOCK_LLM=true
```

Then switch to Bedrock only in the Expert Track.

## Prototype Boundary

This is a working prototype and learning course. It is not a FedRAMP package, ATO, legal compliance review, or production security certification.
