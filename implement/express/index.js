/**
 * 1. app.use() 用来注册中间件
 * 2. 遇到 HTTP 请求，根据 path 和 method 判断触发哪些
 * 3. 实现 next 机制
 */

const http = require('http')

const slice = Array.prototype.slice

class MyExpress {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    use() {
        const info = this._register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this._register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this._register.apply(this, arguments)
        this.routes.post.push(info)
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            const { url, method } = req
            res.json = data => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const middlewareList = this._match(method.toLowerCase(), url)
            this._handle(req, res, middlewareList)
        })
        server.listen(...args)
    }

    // next 机制
    _handle(req, res, list) {
        const next = () => {
            // 拿到第一个中间件
            const middleware = list.shift()
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next)
            }
        }
        next()
    }

    // 内部注册中间件
    _register(path) {
        const info = {}
        if (typeof path === 'string') {         // 第一个参数为路由
            info.path = path
            // 将剩余参数转换成数组，从第二个开始
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            // 将剩余参数转换成数组，从第一个开始
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    // 获取匹配的中间件
    _match(method, url) {
        let mwList = []
        if (url === '/favicon.ico') return mwList
        // 获取当前路由需要的中间件
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])
        curRoutes.forEach(route => {
            // 匹配父路由
            if (url.indexOf(route.path) === 0) {
                mwList = mwList.concat(route.stack)
            }
        })
        return mwList
    }
}

module.exports = () => new MyExpress()
