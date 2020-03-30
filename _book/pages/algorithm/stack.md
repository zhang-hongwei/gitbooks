# 栈

1. 遵循后进先出(LIFO)原则的有序集合
2. 一端称作栈顶，一端称作栈底，新元素都靠近栈顶，旧元素都靠近栈底
3. 栈也被用在编程语言的编译器和内存中保存变量、方法调用等,也被用于浏览器历史记录(浏览器的返回按钮)

```js
class Stack {
    constructor() {
        this.stack = [];
    }
    push(element) {
        // console.log(element, arg);
        return this.stack.push(element);
    }
    unshift(element) {
        return this.stack.unshift(element);
    }
    shift() {
        return this.stack.shift();
    }
    pop() {
        return this.stack.pop();
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    isEmpty() {
        console.log(this.stack.length);
        return !this.stack.length;
    }
    size() {
        return this.stack.length;
    }
    clear() {
        this.stack = [];
    }
}

export default Stack;
```
