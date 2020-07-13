// 创建类的方法

/**
 * 工厂模式
 * 创建一个包含所有信息的对象，返回该对象
 * 每个属性和方法都被重新创建，无法被识别
 */
function PersonFactory(name, age) {
    const obj = new Object()
    obj.name = name
    obj.age = age
    obj.sayName = function () {
        return this.name
    }
    return obj
}

/**
 * 构造函数模式
 * 不显示的创建对象，将属性和方法赋值给 this，通过 new 调用
 * 每个属性和方法都被重新创建，但是可以被识别
 */
function PersonConstructor(name, age) {
    this.name = name
    this.age = age
    this.sayName = function () {
        return this.name
    }
}

/**
 * 原型模式
 * 用函数的 prototype 属性包含类的所有实例共享的的属性和方法
 * 使用这种方法所有实例都将取得相同的属性值，可以被识别
 */
function PersonPrototype() {}
PersonPrototype.prototype.name = 'Mike'
PersonPrototype.prototype.age = 21
PersonPrototype.prototype.sayName = function () {
    return this.name
}

/**
 * 组合使用构造函数模式和原型模式
 * 构造函数模式用于定义实例属性，原型模式用于定义方法和共有的属性
 * 可以被标识为类的实例，并且不用重复创建共有的方法和属性
 */
function PersonCombine(name, age) {
    this.name = name
    this.age = age
}
PersonCombine.prototype.sayName = function () {
    return this.name
}


module.exports = {
    PersonFactory,
    PersonConstructor,
    PersonPrototype,
    PersonCombine
}