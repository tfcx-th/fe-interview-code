const data = {
    text: 'default'
}

const div = document.querySelector('#reactive')
const input = document.querySelector('#input')

Object.defineProperty(data, 'text', {
    set(newVal) {
        input.value = newVal
        div.innerHTML = newVal
    }
})

input.addEventListener('keyup', e => {
    data.text = e.target.value
})