# 在 HTML 中如何做 SEO 优化

## Html 语义化的理解

## CSS 中选择器有哪些？CSS 选择器优先级是怎么去匹配

1. 基本选择器

    - 通用选择器（Universal selector）
    - 类型选择器（Type selector）
    - 类选择器（Class selector）
    - ID 选择器（ID selector）
    - 属性选择器（Attribute selector）

2. 组合选择器

    - 选择器列表（Selector list）

3. 组合器

    - 后代组合器（Descendant combinator）
    - 子代组合器（Child combinator）
    - 一般兄弟组合器（General sibling combinator）
    - 紧邻兄弟组合器（Adjacent sibling combinator）
    - 列组合器（Column combinator）

4. 伪选择器

    - 伪类
    - 伪元素

5. 优先级

    - 优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

## CSS 中哪些属性可以继承

1. 字体系列属性

    - font-family：字体系列
    - font-weight：字体的粗细
    - font-size：字体的大小
    - font-style：字体的风格

2. 文本系列属性

    - text-indent：文本缩进
    - text-align：文本水平对齐
    - line-height：行高
    - word-spacing：单词之间的间距
    - letter-spacing：中文或者字母之间的间距
    - text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）
    - color：文本颜色

3. 元素可见性：

    - visibility：控制元素显示隐藏

4. 列表布局属性：

    - list-style：列表风格，包括 list-style-type、list-style-image 等

5. 光标属性：

    - cursor：光标显示为何种形态

## 首屏和白屏时间如何计算

1. 白屏时间是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间。

    > 白屏时间 = 地址栏输入网址后回车 - 浏览器出现第一个元素  
    > 影响白屏时间的因素：网络、服务端性能，前端页面结构设计

2. 首屏时间是指浏览器从响应用户输入网络地址，到首屏内容渲染完成的时间。

    > 首屏时间 = 地址栏输入网址后回车 - 浏览器第一屏渲染完成  
    > 影响首屏时间的因素：白屏时间，资源下载执行时间

<!-- 使用performance.timing对象里面的数据进行计算操作就能得出时间啦。
公式如下：
DNS解析时间： domainLookupEnd - domainLookupStart
TCP建立连接时间： connectEnd - connectStart
白屏时间： responseStart - navigationStart
dom渲染完成时间： domContentLoadedEventEnd - navigationStart
页面onload时间： loadEventEnd - navigationStart -->

## 动画的了解

## Transform 动画和直接使用 Left、Top 改变位置有什么优缺点

1. translate,只是改变了视觉位置,元素本身位置还是在 0px, 不会发生 DOM 重绘

2. 使用 top left 定位是直接改变元素真实位置的

## 介绍 CSS，Xsrf

## b 和 strong 的区别

1. b 为了加粗而加粗
2. strong 为了标明重点而加粗。

## 居中为什么要使用 Transform（为什么不使用 MarginLeft/Top）

> MarginLeft/Top 都需要宽度和高度才行

## 清除浮动

1. 可以先概括解决高度塌陷问题的两种类型：clear 属性 和 BFC 法
2. 然后可以介绍两种类型的具体方案：
    - 追加元素并设置 clear 属性
    - 使用 CSS 样式插入伪元素
    - BFC 方案

## CSS 清除浮动的原理是什么

> 利用清除可以设置元素禁止浮动元素出现在它的左侧、右侧甚至是双侧。

## 介绍 flex 布局

1. 什么是 flex 布局
2. flex 构成
    - 两个轴
    - 两种属性

## Flex 如何实现上下两行，上行高度自适应，下行高度 200px

```js
flex-direction: column
flex: 1
```

## display, table 和 block 有什么区别

1. block 此元素将显示为块级元素，此元素前后会带有换行符。
2. table 此元素会作为块级表格来显示（类似 table），表格前后带有换行符。

## BFC 是什么

> https://juejin.im/post/5d690c726fb9a06b155dd40d

## CSS 中的 vertical-align 有哪些值？它在什么情况下才能生效

> `vertical-align` 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

