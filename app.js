/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var mysql = require('mysql');

var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'aws731sin',
  database: 'memo'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

// View EngineにEJSを指定。
 app.set('view engine', 'ejs');
// // "/"へのGETリクエストでindex.ejsを表示する。拡張子（.ejs）は省略されていることに注意
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM memos',
    (error, results) => {
      console.log(results);
      res.render('top', {memos: results});
    }
  );
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM memos',
    (error, results) => {
      console.log(results);
      res.render('index', {memos: results});
    }
  );
});

app.get('/sort-star', (req, res) => {
  connection.query(
    //'SELECT * FROM memos ORDER BY favorite=1, favorite DESC',
    'SELECT * FROM memos ORDER BY CASE favorite WHEN 2 THEN 1 ELSE 2 END, favorite DESC',
    (error, results) => {
      console.log(results);
      res.render('sort-star', {memos: results});
    }
  );
});

app.get('/sort-flag', (req, res) => {
  connection.query(
    //'SELECT * FROM memos ORDER BY favorite=1, favorite DESC',
    'SELECT * FROM memos ORDER BY CASE favorite WHEN 1 THEN 1 ELSE 2 END, favorite DESC',
    (error, results) => {
      console.log(results);
      res.render('sort-flag', {memos: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new');
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

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM memos WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM memos WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {memo: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE memos SET memo = ?, favorite = ? WHERE id = ?',
    [req.body.memoText, req.body.MemosFavo, req.params.id],
    (error, results) => {
      console.log(results);
      res.redirect('/index');
    }
  );  
});
