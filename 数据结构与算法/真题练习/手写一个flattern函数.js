// 递归写法
function flattern(arr) {
	// 缓存数组长度
	const len = arr.length;
	let res = [];
	for (let i = 0; i < len; i++) {
		const ele = arr[i];
		// 若子项是 Array 则递归
		if (Array.isArray(ele)) {
			res = res.concat(flattern(ele));
			// res = [...res, ...flattern(ele)];
		} else {
			res.push(ele);
		}
	}
	return res;
}

// es6 写法
function flattern(arr) {
	return arr.flat(Infinity);
}
