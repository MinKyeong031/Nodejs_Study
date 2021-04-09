// 익스프레스 객체 생성
var express = require('express');
var http = require('http');
var app = express();

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    // 실습 1 - X
    // var person = {name: '소녀시대', age: 20};
    // res.writeHead('200', {"Content-Type":"text/html; charset=utf8"});
    // res.end(person);

    // 실습 2 - {name: '소녀시대', age: 20}
    // var person = {name: '소녀시대', age: 20};
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', {"Content-Type":"application/json; charset=utf8"});
    // res.end(personStr);

    // 실습 3 - X   writeHead가 없음
    // var person = {name: '소녀시대', age: 20};
    // var personStr = JSON.stringify(person);
    // res.end(personStr);

    // 실습 4 - {name: '소녀시대', age: 20}
    // var person = {name: '소녀시대', age: 20};
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', {"Content-Type":"text/html; charset=utf8"});
    // res.end(personStr);

    // 실습 5 - {name: '소녀시대', age: 20}
    // var person = {name: '소녀시대', age: 20};
    // var personStr = JSON.stringify(person);
    // res.send(personStr);

    // 실습 6 - {name: '소녀시대', age: 20}
    // var person = {name: '소녀시대', age: 20};
    // res.send(person);

    // 실습 7 - Express 서버에서 sunny를 res, writeHead와 end로 응답한 결과입니다.
    // req.user = 'sunny';
    // res.writeHead('200', {"Content-Type":"text/html; charset=utf8"});
    // res.end('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 end로 응답한 결과입니다.</h1>');

    // 실습 8 - Express 서버에서 sunny를 res, writeHead와 end로 응답한 결과입니다.
    // req.user = 'sunny';
    // res.send('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 end로 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});