const deepcopy = require('./deepcopy')

test('deep copy', () => {
    const obj = {
        a: 1,
        b: {
            name: 'lalla',
            have: [1, { c: 'lalala' }],
            sayHi: function () {
                console.log('hi')
            }
        },
        c: [1, 2]
    }
    const obj1 = deepcopy(obj)

    expect(obj1).toStrictEqual(obj)
    expect(obj1.b === obj.b).toBe(false)
    expect(obj1.b.have === obj.b.have).toBe(false)
    expect(obj1.b.have[1] === obj.b.have[1]).toBe(false)
    expect(obj1.b.sayHi === obj.b.sayHi).toBe(true)
    expect(obj1.c === obj.c).toBe(false)
})