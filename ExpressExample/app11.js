var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
const cookieParser = require('cookie-parser');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

// 라우터 객체 참조
var router = express.Router();

router.route('/process/setUserCookie').get(function(req, res){
  console.log('/process/setUserCookie 호출됨');
  res.cookie('user', {
    id: 'mike', 
    name: '소녀시대', 
    authorized: true
  });
  // redirect로 응답
  res.redirect('/process/showCookie');
})

router.route('/process/showCookie').get(function(req, res){
  console.log('/process/showCookie 호출됨');
  res.send(req.cookies);
})

// 라우터 객체를 app 객체에 등록
app.use('/', router);

app.all('*', function(req, res){
  res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
})

http.createServer(app).listen(app.get('port'), function(){
  console.log(`Express 서버가 3000번 포트에서 시작됨`);
});