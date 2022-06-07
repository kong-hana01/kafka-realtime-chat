const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/apiAuthRouter",
    proxy({
      target: "http://localhost:5050",
      changeOrigin: true,
    })
  );
};
