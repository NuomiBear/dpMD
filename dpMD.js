function Parent() {
    this.x = 100
}

Parent.prototype.getX = function () {
    console.log(this.x)
}

function Children() {
    this.y = 200
}

// 子类原型执行父类的实例
Children.prototype = new Parent()
// 重新设置子类的原有的构造函数
Children.prototype.constructor = Children
// 子类新的原型上扩展方法
Children.prototype.getY = function () {
    console.log(this.y)
}

var child = new Children()

console.log(child)