# JavaScript：this

## This

>MDN：当前执行上下文（global、function 或 eval）的一个属性，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值

在JavaScript中，this的指向是调用(运行)时决定的，而不是创建时决定的，调用位置非声明位置，简单来说，this具有运行期绑定的特性

### 简单来说 在函数内部，this的值取决于函数被调用的方式

当前函数执行的主体（谁执行的函数this就是谁） this的指向和函数在哪定义以及在哪执行没有任何关系

在JS非严格模式中

- 【1】直接调用（独立调用） this一般都是window；自执行函数中的this一般都是window
  
  ```javascript
  var obj = {
      fn: (function () {
          // this -> window
          return function () { }
      })()
  }
  ```

- 【2】（隐式绑定）调用位置存在上下文对象，或者说被某个对象拥有或者包含：调用方法主体，方法执行的时候，看方法名钱买你是否有`点`，`点`前面一般为this主体（对象属性引用链中只有上一层或者说最后一层在调用位置中起作用）

  ```javascript
    var obj = {
      name: 'obj',
      fn: function () {
          console.log(this)
          }
      }

    obj.fn()    //this:obj
    var f = obj.fn
    f()     //this:window        

    [1,2,3].slice()     //this:[1,2,3]
    [1,2,3].__proto__.slice()   //this:[1,2,3].__proto__
    Array.prototype.slice()     //this:Array.prototype
  ```

- 【2】（隐式绑定）给某个元的某个事件绑定方法，当事件触发执行对应方法的时候，方法中的this一般都是当前操作的元素本身

  ```javascript
  var exampleBox = document.querySelector('.exampleBox')

  exampleBox.onclick = function () {
      // this -> exampleBox元素
      //DOM0
      console.log(this)
  }

  exampleBox.attachEvent = ('onclick', function () {
      // this -> exampleBox元素
      // IE
      console.log(this)
  })
  ```

- 【3】（call、apply、bind）

- 【4】（new绑定）在构造函数执行的时候，函数体中的this都是当前类的实例，使用new来调用函数或者说发生构造函数调用的时候，会执行下面的操作
  - 1. 创建一个全新的对象
  - 2. 这个新对象会被执行[[prototype]]连接
  - 3. 这个新对象会被绑定到函数调用的this
  - 4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

  ```javascript
  function Fn() {
      this.name = "Fn"
      // this:当前Fn的实例(下面代码指f)
      console.log(this)
      return {}
  }
  var f1 = Fn()  // window
  var f2 = new Fn()   //{name:''fn}

  console.log(f1) // {}
  console.log(f2) // {}
  ```

- ES6箭头函数中没有执行主体，其this会继承宿主环境中的this（箭头函数较常用于回调函数中）

  MDN中对于箭头函数这一部分是这样描述的：
  > An arrow function does not create its own this, the this value of the enclosing execution context is used.
  > 箭头函数会捕获其所在上下文的this值，作为自己的this值。

- 定时器不管在哪里调用执行，默认this都是window

  MDN的解释：
  > 由setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致，这些代码中包含的 this 关键字在非严格模式会指向 window。

  javascript高级程序设计中：
  > setTimeout函数挂载在window对象下，"超时调用的代码都是在全局作用域中执行，因此函数中的this非严格模式下默认指向window对象，在严格模式下是undefine"

  ```javascript
    var obj = {
        fn: function () {
            var _this = this
            setTimeout(function () { }, 1000)   //this:window 定时器不管在哪里执行默认this都是window
            setTimeout(function () { }.bind(this), 1000)    //This:obj
            setTimeout(function () { _this.name = 'xxx' }, 1000)    //_this:obj
            setTimeout(() => { }, 1000)     //this:obj
        }
    }

    obj.fn()
  ```

- 严格模式
  - 没有执行主体的函数，this为undefined

#### 题目1：this

```javascript
  var num = 1, obj = {
      num: 2,
      fn: (function (num) {
          this.num *= 2
          num += 2
          return function () {
              this.num *= 3;
              num++
              console.log(num)
          }
      })(num)
  }
  var fn = obj.fn
  fn()
  obj.fn()
  console.log(num.obj.num)
```

