const express = require("express");
const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});
// Connect

db.connect((err)=>{
  if(err){
    throw err;
  }else{
    console.log("MySql Connected... ")
  }
});

const app = express();

// create db
app.get("/createdb", (req, res)=>{
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result)=>{
    if (err){
      throw err;
    }else{
      console.log(result);
      res.send('Database created... ')
    }
  })
});
// create table
app.get('/createpoststable', (req, res)=>{
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.send("Table has been created")
    }
  });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {title: 'Post one', body: 'This is post number one'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err){
      throw err;
    } else {
      console.log(result);
      res.send("Post 1 added")
    }
  });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
  let post = {title: 'Post 2', body: 'This is post number two'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err){
      throw err;
    } else {
      console.log(result);
      res.send("Post 2 added")
    }
  });
});

// select all posts
app.get('/posts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

// select single post
app.get('/post/:id', (req, res)=> {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result)=>{
    if (err){
      throw err;
    } else{
      console.log(result);
      res.json(result);
    }
  });
});

// Update post
app.get('/updatepost/:id', (req, res) =>{
  let newTitle = 'Updated title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result)=>{
    if (err){
      throw err;
    } else {
      console.log(result);
      res.json("Post updated... ");
    }
  });
});

app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result)=>{
    if (err){
      throw err;
    } else {
      console.log(result);
      res.send("Post deleted...")
    }
  });
});
app.listen(8000, ()=>{
  console.log("Server is up and running on port 8000")
})
