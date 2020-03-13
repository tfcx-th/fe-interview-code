module.exports = function bubblesort(arr) {
    const len = arr.length
    for (let i = len - 1; i > 0; i--) {
        let flag = true
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                flag = false
            }
        }
        if (flag) {
            break
        }
    }
}