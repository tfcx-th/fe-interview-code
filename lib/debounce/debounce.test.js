const debounce = require('./debounce')

jest.useFakeTimers()

test('debounce dom', () => {
    document.body.innerHTML = `
        <div id="container"></div>
    `
    const container = document.querySelector('#container')
    let count = 1
    const mockCallback = jest.fn(() => {
        container.innerHTML = count++
    })

    container.onclick = debounce(mockCallback, 300, false)
    for (let i = 0; i < 20; i++) {
        container.click()
    }
    expect(container.innerHTML).toBe('')
    expect(mockCallback).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(1000)
    expect(container.innerHTML).toBe('1')

    container.onclick = debounce(mockCallback, 300, true)
    for (let i = 0; i < 20; i++) {
        container.click()
    }
    expect(container.innerHTML).toBe('2')
    expect(mockCallback).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(1000)
    expect(container.innerHTML).toBe('2')
})