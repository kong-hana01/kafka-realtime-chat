const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/apiAuthRouter/login",
    proxy({
      target: "/login",
      changeOrigin: true,
    })
  );
};
