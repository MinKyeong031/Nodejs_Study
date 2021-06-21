function User(id, name, mail) {
    this.id = id;
    this.name = name;
    this.mail = mail;
}

User.prototype.getUser = function () {
    return { id: this.id, name: this.name, mail: this.mail };
}

User.prototype.group = { id: '3104', name: '친구' };

User.prototype.printUser = function () {
    console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name);
}

User.prototype.printUsermailadd = function () {
    console.log('user 이름 : %s, group 이름 : %s, user 메일 : %s', this.name, this.group
        .name, this.mail + ' 입니다.');
}

module.exports = new User('3104', '3104김민경', 'mingyg.kim@gmail.com');