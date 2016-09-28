var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function homepage (req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/experiences', function index (req, res){
  db.Experience.find({}, function(err, list) {
    console.log(list);
    res.json(list);
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('server is running');
});
