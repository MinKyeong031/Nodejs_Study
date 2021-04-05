var express = require('express')
    , http = require('http');
var app = express();

app.use(function (req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    //실습1-X
    // var person ={name:'소녀시대',age:20};
    // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    // res.end(person);

    //실습2
    // var person = { name: '소녀시대', age: 20 };
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', { 'Content-Type': 'application/json;charset=utf8' });
    // res.end(personStr);


    //실습3-X
    // var person = { name: '소녀시대', age: 20 };
    // var personStr = JSON.stringify(person);
    // res.end(personStr);

    //실습4
    // 데이터는 HTML 문자열
    // var person = { name: '소녀시대', age: 20 };
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    // res.end(personStr);

    //실습5
    // var person = { name: '소녀시대', age: 20 };
    // var personStr = JSON.stringify(person);
    // res.send(personStr);

    //실습6
    // var person = { name: '소녀시대', age: 20 };
    // res.send(person);


    //실습7
    // req.user = 'sunny';
    // res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    // res.end('<h1>Express 서버에서 ' + req.user + '를 res,wirteHead와 end로 응답한 결과입니다.</h1>');

    //실습8
    // req.user = 'sunny';
    // res.send('<h1>Express 서버에서 ' + req.user + '를 send로 응답한 결과입니다.</h1>');
});
http.createServer(app).listen(3000, function () {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});