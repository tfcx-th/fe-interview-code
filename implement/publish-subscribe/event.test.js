const Event = require('./event')

const mock1 = jest.fn()
const mock2 = jest.fn()

const event = new Event();

event.on('a', mock1)
event.on('a', mock2)
event.on('b', mock1)

test('test publish-subscribe pattern', () => {
    event.emit('a')
    expect(mock1).toHaveBeenCalledTimes(1)
    event.emit('b')
    expect(mock1).toHaveBeenCalledTimes(2)
    expect(mock2).toHaveBeenCalledTimes(1)
    event.remove('b')
    event.emit('b')
    expect(mock1).toHaveBeenCalledTimes(2)
})