var Users = [{ name: '방탄소년단', age: 20 }, { name: '걸스데이', age: 22 }];
var add = function(a, b) {
    return a + b;
};
Users.push(add)
console.log('배열 요소의 수 : %d', Users.length);
console.log('세 번째 요소로 추가된 함수 실행 : %d', Users[2](10, 10));

console.log(Users[1], Users[2], Users[3]);
console.log(Users[0], Users[1], Users[2]);