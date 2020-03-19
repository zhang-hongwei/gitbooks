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

## position

> CSS position 属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

1. static
    - static 是 position 属性的默认值。如果省略 position 属性，浏览器就认为该元素是 static 定位。
2. relative
    - 不脱离文档流
    - relative 表示，相对于默认位置（即 static 时的位置）进行偏移，即定位基点是元素的默认位置。
      ![relative](../../imgs/relative.jpg)
3. fixed
    - 脱离文档流
    - 定位基点是浏览器窗口，这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。
      ![relative](../../imgs/fixed.jpg)
4. absolute
    - 绝对定位元素脱离文档流
    - 绝对定位元素相对于最近的非 static 祖先元素定位。当这样的祖先元素不存在时，则相对于 ICB（inital container block, 初始包含块）
    - ⚠️ 定位基点，不能是 static 定位，否则定位基点就会变成整个网页的根元素 html。
      ![relative](../../imgs/position.jpg)
5. sticky
    - 不脱离文档流
    - 相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括 table-related 元素，基于 top, right, bottom, 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。
    - ⚠️sticky 生效的前提是，必须搭配 top、bottom、left、right 这四个属性一起使用，不能省略，否则等同于 relative 定位，不产生"动态固定"的效果。原因是这四个属性用来定义"偏移距离"，浏览器把它当作 sticky 的生效门槛。

## flex 弹性布局

![flex 弹性布局](../../imgs/flexbox.png)

> 1. Flex 是 Flexible Box 的缩写，意为"弹性布局".
> 2. 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
> 3. 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。
> 4. 项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

1. 容器属性

    - flex-direction
    - flex-wrap
    - flex-flow
    - justify-content
    - align-items
    - align-content

2. 元素属性

    - order
    - flex-grow
    - flex-shrink
    - flex-basis
    - flex ，flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。
    - align-self

```js

.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
  // 0 1 auto  默认值， 后两个可选
}

```

## BFC

> 块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视化 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

1. 下列方式会创建块格式化上下文：
    - 根元素(<html>)
    - 浮动元素（元素的 float 不是 none）
    - 绝对定位元素（元素的 position 为 absolute 或 fixed）
    - 行内块元素（元素的 display 为 inline-block）
    - 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
    - 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
    - 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、 - tbody、thead、tfoot 的默认属性）或 inline-table）
    - overflow 值不为 visible 的块元素
    - display 值为 flow-root 的元素
    - contain 值为 layout、content 或 paint 的元素
    - 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
    - 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
    - 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
    - column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

## CSS 基础框盒模型(CSS basic box model)

> 当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

![box model](../../imgs/boxmodel1.png)

1. 每个盒子有四个边界

    - 内容边界 Content edge、内边距边界 Padding Edge、边框边界 Border Edge、外边框边界 Margin Edge。
    - box-sizing
    - ⚠️ `除可替换元素外，对于行内元素来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）则由 line-height 属性决定，即使边框和内边距仍会显示在内容周围。`

2. 标准盒模型

    - 在标准模式下，一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)

        ![box model](../../imgs/w3cboxmodel.png)

3. IE 盒模型

    - 在怪异模式下，一个块的总宽度= width + margin(左右)（即 width 已经包含了 padding 和 border 值）

        ![box model](../../imgs/ieboxmodel.png)

4. box-sizing 规定如何计算一个元素的总宽度和总高度。元素默认为 content-box

    - content-box 标准盒模型，width,height 只包含内容的 width,heght,最后看到的 width，height 都会另外加上 padding,border
        - width = 内容的宽度 + padding + border
        - height = 内容的高度 + padding + border
    - border-box 怪异盒模型，width,height 包含 content,padding,border
        - width = border + padding + 内容的宽度
        - height = border + padding + 内容的高度

## 外边距合并

> 当块级元素（block）的上外边距(margin-top)和下外边距(margin-bottom)同时都有设定时只会只会保留最大边距，这种行为称为边界折叠（margin collapsing），有时也翻译为外边距重叠。

1. 同一层相邻元素之间
2. 没有内容将父元素和后代元素分开
3. 空的块级元素
4. ⚠️ `注意有设定 float 和 position=absolute 的元素不会产生外边距重叠行为。`

## 视觉格式化模型(visual formatting model)

## 居中为什么要使用 Transform（为什么不使用 MarginLeft/Top）

## Rrem、Flex 的区别（Root em）

## em 和 px 的区别

## Html 语义化的理解

## 清除浮动
