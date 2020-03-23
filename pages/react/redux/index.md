# redux

## createStore

1. 是否存在中间件

    - 是,调用 enhancer(applyMiddleware(middlewares)) 创建 store
    - 否,正常创建 store

2. store 中存在以下几个主要方法

    - dispatch, 接收一个对象(action)
        - 调用 reducer
        - 执行 listeners
        - 返回 action
    - subscribe,接收一个监听函数
        - push 到 listeners 中
        - 返回一个接触监听的函数
    - getState
        - 返回 state
    - replaceReducer
        - 接收一个 reducer
        - 替换当前 reducer
        - 返回 store

## compose

> [fn1,fn2,fn3] => fn1(fn2(fn3(arg)))

## applyMiddleware

1. 接收一到多个中间件
2. 返回一个函数，参数是 createStore
    - 返回一个函数，参数是 reducer，state 等
        - 创建 store
        - 使用 compose 将 middlewares 转换成 middleware 链
        - 返回 store，dispatch

## middlewares

1. 通过包装 store 的 dispatch 方法来实现一些功能
    - 多个 middleware 可以被组合到一起使用，形成 middleware 链。其中，每个 middleware 都不需要关心链中它前后的 middleware 的任何信息。
    - 接收 Store 的 dispatch 和 getState 函数作为命名参数，返回一个函数
    - 该函数会被传入 被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。
    - 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。
    - 所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。
