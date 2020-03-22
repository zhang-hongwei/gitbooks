# 继承和原型链

## 原型

1. 实现继承的主要方法
2. 每个构造函数都有一个原型对象`prototype`
3. 原型对象都包含一个指向构造函数的指针
4. 实例都包含一个指向原型对象的内部指针`__proto__`

```js
function Fn() {
    this.num = 1;
}

Fn.prototype.fn = function() {
    console.log("原型上");
};

let instance = new Fn();

console.log(instance.__proto__.fn == Fn.prototype.fn); // true
console.log(instance instanceof Function); // false
console.log(Fn instanceof Function); // true
```
