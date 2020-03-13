const insertsort = require('./insertsort')

let arr = [2, 1, 6, 4, 8, 3, 1]

test('insertsort', () => {
    insertsort(arr)
    expect(arr).toStrictEqual([1, 1, 2, 3, 4, 6, 8])
})