# Lab: Deployment

Goal: move the working local app to AWS without pretending AWS is where code is written.

Do:

1. Build backend Docker image locally.
2. Push image to ECR.
3. Create ECS task definition with image URI, port 8000, task role, env vars, and secrets.
4. Create ECS service behind an Application Load Balancer.
5. Build frontend with production `VITE_API_BASE`.
6. Upload `frontend/dist` to S3.
7. Serve through CloudFront with OAC and SPA error responses.
8. Test login, upload, ask, score, audit.

Verify:

- ECS service is healthy.
- CloudWatch logs show backend startup.
- CloudFront URL loads the frontend.
- API calls reach the hosted backend.
- Bedrock calls come from backend role, not frontend credentials.

Teardown after lab if this is not a real deployment.
