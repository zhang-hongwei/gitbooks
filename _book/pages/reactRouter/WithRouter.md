# withRouter.js

```js
function withRouter(Component) {
    const displayName = `withRouter(${Component.displayName ||
        Component.name})`;
    const C = props => {
        const { wrappedComponentRef, ...remainingProps } = props;

        return (
            <RouterContext.Consumer>
                {context => {
                    invariant(
                        context,
                        `You should not use <${displayName} /> outside a <Router>`
                    );
                    return (
                        <Component
                            {...remainingProps}
                            {...context}
                            ref={wrappedComponentRef}
                        />
                    );
                }}
            </RouterContext.Consumer>
        );
    };

    C.displayName = displayName;
    C.WrappedComponent = Component;

    if (__DEV__) {
        C.propTypes = {
            wrappedComponentRef: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func,
                PropTypes.object
            ])
        };
    }

    return hoistStatics(C, Component);
}
```
