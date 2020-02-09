# 数据类型

## 1. 原始类型

-   数字
-   字符串
-   布尔值
-   null
-   undefined
-   bigInt
-   symbol

### 1.1 数字

1. js 不区分整数值和浮点数，在 js 中所有的数字均用浮点数值表示。
2. js 采用 IEEE-754 浮点数表示法，这是一种二进制表示法，可以精确的比啊是分数，而我们常用的分数都是十进制分数，二进制浮点数表示法并不能精确表示 0.1 这样简单的数字
3. 判断 NaN(Not-A-Number), x!=x ,如果数字 x 不能于自身，则是 NaN

### 1.2 null

1. 表示一个控对象指针

### 1.3 undefined

1. 使用 var, let, const 等声明变量单未对其加以初始化时，这个变量的值就是 undefined
2. 从未声明的变量也是 undefined

⚠️ 显示地初始化变量是一个明智的选择，比如 typeof 返回一个 undefined 的值时，我们就知道被检测的变量是否被声明

```js
null == undefined; // ==> true
```

## 2. 引用(对象)类型

在 js 中引用类型是一种数据结构，用于将数据和功能组织在一起，也常被称为类。

## 3. 判断数据类型

### 3.1. typeof 操作符返回一个字符串，表示未经计算的操作数的类型

1. 在 ECMAScript 2015 之前，typeof 总能保证对任何所给的操作数返回一个字符串。即便是没有声明的标识符，typeof 也能返回 'undefined'。`使用 typeof 永远不会抛出错误。`

2. 但在加入了块级作用域的 let 和 const 之后，在其被声明之前对块中的 let 和 const 变量使用 typeof 会抛出一个 ReferenceError。块作用域变量在块的头部处于“暂存死区”，直至其被初始化，在这期间，访问变量将会引发错误。

### 3.2. instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链

### 3.3. constructor

### 3.4. Object.prototype.toString.call
