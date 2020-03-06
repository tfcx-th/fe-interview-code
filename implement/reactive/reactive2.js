const data = {
    text: 'default'
}

const div = document.querySelector('#reactive')
const input = document.querySelector('#input')

const proxy = new Proxy(data, {
    set(target, key, value) {
        target[key] = value
        input.value = value
        div.innerHTML = value
    }
})

input.addEventListener('keyup', e => {
    proxy.text = e.target.value
})