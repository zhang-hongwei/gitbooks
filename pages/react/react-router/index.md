# react-router

## react-router 构成

1. react-router 主要分为一下两部分，

    - history 对象，用于控制地址栏的 url 变换，并且不刷新页面，history 又分两种，一种 hash 模式，一种浏览器模式

        - hash 模式, 是靠修改 hash 值，然后监控 onhashchange 事件，匹配路由
        - browser 模式， 是靠 html 5 的 history 对象实现的，主要是 pushSate，onpopState

    - Router，Route 等组件，通过 React Context 传递 location 信息，并根据 location 信息，创建相应的组件
