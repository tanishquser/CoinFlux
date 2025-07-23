#  Coinflux – Microservices-Based Fintech Wallet

**Coinflux** is a microservices-driven fintech wallet system designed for scalable and modular architecture. It features dedicated services for user authentication, wallet management, and notification handling through a message queue.

---

##  Microservices Overview

###  User Service
- Handles authentication and user management
- Exposes APIs for user registration, login, and profile management

###  Wallet Service
- Manages wallet balances, transactions, and history
- Includes endpoints for deposit, withdrawal, and transfers

###  Notification Service
- Sends email notifications via Mailtrap
- Listens to RabbitMQ events (e.g., user registration or transaction alerts)

---

##  Project Structure

```
coinflux/
│
├── user-service/               # Authentication and user management
│   ├── Dockerfile
│   └── ...
│
├── wallet-service/            # Wallet and transaction logic
│   ├── Dockerfile
│   └── ...
│
├── notification-service/      # Email notification handler
│   ├── Dockerfile
│   └── ...
│
└── docker-compose.yml         # Orchestration of services with RabbitMQ
```

---

## 🐳 Local Development with Docker Compose

### Prerequisites

- Ensure Docker is installed and running  
   [Download Docker](https://www.docker.com/products/docker-desktop)

### Start All Services

Run the following command in the root `coinflux/` directory:

```bash
docker-compose up --build
```

This will spin up all services:
- User Service
- Wallet Service
- Notification Service
- RabbitMQ

---

## Live Services on Render

Test the services live using the following Render-hosted URLs:

- **User Service** – [Swagger Docs](#)
- **Wallet Service** – [Swagger Docs](#)
- **Notification Service** – Internal Use Only

---

## Email Notifications (Internal)

The Notification Service:
- Is not exposed externally
- Sends emails via **Mailtrap**
- Listens for events on RabbitMQ (e.g., user signup or transaction alerts)

---

## Tech Stack

- **Backend:** Node.js + Express  
- **Database:** MySQL (hosted on Render)  
- **ORM:** Sequelize  
- **Messaging:** RabbitMQ  
- **Docs:** Swagger  
- **Containerization:** Docker + Docker Compose  


## 📝 License

This project is licensed under the MIT License.