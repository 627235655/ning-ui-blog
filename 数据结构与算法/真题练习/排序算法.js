// 快速排序
function quickSort(arr) {
	let len = arr.length,
		left = [],
		right = [],
		midIndex = Math.ceil(len / 2), //基准  优化 三数取中 low high mid 取中间哪一个
		midVal = arr[midIndex];
	// 去除掉中值
	arr.splice(midIndex, 1);
	for (let i = 0; i < len; i++) {
		const ele = arr[i];
		if (ele < midVal) {
			left.push(ele);
		} else {
			right.push(ele);
		}
	}
	return [...quickSort(left), midVal, ...quickSort(right)];
}

// 优化1、采用三数取中法原则枢纽。
// 优化2、当待排序序列的长度分割到一定大小后，使用插入排序。
// 优化3、在一次分割结束后，可以把与Key相等的元素聚在一起，继续下次分割时，不用再对与key相等元素分割

// 冒泡排序
function bubbleSort(arr) {
	let len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
	return arr;
}
