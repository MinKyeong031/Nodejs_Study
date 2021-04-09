var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser')
, static = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use('/', static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  console.log('첫번째 미들웨어에서 요청을 처리함.');
  
  res.redirect('/');
}); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express 서버가 3000번 포트에서 시작됨');
});