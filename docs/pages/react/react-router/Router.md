# React 路由

## RouterContext

## Router

```js
class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }

    constructor(props) {
        super(props);

        this.state = {
            location: props.history.location
        };

        // This is a bit of a hack. We have to start listening for location
        // changes here in the constructor in case there are any <Redirect>s
        // on the initial render. If there are, they will replace/push when
        // they mount and since cDM fires in children before parents, we may
        // get a new location before the <Router> is mounted.
        this._isMounted = false;
        this._pendingLocation = null;

        if (!props.staticContext) {
            // 监听location的变化,并返回一个取消监听的函数
            this.unlisten = props.history.listen(location => {
                if (this._isMounted) {
                    this.setState({ location });
                } else {
                    this._pendingLocation = location;
                }
            });
        }
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._pendingLocation) {
            this.setState({ location: this._pendingLocation });
        }
    }

    componentWillUnmount() {
        if (this.unlisten) this.unlisten();
    }

    render() {
        return (
            <RouterContext.Provider
                children={this.props.children || null}
                value={{
                    history: this.props.history,
                    location: this.state.location,
                    match: Router.computeRootMatch(
                        this.state.location.pathname
                    ),
                    staticContext: this.props.staticContext
                }}
            />
        );
    }
}
```

> 1. 在 constructor 中 调用 history 的 listen 方法，监听 location 的变化，每当 url 发生变化的时候，就更新状态，这个时候 Context 以及下面的 Consumer 也会都会更新数据，根据新的 url 重新匹配组件。 listen 执行的返回值是一个取消监听的函数
> 2. Router 组件返回一个 ReactContext.Provider,并将 history,location,match,staticContext,作为 value 传给子组件,children 则是作为 React 的 children 属性
