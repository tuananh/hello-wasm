const fs = require('fs')
const toUint8Array = require('base64-to-uint8array')
const buf = fs.readFileSync('./fib.wasm')

const imp = {
    env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({ initial: 256 }),
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    }
}

WebAssembly.instantiate(toUint8Array(buf), imp).then(i => {
    console.log(i.instance.exports._fib(10))
})
