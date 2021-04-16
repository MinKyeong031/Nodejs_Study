var express = require('express');
var http = require('http');

// 익스프레스 객체 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
  console.log('첫 번째 미들웨어에서 요청을 처리함');

  // 원본
  // var person = {name: '방탄소년단', age: 20};
  // res.send(person);
  // var personStr = JSON.stringify(person);
  // res.send(personStr);
  // res.writeHead('200', {'Content-Type':'application/json; charset=utf8'});
  // res.write(personStr);
  // res.end();

  // 01 X   end로 json 쓸 수 없음 (send)써야함
  // var person ={name:'소녀시대', age:20};
  // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  // res.end(person);

  // 02 O
  // var person ={name:'소녀시대',age:20};
  // var personStr = JSON.stringify(person);
  // res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
  // res.end(personStr);

  // 03 X   writeHead를 지정 안함
  // var person ={name:'소녀시대',age:20};
  // var personStr = JSON.stringify(person);
  // res.end(personStr);
  
  // 04 O 
  // 데이터는 HTML 문자열
  // var person ={name:'소녀시대',age:20};
  // var personStr = JSON.stringify(person);
  // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  // res.end(personStr);

  // 05 O
  // var person ={name:'소녀시대',age:20};
  // var personStr = JSON.stringify(person);
  // res.send(personStr);

  // 06 O
  // var person ={name:'소녀시대',age:20};
  // res.send(person);

  // 07 O
  // req.user = 'sunny';
  // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  // res.end('<h1>Express 서버에서 ' + req.user + '를 res,wirteHead와 end로 응답한 결과입니다.</h1>');

  // 08 
  req.user = 'sunny';
  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.send('<h1>Express 서버에서 ' + req.user + '를 res,wirteHead와 end로 응답한 결과입니다.</h1>');

});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});