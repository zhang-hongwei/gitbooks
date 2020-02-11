# History

接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

## 属性

---

### History.length

返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回 1,
返回浏览器历史列表中的 URL 数量。

### History.state

返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待 popstate 事件而查看状态而的方式

## 方法

---

### History.back()

前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 history.go(-1).

### History.forward()

在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1).

### History.go()

通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。比如：参数为-1 的时候为上一页，参数为 1 的时候为下一页. 当整数参数超出界限时( 译者注:原文为 When integerDelta is out of bounds )，例如: 如果当前页为第一页，前面已经没有页面了，我传参的值为-1，那么这个方法没有任何效果也不会报错。调用没有参数的 go() 方法或者不是整数的参数时也没有效果。( 这点与支持字符串作为 url 参数的 IE 有点不同)。

### History.pushState()

按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈，数据被 DOM 进行不透明处理；你可以指定任何可以被序列化的 javascript 对象。注意到 Firefox 现在忽略了这个 title 参数

## 监听 url 中的 hash 变化

```js
window.onhashchange = function(e) {
    console.log(e);
};
//or
window.addEventListener("hashchange", function(e) {
    console.log(e);
});
```

## 监听通过 history 来改变 url 的事件

```js
window.addEventListener("popstate", function(e) {
    console.log(e);
});
```

## replaceState 和 pushState 行为的监听

History.replaceState 和 pushState 确实不会触发 popstate 事件

1. 可以通过在方法里面主动的去触发 popState 事件
2. 代理该方法

```js
let _wr = function(type) {
    let orig = history[type];
    return function() {
        let rv = orig.apply(this, arguments);
        let e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");

(function(history) {
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({ state: state });
        }
        // ... whatever else you want to do
        // maybe call onhashchange e.handler
        return pushState.apply(history, arguments);
    };
})(window.history);
```

当活动历史记录条目更改时，将触发 popstate 事件。如果被激活的历史记录条目是通过对 history.pushState（）的调用创建的，或者受到对 history.replaceState（）的调用的影响，popstate 事件的 state 属性包含历史条目的状态对象的副本。

需要注意的是调用 history.pushState()或 history.replaceState()不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()或者 history.forward()方法）

不同的浏览器在加载页面时处理 popstate 事件的形式存在差异。页面加载时 Chrome 和 Safari 通常会触发(emit )popstate 事件，但 Firefox 则不会。
