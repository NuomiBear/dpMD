var num = 10
var obj = { num: 15 }

obj.fn = (function (num) {
    this.num += 10
    num *= 2
    console.log(num)
    return function (n) {
        this.num += n
        console.log(n + (--num))
    }
})(obj.num)


console.log(window.num, obj.num)

var fn = obj.fn
fn(10)
obj.fn(15)
console.log(window.num, obj.num)