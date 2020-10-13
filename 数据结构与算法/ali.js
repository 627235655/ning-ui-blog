/** 实现链式运算符（加减乘除乘方）*/
// code goes here
Number.prototype.add = function (num) {
	return this + num;
};
Number.prototype.minus = function (num) {
	return this - num;
};
Number.prototype.multi = function (num) {
	return this * num;
};
Number.prototype.div = function (num) {
	return this / num;
};
Number.prototype.pow = function (num) {
	return Math.pow(this, num);
};
// test
console.log((123).add(1).minus(2).multi(3).div(4).pow(2)); // 结果应为 ((123 + 1 - 2) * 3 / 4) ^ 2

/** 判断括号是否正确闭合
给定一些包含单字符括号对的字符串，判断括号是否正确闭合。正确闭合的条件有两个，一是所有
左括号必须对应有右括号，二是括号闭合的顺序要准确
*/
const pairs = [
	['(', ')'],
	['{', '}'],
	['[', ']'],
];

let leftToRight = {
	'{': '}',
	'(': ')',
	'[': ']',
};

// while 循环
function isAllPairsValid(str) {
	// 先去除掉所有的非括号字符
	str = str.replace(/\w/g, '');
	if (str.length === 0) return true;
	let stack = [];
	while (str.length > 0) {
		let s = str[0];
		str = str.slice(1);
		if (s in leftToRight) {
			stack.push(leftToRight[s]);
		} else {
			if (s === stack[stack.length - 1]) {
				stack.pop(leftToRight[s]);
			} else {
				return false;
			}
		}
	}
	return true;
}
// test
console.log(isAllPairsValid('(([)]')); // false
console.log(isAllPairsValid('[((test)foo)]{bar}{hey}')); // true

/** 寻在 N 个数字中第 K 大的数字
要以尽可能高的效率找出来，要求不能使用 Array.prototype.sort 方法
*/
function findKthOfN(arr, k) {
	// code goes here
	let len = arr.length;
	return findK(arr, k, 0, len - 1);

	function findK(arr, k, start, end) {
		let low = start,
			high = end,
			temp = arr[low];
		while (low < high) {
			while (low < high && arr[high] <= temp) {
				high--;
			}
			arr[low] = arr[high];
			while (low < high && arr[low] >= temp) {
				low++;
			}
			arr[high] = arr[low];
		}
		arr[high] = temp;
		if (high === k - 1) {
			return temp;
		} else if (high > k - 1) {
			return findK(arr, k, start, high - 1);
		} else {
			return findK(arr, k, high + 1, end);
		}
	}
}
// test
console.log(findKthOfN([3, 2, 5, 7, 9, 10], 4)); // -> 5

/** 寻找优雅的 IP 地址
IPV4 的 IP 地址其实是一个32位的二进制数值，不过为了增强它的可读性，通常我们会以8位为1组进行分割，
用十进制数字来表示每一部分，并且用点号连接。譬如 192.168.1.1。可以预见，存在这样一些 IP 地址，
0到9十个数字各出现一次。那么，这样特征的 IP 地址里，表示成二进制数的时候，二进制数左右对称
（也就是“回文”，表示成32位二进制数的时候不省略0）的情况有多少种，分别是哪些？
要求性能尽可能高
*/
function findPalindromeIPAddresses() {
	// code goes here
	// 辅助函数
	function isPalindrome(str) {
		return str === str.split('').reverse().join('');
	}
	// 先取出 0-9 各出现一次的 ip 地址 每一位 0-255
	// 0 1 2 3 4 5 6 7 8 9
	let res = [];

	// 再分别转换为 2 进制
	res = res.map((v) => {
		let res = '';
		let arr = v.split('.');
		arr.forEach((num) => {
			let n = Number(num);
			n = n.toString(2);
			while (n.length < 8) {
				n = '0' + n;
			}
			res += n;
		});
		return res;
	});

	// 再用是否是回文判断
	res = res.filter((v) => isPalindrome(v));

	return res;
}
// test
console.log(findPalindromeIPAddresses());
