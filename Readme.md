# Coinflux – Microservices-Based Fintech Wallet

A scalable, containerized digital wallet system built with Node.js, Express, MySQL, Sequelize, Docker, RabbitMQ, and Swagger, designed for seamless transfers, dispute handling, and user notifications.

## 🔗 Live Demo

[![Swagger UI](https://img.shields.io/badge/API-DOCS-green)](https://api-gateway-ptix.onrender.com/api-docs)

## ⚡ Tech Stack

* **Backend:** Node.js, Express
* **Database:** MySQL (with Sequelize ORM)
* **Communication:** RabbitMQ (message broker)
* **Authentication:** JWT
* **Containerization:** Docker + Docker Compose
* **Documentation:** Swagger (OpenAPI)
* **Deployment:** Render.com

## 📆 Microservices Overview

| Microservice             | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| **user-service**         | Handles user registration, login, and JWT authentication   |
| **wallet-service**       | Manages wallets, balances, and internal fund transfers     |
| **notification-service** | Sends email notifications for transactions/disputes        |
| **dispute-service**      | Enables users to raise/view disputes on transactions       |
| **api-gateway**          | Acts as a single entry point; routes all traffic + Swagger |

## 📊 Features

* JWT-based authentication for secure API access
* Centralized API Gateway with route-level access
* RabbitMQ-based messaging between services
* Swagger UI with integrated documentation for all services
* Docker Compose orchestration for multi-container setup
* Service-specific logs for easy debugging
* Configurable environment via `.env` files

## 🛀 Architecture Diagram (Optional)

*(You can add an image here from draw\.io or Excalidraw)*

## 📚 Setup & Usage

### Prerequisites:

* Docker & Docker Compose installed

### Steps:

```bash
git clone https://github.com/<your-username>/coinflux.git
cd coinflux
docker-compose up --build
```

Access the Swagger docs at: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

### Sample User Flow:

1. Register via `POST /user/register`
2. Login to receive JWT via `POST /user/login`
3. Use JWT as `Authorization: Bearer <token>` for all other APIs

## 🌟 Highlights

* Written in modular microservices
* Stateless authentication with JWT
* Message queue-based decoupled notifications
* Real-world problem modeled: Transaction disputes
* Production-ready deployment on Render

## 📄 License

MIT License

---

> Developed with ❤️ by Tanishq Gupta