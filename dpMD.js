// let todoPrototype = {
//   toString: function () {
//     return this.id + "" + this.userName + ":" + this.title
//   }
// }

// function Todo(arg) {
//   let newTodo = Object.create(todoPrototype)
//   Object.assign(newTodo, arg)
//   return newTodo
// }

let Todo = (function createTodoFactory() {
  let todoPrototype = {
    toString: function () {
      return this.id + "" + this.userName + ":" + this.title
    }
  }

  return function (todo) {
    let newTodo = Object.create(todo)
    Object.assign(newTodo, todo)
    return newTodo
  }
})()

let todo = Todo({ 'id': 1, "title": 'title', 'userName': 'J' })