```text
1、运行代码之前：全局num=undefined，obj=undefine，fn=undefined
2、运行第一个var代码：全局num=1、obj.num=2、fn自执行函数执行，函数内num=2（传参），this指向window所有全局num先变为2，内部num变为3，然后返回一个函数被obj.fn引用，只执行函数的执行上下文不销毁（作用域）。最后全局num=2、obj.num=2，自执行函数内的num=3
3、赋值 var fn = obj.fn 运行fn() this指向window 所以全局num*3=6，fn函数内没有num，所以通过作用域链向上查找，找到自执行函数内的num，自执行函数num变为4，obj.num不变为2
4、运行 obj.fn() 后 this指向obj 所有obj.num变为6，fn函数内没有num，所以通过作用域链向上查找，找到自执行函数内的num，自执行函数num变为5，全局num不变为6
```

#### 题目2：this

```javascript
  var num = 10
  var obj = { num: 15 }

  obj.fn = (function (num) {
      this.num += 10
      num *= 2
      return function (n) {
          this.num += n
          console.log(n + (--num))
      }
  })(obj.num)

  var fn = obj.fn
  fn(10)
  obj.fn(15)
  console.log(window.num, obj.num)
```

```text
1、运行代码之前 num=undefined，obj=undefined，fn=undefined
2、运行obj.fn自执行函数，传参15，即自执行函数内自己的num=15，this指向window，所以全局num=20，自己内部num=30，返回一个函数 obj.num不变为15
3、赋值 var fn = obj.fn 运行fn(10) this=window 所以全局num=30 fn自己内部没有num，通过作用域链找到自执行函数内部的num30 输出 10+29 =39 obj.num不变为15
4、obj.fn(15) this指向obj 所以obj.num + n =30 输出15+28（自执行函数内的num--）=43 此时 全局num为30 obj.num为30 自执行函数内num为28
```

### call、apply、bind

使用Function.prototype提供的call、apply、bind改变this

#### call

call函数做了三件事（或者说两件事2和3合并）：
> 1 改变了this的指向  
> 2 获取参数传递给要执行函数
> 3 执行函数  

```javascript
  let obj = { name: 'Nuomi' }
  function fn(num1, num2) {
      this.total = num1 + num2
  }
  fn(10, 20)  //this:window
  obj.fn(10, 20)  //Uncaught TypeError: obj.fn is not a function

  fn.call(obj, 10, 20)    //this:obj
  fn.call(10, 20) //this:10 num1:20 num2:undefined
  fn.call()   //this:window num1=num2=undefined <=> fn()

  fn.call(null)
  fn.call(undefined)  //第一个参数不管是null还是undefined都代表没有指向得this，所以函数中的this依然是window
```

##### call规范

ECMAScript规范中调用call函数采用步骤：（thisArg,arg1,arg2）

1. 如果IsCallable(func)是false，则抛出一个 TypeError 错误
2. 令argList为一个空列表
3. 如果调用这个方法的参数多余一个，则从arg1开始从左到右的顺序将每个参数插入argList的最后一位
4. 提供thisArg作为this值并以argList作为参数列表，调用func的[[call]]内部方法，返回结果

注意： thisArg 是undefined和null时，它会被替换成全局对象，所有其他值会被应用ToObject并将结果作为this值

##### call模拟实现

```javascript
  var foo = {
      value: 1
  };
  function bar() {
      console.log(this.value);
  }

  bar.call(foo); // 1
```

对于以上代码模拟实现call的两件事，试想当调用call的时候，改造foo对象

```javascript
  var foo = {
      value: 1,
      bar: function () {
          console.log(this.value)
      }
  }

  foo.bar()
```

这时候this就指向了foo，但是这样对对象foo添加了一个属性，不过我们用delete再删除它就可以，所以模拟的步骤可以分为：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

```javascript
  foo.fn = bar
  foo.fn()
  delete foo.fn
```

根据这个思路，我们产值这写一版call函数：

```javascript
  Function.prototype.call1 = function (context) {
      context.fn = this
      context.fn()
      delete context.fn
  }

  var foo = {
      value: 1
  }

  function bar() {
      console.log(this.value)
  }

  bar.call1(foo)
```

在做以上两件事的时候，call函数还能给定参数执行函数，传入的参数并不确定，举个简单的例子：

