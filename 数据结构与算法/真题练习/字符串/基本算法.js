// 反转字符串
function reverseStr(str) {
	return str.split('').reverse().join('');
}

// 判断是否为回文字符串
// 解法一：
// 结合上面的反转函数
function isPalindromeStr(str) {
	return str === reverseStr(str);
}
// 解法二：
// 回文字符串从中间分开 两侧的字符串是对称的
function isPalindromeStr(str) {
	// 缓存字符串长度
	let len = str.length;
	// 遍历前半部分，判断是否和后半部分对称
	for (let i = 0; i < len / 2; i++) {
		if (str[i] !== str[len - 1 - i]) {
			return false;
		}
	}
	return true;
}
