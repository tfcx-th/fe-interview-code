const quicksort = require('./quicksort')

let arr = [2, 1, 6, 4, 8, 3, 1]

test('quicksort', () => {
    quicksort(arr, 0, 6)
    expect(arr).toStrictEqual([1, 1, 2, 3, 4, 6, 8])
})