function object(o) {
  function F() { }
  F.prototype = o
  return new F()
}

function abc() { }

console.dir(abc)