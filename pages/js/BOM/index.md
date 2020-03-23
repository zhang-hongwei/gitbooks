# BOM

## location

其中包含有关文档当前位置的信息

1. location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是
   document 对象的属性；换句话说， window.location 和 document.location 引用的是同一个对象。

```js
window.location = document.location;
```
