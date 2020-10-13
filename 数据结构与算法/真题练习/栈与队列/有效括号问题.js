// 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 示例 1:
// 输入: "()"
// 输出: true

// 示例 2:
// 输入: "()[]{}"
// 输出: true

// 示例 3:
// 输入: "(]"
// 输出: false

// 示例 4:
// 输入: "([)]"
// 输出: false
// 示例 5:
// 输入: "{[]}"
// 输出: true

let leftToRight = {
	'{': '}',
	'(': ')',
	'[': ']',
};

// while 循环
function isValidStr(str) {
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

// for 循环
const isValid = function (s) {
	// 结合题意，空字符串无条件判断为 true
	if (!s) {
		return true;
	}
	// 初始化 stack 数组
	const stack = [];
	// 缓存字符串长度
	const len = s.length;
	// 遍历字符串
	for (let i = 0; i < len; i++) {
		// 缓存单个字符
		const ch = s[i];
		// 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
		if (ch === '(' || ch === '{' || ch === '[') stack.push(leftToRight[ch]);
		// 若不是左括号，则必须是和栈顶的左括号相配对的右括号
		else {
			// 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
			if (!stack.length || stack.pop() !== ch) {
				return false;
			}
		}
	}
	// 若所有的括号都能配对成功，那么最后栈应该是空的
	return !stack.length;
};
