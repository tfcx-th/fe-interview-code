function loader(source) {
    const reg = /url\((.+?)\)/g
    let cur
    let pos = 0
    const arr = ['let list = []']
    while (cur = reg.exec(source)) {
        let [matchUrl, relativeUrl] = cur
        let last = reg.lastIndex - matchUrl.length
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`)
        pos = reg.lastIndex
        // replace g
        arr.push(`list.push('url(' + require(${relativeUrl}) + ')')`)
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
    arr.push(`module.exports = list.join('')`)
    console.log(arr.join('\r\n'))
    return arr.join('\r\n')
}

module.exports = loader