// 모듈 추가
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
const cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
var app = express();

// 포트 설정
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(static(path.join(__dirname, 'public')));
app.use(static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, basename + Date.now() + extension);
    }
});
var upload = multer({
    storage: storage,
    limits: {
        files: 12,
        fileSize: 1024 * 1024 * 1024
    }
});

var router = express.Router();

router.route('/process/login').post(function (req, res) {
    console.log('/process/login 호출됨.');
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    if (req.session.user) {
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        res.redirect('/product.html');
    } else {
        req.session.user = {
            id: paramId,
            name: '김민경',
            authorized: true
        };

        res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<h1>3104_김민경_로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><button><a href='/process/product'>상품 페이지로 이동하기</a></button>");
        res.write("<br><br><button><a href='/photomulti3104.html'>파일업로드로 이동하기</a></button>");
        res.end();
    }
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 호출됨.');
    if (req.session.user) {
        console.log('로그아웃합니다.');
        req.session.destroy(function (err) {
            if (err) { throw err; }
            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/login2.html');
        });
    } else {
        console.log('아직 로그인 되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

router.route('/process/photo').post(upload.array('photo', 12), function (req, res) {
    console.log('/process/photo 호출됨.');
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    try {
        var files = req.files;

        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;

        if (Array.isArray(files)) {
            // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);
            for (var index = 0; index < files.length; index++) {
                console.dir('#===== 업로드된' + (index + 1) + '첫번째 파일 정보 =====#')
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
                console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ',' + size);

                res.write('<h3>3104_김민경님 ' +(index + 1) + ' 번째 파일 업로드 성공</h3>');
                res.write('<hr/>');
                res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
                res.write('<p>MIME TYPE : ' + mimetype + '</p>');
                res.write('<p>파일 크기 : ' + size + '</p>');
                res.end();
            }
            res.write("<button><a href='/process/product'>상품페이지로 이동하기</a></button>");
        }
    } catch (err) {
        console.dir(err.stack);
    }//tray-catch-end;
}); //router.rout('/process/photo')-end

router.route('/process/product').get(function (req, res) {
    console.log('/process/product 호출됨.');
    if (req.session.user) {
        res.redirect('/product.html');
    } else {
        res.redirect('/login2.html');
    }
});

app.use('/', router);

app.post('/', function(req, res){
  res.redirect('/');
})

var errorHandler = expressErrorHandler({
  satic: {
    '404': './public/404.html'
  }
})

http.createServer(app).listen(app.get('port'), function () {
    console.log(`Express server listening on port 3000`);
});