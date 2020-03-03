Function.prototype.myapply = function(thisArg, arr) {
    if (typeof this !== 'function') {
        throw new TypeError('Apply must be called on a function')
    }
    arr = arr || []
    thisArg = thisArg || window
    var args = []
    for (var i = 0; i < arr.length; i++) {
        args.push('arr[' + i + ']')
    }
    thisArg._func = this
    var result = eval('thisArg._func(' + args + ')')
    delete thisArg._func
    return result
}