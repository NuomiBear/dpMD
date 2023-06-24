# dpMD

00

- JavaScript引擎
- COMMAND

01

- 执行栈ECS（函数调用栈）
- 执行上下文EC
- 怎么创建执行上下文
  - The Creation Phase
    - Lexical Environment（词法环境）`函数提升`
    - Variable Environment `变量提升`
  - The Execution Phase
  - 销毁阶段
  - 代码实例
- 在ES6规范前的执行上下文相关内容
- 作用域
- 相关实例
  - 实例1：执行栈、执行上下文
  - 题目1：执行栈、执行上下文
  - 实例2：作用域和闭包以及垃圾回收机制（空）

02

- 内存
  - 栈内存
  - 堆内存
  - 内存释放
  - 垃圾回收机制（空）
- 闭包
  - 函数嵌套
  - 外部作用域执行完毕之后
    - Timer
    - Event
    - Ajax
    - 工厂模式与私有原型对象
    - 工厂模式与私有构造函数
  - 实例
    - 实例1：for循环输出结果
      - 追问1：如果期望代码的输出变成：5 -> 0,1,2,3,4，该怎么改造代码？
      - 追问2：如果期望代码的输出变成 0 -> 1 -> 2 -> 3 -> 4 -> 5，并且要求原有的代码块中的循环和两处 console.log 不变，该怎么改造代码？
      - 追问3：ES7 async/await
- 原型链
  - _proto__的getter

03

- This
  - 简单：This的常见情况
    - 题目1：this
    - 题目2：this
  - call、apply、bind
    - call
    - apply
    - bind
  - 深入了解This
    - Reference Record
    - 那么如何确定this的值呢
    - foo()
    - foo.bar()
    - f = foo.bar f()
    - 核心

04

- Object对象
  - Object.create()
  - Object.assign()
  - Object.defineProperties()
  - Object.defineProperty()
  - Object.entries()
  - Object.getPrototypeOf()
  - Object.keys()

05

06

07

- HTTP
- Promies
- 事件委托
- 深浅拷贝
- Service Worker/PWA
- Web Woeker
- 常用方法API
- 数据类型&检测
- 一些奇怪的现象

0624：call、apply、bind、原型、Promise、题目5-10