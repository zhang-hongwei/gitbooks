# React

## React 生命周期函数

![React](../imgs/reactlife.png)

## 虚拟 DOM

1. 什么是虚拟 DOM
    > 通过使用 js 中的对象模拟 DOM 中的节点，然后再通过特定的 render 方法，将其渲染成真正的 DOM 节点
2. 虚拟 DOM 的好处
    >

## Dom diff

> 通过 js 层面的计算，返回一个 path 对象，即补丁对象，再通过特定的操作解析 path 对象，完成页面的重新渲染

1. 什么是 DOM diff

    - DOM 节点的跨层级已动工操作特别少，可以忽略不记
    - 拥有相同类的两个组件会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
    - 对于同一层级的一组节点，他们可以通过唯一的 key 进行区分，开发人员可以使用一个 key 指示在不同的渲染中那个哪些元素可以保持稳定

## 简易实现虚拟 DOM

```js
// 设置属性
const utils = {
    setAttr(node, key, value) {
        switch (key) {
            case "value":
                if (
                    node.tagName.toLocaleLowerCase() === "input" ||
                    node.tagName.toLocaleLowerCase() === "textarea"
                ) {
                    node.value = value;
                } else {
                    node.setAttribute(key, value);
                }
                break;
            case "style":
                node.style.cssText = value;

            default:
                node.setAttribute(key, value);
                break;
        }
    }
};

// 创建虚拟dom元素，即用object模拟树形dom结构
class Element {
    constructor(tagName, attrs, children) {
        this.tagName = tagName;
        this.attrs = attrs;
        this.children = children;
    }
}

function createElement(tagName, attrs, children) {
    return new Element(tagName, attrs, children);
}

// 渲染dom元素，将虚拟dom转换为真实dom，并添加到页面上
function render(virtualDom, target) {
    // 根据虚拟dom数据，创建真是节点，
    let rootNode = document.createElement(virtualDom.tagName);
    // 添加属性
    for (let key in virtualDom.attrs) {
        utils.setAttr(rootNode, key, virtualDom.attrs[key]);
    }

    // 循环子节点，将字节点转换为真实节点
    // 如果是虚拟dom，就递归调用render方法，否则创建文本节点
    // 将子节点添加到根元素
    virtualDom.children.forEach((child, key) => {
        child =
            child instanceof Element
                ? render(child)
                : document.createTextNode(child);

        rootNode.appendChild(child);
    });

    return rootNode;
}

function domRender(virtualDom, target) {
    let dom = render(virtualDom);
    target.appendChild(dom);
}
```

## diff

1. diff 函数用来找出不同的节点，并用索引记录下来，
2. walk 用来对比两个节点的区别
    - 如果不存在新的节点, 说明要删除所有节点，直接 push 一个"REMOVE"类型
    - 如果连个节点是字符串，说明是文本节点，如果不相等，就 push 一个"TEXT"类型，value 是新的节点
    - 如果节点名称相同，就对比属性和 children，
        - 属性对比
            - 先拿老节点的属性值和新节点的属性对比
            - 再拿新节点的属性和老节点的属性对比
            - 因为第一步中，是以老节点为基础，对比的是老节点上存在的属性在新节点上是否存在，第二部是以新节点为基础，对比新节点上的属性在老节点是否存在
        - children 对比
            - 递归 walk

```js
function diff(oldDom, newDom) {
    let patches = {};
    let index = 0;
    walk(oldDom, newDom, index, patches);

    return patches;
}

function walk(oldDom, newDom, index, patches) {
    let current = [];
    if (!newDom) {
        current.push({ type: "REMOVE", index });
    } else if (utils.isString(oldDom) && utils.isString(newDom)) {
        if (oldDom != newDom) {
            current.push({ type: "TEXT", text: newDom });
        }
    } else if (oldDom.tagName === newDom.tagName) {
        let attr = diffAttr(oldDom.attrs, newDom.attrs);
        if (Object.keys(attr).length > 0) {
            current.push({
                type: "ATTR",
                attr
            });
        }

        diffChildren(oldDom.children, newDom.children, patches);
    } else {
        current.push({
            type: "REPLACE",
            newDom
        });
    }

    if (current.length) {
        patches[index] = current;
    }
}

let num = 0;

function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches);
    });
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key];
        }
    }

    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}
```

## 什么是高阶组件

> 高阶组件是参数为组件，返回值为新组件的函数
