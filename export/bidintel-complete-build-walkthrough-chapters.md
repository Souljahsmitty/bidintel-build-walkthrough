# BidIntel Frontend + AWS Walkthrough Chapters

00:00:00 Course Shape - Fast Track And Expert Track - Fix Shape: Two Tracks, Not One Long Watch
00:00:56 Course Shape - Fast Track And Expert Track - Fast Track: Watch, Do, Verify
00:01:02 Course Shape - Fast Track And Expert Track - Expert Track IAM Lab: Claims Must Become Permissions
00:02:16 Course Shape - Fast Track And Expert Track - Every Module Needs A Checklist And Screenshot Target
00:03:18 Course Shape - Fast Track And Expert Track - Failure Labs Build Expert Judgment
00:04:22 Course Shape - Fast Track And Expert Track - Prototype Boundary, AWS Cost, And Teardown
00:05:34 Original Build - Welcome & Big Picture - What BidIntel Builds
00:05:40 Original Build - Concept Cards - RAG
00:06:02 Original Build - Concept Cards - Chunking
00:06:24 Original Build - Concept Cards - Embedding / Vector
00:06:46 Original Build - Concept Cards - Vector Search
00:07:08 Original Build - Concept Cards - BM25
00:07:30 Original Build - Concept Cards - Hybrid Search
00:07:52 Original Build - Concept Cards - RRF
00:08:14 Original Build - Concept Cards - Reranker
00:08:36 Original Build - Concept Cards - Context Builder
00:08:58 Original Build - Concept Cards - LLM / Amazon Bedrock / Claude
00:09:20 Original Build - Concept Cards - Guardrails
00:09:42 Original Build - Concept Cards - Evaluator / LLM-as-a-Judge
00:10:04 Original Build - Concept Cards - RAGAS
00:10:26 Original Build - Concept Cards - Phoenix / Observability / Tracing
00:10:48 Original Build - Concept Cards - Precision@K
00:10:58 Original Build - Concept Cards - Recall@K
00:11:08 Original Build - Concept Cards - MRR
00:11:18 Original Build - Concept Cards - NDCG
00:11:28 Original Build - Concept Cards - Faithfulness
00:11:38 Original Build - Concept Cards - Answer Relevancy
00:11:48 Original Build - Concept Cards - Context Precision / Context Recall
00:11:58 Original Build - Concept Cards - Answer Correctness
00:12:08 Original Build - Concept Cards - Latency / Cost / Citation Coverage / Hallucination Rate
00:12:18 Original Build - Concept Cards - PostgreSQL
00:12:40 Original Build - Concept Cards - pgvector
00:13:02 Original Build - Concept Cards - Full-text Search / tsvector
00:13:12 Original Build - Concept Cards - HNSW & GIN Indexes
00:13:22 Original Build - Concept Cards - Docker / Container / docker-compose
00:13:44 Original Build - Concept Cards - FastAPI / Swagger Docs
00:14:06 Original Build - Concept Cards - React / Vite
00:14:28 Original Build - Concept Cards - IAM Role / Temporary Credentials
00:14:50 Original Build - Concept Cards - S3 / Secrets Manager / ECS Task
00:15:12 Original Build - Concept Cards - CloudTrail / CloudWatch
00:15:34 Original Build - Concept Cards - Multi-tenancy / tenant_id / Access Groups / ATO
00:15:56 Original Build - Mental Model - Pipeline Map
00:16:02 Original Build - Set Up Your Machine - Prerequisites
00:16:13 Original Build - Folder Structure - Project Skeleton
00:16:24 Original Build - Docker & Database - Start Postgres and Phoenix
00:16:35 Original Build - Database Schema - Tables and Indexes
00:16:43 Original Build - Documents In - Ingestion
00:16:49 Original Build - Keyword Search - BM25 Query
00:17:00 Original Build - Meaning Search - Vector Query
00:17:11 Original Build - Hybrid + RRF - Merge Results
00:17:22 Original Build - Reranker - Shortlist Review
00:17:33 Original Build - Context & Model - Build Prompt
00:17:39 Original Build - Guardrails & Safety - Filter Before LLM
00:17:50 Original Build - Evaluation - Did It Work?
00:18:01 Original Build - Observability - Phoenix Traces
00:18:12 Original Build - Frontend - Button to API
00:18:23 Original Build - Analyst Tools - Proposal Scoring Engine
00:18:45 Original Build - Going to AWS - Eight Console Steps
00:18:56 Original Build - Run End-to-End - Proof Commands
00:19:07 Original Build - Troubleshooting & Maturity - Common Problems
00:19:13 Original Build - Final Recap - ADHD Short Version
00:19:21 Bridge - Now Add The Product Walkthrough
00:19:35 Granular PDF - Product Screens - Login Screen Matches The Real Product
00:19:53 Granular PDF - Product Screens - Document Ingest Screen Is The RAG Starting Point
00:20:13 Granular PDF - Product Screens - Audit Logs Prove Guardrails And Accountability
00:20:31 Granular PDF - Frontend Code Order - Five Frontend Files First
00:20:53 Granular PDF - Frontend Code Order - api.ts Is The Bridge From Browser To Python
00:21:17 Granular PDF - Frontend Code Order - Assistant Click Loop
00:21:43 Granular PDF - Backend Code Order - FastAPI Receives The Click
00:22:09 Granular PDF - Login And Access - Login Maps To Groups, Not Just A UI Button
00:22:37 Granular PDF - AWS Console Screens - AWS Home: The Services You Actually Open
00:23:01 Granular PDF - AWS Console Screens - IAM Identity Center: User Login And Groups
00:23:31 Granular PDF - AWS Console Screens - Bedrock: Enable Claude And Titan
00:24:01 IAM Deep Dive - Authorization Build - Identity Center Is The Login Control Plane
00:24:35 IAM Deep Dive - Authorization Build - Create BidIntel Access Groups
00:25:09 IAM Deep Dive - Authorization Build - Add Users And Assign Groups
00:25:47 IAM Deep Dive - Authorization Build - Create The BidIntel Application
00:26:29 IAM Deep Dive - Authorization Build - Map Identity Attributes Into Claims
00:27:13 IAM Deep Dive - Authorization Build - Assign Groups To The BidIntel App
00:27:51 IAM Deep Dive - Authorization Build - Frontend Login Button To Backend Session
00:28:33 IAM Deep Dive - Authorization Build - Map Groups To BidIntel Roles
00:28:39 IAM Deep Dive - Authorization Build - Authorization Matrix For Pages And APIs
00:29:23 IAM Deep Dive - Authorization Build - Backend Blocks Unauthorized APIs
00:30:05 IAM Deep Dive - Authorization Build - Document Retrieval Filters By Tenant And Access Group
00:30:55 IAM Deep Dive - Authorization Build - Elevated Access Needs Extra Guardrails
00:31:39 IAM Deep Dive - Authorization Build - Auditor Access Is Read Only
00:32:21 IAM Deep Dive - Authorization Build - Manager Access Can Approve But Not Administer
00:33:01 IAM Deep Dive - Authorization Build - Test The IAM Wiring End To End
00:33:45 Granular PDF - AWS Console Screens - IAM Role: Backend Service Permissions
00:34:20 Granular PDF - AWS Console Screens - ECR And ECS: Host The FastAPI Backend
00:34:54 Granular PDF - AWS Console Screens - S3 And CloudFront: Host The Frontend
00:35:24 Granular PDF - AWS Console Screens - Secrets, RDS, And S3 Document Storage
00:35:54 Granular PDF - Final Order - Final Build Order From The PDF
00:36:22 Docs-Backed Click Path - IAM Identity Center - Open The Exact AWS IAM Identity Center Area
00:36:58 Docs-Backed Click Path - IAM Identity Center - Groups Screen: Create The Roles Users Will Carry
00:37:42 Docs-Backed Click Path - IAM Identity Center - Applications Screen: Add BidIntel As A Custom App
00:38:30 Docs-Backed Click Path - IAM Identity Center - Configuration Screen: Paste ACS, Entity, And Metadata Values
00:39:24 Docs-Backed Click Path - IAM Identity Center - Attribute Mapping Screen: Put Claims In The Token
00:39:30 Docs-Backed Click Path - IAM Identity Center - Assignments Screen: Let Groups Use The App
00:40:16 Docs-Backed Click Path - Backend Hosting - ECR Screen: Where The Backend Image Goes
00:41:10 Docs-Backed Click Path - Backend Hosting - Secrets Manager: Where DATABASE_URL And SSO Metadata Go
00:42:02 Docs-Backed Click Path - Backend Hosting - ECS Task Definition: Paste Image URI And Env Vars
00:43:02 Docs-Backed Click Path - Backend Hosting - ECS Service And Load Balancer: Make The API Reachable
00:44:06 Docs-Backed Click Path - Frontend Hosting - S3 Bucket: Upload The Built React Frontend
00:45:04 Docs-Backed Click Path - Frontend Hosting - CloudFront: Create The Public Tutorial/App URL
00:46:08 Docs-Backed Click Path - Bedrock And RAG - Bedrock Model Access: The Console Screen Before Code Works
00:47:00 Docs-Backed Click Path - RAGAS Phoenix Vector DB - Where RAGAS, Phoenix, And pgvector Fit
00:47:06 Educator Build-Along - Bible Gaps Filled - Where You Actually Build: Local First, AWS Later
00:48:08 Educator Build-Along - Bible Gaps Filled - Exact Local Terminal Setup From Empty Folder
00:49:06 Educator Build-Along - Bible Gaps Filled - Architecture Section To File Map
00:49:12 Educator Build-Along - Bible Gaps Filled - Docker Compose Is Local Infrastructure, Not The Cloud
00:50:16 Educator Build-Along - Bible Gaps Filled - Backend Dockerfile: The Wrapper That Moves To AWS
00:51:22 Educator Build-Along - Bible Gaps Filled - Frontend Build: Static Files Go To S3
00:52:20 Educator Build-Along - Bible Gaps Filled - Environment Variables: Local .env Versus AWS Secrets
00:53:24 Educator Build-Along - Bible Gaps Filled - Proof Checklist: Could You Build It From This?
00:54:30 Frontend + AWS - Correct Build Order - Create The Local Project Skeleton
00:54:54 Frontend + AWS - Frontend First - Vite React App And Routes
00:55:18 Frontend + AWS - Frontend First - API Client Is The Switch
00:55:42 Frontend + AWS - Frontend Product Flow - Login Screen And Identity
00:56:06 Frontend + AWS - Frontend Product Flow - Dashboard After Login
00:56:30 Frontend + AWS - Frontend Product Flow - Document Ingest Screen
00:56:54 Frontend + AWS - Backend And Database - FastAPI Doorway
00:57:18 Frontend + AWS - Backend And Database - PostgreSQL And pgvector Tables
00:57:42 Frontend + AWS - RAG Product Flow - Ask BidIntel Screen
00:58:06 Frontend + AWS - RAG Product Flow - Permission Filter Before Bedrock
00:58:30 Frontend + AWS - Proposal Scoring - Score Page With Example Findings
00:58:54 Frontend + AWS - Evaluation And Observability - RAGAS Evaluation Mock Screen
00:59:18 Frontend + AWS - Evaluation And Observability - Phoenix Trace Mock Screen
00:59:42 Frontend + AWS - AWS Build Order - Correct AWS Dependency Order
01:00:06 Frontend + AWS - AWS Build Order - Backend IAM Role Is Not User Role
01:00:30 Frontend + AWS - Bedrock Wiring - Backend Calls Bedrock, Frontend Never Does
01:00:54 Frontend + AWS - Final System Map - What BidIntel Is
