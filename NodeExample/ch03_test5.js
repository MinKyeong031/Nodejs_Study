var Person = {};
Person["age"] = 20;
Person["name"] = '방탄소년단';
Person.add = function(a, b) {
    return a + b;
};
console.log('더하기 : %d', Person.add(10, 10));