```javascript
  var foo = {
      value: 1
  };

  function bar(name, age) {
      console.log(name)
      console.log(age)
      console.log(this.value);
  }

  bar.call(foo, 'kevin', 18);
```

参数不确定的话，我们可以从arguments对象中取值，取出第二个到最后一个参数，放到一个数组中：

```javascript
  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i])
  }
```

不定参数的问题解决了，把这个参数数据放到要执行的函数的参数里面去：

```javascript
  context.fn(args.join(','))
  //这个方法不行，因为join输出的是一个字符串

  //eval
  eval('context(' + args + ')')
```

那么到此，我们克服了两个问题：参数不确定和传参给执行函数，那么最终call函数实现：

```javascript
  Function.prototype.call1 = function (context) {
      //将执行函数赋值给context的一个属性，由context.fn来调用执行改
      context.fn = this

      //获取参数
      var args = []
      for (var i = 1, len = arguments.length; i < len; i++) {
          //注意：此处得到args结果为 ['arguments[1]', 'arguments[2]']
          //args.push(arguments[i]) 得到的结果才是['江', '29']
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
```

此时，模拟代码已经快完成，还有一些细节点需要注意：

1. this参数可以传为null，当参为null的时候，我们让其指向window
2. 函数是可以有返回值的

```javascript
  var value = 1;

  function bar() {
      console.log(this.value);
  }

  bar.call(null); // 1
  //-------------------------------------
  var obj = {
      value: 1
  }

  function bar(name, age) {
      return {
          value: this.value,
          name: name,
          age: age
      }
  }

  bar.call(obj, '江', 18)
  // Object {
  //    value: 1,
  //    name: 'kevin',
  //    age: 18
  // }
```

这两个小问题解决后，完整一版的代码：

```javascript
  Function.prototype.mycall = function (context) {
      var context = context || window
      context.fn = this

      var args = []
      for (var i = 1; i < arguments.length; i++) {
          args.push('arguments[' + i + ']')
      }

      var result = eval('context.fn(' + args + ')')

      delete context.fn
      return result
  }

  //测试
  var foo = {
      value: 1
  }

  function bar(name, age) {
      return {
          name: name,
          age: age,
          value: this.value
      }

  }
  console.log(bar.mycall(foo, '江', '29'))s
```

到此call的原理部分差不多就是这样了，但是代码还是有优化空间的:

> 1. call函数的参数context处理：Object(context) 会让参数传null时，this指向的是Object()返回值空对象{}，但是传null的时候应该直接指向window，null和undefined依然要特殊处理  
> 2. call函数除context之外的参数处理：没有参数和有参数两种情况
> 3. 与context可能原有fn函数的重名问题（Symbol）
> 4. fn函数的参数处理（ES6 ...）

##### call实现继承

在需要实继承的子类构造函数中，可以通过call调用父类的构造函数实现继承

```javascript
  function Person(name, age) {
      this.name = name;
      this.age = age;
      this.say = function () {
          console.log(this.name + ":" + this.age);
      }
  }
  function Student(name, age, job) {
      Person.call(this, name, age);
      this.job = job;
      this.say = function () {
          console.log(this.name + ":" + this.age + " " + this.job);
      }
  }
  var me = new Student("J", 29, "FE");
  console.log(me.say()); // J:29 FE
```

#### apply

` fun.apply(thisArg, [argsArray]) `

##### apply规范

ECMAScript规范中调用apply函数采用步骤：（thisArg, argArray）

1. 如果 IsCallable(func) 是 false，则抛出一个 TypeError 异常
2. 如果 argArray 是 null 或 undefined，则返回提供 thisArg 作为 this 值并以空参数列表调用 func 的[[call]]内部方法的结果
3. 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[call]] 内部方法的结果
4. 如果Type(argArray) 不是 Object，则抛出一个 TypeError 异常
5. 提供 thisArg 作为 this 值并以 argList 作为参数列表，调用 func 的 [[call]] 内部方法，返回结果（5~8省略，此步骤为9）

注意： thisArg 是  undefined 和 null 时，它会被替换成全局对象，所有其他值会被应用 ToObject 并将结果作为 this 值

