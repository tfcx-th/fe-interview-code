/**
 * 构造继承
 * 在子类构造函数的内部调用超类的构造函数
 * 公有属性和方法无法复用，而且，在超类原型中定义的方法，子类也无法使用
 */
function Super() {
    this.superproperty = 'hello'
    this.showValue = function () {
        console.log(this.superproperty)
    }
}

function Sub(property) {
    Super.call(this)
    this.subproperty = property
}
