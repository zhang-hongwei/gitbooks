# 中间件 applyMiddleware

1. 接收一到多个中间件

    - 返回一个函数，参数是 createStore
        - 返回一个函数，参数是 reducer，state 等
        - 创建 store
        - middlewareAPI
        - chain, 遍历 middlewares，执行每个 middleware，并将 middlewareAPI，作为参数
        - dispatch，compose 执行，将 chain= [fn1,fn2,fn3]形式的数组，转成线性，fn1(fn2(fn3()))

    ```js
    function applyMiddleware(...middlewares) {
        return createStore => (reducer, ...args) => {
            const store = createStore(reducer, ...args);
            let dispatch = () => {
                throw new Error(
                    "Dispatching while constructing your middleware is not allowed. " +
                        "Other middleware would not be applied to this dispatch."
                );
            };

            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action, ...args) => {
                    return dispatch(action, ...args);
                }
            };

            const chain = middlewares.map(middleware => {
                let a = middleware(middlewareAPI);

                return a;
            });

            dispatch = compose(...chain)(store.dispatch);

            return {
                ...store,
                dispatch
            };
        };
    }
    ```

2. middleware

    - 通过包装 store 的 dispatch 方法来实现一些功能
    - 多个 middleware 可以被组合到一起使用，形成 middleware 链。其中，每个 middleware 都不需要关心链中它前后的 middleware 的任何信息。
    - 接收 Store 的 dispatch 和 getState 函数作为命名参数，返回一个函数
    - 该函数会被传入 被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。
    - 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。
    - 所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。

    ```js
    function logger({ getState }) {
        return next => action => {
            console.log("will dispatch", action);

            // 调用 middleware 链中下一个 middleware 的 dispatch。
            let returnValue = next(action);

            console.log("state after dispatch", getState());

            // 一般会是 action 本身，除非
            // 后面的 middleware 修改了它。
            return returnValue;
        };
    }
    ```
