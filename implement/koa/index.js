const http = require('http')

class MyKoa {
    constructor() {
        this.midddlewareList = []
    }

    use(mw) {
        this.midddlewareList.push(mw)
        return this
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            const ctx = this._createContext(req, res)
            return this._compose(this.midddlewareList)(ctx)
        })
        server.listen(...args)
    }

    _createContext(req, res) {
        const ctx = { req, res }
        ctx.query = req.query
        return ctx
    }

    // 组合中间件
    _compose(mwList) {
        return ctx => {
            const dispatch = function(i) {
                const mw = mwList[i]
                try {
                    return Promise.resolve(mw(ctx, () => dispatch(i + 1)))
                } catch (error) {
                    return Promise.reject(error)
                }
            }
            return dispatch(0)
        }
    }
}

module.exports = () => new MyKoa()