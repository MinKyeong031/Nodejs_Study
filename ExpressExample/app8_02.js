// Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
, static = require('serve-static');
const { resolveSoa } = require('dns');
const { allowedNodeEnvironmentFlags } = require('process');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(express.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(express.json())

// app.use('/public', 추가
app.use('/public',static(path.join(__dirname, 'public')));
// 라우터 객체 참조
var router = express.Router();
// 라우팅 함수 등록
router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login/:name 처리함.');
    var paramName = req.params.name;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});    
app.use('/',router);

app.all('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});