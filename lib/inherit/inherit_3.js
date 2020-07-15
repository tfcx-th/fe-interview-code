/**
 * 组合继承
 * 使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承
 * 能通过在原型上定义方法实现函数的复用，同时能保证每个实例有自己的属性
 * 必须调用两次父类的构造函数，生成两份实例
 */
function Super(name, age) {
    this.name = name
    this.age = age
}

Super.prototype.sayName = function () {
    console.log(this.name)
}

function Sub(skill, name, age) {
    this.skill = skill
    Super.call(this, name, age)
}

Sub.prototype = new Super()
Sub.prototype.constructor = Sub
Sub.prototype.saySkill = function () {
    console.log(this.skill)
}