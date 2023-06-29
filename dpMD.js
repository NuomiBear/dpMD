Function.prototype.myapply = function (context) {
    var context = context || window
    var fn = Symbol()
    context[fn] = this
    var ary = arguments[1]
    var result

    if (!ary) {
        result = context[fn]()
    } else {
        // eval
        var fnStr = 'context[fn]('
        for (var i = 0; i < ary.length; i++) {
            fnStr += i == ary.length - 1 ? ary[i] : ary[i] + ','
        }
        fnStr += ')'

        result = eval(fnStr)
    }

    delete context[fn]
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