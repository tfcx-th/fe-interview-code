class Event {
    constructor() {
        this._subscriberList = {}
    }

    // 订阅
    on(key, cb) {
        if (!this._subscriberList[key]) {
            this._subscriberList[key] = []
        }
        this._subscriberList[key].push(cb)
    }

    // 发布
    emit(key, ...args) {
        const list = this._subscriberList[key]
        if (!list || list.length === 0) return false
        list.forEach(cb => {
            cb.apply(this, args)
        })
    }

    remove(key, cb) {
        const list = this._subscriberList[key]
        if (!list || list.length === 0) return false
        // 如果没有传入回调函数，表示取消 key 对应的所有订阅
        if (!cb) {
            this._subscriberList[key] = []
            return
        }
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i] === cb) {
                list.splice(i, 1)
            }
        }
    }
}

module.exports = Event