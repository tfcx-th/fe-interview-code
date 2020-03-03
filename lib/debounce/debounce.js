function debounce(fn, wait, immediate) {
    var timeout
    return function() {
        var context = this
        var args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            var callnow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if (callnow) fn.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                fn.apply(context, args)
            }, wait)
        }
    }
}

module.exports = debounce