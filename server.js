const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db, collection;
const url = "mongodb+srv://wilestata8:wilestata8@cluster1.a7x7t.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(8000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('task').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {task: result})
  })
})
app.post('/task', (req, res) => {
  console.log(req.body)
  console.log(req.body.todoItem)
  db.collection('task').insertOne({item: req.body.todoItem, done:false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
app.put('/done', (req, res) => {
  console.log(req.body.name)
  db.collection('task')
  .findOneAndUpdate({item: req.body.todoItem}, {
    $set: {
      done: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/clear', (req, res) => {
  db.collection('task').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
app.delete('/clearCompleted', (req, res) => {

  db.collection('messages').deleteMany({done: true}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})