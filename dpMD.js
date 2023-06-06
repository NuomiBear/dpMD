// function Person() { }
// let p
// Object.defineProperty(Person.prototype, 'namePersonPro', { value: 'PersonPrototype' })
// Object.defineProperty(Person.prototype, 'getThisPersonPro', {
//   get() {
//     console.log('this', this)
//     console.log('this is p', this === p)
//     console.log('this is Person.prototype', this === Person.prototype)
//     console.log('this is Object.prototype', this === Object.prototype)
//   }
// })

// Object.defineProperty(Object.prototype, 'nameObjPro', {
//   value: 'ObjectPrototype'
// })
// Object.defineProperty(Object.prototype, 'getThisObjPro', {
//   get() {
//     console.log('this', this)
//     console.log('this is p', this === p)
//     console.log('this is Person.prototype', this === Person.prototype)
//     console.log('this is Object.prototype', this === Object.prototype)
//   }
// })

// p = new Person()

// console.log(p.__proto__)

// console.log(p)

function abc() {

}

console.dir(abc)