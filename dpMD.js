// Function.prototype.mycall = function (context) {
//     var context = context || window
//     context.fn = this

//     var args = []
//     for (var i = 1; i < arguments.length; i++) {
//         args.push('arguments[' + i + ']')
//     }

//     var result = eval('context.fn(' + args + ')')

//     delete context.fn
//     return result
// }

// //测试
// var foo = {
//     value: 1
// }

// function bar(name, age) {
//     return {
//         name: name,
//         age: age,
//         value: this.value
//     }

// }
// console.log(bar.mycall(foo, '江', '29'))

Function.prototype.myapply = function (context, ary) {
    var context = context || window
    context.fn = this

    var result

    if (!ary) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 0; i < ary.length; i++) {
            args.push('ary[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result
}

//测试
var foo = {
    value: 1
}

function bar(name, age) {
    return {
        name: name,
        age: age,
        value: this.value
    }

}
console.log(bar.myapply(foo, ['江', '29']))
