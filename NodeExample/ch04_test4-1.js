var Calc = require('./calc33');
var calc = new Calc();
calc.emit('start');
calc.emit('cal', 'calculator');
calc.emit('vartrans', 'a', 'b');

var a = 10;
var b = 5;

console.log('a + b = ' + Calc.prototype.add(a, b));
console.log('a - b = ' + Calc.prototype.substract(a, b));
console.log('a * b = ' + Calc.prototype.multiply(a, b));
console.log('a / b = ' + Calc.prototype.divide(a, b));
console.log(Calc.title + '에 이벤트 종료됨.')