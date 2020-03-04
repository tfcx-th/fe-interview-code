function shuffle(arr) {
    const len = arr.length
    for (let i = len; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]]
    }
    return arr
}

module.exports = shuffle