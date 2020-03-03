// 时间戳, 立即执行
function throttle_timestamp(fn, wait) {
    var previous = 0
    return function() {
        var now = Date.now()
        var context = this
        var args = arguments
        if (now - previous > wait) {
            fn.apply(context, args)
            previous = now
        }
    }
}

// 定时器，延后执行
function throttle_settimeout(fn, wait) {
    var timeout
    return function() {
        var context = this
        var args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(context, args)
            }, wait)
        }
    }
}

module.exports = {
    throttle_timestamp,
    throttle_settimeout
}