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

        console.log("===> this.propsqqq", this.props);
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

Router 组件返回一个 ReactContext.Provider,并将 history,location,match,staticContext,作为 value 传给子组件,children 则是作为 React 的 children 属性
