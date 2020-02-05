function deepClone(obj) {
    let cloneObj = {}; //在堆内存中新建一个对象
    for (let key in obj) {
        //遍历参数的键
        if (typeof obj[key] === 'object') {
            cloneObj[key] = deepClone(obj[key]); //值是对象就再次调用函数
        } else {
            cloneObj[key] = obj[key]; //基本类型直接复制值
        }
    }
    return cloneObj;
}

const isComplexDataType = obj =>
    (typeof obj === 'object' || typeof obj === 'function') && obj !== null;

const deepClone = function(obj, hash = new WeakMap()) {
    if (obj.constructor === Date) return new Date(obj); //日期对象就返回一个新的日期对象
    if (obj.constructor === RegExp) return new RegExp(obj); //正则对象就返回一个新的正则对象

    //如果成环了,参数obj = obj.loop = 最初的obj 会在WeakMap中找到第一次放入的obj提前返回第一次放入WeakMap的cloneObj
    if (hash.has(obj)) return hash.get(obj);

    let allDesc = Object.getOwnPropertyDescriptors(obj); //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc); //继承原型链

    hash.set(obj, cloneObj);

    for (let key of Reflect.ownKeys(obj)) {
        //Reflect.ownKeys(obj)可以拷贝不可枚举属性和符号类型
        // 如果值是引用类型(非函数)则递归调用deepClone
        cloneObj[key] =
            isComplexDataType(obj[key]) && typeof obj[key] !== 'function'
                ? deepClone(obj[key], hash)
                : obj[key];
    }
    return cloneObj;
};
