# module

1. 在 Node.js 模块系统中，每个文件都被视为一个独立的模块。

## module 对象

module.id 模块的识别符，通常是带有绝对路径的模块文件名。
module.filename 模块的文件名，带有绝对路径。
module.loaded 返回一个布尔值，表示模块是否已经完成加载。
module.parent 返回一个对象，表示调用该模块的模块。
module.children 返回一个数组，表示该模块要用到的其他模块。
module.exports 表示模块对外输出的值。

## module.exports 和 exports
为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。
var exports = module.exports;
\注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。


CommonJS规范加载模块是同步的