```javascript
  let obj = { name: 'Nuomi' }
  function fn(num1, num2) {
      this.total = num1 + num2
  }

  // apply的语法和作用跟call基本上完全类似，只有一个区别
  fn.call(obj, 10, 20)    //this:obj

  // apply调用时，第一个参数是this指向，第二个参数是一个数组，数组中包含了所有需要给函数传递的实参
  fn.apply(obj, [10, 20])
```

##### apply模拟实现：简单

apply函数语法作用和call基本类似，区别就是除第一个参数之外的参数为一个数组，包含了所有的要给函数传递的实参，而call是将参数一个一个列出来，直接实现代码：

```javascript
  Function.prototype.myapply = function (context, ary) {
      var context = context || window
      context.fn = this

      var result

      if (!ary) {
          result = context.fn()
      } else {
          var args = []
          for (var i = 0; i < ary.length; i++) {
              args.push('ary[' + i + ']')
          }
          result = eval('context.fn(' + args + ')')
      }

      delete context.fn
      return result
  }

  //测试
  var foo = {
      value: 1
  }

  function bar(name, age) {
      return {
          name: name,
          age: age,
          value: this.value
      }

  }
  console.log(bar.myapply(foo, ['江', '29']))
```

对于传统的字符串拼接操作网上有一些代码是有问题的：

```javascript
Function.prototype.myapply = function (context) {
    var context = context || window
    var fn = Symbol()
    context[fn] = this
    var ary = arguments[1]
    var result

    if (!ary) {
        result = context[fn]()
    } else {
        // eval
        var fnStr = 'context[fn]('
        for (var i = 0; i < ary.length; i++) {
            fnStr += i == ary.length - 1 ? ary[i] : ary[i] + ','
        }
        fnStr += ')'

        result = eval(fnStr)
    }

    delete context[fn]
    return result
}
```

上面这一段代码的字符串处理是有一点问题的，我们用再上面的例子来测试，再eval执行函数的时候会报错
> ` Uncaught ReferenceError: 江 is not defined `
这是因为上面一段函数字符串拼接的结果 fnStr：'context[fn](江,29)'

##### apply模拟实现：优化

我们在apply实现中优化一下实现call函数时需要优化的4个点：

> 1. call函数的参数context处理：Object(context) 会让参数传null时，this指向的是Object()返回值空对象{}，但是传null的时候应该直接指向window，null和undefined依然要特殊处理  
> 2. call函数除context之外的参数处理：没有参数和有参数两种情况
> 3. 与context可能原有fn函数的重名问题（Symbol）
> 4. fn函数的参数处理（ES6 ...）

```javascript
    Function.prototype.myapply = function (context) {
        // 优化1：null和undefined处理，context不存在的时候，指向window 
        var context = context || window

        // 优化3：保证fn函数的唯一性 Symbol
        var fn = Symbol()
        context[fn] = this

        // 获取传入的参数
        var ary = arguments[1]
        var result

        // 优化2：传入的参数进行处理
        if (!ary) {
            //没有参数直接执行
            result = context[fn]()
        } else {
            // eval
            // var args = []
            // for (var i = 0; i < ary.length; i++) {
            //     args.push('ary[' + i + ']')
            // }
            // 
            // result = eval('context[fn](' + args + ')')

            // 优化4：ES6
            result = context[fn](...ary)
        }

        delete context[fn]
        return result
    }
```

#### bind(ES5)

> The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

bind会创建一个新函数，原函数的一个拷贝，也就是说不会像call和apply那样立即执行。

```javascript
  let obj = { name: 'Nuomi' }
  function fn(num1, num2) {
      this.total = num1 + num2
  }
  //改变fn中的this，并且立即执行
  fn.call(obj, 10, 20)
  //虽然改变了fn中的this，但是并没有把fn执行，属于预先处理this和实参，不会立即执行，只有达到某个条件的时候才会被出发执行
  fn.bind(obj, 10, 20)    
```

```javascript
  let obj = { name: "Nuomi" }
  function fn(num1, num2) {
      this.total = num1 + num2
  }

  // 一秒后执行fn，执行fn的时候让fn中的this->obj，并且传递两个实参10，20

  // 1s后执行，this没有改变
  setTimeout(fn, 1000)

  // 设置定时器的时候就把fn执行了，1s后执行的是fn的返回结果
  setTimeout(fn.call(obj, 10, 20), 1000)

  setTimeout(function () {
      // 1s后执行的匿名函数：fn放在匿名函数里执行
      fn.call(obj, 10, 20)
  }, 1000)

  // bind预处理
  setTimeout(fn.bind(obj, 10, 20), 1000)
```

