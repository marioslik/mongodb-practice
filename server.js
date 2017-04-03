const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://mcaldato:mcaldato@ds149800.mlab.com:49800/dogs', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3009, function() {
    console.log('listening on 3009')
  })
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  var cursor = db.collection('dogs').find()

  db.collection('dogs').find().toArray(function(err, result) {
    if (err) return console.log(err)
    // send HTML file populated with dogs here
    res.render('index.ejs', {dogs: result})
  })
})

app.post('/dogs', (req, res) => {
  db.collection('dogs').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log("saved to the database")
    res.redirect('/')
  })
})

app.put('/dogs', (req, res) => {
  // Handle put request
  db.collection('dogs')
  .findOneAndUpdate({breed: 'Labrador'}, {
    $set: {
      breed: req.body.breed,
      weight: req.body.weight,
      height: req.body.height,
      year: req.body.year
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/dogs', (req, res) => {
  // Handle delete event here
    db.collection('dogs').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send('A stray dog was deleted')
    })
})
