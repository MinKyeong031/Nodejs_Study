// 에러
var user2 = require('./user2');
console.dir(user);
function showUser() {
    return user2.getUser().name + ', ' + user2.group.name;
}
console.log('사용자 정보 : %s', showUser())