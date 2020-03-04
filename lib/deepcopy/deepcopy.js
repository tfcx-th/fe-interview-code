const getType = require('../getType/getType')

function deepcopy(obj) {
    var type = getType(obj)
    switch (type) {
        case 'array':
            return deepcopyArray(obj)
        case 'object':
            return deepcopyObject(obj)
        default:
            return obj
    }
}

function deepcopyArray(array) {
    var _array = []
    for (var i = 0, len = array.length; i < len; i++) {
        _array[i] = deepcopy(array[i])
    }
    return _array
}

function deepcopyObject(object) {
    var _object = {}
    for (var key in object) {
        _object[key] = deepcopy(object[key])
    }
    return _object
}

module.exports = deepcopy