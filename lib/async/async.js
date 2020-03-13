function myAsync(generateFn) {
    return new Promise((resolve, reject) => {
        const gen = generateFn()
        function step(nextFn) {
            let next
            try {
                next = nextFn()
            } catch (err) {
                return reject(err)
            }
            const { value, done } = next
            if (done) {
                return resolve(value)
            } else {
                Promise.resolve(value).then(() => {
                    step(() => gen.next())
                }, err => {
                    step(() => gen.throw(err))
                })
            }
        }
        step(() => gen.next())
    })
}