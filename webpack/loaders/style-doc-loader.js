const loaderUtils = require('loader-utils')

function loader(source) {
    return str = `
        let style = document.createElement('style')
        style.innerHTML = ${JSON.stringify(source)}
        document.head.appendChild(style)
    `
}

loader.pitch = function (remainingRequest) {
    const str = `
        let style = document.createElement('style')
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
        document.head.appendChild(style)
    `
    return str
}

module.exports = loader