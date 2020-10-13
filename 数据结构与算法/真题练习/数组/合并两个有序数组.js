// 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

// 示例: 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3
// 输出: [1,2,2,3,5,6]

// es6 结构赋值fa
function concatArr(arr1, m, arr2, n) {
	arr1.splice(m);
	return [...arr1, ...arr2].sort((a, b) => a - b);
}

// 双指针法
function concatArr(arr1, m, arr2, n) {
	let i = m - 1, // arr1 指针计数开始的地方
		j = n - 1, // arr2 指针计数开始的地方
		k = m + n - 1; // arr1 填充数字开始的地方
	// 当 arr1 和 arr2 都未遍历完成，指针同步移动
	while (i >= 0 && j >= 0) {
		if (arr1[i] >= arr2[j]) {
			arr1[k].push(arr1[i]);
			i--;
		} else {
			arr1[k].push(arr2[j]);
			j--;
		}
		k--;
	}
	// 如果提前遍历完的是 nums1 的有效部分，剩下的是 nums2。
	// 那么这时意味着 nums1 的头部空出来了，直接把 nums2 整个补到 nums1 前面去即可(因为 arr1 的值已填充到了 arr1 的后半部分)。
	// 如果提前遍历完的是 nums2，剩下的是 nums1。由于容器本身就是 nums1，所以此时不必做任何额外的操作。
	// 当 arr2 未遍历完成， 则将其填充至 arr1 即可
	while (j >= 0) {
		arr1[k].push(arr2[j]);
		j--;
		k--;
	}
	return arr1;
}
