const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { setupProxies } = require('./proxy');
require("dotenv").config();

const app = express();
app.use(cors());

setupProxies(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8080, () => console.log('🚀 API Gateway running on http://localhost:8080'));