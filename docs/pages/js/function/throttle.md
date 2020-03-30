# 函数节流(throttle)

> 函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行。
> 就是预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。

1. 第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。
2. 当第二次调用该函数时，它会清除前一次的定时器并设置另一个。
3. 如果前一个定时器已经执行过了，这个操作就没有任何意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。
4. 目的是只有在执行函数的请求停止了一段时间之后才执行。以下是该模式的基本形式：
5. 场景：

    - 窗口调整（resize）
    - 页面滚动（scroll）
    - 抢购疯狂点击（mousedown）

```js
// underscore.js
const throttle = function(func, wait, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) options = {};
    const now = () => new Date().getTime();

    const later = function(remaining) {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    // 执行 throttle 返回一个函数，并形成一个闭包，保存一些必要的变量，如timeout，记录函数的执行时间等
    const throttled = function() {
        const getNow = now();

        // {leading: false}  禁用第一次
        // {trailing: false} 禁用最后一次
        // 这里采用的是 === 绝对等于，undefined null 均无效
        if (!previous && options.leading === false) previous = getNow;

        // 更新剩余时间
        // 第一次执行， previous = 0   wait - (getNow - 0) = - 1585035328865
        const remaining = wait - (getNow - previous);
        context = this;
        args = arguments;

        // 第一次执行会出现负数
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = getNow;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        }

        // 添加定时器， 给timeout 赋值 ，第二次执行的时候，timeout 已经存在，便不会再走这个逻辑
        // later 中执行函数，并清楚timeout,并且重新记录当前函数的执行时间
        if (!timeout && options.trailing !== false) {
            timeout = setTimeout(() => later(remaining), remaining);
        }
        return result;
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};
```
