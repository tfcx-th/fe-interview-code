import './index.scss'

function* gene() {
    yield 1
    yield 2
    yield 3
}

function proA() {
    return Promise.resolve('promise-a')
}

function proB() {
    return Promise.resolve('promise-b')
}

async function fn() {
    await proA()
    await proB()
}