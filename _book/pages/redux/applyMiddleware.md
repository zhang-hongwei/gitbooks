# applyMiddleware

```js
function applyMiddleware(...middlewares) {
    return createStore => (reducer, ...args) => {
        const store = createStore(reducer, ...args);
        let dispatch = () => {
            throw new Error(
                'Dispatching while constructing your middleware is not allowed. ' +
                    'Other middleware would not be applied to this dispatch.'
            );
        };

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        };
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        };
    };
}
```

## compose

```js
function compose(...funcs) {
    if (funcs.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => {
        // debugger;
        return (...args) => a(b(...args));
    });
}
```

## Middleware

```js
function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action);
        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);
        console.log('state after dispatch', getState());
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    };
}
```
