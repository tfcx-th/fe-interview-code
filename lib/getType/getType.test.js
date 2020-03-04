const getType = require('./getType')

test('get value type', () => {
    expect(getType(true)).toBe('boolean')
    expect(getType(null)).toBe('null')
    expect(getType({ a: 1 })).toBe('object')
    expect(getType([1, 2])).toBe('array')
})