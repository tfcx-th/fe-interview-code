import { directive, handleText } from './compileUtils.mjs'

export default class Compile {
    constructor(el, vm) {
        this.el = isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        if (this.el) {
            const fragment = this.nodeToFragment(this.el)
            this.compile(fragment)
            this.el.appendChild(fragment)
        }
    }

    nodeToFragment(el) {
        const fragment = document.createDocumentFragment()
        while (el.firstChild) {
            fragment.appendChild(el.firstChild)
        }
        return fragment
    }

    compile(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            if (isElementNode(node)) {
                this.compileElement(node)
                this.compile(node)
            } else {
                this.compileText(node)
            }
        })
    }

    // 编译带 v-xxx 指令的元素节点
    compileElement(node) {
        Array.from(node.attributes).forEach(attr => {
            if (isDirective(attr.name)) {
                const type = attr.name.slice(2)
                const expr = attr.value
                directive[type](this.vm, node, expr)
            }
        })
    }

    compileText(node) {
        const text = node.textContent
        if (/\{\{([^}]+)\}\}/g.test(text)) {
            handleText(this.vm, node, text)
        }
    }
}

function isElementNode(node) {
    return node.nodeType === 1
}

function isDirective(name) {
    return name.includes('v-')
}