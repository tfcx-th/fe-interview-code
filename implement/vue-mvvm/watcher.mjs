import Dep from './dep.mjs'
import { getVal } from './compileUtils.mjs'

export default class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.value = this._get()
    }

    update() {
        const newVal = getVal(this.vm, this.expr)
        const oldVal = this.value
        if (newVal !== oldVal) {
            this.cb(newVal)
        }
    }

    _get() {
        Dep.target = this
        // getVal 触发 get
        const value = getVal(this.vm, this.expr)
        Dep.target = null
        return value
    }
}