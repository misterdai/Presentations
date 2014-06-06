var express = require('express');
var morgan = require('morgan');
var util = require('util');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.locals.title = 'Scotch on the Rocks';

app.use(morgan('dev'));

app.use(express.static(
  __dirname + '/public'
));

var router = express.Router();

app.get('/', function index(req, res) {
  res.render('index');
});

router.get('/sotr', function sotr(req, res) {
  var result = [];
  var range = {
    min: 1000,
    max: 9000
  };
  for (var i = 0; i < 20; i++) {
    result.push(
      Math.floor(
        Math.random() * (range.max - range.min + 1)
      ) + range.min
    );
  }
  result.sort(function(a, b) {return a - b;});
  if (req.param('json')) {
    res.send(result);
  } else {
    res.render('sotr', {result: result});
  }
});

router.get('/throw', function throwError(req, res) {
  throw new Error('NotBen');
});

app.use('/', router);

app.use(function notFound(req, res) {
  res.status(404)
    .render('404', {message: 'Not Found'});
});

app.use(function errorHandler(err, req, res, next) {
  res.status(500)
    .render('500', {message: err.message, error: err});
});

app.listen(8080);