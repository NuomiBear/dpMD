var a = 100
function create() {
    var a = 200
    return function () {
        alert(a)
    }
}
var fn = create()
fn()