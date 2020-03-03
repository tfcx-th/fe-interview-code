require('./call')

const foo = function () {
    return this.name
}

const bar = {
    name: 'Mike'
}

test('test mycall', () => {
    expect(foo.mycall(bar))
        .toBe('Mike')
}) 


function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

test('test mycall', () => {
    expect(new Food('cheese', 5).name)
        .toBe('cheese')
}) 