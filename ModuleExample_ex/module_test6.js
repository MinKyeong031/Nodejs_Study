var require = function (path) {
    var exports = {
        getUser: function () {
            return { id: '3104', name: '분리전_3104김민경' };
        },
        group: { id: 'group01', name: '친구' }
    }
    return exports;
}
var user = require();
function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}
console.log('사용자 정보 : %s', showUser());