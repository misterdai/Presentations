var express = require('express');
var morgan = require('morgan');
var util = require('util');

var app = express();
app.use(morgan('dev'));

app.use(
  express.static(
    __dirname + '/public'
  )
);

var router = express.Router();

router.get('/sotr', function sotr(req, res) {
  var result = [];
  for (var i = 0; i < 20; i++) {
    result.push(Math.floor(Math.random() * 100));
  }
  result.sort();
  res.send(result);
});

router.get('/throw', function throwError(req, res) {
  throw new Error('NotBen');
});

app.use('/', router);

require('./error.js')(app);


app.listen(8080);