```javascript
  function Person(name) {
      this.name = name;
      this.say = function () {
          var self = this;
          setTimeout(function () {
              console.log("hello " + self.name);
          }, 1000)
      }
  }
  var person = new Person("J");
  person.say(); //hello J
```

上面这段代码正确的输出了name，是因为我们是使用了变量去接收this（缓存this），实际上我们这里可以用到bind

```javascript
  function Person(name) {
      this.name = name
      this.say = function () {
          setTimeout(function () {
              console.log('hello ' + this.name)
          }.bind(this), 1000);
      }
  }
  var person = new Person('J')
  person.say()
```

##### bind具体做了什么

1. bind 是原型链中 Function.prototype 的一个属性
2. bind 本身是一个函数，可以传参，返回值也是函数，函数名是bound
3. 调用 bind 的函数中的 this 指向 bind() 函数的第一个参数
4. 传递给 bind 的其他参数接收处理了，bind()之后返回的 bound 函数的参数也接收处理了，也就是说合并处理了
5. bind() 后的函数 name为 bound + 空格 + 调用 bind 的函数名，如果是匿名函数则是 bind + 空格
6. bind 后的返回值函数，执行后返回值是原函数的返回值
7. bing 函数的形参（即函数的 length）是1，bind后返回的 bound 函数形参不定，根据绑定的原函数的形参个数确定
8. new bound 的返回值是以 `原函数构造器生成的新对象` ，原函数的 this 指向了这个新对象，这时候参提供的 this 的参数被忽略掉了，所以当 new 调用时，bind的返回值函数 bound 内部要模拟实现 new 的操作

```javascript
  // new bound 的返回值是以 `原函数构造器生成的新对象`
  var obj = {
      name: '若川',
  };
  function original(a, b){
      console.log('this', this); // original {}
      console.log('typeof this', typeof this); // object
      this.name = b;
      console.log('name', this.name); // 2
      console.log('this', this);  // original {name: 2}
      console.log([a, b]); // 1, 2
  }
  var bound = original.bind(obj, 1);
  var newBoundResult = new bound(2);
  console.log(newBoundResult, 'newBoundResult'); // original {name: 2}
```

new做了什么

> 1. 创建了新的对象
> 2. 这个对象会被执行 [[prototype]]（也就是__proto__） 链接
> 3. 生成的新对象会绑定到函数调用的 this
> 4. 通过 new 创建的每个对象最终被 [[prototype]] 链接到这个函数的 prototype 对象上
> 5. 如果函数没有返回对象类型 Object（包含Function、Array、Date、RegExg、Error）那么 new 表达式中的函数调用会自动返回值这个新对象

其他用到知识：  
instanceof：用于检测构造函数的 prototype  属性是否出现在某个实例对象的原型链上（object instanceof constructor）

```javascript
  // instanceof 存在的问题
  function Student(name){
      if(this instanceof Student){
          this.name = name;
          console.log('name', name);
      }
      else{
          throw new Error('必须通过new关键字来调用Student');
      }
  }
  var student = new Student('若');
  var notAStudent = Student.call(student, '川'); // 不抛出错误，且执行了。
  console.log(student, 'student', notAStudent, 'notAStudent');
```

上面的例子说明 instanceof 不准确的问题，ES6 new.target 很好的解决这一问题
> new.target 属性允许你检测函数或构造方法是否是通过new运算符被调用的。在通过 new 运算符被初始化的函数或构造方法中，new.target 返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是 undefined。

```javascript
    function Student2(name){
        if(typeof new.target !== 'undefined'){
            this.name = name;
            console.log('name', name);
        }
        else{
            throw new Error('必须通过new关键字来调用Student2。');
        }
    }
    var student2 = new Student2('若');
    var notAStudent2 = Student2.call(student2, '川');   // 抛出错误
    console.log(student2, 'student2', notAStudent2, 'notAStudent2'); 
```

