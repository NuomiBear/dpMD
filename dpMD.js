function Parent() {
    this.x = 100
}

Parent.prototype.getX = function () {
    console.log(this.x)
}

function children() {
    Parent.call(this)
    this.y = 200
}

var child = new children()
console.log(child)