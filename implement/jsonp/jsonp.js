function jsonp({url, params = {}, cb} = {}) {
    return new Promise((resolve, reject) => {
        window[cb] = function(data) {
            resolve(data)
            document.body.removeChild(script)
        }
        params = { ...params, cb }
        const arr = []
        for (let key in params) {
            arr.push(`${key}=${params[key]}`)
        }
        const script = document.createElement('script')
        script.src = `${url}?${arr.join('&')}`
        document.body.appendChild(script)
    })
}