var fn = function () {
    console.log('fn')
}

fn.time = '01点44分'
fn.date = '0630'

var objfn = new fn()


console.log(fn)
// ƒ () {
//     console.log('ƒn')
// }
console.log(objfn)
// ƒn {}
console.dir(fn)
// ƒ ƒn()
//     date:"0630"
//     time:"01点44分"
//     arguments:null
//     caller:null
//     length:0
//     name:"fn"
//     prototype:{constructor:ƒ}