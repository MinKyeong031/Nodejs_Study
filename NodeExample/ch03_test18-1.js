function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
}
Person.prototype.go = function(location) {
    console.log(location + '에서 봄방학을 보냅니다.');
}
Person.prototype.study = function(language) {
    console.log(language + '를 8시에 공부합니다.');
}

var person01 = new Person('3104김민경', 10);
var person02 = new Person('김연아', 32);
var person03 = new Person('박지성', 41);

console.log(person01.name + ' 객체의 walk(10)을 호출합니다.');
person01.walk(10);

console.log(person02.name + ' 객체의 go("대구")을 호출합니다.');
person02.go("대구");

console.log(person03.name + ' 객체의 study("스페인어")을 호출합니다.');
person03.study("스페인어");