##### bind模拟实现：apply（简单）

```javascript
  Function.prototype.mybindapply = function (context) {
      context = context || window
      var outerArg = Array.prototype.slice.call(arguments, 1)
      var _this = this
      return function () {
          var innerArg = Array.prototype.slice.call(arguments)
          outerArg = outerArg.concat(innerArg)
          _this.apply(context, outerArg)
      }
  }

  function Person(name) {
      this.name = name;
      this.say = function () {
          setTimeout(function () {
              console.log("hello " + this.name);
          }.mybindapply(this), 1000)
      }
  }
  var person = new Person("J");
  person.say(); //hello J
```

##### bind模拟实现：MDN的Polyfill（兼容）（apply）

```javascript
  Function.prototype.mybind = function (oThis) {
      if (typeof this !== "function") {
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
      var aArgs = Array.prototype.slice.call(arguments, 1)
      var fToBind = this
      var fNOP = function () { }
      var fBound = function () {
          fBound.prototype = this instanceof fNOP ? new fNOP() : fBound.prototype
          return fToBind.apply(this instanceof fNOP ? this : oThis || this, aArgs)
      }
      fNOP.prototype = this.prototype
      return fBound
  }

  function Person(name) {
      this.name = name;
      this.say = function () {
          setTimeout(function () {
              console.log("hello " + this.name);
          }.mybind(this), 1000)
      }
  }
  var person = new Person("J");
  person.say(); //hello J
```

##### bind模拟实现：兼容（apply）

```javascript
  Function.prototype.mybind = function (oThis) {
      if (typeof this !== "function") {
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () { },
          fBound = function () {
              return fToBind.apply(this instanceof fNOP? this : oThis || this,
                  aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
  };
```

##### bind模拟实现：原生（非call和apply）（未整理）

```javascript
  //简单模拟Symbol属性
  function jawilSymbol(obj) {
      var unique_proper = "00" + Math.random();
      if (obj.hasOwnProperty(unique_proper)) {
          arguments.callee(obj)//如果obj已经有了这个属性，递归调用，直到没有这个属性
      } else {
          return unique_proper;
      }
  }
  //原生JavaScript封装apply方法，第五版
  Function.prototype.applyFive = function (context) {
      var context = context || window
      var args = arguments[1] //获取传入的数组参数
      var fn = jawilSymbol(context);
      context[fn] = this //假想context对象预先不存在名为fn的属性
      if (args == void 0) { //没有传入参数直接执行
          return context[fn]()
      }
      var fnStr = 'context[fn]('
      for (var i = 0; i < args.length; i++) {
          //得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
          fnStr += i == args.length - 1 ? args[i] : args[i] + ','
      }
      fnStr += ')'
      var returnValue = eval(fnStr) //还是eval强大
      delete context[fn] //执行完毕之后删除这个属性
      return returnValue
  }
  //简单模拟call函数
  Function.prototype.callOne = function (context) {
      return this.applyFive(([].shift.applyFive(arguments)), arguments)
      //巧妙地运用上面已经实现的applyFive函数
  }

  //简单模拟bind函数
  Function.prototype.bind = Function.prototype.bind || function (context) {
      var me = this;
      var args = Array.prototype.slice.callOne(arguments, 1);
      var F = function () { };
      F.prototype = this.prototype;
      var bound = function () {
          var innerArgs = Array.prototype.slice.callOne(arguments);
          var finalArgs = args.concat(innerArgs);
          return me.applyFive(this instanceof F ? this : context || this, finalArgs);
      }
      bound.prototype = new F();
      return bound;
  }
```

### 深入了解This

在 `[01.md]怎么创建执行上下文` 中 我们简单提到过 `this` 

我们需要先了解一下 ECMAScript Specification Types 在 ECMAScript® 2022中:

```text
A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types. The specification types include Reference, List, Completion Record, Property Descriptor, Environment Record, Abstract Closure, and Data Block. Specification type values are specification artefacts that do not necessarily correspond to any specific entity within an ECMAScript implementation. Specification type values may be used to describe intermediate results of ECMAScript expression evaluation but such values cannot be stored as properties of objects or values of ECMAScript language variables.
```

其中规范类型包括 Reference、List、Completion Record、Property Descriptor、Environment Record、Abstract Closure、Data Block.

