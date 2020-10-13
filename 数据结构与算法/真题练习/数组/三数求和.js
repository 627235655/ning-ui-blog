// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

// 双指针法
// 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序
// 对撞指针 - 左右指针一起从两边往中间位置相互迫近，这样的特殊双指针形态，被称为“对撞指针”
function getIndexArrs(nums, target) {
	// 将数组排序
	nums = nums.sort((a, b) => a - b);
	let res = [], // 返回结果
		len = nums.length; // 缓存数组长度
	for (let i = 0; i < len - 2; i++) {
		// 循环只用到数组长度 - 2 ，因为双指针会遍历后面两个数
		let j = i + 1, // 左指针
			k = len - 1; // 右指针
		// 如果遇到重复的数字 则跳过
		if (i > 0 && nums[i] === nums[i - 1]) {
			continue;
		}
		while (j < k) {
			// 如果 相加之和 大于 target(说明右指针的值大了) 则将右指针左移
			if (nums[i] + nums[j] + nums[k] > target) {
				k--;
				// 跳过 指针重复的 数字
				while (j < k && nums[k] === nums[k + 1]) {
					k--;
				}
			} else if (nums[i] + nums[j] + nums[k] < target) {
				// 如果 相加之和 小于 target(说明左指针的值小了) 则将左指针右移
				j++;
				// 跳过 指针重复的 数字
				while (j < k && nums[j] === nums[j - 1]) {
					j++;
				}
			} else {
				// 相等 则 push 进 res
				res.push([nums[i], nums[j], nums[k]]);
				j++;
				k--;
				// 若左指针元素重复，跳过
				while (j < k && nums[j] === nums[j - 1]) {
					j++;
				}
				// 若右指针元素重复，跳过
				while (j < k && nums[k] === nums[k + 1]) {
					k--;
				}
			}
		}
	}
	return res;
}
