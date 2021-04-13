var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser')
, static = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use('/', static(path.join(__dirname, 'public')));

//GET method route
// app.get('/', function (req, res) {
//   res.send('GET request to the homepage');
//   });
// POST method route
// app.post('/', function (req, res) {
// res.send('POST request to the homepage');
// });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express 서버가 3000번 포트에서 시작됨');
});