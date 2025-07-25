const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coinflux API Gateway',
      version: '1.0.0',
      description: `
        This is the centralized documentation for all Coinflux microservices.
        ### How to Use JWT Authentication
        - First, use the **/login** endpoint in the **User Service** to obtain your JWT.
        - Then click the "Authorize" button at the top right of Swagger UI.

        ## Workflow
        1. **User Service**: Register/Login → Get JWT
        2. **Wallet Service**: Create Wallet → View Balance → Add/Withdraw
        3. **Notification Service**: Auto-notifies for wallet/dispute actions
        4. **Dispute Service**: Raise/View disputes for transactions

        ## Auth
        - Pass \`Bearer <JWT>\` in the **Authorization header** for protected routes.`
    },
    servers: [{ url: process.env.API_GATEWAY_URL }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./swagger/*.yaml']
};

module.exports = swaggerJsdoc(options);