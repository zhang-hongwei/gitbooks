# Function

## 1. 构造函数

### new 操作符

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象)
3. 执行构造函数中的代码(为这个新对象添加属性)
4. 返回新对象

## 2. 函数柯里化

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
