let obj = { name: 'Nuomi' }
function fn(num1, num2) {
    this.total = num1 + num2
}
fn(10, 20)  //this:window
obj.fn(10, 20)  //Uncaught TypeError: obj.fn is not a function

fn.call(obj, 10, 20)    //this:obj
fn.call(10, 20) //this:10 num1:20 num2:undefined
fn.call()   //this:window num1=num2=undefined <=> fn()