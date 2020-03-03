require('./apply')

const foo = function () {
    return this.name
}

const bar = {
    name: 'Mike'
}

test('test myapply 1', () => {
    expect(foo.myapply(bar))
        .toBe('Mike')
})


function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.myapply(this, [name, price]);
    this.category = 'food';
}

test('test myapply 2', () => {
    expect(new Food('cheese', 5).name)
        .toBe('cheese')
}) 