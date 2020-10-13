// 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例: 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

// 暴力破解
function getIndexs(nums, target) {
	// 缓存数组长度
	let len = nums.length;
	for (let i = 0; i < len; i++) {
		for (let j = i; j < len; j++) {
			if (nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
	}
}

// 求和转求差
// 即判断已遍历的有无等于当前两数的差值
function getIndexs(nums, target) {
	let diffs = {},
		len = nums.length;
	for (let i = 0; i < len; i++) {
		// 如果 diffs 存在 差值 的属性， 说明此两者相加可以的到 target
		if (target - nums[i] in diffs) {
			// if (diffs.hasOwnProperty(target - nums[i])) {
			// if (diffs[target - nums[i]] !== undefined) {
			return [diffs[target - nums[i]], i];
		} else {
			diffs[nums[i]] = i;
		}
	}
}

// 求和转求差
// es6 - map 实现
function getIndexs(nums, target) {
	let map = new Map(),
		len = nums.length;
	for (let i = 0; i < len; i++) {
		if (map.has(target - nums[i])) {
			return [map.get(target - nums[i]), i];
		} else {
			map.set(nums[i], i);
		}
	}
}
