const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL731sin',
  database: 'memo'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM memos',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {memos: results});
    }
  );
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM memos',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {memos: results});
    }
  );
});

app.get('/sort-star', (req, res) => {
  connection.query(
    //'SELECT * FROM memos ORDER BY favorite=1, favorite DESC',
    'SELECT * FROM memos ORDER BY CASE favorite WHEN 2 THEN 1 ELSE 2 END, favorite DESC',
    (error, results) => {
      console.log(results);
      res.render('sort-star.ejs', {memos: results});
    }
  );
});

app.get('/sort-flag', (req, res) => {
  connection.query(
    //'SELECT * FROM memos ORDER BY favorite=1, favorite DESC',
    'SELECT * FROM memos ORDER BY CASE favorite WHEN 1 THEN 1 ELSE 2 END, favorite DESC',
    (error, results) => {
      console.log(results);
      res.render('sort-flag.ejs', {memos: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO memos (memo, favorite) VALUES (?, ?)',
    [req.body.MemosMemo, req.body.MemosFavo],
    (error, results) => {
      res.redirect("/index");

    }
  );
});

app.listen(3000);
