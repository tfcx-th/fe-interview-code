import Observer from './observer.mjs'
import Compile from './compile.mjs'

export default class Mymvvm {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        if (this.$el) {
            new Observer(this.$data)
            new Compile(this.$el, this)
        }
    }
}