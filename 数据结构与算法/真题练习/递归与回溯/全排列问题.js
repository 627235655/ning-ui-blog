// 全能公式
function name(params) {
	// 做一些缓存，初始化工作
	let len = arr.length;
	let res = [];
	// ...
	// 定义路径栈
	let path = [];

	// 进入 dfs
	dfs(起点);

	function dfs(递归参数) {
		if (到达递归边界) {
			// 结合题意处理边界逻辑，往往和 path 内容有关
			return;
		}

		// 注意这里也可能不是 for，视题意决定
		// for(遍历坑位的可选值) {
		// 	path.push(当前选中值)
		// 	// 处理坑位本身的相关逻辑
		// 	path.pop()
		// }
	}
	return res;
}

// 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。

// 示例：
// 输入: [1,2,3]
// 输出: [
//  [1,2,3],
//  [1,3,2],
//  [2,1,3],
//  [2,3,1],
//  [3,1,2],
//  [3,2,1]
// ]

function noRepeat(arr) {
	let len = arr.length;
	// 全排列结果
	let res = [];
	// 当前结果数组
	let cur = [];
	// 记录下标是否已被访问
	let visited = {};
	dfs(0);
	function dfs(index) {
		if (index === len) {
			res.push([...cur]);
			return;
		}
		for (let i = 0; i < len; i++) {
			if (!visited[i]) {
				cur.push(arr[i]);
				visited[i] = 1;
			} else {
				dfs(i);
			}
		}
		// 清空
		visited = {};
	}
	return res;
}
