let obj = { name: "Nuomi" }
function fn(num1, num2) {
    this.total = num1 + num2
}

// 一秒后执行fn，执行fn的时候让fn中的this->obj，并且传递两个实参10，20

// 1s后执行，this没有改变
setTimeout(fn, 1000)

// 设置定时器的时候就把fn执行了，1s后执行的是fn的返回结果
setTimeout(fn.call(obj, 10, 20), 1000)

setTimeout(function () {
    // 1s后执行的匿名函数：fn放在匿名函数里执行
    fn.call(obj, 10, 20)
}, 1000)

// bind预处理
setTimeout(fn.bind(obj, 10, 20), 1000)