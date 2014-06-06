var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/../sotr.db');

router = express.Router();

router.get('/', function(req, res) {
  db.all('SELECT id, firstname, lastname FROM speakers ORDER BY firstname', function(err, rows) {
    if (err)
      throw err;
    res.render('speakers/index', {records: rows});
  });
});

router.get('/edit/:id', function(req, res) {
  db.get('SELECT id, firstname, lastname FROM speakers WHERE id = $id', 
    {$id: req.params.id},
    function(err, row) {
      if (err)
        throw err;
      res.render('speakers/edit', {record: row});
    }
  );
});

router.post('/edit/:id', function(req, res) {
  db.run('UPDATE speakers SET firstName = $firstName, lastName = $lastName WHERE id = $id', 
    {
      $id: req.params.id,
      $firstName: req.body.firstName,
      $lastName: req.body.lastName
    }, function(err) {
      if (err)
        throw err;
      res.redirect('/speakers');
    }
  );
});

router.get('/delete/:id', function(req, res) {
  db.get('SELECT id, firstname, lastname FROM speakers WHERE id = $id', 
    {$id: req.params.id},
    function(err, row) {
      if (err)
        throw err;
      res.render('speakers/delete', {record: row});
    }
  );
});

router.post('/delete/:id', function(req, res) {
  db.run('DELETE FROM speakers WHERE id = $id', 
    {
      $id: req.params.id
    }, function(err) {
      if (err)
        throw err;
      res.redirect('/speakers');
    }
  );
});


router.get('/add', function(req, res) {
   res.render('speakers/edit', {record: {firstName: '', lastName: ''}});
});

router.post('/add', function(req, res) {
  db.run('INSERT INTO speakers (firstName, lastName) VALUES ($firstName, $lastName)', 
    {
      $firstName: req.body.firstName,
      $lastName: req.body.lastName
    }, function(err) {
      if (err)
        throw err;
      res.redirect('/speakers');
    }
  );
});

module.exports = router;
