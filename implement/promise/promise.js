// 定义三种常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        if (!isFunc(executor)) {
            throw new TypeError('MyPromise only accept function type')
        }
        // 设置初始状态
        this._status = PENDING
        this._value = undefined
        // 设置成功回调函数队列
        this._fulfilledQueues = []
        // 设置失败回调函数队列
        this._rejectedQueues = []
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch(err) {
            this._reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            const fulfilled = function(value) {
                try {
                    if (!isFunc(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        const res = onFulfilled(value)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch(err) {
                    onRejectedNext(err)
                }
            }
            const rejected = function(err) {
                try {
                    if (!isFunc(onRejected)) {
                        onRejectedNext(err)
                    } else {
                        const res = onRejected(err)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch(err) {
                    onRejectedNext(err)
                }
            }
            switch (this._status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                case FULFILLED:
                    fulfilled(this._value)
                    break
                case REJECTED:
                    rejected(this._value)
                    break
                default:
                    break
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(onFinally) {
        return this.then(val => {
            MyPromise.resolve(onFinally()).then(() => val)
        }, err => {
            MyPromise.resolve(onFinally()).then(() => {
                throw err
            })
        })
    }

    static resolve(val) {
        if (val instanceof MyPromise) return val  
        return new MyPromise((resolve, reject) => {
            if (val && val.then && typeof val.then === 'function') {
                setTimeout(() => {
                    val.then(resolve, reject)
                }, 0)
            } else {
                resolve(val)
            }
        })
    }

    static reject(val) {
        return new MyPromise((resolve, reject) => {
            reject(val)
        })
    }

    static all(iterable) {
        const args = Array.from(iterable)
        return new MyPromise((resolve, reject) => {
            if (args.length === 0) return resolve([])
            let values = []
            let remain = args.length
            args.forEach((arg, index) => {
                MyPromise.resolve(arg).then(res => {
                    values[index] = res
                    remain -= 1
                    if (remain === 0) resolve(values)
                }, err => {
                    reject(err)
                })
            })
        })
    }

    static race(iterable) {
        return new MyPromise((resolve, reject) => {
            for (let p of iterable) {
                MyPromise.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    _resolve(val) {
        if (this._status !== PENDING) return
        setTimeout(() => {
            if (val instanceof MyPromise) {
                val.then(val => {
                    this._status = FULFILLED
                    this._value = val
                    this._fulfilledQueues.forEach(cb => cb(val))
                }, err => {
                    this._status = REJECTED
                    this._value = err
                    this._rejectedQueues.forEach(cb => cb(err))
                })
            } else {
                this._status = FULFILLED
                this._value = val
                this._fulfilledQueues.forEach(cb => cb(val))
            }
        }, 0)
    }

    _reject(err) {
        if (this._status !== PENDING) return
        setTimeout(() => {
            this._status = REJECTED
            this._value = err
            this._rejectedQueues.forEach(cb => cb(err))
        }, 0)
    }
}

function isFunc(fn) {
    return typeof fn === 'function'
}

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};

    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
}


module.exports = MyPromise