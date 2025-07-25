const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app) => {
  app.use('/user', createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
  app.use('/wallet', createProxyMiddleware({ target: process.env.WALLET_SERVICE_URL, changeOrigin: true }));
  app.use('/dispute', createProxyMiddleware({ target: process.env.DISPUTE_SERVICE_URL, changeOrigin: true }));
};

module.exports = { setupProxies };