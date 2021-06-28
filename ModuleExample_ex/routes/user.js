/**
 * 데이터베이스 사용하기
 * 
 * 비밀번호 암호화와 입력값 유효성 확인
 *
 * 웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
 * (먼저 사용자 추가 후 로그인해야 함)
 *    http://localhost:3000/public/login.html
 *    http://localhost:3000/public/adduser.html
 *    http://localhost:3000/public/listuser.html
 */

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');



// mongoose 모듈 사용
var mongoose = require('mongoose');

// crypto 모듈 불러들이기
var crypto = require('crypto');


// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));



//===== 데이터베이스 연결 =====//

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;

var login = function (req, res) {
  console.log('user 모듈 안에 있는 login 호출됨.');
  // 요청 파라미터 확인
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

  var database = req.app.get('database');

  // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
  if (database.db) {
    authUser(database, paramId, paramPassword, function (err, docs) {
      // 에러 발생 시, 클라이언트로 에러 전송
      if (err) {
        console.error('사용자 로그인 중 에러 발생 : ' + err.stack);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 로그인 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      // 조회된 레코드가 있으면 성공 응답 전송
      if (docs) {
        console.dir(docs);

        // 조회 결과에서 사용자 이름 확인
        var username = docs[0].name;

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
        res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();

      } else {  // 조회된 레코드가 없는 경우 실패 응답 전송
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>로그인  실패</h1>');
        res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      }
    });
  } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
    res.end();
  }
};

var adduser = function (req, res) {
  console.log('user 모듈 안에 있는 adduser 호출됨.');
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  var paramName = req.body.name || req.query.name;

  console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

  var database = req.app.get('database');

  // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
  if (database.db) {
    addUser(database, paramId, paramPassword, paramName, function (err, addedUser) {
      // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
      if (err) {
        console.error('사용자 추가 중 에러 발생 : ' + err.stack);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      // 결과 객체 있으면 성공 응답 전송
      if (addedUser) {
        console.dir(addedUser);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가 성공</h2>');
        res.end();
      } else {  // 결과 객체가 없으면 실패 응답 전송
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가  실패</h2>');
        res.end();
      }
    });
  } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
};
var listuser = function (req, res) {
  console.log('user 모듈 안에 있는 listuser 호출됨.');
  var database = req.app.get('database');

  if (database.db) {
    // 1. 모든 사용자 검색
    database.UserModel.findAll(function (err, results) {
      // 에러 발생 시, 클라이언트로 에러 전송
      if (err) {
        console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      if (results) {  // 결과 객체 있으면 리스트 전송
        console.dir(results);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 리스트</h2>');
        res.write('<div><ul>');

        for (var i = 0; i < results.length; i++) {
          var curId = results[i]._doc.id;
          var curName = results[i]._doc.name;
          res.write('    <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
        }

        res.write('</ul></div>');
        res.end();
      } else {  // 결과 객체가 없으면 실패 응답 전송
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 리스트 조회  실패</h2>');
        res.end();
      }
    });
  } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
};

// 사용자를 인증하는 함수 : 아이디로 먼저 찾고 비밀번호를 그 다음에 비교하도록 함
var authUser = function (database, id, password, callback) {
  console.log('authUser 호출됨 : ' + id + ', ' + password);

  // 1. 아이디를 이용해 검색
  database.UserModel.findById(id, function (err, results) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log('아이디 [%s]로 사용자 검색결과', id);
    console.dir(results);

    if (results.length > 0) {
      console.log('아이디와 일치하는 사용자 찾음.');

      // 2. 패스워드 확인 : 모델 인스턴스를 객체를 만들고 authenticate() 메소드 호출
      var user = new UserModel({ id: id });
      var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
      if (authenticated) {
        console.log('비밀번호 일치함');
        callback(null, results);
      } else {
        console.log('비밀번호 일치하지 않음');
        callback(null, null);
      }

    } else {
      console.log("아이디와 일치하는 사용자를 찾지 못함.");
      callback(null, null);
    }

  });

}

//사용자를 추가하는 함수
var addUser = function (database, id, password, name, callback) {
  console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

  // UserModel 인스턴스 생성
  var user = new database.UserModel({ "id": id, "password": password, "name": name });

  // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
  user.save(function (err, addedUser) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log("사용자 데이터 추가함.");
    callback(null, addedUser);

  });
}

module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;