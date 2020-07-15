/**
 * 原型式继承 Object.create
 * 创建一个临时的构造函数，然后将传入的对象作为构造函数的原型，最后返回这个构造函数的一个实例
 */
function inherit(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}

const person = {
    name: 'Mike',
    age: 22
};

const p1 = inherit(person);

p1.name = 'Tom';
p1.age = '26';
p1.sayName = function () {
    console.log(this.name);
};

p1.sayName();