var obj
var fn = function (name) {
    this.name = name
    obj = this
    return { age: 12 }
}

var dp = new fn('DP')
console.log(dp, obj)    // {age: 12} fn {name: 'DP'}