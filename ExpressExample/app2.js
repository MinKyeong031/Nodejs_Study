// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');

// 익스프레스 객체 생성
var app = express();

app.use(function(req, res, next){
  console.log('첫 번째 미들웨어에서 요청을 처리함');
  res.writeHead('200', {"Content-type":'text/html;charset=utf8'});
  res.end('<h1>Express 서버에서 응답한 결과입니다</h1>')
})

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express 서버가 3000번 포트에서 시작됨');
});