1. vertical-align 属性值：

    - 线类：baseline、top、middle、bottom
    - 文本类：text-top、text-bottom
    - 上标下标类：sub、super
    - 数值百分比类：20px、2em、20%等（对于基线往上或往下偏移）
    - 负值相对于基线往下偏移，正值往上偏移，事实上 vertical-align:base-line 等同于 vertical-align:0。这个负值真的是 CSS 神器！

2. vertical-align 生效前提：

    - 内联元素 span、strong、em、img、button、input 等
    - display 值为 inline、inline-block、inline-table 或 table-cell 的元素
    - ⚠️`需要注意浮动和绝对定位会让元素块状化，因此此元素绝对不会生效`

## 伪元素和伪类有什么区别

1. 伪类是添加到选择器的关键字，`指定要选择的元素的特殊状态`。用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。
    - :first-child
2. 伪元素用于创建一些不在文档树中的元素，并为其添加样式

    - ::after, :: before
    - 一个选择器中只能使用一个伪元素。伪元素必须紧跟在语句中的简单选择器/基础选择器之后。
    - ⚠️ 按照规范，应该使用双冒号（::）而不是单个冒号（:），以便区分伪类和伪元素。但是，由于旧版本的 W3C 规范并未对此进行特别区分，因此目前绝大多数的浏览器都同时支持使用这两种方式来表示伪元素。

3. 区别
    - 伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。
    - CSS3 规范中的要求使用双冒号(::)表示伪元素，以此来区分伪元素和伪类，比如::before 和::after 等伪元素使用双冒号(::)，:hover 和:active 等伪类使用单冒号(:)。除了一些低于 IE8 版本的浏览器外，大部分浏览器都支持伪元素的双冒号(::)表示方法。

## CSS 可以做哪些优化工作

## 关于 px,rem 和 em 的区别

> rem:`表示根元素的字体大小`（通常为`<html>`）

1. 下面是一个动态设置 html 字体大小的公式

    ```js
    ~(function() {
        window.addEventListener("resize", computed);
        // 添加事件，当设备尺寸改变，就执行computed函数
        computed();
        function computed() {
            var deviceW =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            // 获取设备的宽度
            if (deviceW > 640) return;
            // 当前案例是以640的设计稿为例，判断，若是设备尺寸超过640，就不在执行computed
            document.documentElement.style.fontSize =
                (deviceW / 640) * 100 + "px";
            // 100 这里的100是在屏幕尺寸为640的时候，html字体大小为100px，之所以设置100，是为了便于计算
            // 设置html的字体大小  这里是以640的设计稿为基准，当我们使用的设备宽度（deviceW）刚好为640的时候，html的  字体大小为100px; 当设备大小改变，小于640的时候， 就会触发resize函数，computed执行，动态的获取设备的宽度，然后除以640，就能计算出当前设备大小是原设计稿的百分之多少，然后乘以100，就能计算出当前屏幕宽度下html的字体大小为多少

            // 1. `document.documentElement.style.fontSize`=xxxx 这里是设置 html 字体大小
            // 2.  以当前的计算公式，若是设备尺寸为 640，计算后`html`的字体大小为 100px; `1rem` 就是 100px; 若是屏幕尺寸缩小到 320，`computed`函数会自动获取屏幕的宽度，重新计算 html 的字体大小，此时`html`字体大小应为 50，所以`1rem`就等于 50px，
            // 3.   而我们布局采用`rem`布局， `width:.5rem`, 意思就是某个物体的宽度值相对于 html 的字体大小的值的百分比，`width:.5rem` 就是`width`的值相对于`html`字体大小的百分比为 50%。因为 html 随着屏幕的大小改变，会不停的变化，所以 width 的值也会跟着改变
        }
    })();
    ```

### em

> em 和 rem 一样都是相对单位，只不过 em 是以父级的 font-size 值决定的,当最近的父级没有设置 font-size 时，就会向上一层找，若是还没有就会一直向上找，直到找到 html，若是还没有，就按浏览器默认字体大小，16px(在火狐和 chrome);

### px

> PX 实际上就是像素，用 PX 设置字体大小时，比较稳定和精确  
> 一般浏览器支持的最小字体大小应该为 12px

## 盒模型

1. 什么是盒模型
2. 盒子模型的组成
3. 标准盒模型和怪异盒模型的区别
