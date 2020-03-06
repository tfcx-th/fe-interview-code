import Watcher from './watcher.mjs'

export const updater = {
    modelUpdater(node, value) {
        node.value = value
    },
    textUpdater(node, value) {
        node.textContent = value
    }
}

export const directive = {
    model(vm, node, expr) {
        const handleUpdate = updater.modelUpdater
        new Watcher(vm, expr, newVal => {
            handleUpdate && handleUpdate(node, getVal(vm, expr))
        })
        node.addEventListener('input', e => {
            let newVal = e.target.value
            setVal(vm, expr, newVal)
        })
        handleUpdate && handleUpdate(node, getVal(vm, expr))
    }
}

export function handleText(vm, node, text) {
    const handleUpdate = updater.textUpdater
    const value = getTextVal(vm, text)
    text.replace(/\{\{([^}]+)\}\}/g, (...args) => {
        new Watcher(vm, args[1].trim(), newVal => {
            handleUpdate && handleUpdate(node, getTextVal(vm, newVal))
        })
    })
    handleUpdate && handleUpdate(node, value)
}

// 根据 expr 返回实例上对应的数据
export function getVal(vm, expr) {
    expr = expr.split('.')
    return expr.reduce((accumulate, cur) => {
        return accumulate[cur]
    }, vm.$data)
}

// 获取编译文本后的结果
export function getTextVal(vm, text) {
    return text.replace(/\{\{([^}]+)\}\}/g, (...args) => {
        return getVal(vm, args[1].trim())
    })
}

// 设置新值
export function setVal(vm, expr, value) {
    expr = expr.split('.')
    return expr.reduce((accumulate, cur, index) => {
        if (index === expr.length - 1) {
            return accumulate[cur] = value
        }
        return accumulate[cur]
    }, vm.$data)
}