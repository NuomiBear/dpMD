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


var obj = {
    name: 'acer',
    fn: (function () {
        var i = 10;
        return function () {
            i++;
            console.log(i)
        }
    })()
}
obj.fn();