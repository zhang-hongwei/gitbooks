# 介绍暂时性死区

## 1. let 和 const 命令

### 1.1 let/const

1. let 声明的变量，只在其所在的代码块内有效
2. 不存在变量提升
3. 暂时性死区，只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
4. 不允许在相同作用域内，重复声明同一个变量
5. 形成块级作用域

### 1.2 const

1. const 声明一个只读的常量。一旦声明，常量的值就不能改变。这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值。
2. const 只能保证这个指针是固定的（即总是指向另一个固定的地址）

## 2. 变量的结构赋值

1. 如果解构不成功，变量的值就等于 undefined。
2. 默认值 ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效。

```js
let [x = 1] = [null];
x; // null
```

## 3. 字符串的扩展

1. 模板字符串

## 4. 数值的扩展

## 5. 函数的扩展

1. rest 参数
2. 默认值
3. 箭头函数

### 5.1 箭头函数有几个使用注意点

1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2. 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

3. 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

4. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

```js
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

var id = 21;

foo.call({ id: 42 });

function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function() {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```

### 5.2 箭头函数不适用场景

```js
// 1. 第一个场合是定义对象的方法，且该方法内部包括this。
// this指向全局对象, 这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。
const cat = {
    lives: 9,
    jumps: () => {
        this.lives--;
    }
};

// 2. 第二个场合是需要动态this的时候，也不应使用箭头函数。
var button = document.getElementById('press');
button.addEventListener('click', () => {
    this.classList.toggle('on');
});

// 3. 逻辑复杂函数
```

## 6. Symbol

## 7. Set 和 Map 数据结构

### 7.1 ES6 中的 Map 和原生的对象有什么区别

## 8. Promise

> Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值.
> Promise 本质上可以认为是回调函数的另外一种展现形式，这种展示更优雅，更易阅读

### 8.1 基本使用

```js
new Promise( function(resolve, reject) {...} /* executor */  );
```

1. executor 是带有 resolve 和 reject 两个参数的函数 。
2. Promise 构造函数执行时立即调用 executor 函数， resolve 和 reject 两个函数作为参数传递给 executor（executor 函数在 Promise 构造函数返回所建 promise 实例对象前被调用）。
3. resolve 和 reject 函数被调用时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。
4. executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用 resolve 函数来将 promise 状态改成 fulfilled，要么调用 reject 函数将 promise 的状态改为 rejected。
5. 如果在 executor 函数中抛出一个错误，那么该 promise 状态为 rejected。executor 函数的返回值被忽略。
6. 因为 Promise.prototype.then 和 Promise.prototype.catch 方法返回 promise 对象， 所以它们可以被链式调用。

### 8.2 方法

Promise.all(iterable)

1. 这个方法返回一个新的 promise 对象，该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功，一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。
2. 这个新的 promise 对象在触发成功状态以后，会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值，顺序跟 iterable 的顺序保持一致；
3. 如果这个新的 promise 对象触发了失败状态，它会把 iterable 里第一个触发失败的 promise 对象的错误信息作为它的失败错误信息。

Promise.race(iterable)

1. 当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象。

Promise.reject(reason)

1. 返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法

Promise.resolve(value)

1. 返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable(即，带有 then 方法的对象)，返回的 Promise 对象的最终状态由 then 方法执行决定；
2. 否则的话(该 value 为空，基本类型或者不带 then 方法的对象),返回的 Promise 对象状态为 fulfilled，并且将该 value 传递给对应的 then 方法。
3. 通常而言，如果你不知道一个值是否是 Promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象,这样就能将该 value 以 Promise 对象形式使用。

Promise.prototype.catch(onRejected)

Promise.prototype.then(onFulfilled, onRejected)

Promise.prototype.finally(onFinally)

无论当前 promise 的状态是完成(fulfilled)还是失败(rejected)，都会执行该函数

## 9. Iterator

Iterator 的作用有三个：

1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. ES6 创造了一种新的遍历命令 for...of 循环，`Iterator 接口主要供 for...of 消费。

Iterator 的遍历过程是这样的。

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。

3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。

4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

描述

1. Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 for...of 循环（详见下文）。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
2. 默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性,一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”.
3. 任意一个对象的 Symbol.iterator 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

## 10. Generator

1. 执行 Generator 会返回一个遍历器对象
2. 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象（遍历器对象）
3. 必须调用遍历器对象的 next 方法，使得指针移向下一个状态。每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。
4. 由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。

⚠️ 需要注意的是，`yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行`，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

### 10.1 与 Iterator 接口的关系

1. 由于任意一个对象的 Symbol.iterator 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。而 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 Symbol.iterator 属性，从而使得该对象具有 Iterator 接口。

2. Generator 函数执行后，返回一个遍历器对象。该对象本身也具有 Symbol.iterator 属性，执行后返回自身。

### 使用场景

1. 异步
2. 控制流管理
3. 部署 Iterator 接口
4. 作为数据结构

## 11. async

基本使用

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

// async 实现原理
// async 函数的实现原理，就是将 Generator 函数和自动执行器+Promise，包装在一个函数里。
function fn(args) {
    return spawn(function*() {
        // ...
    });
}

function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v);
                    });
                },
                function(e) {
                    step(function() {
                        return gen.throw(e);
                    });
                }
            );
        }
        step(function() {
            return gen.next(undefined);
        });
    });
}
```

### 11.1 async 和 Generator 的区别

1. 内置执行器,Generator 函数的执行必须靠执行器，所以才有了 co 模块，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
2. 更好的语义。
3. 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，`而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。`
4. 返回值是 Promise。

async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。

## 12. Class

## 13. Module

## for...of, for...in

### for...of

1, 可以迭代数组，String,TypedArray,Map,Set,arguments,生成器,DOM 集合等

2. 可以由 break, throw continue 或 return 终止

### for...in addEventListener

-   主要为对象设计
-   数组的键名是数字，但是 for...in 循环是以字符串作为键名“0”、“1”、“2”等等。
-   for...in 循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
-   某些情况下，for...in 循环会以任意顺序遍历键名。

## Set

1. 类似于数组，但是成员的值都是唯一的，没有重复的值。
2. 方法
    - add
    - delete
    - has
    - clea
    - size

## WeakSet

1. WeakSet 的成员只能是对象，而不能是其他类型的值。
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## Map

1. 本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

## WeakMap

1. 首先，WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名。
2. 其次，WeakMap 的键名所指向的对象，不计入垃圾回收机制。
