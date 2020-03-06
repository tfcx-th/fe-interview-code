const shuffle = require('./shuffle.js')

test('shuffle test', () => {
    const times = 1000000
    let cache = []
    for (let i = 0; i < times; i++) {
        const _arr = shuffle([1, 2, 3, 4])
        cache[_arr[0]] ? cache[_arr[0]]++ : cache[_arr[0]] = 1
    }
    cache = cache.map(item => {
        return item / times
    }).slice(1)
    expect(cache.every(item => {
        return item >= 0.24 && item <= 0.26 
    })).toBe(true)
})