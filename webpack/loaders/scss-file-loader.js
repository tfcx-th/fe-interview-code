const scss = require('node-sass')

function loader(source) {
    const cb = this.async()
    scss.render({
        file: this.resourcePath
    }, (err, result) => {
        cb(null, result.css.toString())
    })
}

module.exports = loader