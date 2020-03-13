# route

## render

```js
class Route extends React.Component {
    componentDidMount() {
        console.log("route===>", this.props);
    }

    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    invariant(
                        context,
                        "You should not use <Route> outside a <Router>"
                    );

                    const location = this.props.location || context.location;
                    const match = this.props.computedMatch
                        ? this.props.computedMatch // <Switch> already computed the match for us
                        : this.props.path
                        ? matchPath(location.pathname, this.props)
                        : context.match;

                    const props = { ...context, location, match };

                    let { children, component, render } = this.props;

                    // Preact uses an empty array as children by
                    // default, so use null if that's the case.
                    if (Array.isArray(children) && children.length === 0) {
                        children = null;
                    }

                    return (
                        <RouterContext.Provider value={props}>
                            {props.match
                                ? children
                                    ? typeof children === "function"
                                        ? __DEV__
                                            ? evalChildrenDev(
                                                  children,
                                                  props,
                                                  this.props.path
                                              )
                                            : children(props)
                                        : children
                                    : component
                                    ? React.createElement(component, props)
                                    : render
                                    ? render(props)
                                    : null
                                : typeof children === "function"
                                ? __DEV__
                                    ? evalChildrenDev(
                                          children,
                                          props,
                                          this.props.path
                                      )
                                    : children(props)
                                : null}
                        </RouterContext.Provider>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}
```

```js
// 1. 判断是否匹配到,
if (props.match) {
    if (children) {
        if (typeof children === "function") {
            if (__DEV__) {
                evalChildrenDev(children, props, this.props.path);
            } else {
                children(props);
            }
        } else {
            // children
        }
    } else {
        if (component) {
            React.createElement(component, props);
        } else {
            if (render) {
                render(props);
            } else {
                null;
            }
        }
    }
} else {
    if (typeof children === "function") {
        if (__DEV__) {
            evalChildrenDev(children, props, this.props.path);
        } else {
            children(props);
        }
    } else {
        // null;
    }
}
```

1. 组件接收 path,component/render 属性,
2. RouterContext.Consumer 提供的 context 包含 location,history 等属性
3. 使用组件的 path 和 context 的 location 进行匹配,匹配到就 React.createElement(component, props)/render(props),否则返回 null
