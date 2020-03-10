# Provider

```js
import { ReactReduxContext } from "./Context";
import Subscription from "../utils/Subscription";

function Provider({ store, context, children }) {
    const contextValue = useMemo(() => {
        const subscription = new Subscription(store);
        subscription.onStateChange = subscription.notifyNestedSubs;
        return {
            store,
            subscription
        };
    }, [store]);

    const previousState = useMemo(() => store.getState(), [store]);

    useEffect(() => {
        const { subscription } = contextValue;
        subscription.trySubscribe();

        if (previousState !== store.getState()) {
            subscription.notifyNestedSubs();
        }
        return () => {
            subscription.tryUnsubscribe();
            subscription.onStateChange = null;
        };
    }, [contextValue, previousState]);

    const Context = context || ReactReduxContext;

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
```

1. Provider 组件，返回一个 reactContext，为下面所有的组件提供 context

2. Provider 的 value，contextValue 是依赖 store 的变化计算得来，当store变化的时候，创建Subscription的实例=>subscription,
