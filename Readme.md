# Coinflux Microservices (API Gateway ✅)

## 🏗️ Overview

A production-grade microservice architecture for a Fintech Wallet application:

- **API Gateway** centralizes access and documentation  
- **User Service** handles registration & login (JWT authentication)  
- **Wallet Service** manages user wallet operations (balance, fund, debit, transfer)  
- **Dispute Service** for handling transaction disputes  
- **Notification Service** (internal) triggers email notification via RabbitMQ

Live docs at: https://api-gateway-ptix.onrender.com/api-docs

## 🚀 Quick Start (Production / Render)

1. Visit the URL above to explore all API endpoints via Swagger.  
2. Authenticate via `/user/login` → copy JWT.  
3. Click the **Authorize** button in Swagger UI → paste `Bearer <JWT>`.  
4. Call Wallet and Dispute APIs like:
   - `/wallet/transfer`  
   - `/wallet/balance`  
   - `/dispute/disputes`

## 🔧 Dev Setup (Local Docker)

```bash
docker-compose up --build
```

**Available endpoints:**

| Service          | URL (Local)                |
|------------------|----------------------------|
| API Gateway      | http://localhost:8080      |
| User Service     | http://localhost:3001      |
| Wallet Service   | http://localhost:3002      |
| Dispute Service  | http://localhost:3003      |
| Notification     | (runs internally via RabbitMQ) |

Use `docker-compose up wallet-service` to spin up just that service for focused development.

## 📚 Tech Stack

| Layer           | Tech                                    |
|----------------|-----------------------------------------|
| API Gateway     | Express, `http-proxy-middleware`, Swagger-jsdoc/UI |
| Services        | Node.js (Express), Sequelize (MySQL), RabbitMQ |
| Authentication  | JWT (Bearer tokens)                    |
| Orchestration   | Docker Compose and Render deployment   |

## 🔎 What It Demonstrates

- Microservice architecture with container isolation  
- API Gateway routing and unified documentation  
- Database transactions with row locks → prevents race conditions  
- Message queue integration for async notifications & dispute logging  
- Secure sessionless authentication using JWT  
- CI/CD-friendly Docker-based deployment  
- Developer-friendly flow through Swagger UI

Enjoy 💼—built for developers and recruiters alike!