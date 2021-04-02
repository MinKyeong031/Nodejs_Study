var fs = require('fs');

var infile = fs.createReadStream('./output.txt', { flags: 'r' });
var outfile = fs.createWriteStream('./output2.txt', { flags: 'w' });

infile.on('data', function(data) {
    console.log('3104 김민경 - 읽어들인 데이터', data);
    console.log(data);
    console.log('첫 번째 버퍼의 문자열 : %s\n', data.toString());
    outfile.write(data);
});

infile.on('end', function() {
    console.log('파일 읽기 종료.');
    outfile.end(function() {
        console.log('파일 쓰기 종료.');
    });
});