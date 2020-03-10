# 事件

## 事件的传播

### 冒泡

![bubble](./img/bubble.webp)

1. 由内层触发事件处理程序

### 捕获

![capturing](./img/capturing.webp)

1. 由外层就触发事件处理程序
2. 事件捕获只能用于 addEventListener 注册，且第三个参数 true 的事件处理程序中
3. IE9+
