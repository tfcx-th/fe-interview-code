/** 
 * 寄生组合继承
 * 使用寄生式继承来继承超类的原型，然后再将结果指定给子类型的原型
 */
function inherit(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}

function inheritPrototype(subType, superType) {
    let prototype = inherit(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}