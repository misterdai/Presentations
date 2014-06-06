var express = require('express');
// Express logging
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// Default View variables
app.locals.title = 'Scotch on the Rocks';

app.use(morgan('dev'));
app.use(bodyParser());

app.use(express.static(
  __dirname + '/public'
));

var router = express.Router();

app.get('/', function index(req, res) {
  res.render('index');
});

app.use('/speakers', require(
  __dirname + '/routes/speakers.js'
));

require('./error.js')(app);

app.listen(8080);