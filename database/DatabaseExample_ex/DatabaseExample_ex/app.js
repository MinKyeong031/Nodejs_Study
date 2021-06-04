//테스트용 데이터 입력 >db.users.insert({"id" : "test01" , "name" : "소녀시대", "password" : "123456"})
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
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


//===== 데이터베이스 연결 =====//

// 몽고디비 모듈 사용



// 데이터베이스 객체를 위한 변수 선언


//데이터베이스에 연결

	// 데이터베이스 연결 정보
	
	
	// 데이터베이스 연결
	
		
		










//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교



    // 요청 파라미터 확인


	

    
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증

			
				
				
				// 조회된 레코드가 있으면 성공 응답 전송



    // 조회 결과에서 사용자 이름 확인








			 // 조회된 레코드가 없는 경우 실패 응답 전송








				         // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송







													
// 라우터 객체 등록
app.use('/', router);


// 사용자를 인증하는 함수
























// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출

   
});