其中 Reference 与 this 指向有密切的关系

#### Reference Record

`Reference Record` 在 ECMAScript® 2022中:

```text
The Reference Record type is used to explain the behaviour of such operators as delete, typeof, the assignment operators, the super keyword and other language features.
```

这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中

那么 Reference Record 的具体内容有什么，ECMAScript® 2022中：

|Field Name|Value|Meaning|
| :-----| :----- | :----- |
|[[Base]]|an ECMAScript language value, an Environment Record, or unresolvable|The value or Environment Record which holds the binding. A [[Base]] of unresolvable indicates that the binding could not be resolved.|
|[[ReferencedName]]|a String, a Symbol, or a Private Name|The name of the binding. Always a String if [[Base]] value is an Environment Record.|
|[[Strict]]|a Boolean|If not empty, the Reference Record represents a property binding that was expressed using the super keyword; it is called a Super Reference Record and its [[Base]] value will never be an Environment Record. In that case, the [[ThisValue]] field holds the this value at the time the Reference Record was created.|
|[[ThisValue]]|an ECMAScript language value or empty|If not empty, the Reference Record represents a property binding that was expressed using the super keyword; it is called a Super Reference Record and its [[Base]] value will never be an Environment Record. In that case, the [[ThisValue]] field holds the this value at the time the Reference Record was created.|

规范中还提供了一些方法: V (a Reference Record)

1. IsPropertyReference(V)
   > If V.[[Base]] is unresolvable, return false
   > If V.[[Base]] is an Environment Record, return false; otherwise return true
2. IsUnresolvableReference(V)
   > If V.[[Base]] is unresolvable, return true; otherwise return false
3. IsPrivateReference(V)
   > If V.[[ReferencedName]] is a Private Name, return true; otherwise return false
4. GetValue(V)(6.2.4.5)
5. IsSuperReference(V)
   > If V.[[ThisValue]] is not empty, return true; otherwise return false
6. GetThisValue(V)
   > Assert: IsPropertyReference(V) is true
   > If IsSuperReference(V) is true, return V.[[ThisValue]]; otherwise return V.[[Base]]

【旧版】基于 `ECMAScript 5.1（Last updated: 2015-08-11）`简单理解 Reference Record 的构成：

- base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种
- ReferencedName 就是属性的名称
- strict 是否严格模式

举个例子：

```javascript
var foo = 1;
// foo对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
//--------------------
var foo = {
    bar: function () {
        return this;
    }
};
foo.bar(); // foo
// bar对应的Reference是：
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};
```

在早期规范中还提供了一些方法比如，比如 GetBase 和 IsPropertyReference

GetBase：Returns the base value component of the reference V（返回 reference 的 base value）

IsPropertyReference：Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.（简单的理解：如果 base value 是一个对象，就返回true）

除了这两个方法之外，还有一个用于从 Reference 类型获取对应值的方法：GetValue

```javascript
var foo = 1;

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
```

注意：调用GetValue返回的将是具体的值，而不再是一个Reference

#### 那么如何确定this的值呢

Function Calls 函数调用：我们看其中的几个步骤

- 1. Let ref be the result of evaluating MemberExpression
- 6. If Type(ref) is Reference, then
  - a. If IsPropertyReference(ref) is true, then
    - i.Let thisValue be GetBase(ref).
  - b. Else, the base of ref is an Environment Record
    - i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
- 7. Else, Type(ref) is not Reference.
  - a. Let thisValue be undefined.

简单描述一下：

1. 判断 MemberExpression 的结果赋值给 ref
2. 判断 ref 是不是一个 Reference 类型
   1. 如果 ref 是 Reference 类型，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
   2. 如果 ref 是 Reference 类型，并且 base value 的值是 Environment Record，那么 this 的值为 ImplicitThisValue(ref)
   3. 如果 ref 不是 Reference，那么 this 的值为 undefined

具体分析：
> 什么是 MemberExpression ：  
>> PrimaryExpression 原始表达式  
>> FunctionExpression 函数定义表达式  
>> MemberExpression [ Expression ] 属性访问表达式  
>> MemberExpression . IdentifierName 属性访问表达式  
>> new MemberExpression Arguments 对象创建表达式

