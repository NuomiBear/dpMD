// var a = '1'
// let b = '2'
// const c = '3'
// const d = {
//     e: '1',
//     f: function () {
//         let gg = 'gg'
//         var hh = 'hh'
//         // debugger
//     }
// }
// d.f()
// // debugger

// function fn() {
//     abc: "小明"
// }
// console.log(fn.abc)
// console.log(fn.a)


let count=500 //全局作用域
function foo1() {
  let count = 0;//函数全局作用域
  function foo2() {
    count++;//函数内部作用域
    console.log(count);
    debugger
    return count;
  }
  return foo2;//返回函数
}
let result = foo1();
result();//结果为1
result();//结果为2