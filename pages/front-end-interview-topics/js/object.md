# Object

## 浅拷贝

1. Object.assign
2. 扩展运算符
3. Array.prototype.slice
4. Array.prototype.concat

## 对象的深拷贝

1. 拷贝的对象的值中如果有函数,undefined,symbol 则经过 JSON.stringify()序列化后的 JSON 字符串中这个键值对会消失
2. 无法拷贝不可枚举的属性，无法拷贝对象的原型链
3. 拷贝 Date 引用类型会变成字符串
4. 拷贝 RegExp 引用类型会变成空对象
5. 对象中含有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null
6. 无法拷贝对象的循环应用(即 obj[key] = obj)

```js
function deepClone(obj) {
    let cloneObj = {}; //在堆内存中新建一个对象
    for (let key in obj) {
        //遍历参数的键
        if (typeof obj[key] === 'object') {
            cloneObj[key] = deepClone(obj[key]); //值是对象就再次调用函数
        } else {
            cloneObj[key] = obj[key]; //基本类型直接复制值
        }
    }
    return cloneObj;
}
```
