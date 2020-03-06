import Dep from './dep.mjs'

export default class Observer {
    constructor(data) {
        this.observer(data)
    }

    observer(data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            this.observer(data[key])
        })
    }

    defineReactive(obj, key, value) {
        const self = this
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newVal) {
                if (newVal !== value) {
                    self.observer(newVal)
                    value = newVal
                    console.log(dep.subs)
                    dep.notify()
                }
            }
        })
    }
}