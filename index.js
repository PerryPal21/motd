const express = require('express');
const StormDB = require("stormdb");
const app = express();

app.set('view engine', 'ejs');

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
require('dotenv').config()

app.get('/post', (req, res) => {
  var msg = req.query.msg
  var pass = req.query.pass

  if (pass === process.env.pass) {
    db.get(`posts`).push({"msg": msg, "date":new       Date().toLocaleDateString()})
  db.save()
  res.send("Your message of the day was posted!")
  } else {
    res.send("Authentication Failed :(")
  }

});

app.get('/', (req, res) => {
  var messages = db.get("posts").state.posts
  res.render('main', {
    msgdb: messages
  });
});

app.get('/today', (req, res) => {
  var lengthnum = db.get("posts").state.posts.length - 1
  var messageToday = db.get().state.posts[lengthnum]
  res.render('today', {
    msgtoday: messageToday
  });
});

app.listen(3000, () => {
  console.log('server started');
});
