# Function

## 1. 构造函数

## 2. 函数柯里化

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

## 柯里化函数两端的参数具体是什么东西

## Bind、Call、Apply 的区别

## sum(2, 3)实现 sum(2)(3)的效果

## 介绍纯函数

## 防抖和节流的区别

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

## call、apply、bind 的区别

### call

参数:

-   thisArg : 可选, function 函数运行时使用的 this 值。

`this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。`

-   arg1, arg2, ... : 指定的参数列表

#### 使用

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
