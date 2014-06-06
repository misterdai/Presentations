function setupErrorHandlers(app) {
  app.use(function notFound(req, res) {
    res.status(404)
      .render('404', {message: 'Not Found'});
  });

  app.use(function errorHandler(err, req, res, next) {
    res.status(500)
      .render('500', {message: err.message, error: err});
  });
}

module.exports = setupErrorHandlers;