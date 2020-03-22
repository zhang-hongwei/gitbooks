# Function

## 1. 构造函数

## 2. call, apply, bind

### 2.1 call

> 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

参数:

-   thisArg : 可选, function 函数运行时使用的 this 值。

`this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。`

-   arg1, arg2, ... : 指定的参数列表

```js
// 基本使用
function greet() {
    var reply = [
        this.animal,
        "typically sleep between",
        this.sleepDuration
    ].join(" ");
    console.log(reply);
}

var obj = {
    animal: "cats",
    sleepDuration: "12 and 16 hours"
};

greet.call(obj); // cats typically sleep between 12 and 16 hours

// 实现继承
function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = "food";
}

function Toy(name, price) {
    Product.call(this, name, price);
    this.category = "toy";
}

var cheese = new Food("feta", 5);
var fun = new Toy("robot", 40);
```

### 2.2. apply

> 方法调用一个具有给定 this 值的函数，以及作为一个数组（或类似数组对象）提供的参数。

参数

-   thisArg
    必选的。在 func 函数运行时使用的 this 值。请注意，this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
-   argsArray
    可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。

```js
// 语法
func.apply(thisArg, [argsArray]);

// 追加数组到另一个数组
var array = ["a", "b"];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

// 求数组最大数
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
```

### 2.3. bind

> 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

参数

1. thisArg : 调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用 new 运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。

2. arg1, arg2, ... : 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

描述

bind() 函数会创建一个新的绑定函数（bound function，BF）。绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。
绑定函数具有以下内部属性：

-   [[BoundTargetFunction]] - 包装的函数对象
-   [[BoundThis]] - 在调用包装函数时始终作为 this 值传递的值。
-   [[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
-   [[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个 this 值和一个包含通过调用表达式传递给函数的参数的列表。
    当调用绑定函数时，它调用 [[BoundTargetFunction]] 上的内部方法 [[Call]]，就像这样 Call(boundThis, args)。其中，boundThis 是 [[BoundThis]]，args 是 [[BoundArguments]] 加上通过函数调用传入的参数列表。

绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。

```js
this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
var module = {
    x: 81,
    getX: function() {
        return this.x;
    }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81

// Polyfill;
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind)
    (function() {
        var slice = Array.prototype.slice;
        Function.prototype.bind = function() {
            var thatFunc = this,
                thatArg = arguments[0];
            var args = slice.call(arguments, 1);
            if (typeof thatFunc !== "function") {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError(
                    "Function.prototype.bind - " +
                        "what is trying to be bound is not callable"
                );
            }
            return function() {
                var funcArgs = args.concat(slice.call(arguments));
                return thatFunc.apply(thatArg, funcArgs);
            };
        };
    })();
```

## 5. 函数柯里化

> 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

1. 用于创建已经设置好了一个或多个参数的函数，使用一个闭包返回一个函数。
2. 调用另一个函数并为它传入要柯里化的函数和必要参数

```js
function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function() {
        let innerArgs = Array.prototype.slice.call(arguments);
        let finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

function add(num1, num2) {
    return num1 + num2;
}

let curriedAdd = curry(add, 5);

console.log(curriedAdd(3));
```

## 函数的节流和函数防抖

> 在前端开发中有一部分的用户行为会频繁的触发事件执行，而对于 DOM 操作、资源加载等耗费性能的处理，很可能导致界面卡顿，甚至浏览器的崩溃。函数节流(throttle)和函数防抖(debounce)就是为了解决类似需求应运而生的

## 函数节流(throttle)

函数节流就是预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。

场景：

-   窗口调整（resize）
-   页面滚动（scroll）
-   抢购疯狂点击（mousedown）

```js
// 实现：
var processor = {
    timeoutId: null,
    //实际进行处理的方法
    performProcessing: function() {
        //实际执行的代码
    },
    //初始处理调用的方法
    process: function() {
        clearTimeout(this.timeoutId);
        var that = this;
        this.timeoutId = setTimeout(function() {
            that.performProcessing();
        }, 100);
    }
};
//尝试开始执行
processor.process();
```

## 函数防抖(debounce)

函数防抖就是在函数需要频繁触发情况时，只有足够空闲的时间，才执行一次.

场景：

-   实时搜索（keyup）
-   拖拽（mousemove）

## 浏览器缓存原理

## 柯里化函数两端的参数具体是什么东西

## sum(2, 3)实现 sum(2)(3)的效果

## 介绍纯函数

## 函数绑定

> 函数绑定要创建一个函数，可以在特定的 this 环境中
> 以指定参数调用另一个函数

```js
var handler = {
    message: "Event handled",
    handleClick: function(event) {
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", handler.handleClick);
```

## 函数签名

> 函数签名（或者类型签名，抑或方法签名）定义了函数或方法的输入与输出。

1. 签名可包含以下内容：

    - 参数及参数的类型
    - 一个的返回值及其类型
    - 可能会抛出或传回的异常
    - 该方法在面向对象程序中的可用性方面的信息（如 public、static 或 prototype）。
