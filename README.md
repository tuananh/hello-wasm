Hello WebAssembly
-----------------

Just a repo for teaching myself WebAssembly.

### Usage

A simple Fibonacci function in C++

```c++
int fib(int n) {
  switch (n) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return fib(n - 2) + fib(n - 1);
  }
}
```

compile to `.wasm` file

```sh
yarn build
```

Load `fib.wasm` and use it

```js
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
```
