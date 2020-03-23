# History

1. history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。
2. 因为 history 是 window 对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的 history 对象与特定的
   window 对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的 URL。不过，借由用户访问
   过的页面列表，同样可以在不知道实际 URL 的情况下实现后退和前进。

## 属性

---

### History.length

返回一个整数，保存历史记录的数量。例如，在一个新的选项卡加载的一个页面中，这个属性返回 1,
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

按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈，数据被 DOM 进行不透明处理；你可以指定任何可以被序列化的 javascript 对象。

#### 参数

-   状态对象 — 状态对象 state 是一个 JavaScript 对象，通过 pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate 事件就会被触发，且该事件的 state 属性包含该历史记录条目状态对象的副本。  
    状态对象可以是能被序列化的任何东西。原因在于 Firefox 将状态对象保存在用户的磁盘上，以便在用户重启浏览器时使用，我们规定了状态对象在序列化表示后有 640k 的大小限制。如果你给 pushState() 方法传了一个序列化后大于 640k 的状态对象，该方法会抛出异常。如果你需要更大的空间，建议使用 sessionStorage 以及 localStorage.

-   标题 — Firefox 目前忽略这个参数，但未来可能会用到。在此处传一个空字符串应该可以安全的防范未来这个方法的更改。或者，你可以为跳转的 state 传递一个短标题。

-   URL — 该参数定义了新的历史 URL 记录。注意，调用 pushState() 后浏览器并不会立即加载这个 URL，但可能会在稍后某些情况下加载这个 URL，比如在用户重新打开浏览器时。新 URL 不必须为绝对路径。如果新 URL 是相对路径，那么它将被作为相对于当前 URL 处理。新 URL 必须与当前 URL 同源，否则 pushState() 会抛出一个异常。该参数是可选的，缺省为当前 URL。

在某种意义上，调用 pushState() 与 设置 window.location = "#foo" 类似，二者都会在当前页面创建并激活新的历史记录。但 pushState() 具有如下几条优点：

-   新的 URL 可以是与当前 URL 同源的任意 URL 。相反，只有在修改哈希时，设置 window.location 才能是同一个 document。
-   如果你不想改 URL，就不用改。相反，设置 window.location = "#foo";在当前哈希不是 #foo 时， 才能创建新的历史记录项。
-   你可以将任意数据和新的历史记录项相关联。而基于哈希的方式，要把所有相关数据编码为短字符串。
-   如果 标题 随后还会被浏览器所用到，那么这个数据是可以被使用的（哈希则不是）。

⚠️ 注意 pushState() `绝对不会触发 hashchange 事件，即使新的 URL 与旧的 URL 仅哈希不同也是如此`。

在 XUL 文档中，它创建指定的 XUL 元素。

在其它文档中，它创建一个命名空间 URI 为 null 的元素。

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

`History.replaceState 和 pushState 不会触发 popstate 事件`

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

当活动历史记录条目更改时，将触发 popstate 事件。如果被激活的历史记录条目是通过对 history.pushState（）的调用创建的，或者受到对 history.replaceState()的调用的影响，popstate 事件的 state 属性包含历史条目的状态对象的副本。

需要注意的是调用 history.pushState()或 history.replaceState()不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()或者 history.forward()方法）

不同的浏览器在加载页面时处理 popstate 事件的形式存在差异。页面加载时 Chrome 和 Safari 通常会触发(emit )popstate 事件，但 Firefox 则不会。
