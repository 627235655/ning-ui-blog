// 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

// 示例 1: 输入: "aba"
// 输出: True
// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。
// 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

// 两个关键字——对称性 和 双指针。这两个工具一起上，足以解决大部分的回文字符串衍生问题
function can2PalindromeStr(str) {
	// 缓存字符串长度
	const len = str.length;
	let i = 0,
		j = len - 1;
	// 当左右两边一直相等时， 指针向中间移动
	while (i < j && str[i] === str[j]) {
		i++;
		j--;
	}
	// 当左右两边不相等时或者 i === j 时， 判断剩下的字符是不是回文
	if (isPalindromeStr(i + 1, j)) {
		// 判断 剩余字符串 删除掉 最左侧字符(i + 1) 是否还是回文
		return true;
	}
	if (isPalindromeStr(i, j - 1)) {
		// 判断 剩余字符串 删除掉 最右侧字符(j - 1) 是否还是回文
		return true;
	}
	// 辅助函数 对称性判断回文
	function isPalindromeStr(start, end) {
		while (start < end) {
			if (str[start] !== str[end]) {
				return false;
			}
			start++;
			end--;
		}
		return true;
	}
	// 默认返回 false 即 当左右两边一直相等时，即本身就是回文 删掉一个肯定不是回文
	return false;
}
