const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/sample-data',
    createProxyMiddleware({
      target: 'http://test.api.boxigo.in',
      changeOrigin: true,
    })
  );
};
