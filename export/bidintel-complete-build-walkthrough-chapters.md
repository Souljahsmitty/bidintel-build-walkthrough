# BidIntel Frontend + AWS Walkthrough Chapters

00:00:00 Original Build - Welcome & Big Picture - What BidIntel Builds
00:00:06 Original Build - Concept Cards - RAG
00:00:28 Original Build - Concept Cards - Chunking
00:00:50 Original Build - Concept Cards - Embedding / Vector
00:01:12 Original Build - Concept Cards - Vector Search
00:01:34 Original Build - Concept Cards - BM25
00:01:56 Original Build - Concept Cards - Hybrid Search
00:02:18 Original Build - Concept Cards - RRF
00:02:40 Original Build - Concept Cards - Reranker
00:03:02 Original Build - Concept Cards - Context Builder
00:03:24 Original Build - Concept Cards - LLM / Amazon Bedrock / Claude
00:03:46 Original Build - Concept Cards - Guardrails
00:04:08 Original Build - Concept Cards - Evaluator / LLM-as-a-Judge
00:04:30 Original Build - Concept Cards - RAGAS
00:04:52 Original Build - Concept Cards - Phoenix / Observability / Tracing
00:05:14 Original Build - Concept Cards - Precision@K
00:05:24 Original Build - Concept Cards - Recall@K
00:05:34 Original Build - Concept Cards - MRR
00:05:44 Original Build - Concept Cards - NDCG
00:05:54 Original Build - Concept Cards - Faithfulness
00:06:04 Original Build - Concept Cards - Answer Relevancy
00:06:14 Original Build - Concept Cards - Context Precision / Context Recall
00:06:24 Original Build - Concept Cards - Answer Correctness
00:06:34 Original Build - Concept Cards - Latency / Cost / Citation Coverage / Hallucination Rate
00:06:44 Original Build - Concept Cards - PostgreSQL
00:07:06 Original Build - Concept Cards - pgvector
00:07:28 Original Build - Concept Cards - Full-text Search / tsvector
00:07:38 Original Build - Concept Cards - HNSW & GIN Indexes
00:07:48 Original Build - Concept Cards - Docker / Container / docker-compose
00:08:10 Original Build - Concept Cards - FastAPI / Swagger Docs
00:08:32 Original Build - Concept Cards - React / Vite
00:08:54 Original Build - Concept Cards - IAM Role / Temporary Credentials
00:09:16 Original Build - Concept Cards - S3 / Secrets Manager / ECS Task
00:09:38 Original Build - Concept Cards - CloudTrail / CloudWatch
00:10:00 Original Build - Concept Cards - Multi-tenancy / tenant_id / Access Groups / ATO
00:10:22 Original Build - Mental Model - Pipeline Map
00:10:28 Original Build - Set Up Your Machine - Prerequisites
00:10:39 Original Build - Folder Structure - Project Skeleton
00:10:50 Original Build - Docker & Database - Start Postgres and Phoenix
00:11:01 Original Build - Database Schema - Tables and Indexes
00:11:09 Original Build - Documents In - Ingestion
00:11:15 Original Build - Keyword Search - BM25 Query
00:11:26 Original Build - Meaning Search - Vector Query
00:11:37 Original Build - Hybrid + RRF - Merge Results
00:11:48 Original Build - Reranker - Shortlist Review
00:11:59 Original Build - Context & Model - Build Prompt
00:12:05 Original Build - Guardrails & Safety - Filter Before LLM
00:12:16 Original Build - Evaluation - Did It Work?
00:12:27 Original Build - Observability - Phoenix Traces
00:12:38 Original Build - Frontend - Button to API
00:12:49 Original Build - Analyst Tools - Proposal Scoring Engine
00:13:11 Original Build - Going to AWS - Eight Console Steps
00:13:22 Original Build - Run End-to-End - Proof Commands
00:13:33 Original Build - Troubleshooting & Maturity - Common Problems
00:13:39 Original Build - Final Recap - ADHD Short Version
00:13:48 Bridge - Now Add The Product Walkthrough
00:14:02 Granular PDF - Product Screens - Login Screen Matches The Real Product
00:14:20 Granular PDF - Product Screens - Document Ingest Screen Is The RAG Starting Point
00:14:40 Granular PDF - Product Screens - Audit Logs Prove Guardrails And Accountability
00:14:58 Granular PDF - Frontend Code Order - Five Frontend Files First
00:15:20 Granular PDF - Frontend Code Order - api.ts Is The Bridge From Browser To Python
00:15:44 Granular PDF - Frontend Code Order - Assistant Click Loop
00:16:10 Granular PDF - Backend Code Order - FastAPI Receives The Click
00:16:36 Granular PDF - Login And Access - Login Maps To Groups, Not Just A UI Button
00:17:04 Granular PDF - AWS Console Screens - AWS Home: The Services You Actually Open
00:17:28 Granular PDF - AWS Console Screens - IAM Identity Center: User Login And Groups
00:17:58 Granular PDF - AWS Console Screens - Bedrock: Enable Claude And Titan
00:18:28 IAM Deep Dive - Authorization Build - Identity Center Is The Login Control Plane
00:19:02 IAM Deep Dive - Authorization Build - Create BidIntel Access Groups
00:19:36 IAM Deep Dive - Authorization Build - Add Users And Assign Groups
00:20:14 IAM Deep Dive - Authorization Build - Create The BidIntel Application
00:20:56 IAM Deep Dive - Authorization Build - Map Identity Attributes Into Claims
00:21:40 IAM Deep Dive - Authorization Build - Assign Groups To The BidIntel App
00:22:18 IAM Deep Dive - Authorization Build - Frontend Login Button To Backend Session
00:23:00 IAM Deep Dive - Authorization Build - Map Groups To BidIntel Roles
00:23:06 IAM Deep Dive - Authorization Build - Authorization Matrix For Pages And APIs
00:23:50 IAM Deep Dive - Authorization Build - Backend Blocks Unauthorized APIs
00:24:32 IAM Deep Dive - Authorization Build - Document Retrieval Filters By Tenant And Access Group
00:25:22 IAM Deep Dive - Authorization Build - Elevated Access Needs Extra Guardrails
00:26:06 IAM Deep Dive - Authorization Build - Auditor Access Is Read Only
00:26:48 IAM Deep Dive - Authorization Build - Manager Access Can Approve But Not Administer
00:27:28 IAM Deep Dive - Authorization Build - Test The IAM Wiring End To End
00:28:12 Granular PDF - AWS Console Screens - IAM Role: Backend Service Permissions
00:28:46 Granular PDF - AWS Console Screens - ECR And ECS: Host The FastAPI Backend
00:29:20 Granular PDF - AWS Console Screens - S3 And CloudFront: Host The Frontend
00:29:50 Granular PDF - AWS Console Screens - Secrets, RDS, And S3 Document Storage
00:30:20 Granular PDF - Final Order - Final Build Order From The PDF
00:30:48 Docs-Backed Click Path - IAM Identity Center - Open The Exact AWS IAM Identity Center Area
00:31:24 Docs-Backed Click Path - IAM Identity Center - Groups Screen: Create The Roles Users Will Carry
00:32:08 Docs-Backed Click Path - IAM Identity Center - Applications Screen: Add BidIntel As A Custom App
00:32:56 Docs-Backed Click Path - IAM Identity Center - Configuration Screen: Paste ACS, Entity, And Metadata Values
00:33:50 Docs-Backed Click Path - IAM Identity Center - Attribute Mapping Screen: Put Claims In The Token
00:33:56 Docs-Backed Click Path - IAM Identity Center - Assignments Screen: Let Groups Use The App
00:34:42 Docs-Backed Click Path - Backend Hosting - ECR Screen: Where The Backend Image Goes
00:35:36 Docs-Backed Click Path - Backend Hosting - Secrets Manager: Where DATABASE_URL And SSO Metadata Go
00:36:28 Docs-Backed Click Path - Backend Hosting - ECS Task Definition: Paste Image URI And Env Vars
00:37:28 Docs-Backed Click Path - Backend Hosting - ECS Service And Load Balancer: Make The API Reachable
00:38:32 Docs-Backed Click Path - Frontend Hosting - S3 Bucket: Upload The Built React Frontend
00:39:30 Docs-Backed Click Path - Frontend Hosting - CloudFront: Create The Public Tutorial/App URL
00:40:34 Docs-Backed Click Path - Bedrock And RAG - Bedrock Model Access: The Console Screen Before Code Works
00:41:26 Docs-Backed Click Path - RAGAS Phoenix Vector DB - Where RAGAS, Phoenix, And pgvector Fit
00:41:32 Educator Build-Along - Bible Gaps Filled - Where You Actually Build: Local First, AWS Later
00:42:34 Educator Build-Along - Bible Gaps Filled - Exact Local Terminal Setup From Empty Folder
00:43:32 Educator Build-Along - Bible Gaps Filled - Architecture Section To File Map
00:43:38 Educator Build-Along - Bible Gaps Filled - Docker Compose Is Local Infrastructure, Not The Cloud
00:44:42 Educator Build-Along - Bible Gaps Filled - Backend Dockerfile: The Wrapper That Moves To AWS
00:45:48 Educator Build-Along - Bible Gaps Filled - Frontend Build: Static Files Go To S3
00:46:46 Educator Build-Along - Bible Gaps Filled - Environment Variables: Local .env Versus AWS Secrets
00:47:50 Educator Build-Along - Bible Gaps Filled - Proof Checklist: Could You Build It From This?
00:48:56 Frontend + AWS - Correct Build Order - Create The Local Project Skeleton
00:49:20 Frontend + AWS - Frontend First - Vite React App And Routes
00:49:44 Frontend + AWS - Frontend First - API Client Is The Switch
00:50:08 Frontend + AWS - Frontend Product Flow - Login Screen And Identity
00:50:32 Frontend + AWS - Frontend Product Flow - Dashboard After Login
00:50:56 Frontend + AWS - Frontend Product Flow - Document Ingest Screen
00:51:20 Frontend + AWS - Backend And Database - FastAPI Doorway
00:51:44 Frontend + AWS - Backend And Database - PostgreSQL And pgvector Tables
00:52:08 Frontend + AWS - RAG Product Flow - Ask BidIntel Screen
00:52:32 Frontend + AWS - RAG Product Flow - Permission Filter Before Bedrock
00:52:56 Frontend + AWS - Proposal Scoring - Score Page With Example Findings
00:53:20 Frontend + AWS - Evaluation And Observability - RAGAS Evaluation Mock Screen
00:53:44 Frontend + AWS - Evaluation And Observability - Phoenix Trace Mock Screen
00:54:08 Frontend + AWS - AWS Build Order - Correct AWS Dependency Order
00:54:32 Frontend + AWS - AWS Build Order - Backend IAM Role Is Not User Role
00:54:56 Frontend + AWS - Bedrock Wiring - Backend Calls Bedrock, Frontend Never Does
00:55:20 Frontend + AWS - Final System Map - What BidIntel Is
