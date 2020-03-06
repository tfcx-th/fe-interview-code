require('./reduce')

test('test myreduce', () => {
    expect([1, 2, 3, 4].myreduce((accumulator, cur) => accumulator + cur)).toBe(10)
})