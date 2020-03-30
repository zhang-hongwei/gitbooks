# route

## pathToRegexp

1. 输入是路径字符串（也就是 Route 中定义的 path 的值），输出包含两部分

    - 正则表达式（re)
    - 一个数组(keys)（用于记录 param 的 key 信息）

## matchPath

1. 参数:

    - pathname 当前页面的 url

    - options 当前 Route 的信息，必须有 path

2. 执行过程

    - matchPath 接收当前页面的 url，和当前 Route 的 path 属性
    - 调用 compilePath，接收当前 Route 的 path 属性和一些默认参数，
        - 调用 pathToRegexp 方法，将当前的 Route 的 path 转换为一个正则表达式,
        - 返回一个包含正则表达式，和 keys 的对象
    - 根据 compilePath 返回的正则捕获当前页面的 url(pathname)，如果当前 url 和 path 转换的正则匹配就返回一个数组，否则返回 null,
        - 匹配成功, matchPath 返回一个包含 path,url,isExact,params 的 Object
        - 匹配失败,返回 null,matchPath 结束,返回 null

3. 根据 matchPath 返回的结果,决定创建哪个组件,如果 null,则不创建

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
