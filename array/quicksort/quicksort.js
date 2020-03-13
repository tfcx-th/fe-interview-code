module.exports = function quicksort(arr, start, end) {
    const len = arr.length
    if (len <= 1 || start >= end) return
    let index = partition(arr, start, end)
    quicksort(arr, start, index - 1)
    quicksort(arr, index + 1, end)
}

function partition(arr, start, end) {
    let pivot = arr[start]
    while (start < end) {
        while (arr[end] >= pivot && start < end) {
            end--
        }
        arr[start] = arr[end]
        while (arr[start] < pivot && start < end) {
            start++
        }
        arr[end] = arr[start]
    }
    arr[start] = pivot
    return start
}