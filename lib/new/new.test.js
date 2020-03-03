const mynew = require('./new')

function Person1(name, age) {
    this.name = name
    this.age = age
}

Person1.prototype.sayYourName = function () {
    return this.name
}

test('test mynew', () => {
    expect(mynew(Person1, 'tfcx', 23))
        .toStrictEqual(new Person1('tfcx', 23))
})

function Person2(name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

test('test mynew 2', () => {
    expect(mynew(Person2, 'tfcx', 23))
        .toStrictEqual({ name: 'tfcx', habit: 'Games' })
})