举个例子：

```javascript
function foo() {
    console.log(this)
}
foo(); // MemberExpression 是 foo

function foo() {
    return function() {
        console.log(this)
    }
}
foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}
foo.bar(); // MemberExpression 是 foo.bar
```

> 判断 ref 是不是一个 Reference 类型  
>> 关键就在于看规范是如何处理各种 MemberExpression ，返回的结果是不是一个 Reference 类型

举个例子：

```javascript
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

foo()

//示例1 2
console.log(foo.bar());
//示例2 2
console.log((foo.bar)());
//示例3 1（严格模式报错）
console.log((foo.bar = foo.bar)());
//示例4 1
console.log((false || foo.bar)());
//示例5 1
console.log((foo.bar, foo.bar)());
```

#### foo()

MemberExpression == foo（标识符identifier）

- 再示例1中：MemberExpression 的计算结果是 foo.bar,那么 foo.bar 是不是一个 Reference
- MemberExpression 执行过程：`11.2.1 Identifier Reference` 
  > An Identifier is evaluated by performing Identifier Resolution as specified in 10.3.1. The result of evaluating anIdentifier is always a value of type Reference.
- `10.3.1 Identifier Resolution`
  > 1.Let env be the running execution context’s LexicalEnvironment  
  > 3.Return the result of calling GetIdentifierReference function passing env, Identifier, and strict as arguments.
- 返回了 `GetIdentifierReference` 方法的结果：
  > Return a value of type whose base value is envRec, whose referenced name is name, and whose strict mode flag is strict

我们看最后返回了一个 Reference，base value 是 envRec 也就是10.3.1中传入的 execution context’s LexicalEnvironment

其抽象的数据结构大概为：

```javascript
var foo_Reference = {
    base: LexicalEnvironment,
    name: 'foo',
    strict: false
};
```

至此，第一步执行完毕 ` ref = foo_reference `

因为 evaluating MemberExpression 返回结果为 Reference，所以执行上述6，因为 base 是 Enviroment Record，所以执行6b
> Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref)

10.2.1.1.6 ImplicitThisValue()
> Declarative Environment Records always return undefined as their ImplicitThisValue

到此，我们知道 foo() 执行时，thisValue = undefined，对应代码中的this，还差最后一步：
> Else if thisArg is null or undefined, set the ThisBinding to the global object

最后：foo() 执行时，this = global = window

#### foo.bar()

执行函数调用规范中的第一步：Let ref be the result of evaluating MemberExpression

MemberExpression == foo.bar（属性访问 `Property Accessors`）

11.2.1 Property Accessors
> The production MemberExpression : MemberExpression [ Expression ] is evaluated as follows:  
> 1.Let baseReference be the result of evaluating MemberExpression  
> 2.Let baseValue be GetValue(baseReference)  
> 8.Return a value of type Reference whose base value is baseValue and whose referenced name ispropertyNameString, and whose strict mode flag is strict  

其抽象的数据结构大概为：

```javascript
var foo_bar_Reference = {
    base: foo,
    name: 'bar',
    strict: false
};
```

因为返回结果为 Reference 类型，继续执行6，因为属性是引用类型执行6.a：Let thisValue be GetBase(ref)

最终：GetBase(ref) == foo_bar_Reference.base = foo

#### f = foo.bar f()

依然是执行函数调用规范中的第一步：Let ref be the result of evaluating MemberExpression

11.13.1 Simple Assignment（=）
> The production AssignmentExpression : LeftHandSideExpression = AssignmentExpression is evaluated as follows:  
> 1 Let rref be the result of evaluating AssignmentExpression  
> 2 Let rval be GetValue(rref)  
> 3 Return rval  

简单赋值操作返回的是 对于 = 右边进行 GetValue 之后的结果（GetValue返回的将是具体的值，而不再是一个Reference）

ref 不是 Reference，所以执行7：Let thisValue be undefined

同理：Else if thisArg is null or undefined, set the ThisBinding to the global object

最终 this = global = window

#### 核心

我们观察上述过程，其中最关键的就是判断返回值是不是 Reference 类型，如果不是，直接可以推出等于window（非严格模式），如果是 Reference 类型，只需要看是不是属性 Reference
