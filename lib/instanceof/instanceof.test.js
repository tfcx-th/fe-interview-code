const instanceOf = require('./instanceof')

function Person1(name, age) {
    this.name = name
    this.age = age
}

test('test instanceOf', () => {
    expect(instanceOf(new Person1, Person1)).toBe(true)
    expect(instanceOf(new Person1, Object)).toBe(true)
    expect(instanceOf(new Person1, Array)).toBe(false)
})
