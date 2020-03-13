const bubblesort = require('./bubblesort')

let arr = [2, 1, 6, 4, 8, 3, 1]

test('bubblesort', () => {
    bubblesort(arr)
    expect(arr).toStrictEqual([1, 1, 2, 3, 4, 6, 8])
})