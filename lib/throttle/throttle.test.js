const throttle1 = require('./throttle').throttle_timestamp
const throttle2 = require('./throttle').throttle_settimeout

jest.useFakeTimers()

test('time_stamp_throttle dom', () => {
    document.body.innerHTML = `
        <div id="container"></div>
    `
    const container = document.querySelector('#container')
    let count = 1
    const mockCallback = jest.fn(() => {
        container.innerHTML = count++
    })
    container.onclick = throttle1(mockCallback, 1000)

    container.click()
    expect(container.innerHTML).toBe('1')
    expect(mockCallback).toHaveBeenCalledTimes(1)

    setTimeout(() => {
        container.click()
        expect(container.innerHTML).toBe('2')
        expect(mockCallback).toHaveBeenCalledTimes(2)
    }, 2000)
})

test('settimeout_throttle dom', () => {
    document.body.innerHTML = `
        <div id="container"></div>
    `
    const container = document.querySelector('#container')
    let count = 1
    const mockCallback = jest.fn(() => {
        container.innerHTML = count++
    })
    container.onclick = throttle2(mockCallback, 1000)

    container.click()
    expect(container.innerHTML).toBe('')
    expect(mockCallback).toHaveBeenCalledTimes(0)

    setTimeout(() => {
        container.click()
        expect(container.innerHTML).toBe('1')
        expect(mockCallback).toHaveBeenCalledTimes(2)
    }, 2200)
})