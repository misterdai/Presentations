function setupErrorHandlers(app) {
  app.use(function notFound(req, res) {
    res.status(404)
      .sendfile(__dirname + '/public/404.html');
  });

  app.use(function errorHandler(err, req, res, next) {
    res.status(500)
      .sendfile(__dirname + '/public/500.html');
  });
}

module.exports = setupErrorHandlers;