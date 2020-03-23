# 基本算法

## 非稳定排序算法

## 复杂度

## 数组排序

## 1. 冒泡排序

![冒泡排序](../imgs/sort/bubbleSort.gif)

冒泡排序算法的原理如下：

1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
3. 针对所有的元素重复以上的步骤，除了最后一个。
4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

```js
// 基础版
function bubble_sort(ary) {
    for (let i = 0; i < ary.length - 1; i++) {
        for (let j = 0; j < ary.length - 1; j++) {
            if (ary[j] > ary[j + 1]) {
                let temp = ary[j];
                ary[j] = ary[j + 1];
                ary[j + 1] = temp;
                // 结构交换
                // [ary[j], ary[j + 1]] = [ary[j + 1], ary[j]];
            }
        }
    }
    return ary;
}
// 优化，
// 1. 减去已经排序完成的，第一次排序的时候，会把整个数组最大的放在末尾，第二次排序的时候就不需要再对比这个了
// 2. 添加一个tag，记录是否交换元素，如果没交换，说明已经不需要再进行排序，可以提前结束循环
function bubble_sort(ary) {
    let tag = true;
    for (let i = 0; i < ary.length - 1; i++) {
        tag = true;
        for (let j = 0; j < ary.length - 1 - i; j++) {
            if (ary[j] > ary[j + 1]) {
                tag = false;
                let temp = ary[j];
                ary[j] = ary[j + 1];
                ary[j + 1] = temp;
                // 结构交换
                // [ary[j], ary[j + 1]] = [ary[j + 1], ary[j]];
            }
        }
        if (tag) {
            break;
        }
    }
    return ary;
}
```

## 选择排序

![选择排序](../imgs/sort/selectionSort.gif)

1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
2. 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
3. 以此类推，直到所有元素均排序完毕。

```js
function select_sort(ary) {
    const { length } = ary;
    let minIndex, temp;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < length - 1; j++) {
            if (ary[j] < ary[minIndex]) {
                minIndex = j;
            }
        }

        temp = ary[i];
        ary[i] = ary[minIndex];
        ary[minIndex] = temp;
    }
    return ary;
}
// Array.prototype.selection_sort = function() {
//     let min;
//     for (let i = 0; i < this.length - 1; i++) {
//         min = i;
//         for (let j = i + 1; j < this.length; j++) {
//             if (this[min] > this[j]) {
//                 min = j;
//             }
//         }
//         // swap two value without temp variable
//         if (min !== i) {
//             this[min] = this[min] ^ this[i];
//             this[i] = this[min] ^ this[i];
//             this[min] = this[min] ^ this[i];
//         }
//     }
//     return this;
// };
```

## 3. 插入排序

![插入排序](../imgs/sort/insertionSort.gif)

1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。

2. 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

```js
function insertion_sort(ary) {
    const { length } = ary;
    let preIndex, current;
    for (let i = 1; i < length; i++) {
        preIndex = i - 1;
        current = ary[i];
        while (preIndex >= 0 && ary[preIndex] > current) {
            ary[preIndex + 1] = ary[preIndex];
            preIndex--;
        }

        ary[preIndex + 1] = current;
    }

    return ary;
}
```

## 4. 希尔排序

![希尔排序](../imgs/sort/Sorting_shellsort_anim.gif)

## 5. 归并排序

![归并排序](../imgs/sort/mergeSort.gif)

1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；

2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置；

3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；

4. 重复步骤 3 直到某一指针达到序列尾；

5. 将另一序列剩下的所有元素直接复制到合并序列尾。

```js
function merge_sort(ary) {
    // 采用自上而下的递归方法
    const { length } = ary;
    if (length < 2) {
        return ary;
    }
    let middle = Math.floor(length / 2),
        left = ary.slice(0, middle),
        right = ary.slice(middle);
    return merge(merge_sort(left), merge_sort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
}
```

## 6. 快速排序

![快速排序](../imgs/sort/quickSort.gif)

## 7. 堆排序

![堆排序](../imgs/sort/heapSort.gif)

![堆排序](../imgs/sort/Sorting_heapsort_anim.gif)

## 8. 计数排序

![计数排序](../imgs/sort/countingSort.gif)

## 9. 桶排序

元素分布在桶中：

![桶排序](../imgs/sort/Bucket_sort_1.svg_.png)

然后，元素在每个桶中排序：

![桶排序](../imgs/sort/Bucket_sort_2.svg_.png)

## 10. 基数排序

![基数排序](../imgs/sort/radixSort.gif)

## 数组去重

## 求最大值
