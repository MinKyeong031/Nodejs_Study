var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
const cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var multer = require('multer');
var fs = require('fs');
//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

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
        callback(null, basename+Date.now()+extension);
    }
});
var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

// 라우터 객체 참조
var router = express.Router();

router.route('/process/photo').post(upload.array('photo1', 1), function (req, res) {
    console.log('/process/photo 호출됨.');

    try {
        var files = req.files;

        console.dir('#===== 업로드된 첫번째 파일 정보 =====#')
        console.dir(req.files[0]);
        console.dir('#=====#')

        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;

        if (Array.isArray(files)) {
            // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);


            for (var index = 0; index < files.length; index++) {
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
            }
        } else { // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
            console.log("파일 갯수 : 1 ");

            originalname = files[index].originalname;
            filename = files[index].name;
            mimetype = files[index].mimetype;
            size = files[index].size;
        }
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename +
            ', ' + mimetype + ', ' + size);

        // 클라이언트에 응답 전송
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h3>파일 업로드 성공</h3>');
        res.write('<hr/>');
        res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
        res.write('<p>파일 크기 : ' + size + '</p>');
        res.end();
    } catch (err) {
        console.dir(err.stack);
    }//tray-catch-end;
}); //router.rout('/process/photo')-end

app.use('/', router);

http.createServer(app).listen(app.get('port'), function () {
    console.log(`Express 서버가 3000번 포트에서 시작됨`);
});