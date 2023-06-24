Function.prototype.call1 = function (context) {
    //将执行函数赋值给context的一个属性，由context.fn来调用执行改
    context.fn = this

    //获取参数
    var args = []
    for (var i = 1, len = arguments.length; i < len; i++) {
        //此处得到args结果为 ['arguments[1]', 'arguments[2]']
        args.push('arguments[' + i + ']')
    }

    //传递参数执行
    eval('context.fn(' + args +')')

    //删除函数
    delete context.fn
}

var foo = {
    value: 1
}

function bar(name, age) {
    console.log(this.value)
    console.log(name)
    console.log(age)
}

bar.call1(foo, '江', '29')