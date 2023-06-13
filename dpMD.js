let obj = { name: 'Nuomi' }
function fn(num1, num2) {
    this.total = num1 + num2
}
//改变fn中的this，并且立即执行
fn.call(obj, 10, 20)
//虽然改变了fn中的this，但是并没有把fn执行，属于预先处理this和实参，不会立即执行，只有达到某个条件的时候才会被出发执行
fn.bind(obj, 10, 20)    