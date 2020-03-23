# 其他 CSS 方式设置垂直居中

## 在 HTML 中如何做 SEO 优化

## 首屏和白屏时间如何计算

## 动画的了解

## Transform 动画和直接使用 Left、Top 改变位置有什么优缺点

## 介绍 CSS，Xsrf

## CSS 选择器有哪些

## 如何实现高度自适应

## 如何实现 H5 手机端的适配

## b 和 strong 的区别

## 居中为什么要使用 Transform（为什么不使用 MarginLeft/Top）

MarginLeft/Top 都需要宽度和高度才行

## Html 语义化的理解

## 清除浮动

1. clear

```js
// 现代浏览器clearfix方案，不支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}

// 全浏览器通用的clearfix方案
// 引入了zoom以支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}

// 全浏览器通用的clearfix方案【推荐】
// 引入了zoom以支持IE6/7
// 同时加入:before以解决现代浏览器上边距折叠的问题
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```

2. 创建 BFC
