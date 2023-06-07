function Person() { }
let p

//Person的原型上增加 namePersonPro属性和值
Object.defineProperty(Person.prototype, 'namePersonPro', { value: 'PersonPrototype' })
//Person的原型上增加 getThisPersonPro属性，值为get()函数，函数用来获取this
Object.defineProperty(Person.prototype, 'getThisPersonPro', {
    get() {
        console.log('this', this)
        console.log('this is p', this === p)
        console.log('this is Person.prototype', this === Person.prototype)
        console.log('this is Object.prototype', this === Object.prototype)
    }
})

//Object的原型上增加 nameObjPro属性和值
Object.defineProperty(Object.prototype, 'nameObjPro', {
    value: 'ObjectPrototype'
})
//Object的原型上增加 getThisObjPro属性，值为get()函数，函数用来获取this
Object.defineProperty(Object.prototype, 'getThisObjPro', {
    get() {
        console.log('this', this)
        console.log('this is p', this === p)
        console.log('this is Person.prototype', this === Person.prototype)
        console.log('this is Object.prototype', this === Object.prototype)
    }
})

// 创建类Person的实例p
p = new Person()

console.log(p.__proto__)
// p.__proto__ == Person.prototype
// 点击Person.prototype内的getThisPersonPro调用get函数获取的this为Person.prototype
// 进如Person.prototype.__proto__ == Object.prototype 有 nameObjPro:"ObjectPrototype"
// 理论上继续进点击 Object.prototype.__proto__ == null 
// 实际上 进如Person.prototype.__proto__（Object.prototype） 后
// 点击 getThisObjPro 调用get函数获取的this依然为Person.prototype
// 所以点击 __proto__:(...) 调用get函数获取的this依然是Person.prototype
// 所以展开结果是 Person.prototype.__proto__ == Object.prototype 跟上次一样 有 nameObjPro:"ObjectPrototype"
// 此时第二次进入 Object.prototype 后我们继续点击 getThisObjPro：（…） 发现get函数返回的this变成了Object.prototype
// 所以此时我们 点击 __proto__:(...)  获取的即 Object.prototype.__proto__ == null

// 从this上获取其prototype的


console.log(p)
// 点击 getThisObjPro / getThisPersonPro 调用get函数 此时获取的this为p
// 点击p.[[Prototype]]进入p.__proto__(Person.prototype) 有 namePersonPro: "PersonPrototype"
// 点击 getThisPersonPro / getThisObjPro 调用get函数 此时获取的this为p
// 理论上在Person.prototype内点击进入Person.prototype.__proto_(Object.prototype)  Object.prototype.__proto__ == null  nameObjPro: "ObjectPrototype"
// 实际点击 getThisObjPro 调用get函数 此时获取的this为p
// 即进入p.__proto__ 即 Person.prototype 有 namePersonPro: "PersonPrototype"
// 点击 getThisPersonPro / getThisObjPro 调用get函数 此时获取的this为Person.prototype
// 此时点击getThisObjPro获取 this为 Person.prototype
// 点击 Person.prototype


// function abc() {

// }

// console.dir(abc)