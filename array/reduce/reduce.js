Array.prototype.myreduce = function(callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    const arr = this, len = arr.length
    let k = 0
    let accumulator = arguments.length > 1 ? arguments[1] : arr[k++]
    while (k < len) {
        if (k in arr) {
            accumulator = callback(accumulator, arr[k], k, arr)
        }
        k++
    }
    return accumulator
}