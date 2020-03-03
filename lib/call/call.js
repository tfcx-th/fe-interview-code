Function.prototype.mycall = function(thisArg) {
    if (typeof this !== 'function') {
        throw new TypeError('Call must be called on a function')
    }
    thisArg = thisArg || window
    // 取到参数，传给调用者
    var args = []
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    thisArg._func = this
    var result = eval('thisArg._func(' + args + ')')
    delete thisArg._func
    return result
}