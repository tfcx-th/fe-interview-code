/**
 * 寄生式继承
 * 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式增强对象
 */
function inherit(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}

function createAnother(obj) {
    let clone = inherit(obj);
    clone.sayHi = function () {
        console.log('hi');
    };
    return clone;
};

const person = {
    name: 'Mike',
    age: 22
};

const p1 = createAnother(person);

p1.sayHi();