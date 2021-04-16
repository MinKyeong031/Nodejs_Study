var express = require('express');
var http = require('http');

var app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
  console.log('첫 번째 미들웨어에서 요청');
  res.redirect('https://google.co.kr');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express 서버가 3000번 포트에서 시작됨');
});