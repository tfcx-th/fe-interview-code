export default class Dep {
    constructor() {
        this.subs = []
    }

    static target = null

    addSub(watcher) {
        if (Dep.target) {
            this.subs.push(watcher)
        }
    }

    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}