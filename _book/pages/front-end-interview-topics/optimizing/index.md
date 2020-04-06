# 项目优化

## 抽取公共文件是怎么配置的

## 项目中如何处理安全问题

## 网站的性能优化 (这个在网上有很多文章，但是要注意实践)

## React 优化

1. React 语法层面的优化

    - 避免重新渲染
        - PureComponent，只是浅比较
        - React.memo，和 PureComponent 一样，但这个仅适用于函数组件，`默认只进行浅比较，可以传第二个参数进行复杂对象的比较`
        - shouldComponentUpdate
    - useCallback
    - Fragment 减少不必要的嵌套
    - map 的范围
    - if 中不要包含不必要的元素
    - 比如不要在渲染函数(render)中进行数组排序、数据转换、订阅事件、创建事件处理器等等. 渲染函数中不应该放置太多副作用
    - react-virtualized
    - react-window
    - CSS > 大部分 CSS-in-js > inline style 避免行内样式
    - 简化 props
    - 绑定事件
        - 避免使用箭头函数，`使用箭头函数的情况下，每次组件的重新渲染都创建新的事件处理程序`
        - 在 constructor 中使用 bind 绑定函数
    - 简化 state
    - recompose 控制 shouldComponentUpdate
    - 组件单一职责

2. immutable
