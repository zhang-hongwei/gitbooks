# 继承和原型链

## 原型

1. 实现继承的主要方法
2. 每个构造函数都有一个原型对象`prototype`
3. 原型对象都包含一个指向构造函数的指针
4. 实例都包含一个指向原型对象的内部指针`__proto__`

| 对象类型      | prototype | `__proto__` |
| ------------- | --------- | ----------- |
| 普通对象 (NO) | ❎        | ✅          |
| 函数对象 (FO) | ✅        | ✅          |

```js
typeof Function === "function";
typeof Object === "function";

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

## 原型链

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型
对象的内部指针。那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的
原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数
的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实
例与原型的链条。这就是所谓原型链的基本概念。

## 继承

1. 借用构造函数

    - 在子类型构造函数的内部调用超类型构造函数
    - 可以在子类型构造函数中向超类型构造函数传递参数
    - ⚠️ 缺点: 不能继承超类型原型上的方法

    ```js
    function Super() {
        this.a = "fn1";
    }

    Super.prototype.toText = function() {};

    function Sub() {
        this.b = "fn2";
        Super.call(this);
    }

    let instance = new Super();
    console.dir(instance);
    ```

2. 组合继承(伪经典继承)

    - 将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式
        - 使用原型链实现对原型属性和方法的继承
        - 而通过借用构造函数来实现对实例属性的继承
    - ⚠️ 缺点
        - 实例上的方法和属性会被继承两遍
        - 无论什么情况下都会调用两次超类型构造函数

    ```js
    function Super() {
        this.a = "fn1";
    }

    Super.prototype.toText = function() {};

    function Sub() {
        this.b = "fn2";
        Super.call(this);
    }
    Sub.prototype = new Super();
    Sub.prototype.constructor = Sub;
    Sub.prototype.con = function() {};

    let instance = new Super();
    console.dir(instance);
    ```

3. 原型式继承

    - 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

    ```js
    // 1
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    // 2
     let Sub.prototype = Object.create(new Super)
    ```

4. 寄生式继承

    - 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象
    - ⚠️ 缺点: 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似。

    ```js
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    function createAnother(o) {
        let clone = object(o);
        clone.say = function() {
            console.log("hi");
        };
        return clone;
    }
    ```

5. 寄生组合式继承

    - 即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
    - 不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已
    - 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型

    ```js
    function SuperType() {
        this.a = "fn1";
        this.name = "super";
        this.colors = ["red", "green"];
    }

    SuperType.prototype.toText = function() {};

    function Sub() {
        this.b = "fn2";
        SuperType.call(this);
    }

    function inheritPrototype(sub, superType) {
        let prototype = Object.create(superType.prototype);
        prototype.constructor = sub;
        sub.prototype = prototype;
    }

    inheritPrototype(Sub, SuperType);

    let instance = new Sub();
    ```

6. class 类继承
