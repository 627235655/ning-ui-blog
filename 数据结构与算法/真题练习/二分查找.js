// 二分查找
// 即每次从数组的中间开始对比查找目标值
function binarySearch(arr, target) {
	let len = arr.length,
		left = 0,
		right = len - 1,
		mid;
	while (left <= right) {
		mid = Math.ceil((right + left) / 2);
		console.log('mid', mid);
		console.log('left', left);
		console.log('right', right);
		if (arr[mid] === target) {
			return mid;
		}
		if (arr[mid] > target) {
			right = mid - 1;
		}
		if (arr[mid] < target) {
			left = mid + 1;
		}
	}
	return -1;
}
