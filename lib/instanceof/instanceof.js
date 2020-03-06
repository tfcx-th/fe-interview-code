function instanceOf(l, r) {
    var O = r.prototype
    l = l.__proto__
    while(true) {
        if (l === null) return false
        if (O === l) return true
        l = l.__proto__
    }
}

module.exports = instanceOf