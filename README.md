# dpMD

## 笔记

00

- JavaScript引擎
- COMMAND

01：JavaScript：执行栈、执行上下文、作用域

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

02：JavaScript：内存、闭包

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

03：JavaScript：This

- This
  - 简单：This的常见情况
    - 题目1：this
    - 题目2：this
  - call、apply、bind
    - call
      - call规范
      - call模拟实现
      - call实现继承
    - apply
      - apply规范
      - apply模拟实现：简单
      - apply模拟实现：优化
    - bind(ES5)
      - bind具体做了什么
      - bind模拟实现：apply（简单）
      - bind模拟实现：MDN的Polyfill（兼容）（apply）
      - bind模拟实现：原生（非call和apply）（未整理）
  - 深入了解This
    - Reference Record
    - 那么如何确定this的值呢
    - foo()
    - foo.bar()
    - f = foo.bar f()
    - 核心

04：JavaScript：原型、原型链

- 几个重要知识点
- prototype：ECMAScript 2022
  - 那么一个对象如何为另一个对象提供属性访问呢？
- constructor
  - 问题：Symbol 是构造函数么？
  - 普通函数执行VS构造函数执行
    - 普通函数执行
    - 构造函数执行：new
- __proto__
  - 浏览器中的一个问题  
  - __proto__的getter
- 原型重定向
- prototype chain：原型链
  - 我们如何去判断原型和实例的这种继承关系？
    - instanceof
    - isPrototypeOf()
  - 原型链（继承）的问题
- 函数的三种角色
- Object和Function的鸡和蛋的问题

05：JavaScript：继承

- new 关键字
  - new 做了哪些事
- 继承（显式继承和隐式继承）
  - 原型链继承
  - 经典继承（借用构造函数）
  - 组合继承（原型链继承和经典继承）
  - Object.create（原型式继承）
  - 寄生式继承
  - 寄生组合式继承
  - ES6的类及继承
  - call（子类和父类没有实质关系）

06 1.0 键入网址到网页显示，期间发生了什么？
  
- URL解析
- HTTP请求阶段：向服务器发送请求
  - DNS域名解析
  - 网络模型
    - 应用层
    - 传输层
    - 网络层：为数据包选择路由
    - 网络接口层：数据链路层+物理层
  - 协议栈
    - TCP
    - IP
- HTTP响应阶段：服务器把客户端需要的内容准备好，并且返回给客户端
- 浏览器渲染阶段

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

51

- Object对象
  - Object.create()
  - Object.assign()
  - Object.defineProperties()
  - Object.defineProperty()
  - Object.entries()
  - Object.getPrototypeOf()
  - Object.keys()

53

- 跨域
  - JSONP
  - CORS
  - webpack proxy（常用）
  - nginx反向代理
  - 基于IFRAME实现跨域（4）
  - 正向代理和反向代理
    - 正向代理
    - 反向代理

54

- typeof
- instanceof
  - 特殊判断
