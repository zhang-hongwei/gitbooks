# 数组



## ["1", "2", "3"].map(parseInt)

```js
["1", "2", "3"].map(parseInt);
```

## [1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]

```js
[1, 2, 3, 4, 5].splice(3, 0, "a,b");
```

## 取数组的最大值（ES5、ES6）

```js
Math.max.apply(null, ary);

Math.max(...ary);
```
