
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;


const url = 'mongodb+srv://wilestata8:wilestata8@cluster1.a7x7t.mongodb.net/demo?retryWrites=true&w=majority'
const dbName ='demo'

app.listen(4009, () => {
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
  db.collection('toDo').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {toDo: result})
  })
})
app.post('/toDo', (req, res) => {// app post will include the new message into creating 
  db.collection('toDo').insertOne({date: req.body.date, toDo: req.body.toDo, completed:false }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/complete', (req, res) => { // creating a new document 
  console.log(req.body.date)
  console.log(req.body.toDo)
  db.collection('toDo')
  .findOneAndUpdate({date: req.body.date, toDo: req.body.toDo}, {
    $set: {
      completed: true
      // if true turn into false, if false turn into true ( so ppl have an option to unfavorite)
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.delete('/toDo', (req, res) => { // a delete request
  db.collection('toDo').findOneAndDelete({date: req.body.date, toDo: req.body.toDo}, (err, result) => {// find matching name/message object in a database and delete 
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

