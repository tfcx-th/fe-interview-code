const { PersonFactory, PersonConstructor, PersonPrototype, PersonCombine } = require('./createClass')

test('test factory', () => {
    const p1 = PersonFactory('Mike', 23)
    const p2 = PersonFactory('Tom', 21)
    expect(p1.name === 'Mike').toBe(true)
    expect(p2.sayName()).toBe('Tom')
    expect(p1.sayName === p2.sayName).toBe(false)
    expect(p1 instanceof PersonFactory).toBe(false)
})

test('test constructor', () => {
    const p1 = new PersonConstructor('Mike', 23)
    const p2 = new PersonConstructor('Tom', 21)
    expect(p1.name === 'Mike').toBe(true)
    expect(p2.sayName()).toBe('Tom')
    expect(p1.sayName === p2.sayName).toBe(false)
    expect(p1 instanceof PersonConstructor).toBe(true)
})

test('test prototype', () => {
    const p1 = new PersonPrototype()
    const p2 = new PersonPrototype()
    expect(p1.name === p2.name).toBe(true)
    expect(p1.sayName === p2.sayName).toBe(true)
    expect(p1 instanceof PersonPrototype).toBe(true)
})

test('test combine', () => {
    const p1 = new PersonCombine()
    const p2 = new PersonCombine()
    expect(p1.name === p2.name).toBe(true)
    expect(p1.sayName === p2.sayName).toBe(true)
    expect(p1 instanceof PersonCombine).toBe(true)
})