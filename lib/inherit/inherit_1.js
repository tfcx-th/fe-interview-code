/**
 * 原型链继承
 * 将父类的实例作为子类的原型
 */
function Super() {
    this.superproperty = true
}

Super.prototype.getSuperValue = function () {
    console.log(this.superproperty)
}

function Sub() {
    this.subproperty = false
}

Sub.prototype = new Super()
Sub.prototype.getSubValue = function () {
    console.log(this.subproperty)
}
