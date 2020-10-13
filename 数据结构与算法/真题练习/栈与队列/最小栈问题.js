// 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。

// 示例:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); --> 返回 -3.
// minStack.pop();
// minStack.top(); --> 返回 0.
// minStack.getMin(); --> 返回 -2.

// 常规解法
function MinStack() {
	this.stack = [];
}

MinStack.prototype.push = function (num) {
	this.stack.push(num);
};

MinStack.prototype.pop = function () {
	this.stack.pop();
};

MinStack.prototype.top = function () {
	if (!this.stack || !this.stack.length) {
		return;
	}
	return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
	// return [...this.stack].sort((a, b) => a - b)[0];
	let minValue = Infinity;
	const { stack } = this;
	for (let i = 0; i < stack.length; i++) {
		if (stack[i] < minValue) {
			minValue = stack[i];
		}
	}
	return minValue;
};

// 双栈解法
function MinStack() {
	this.stack = [];
	this.stack2 = []; // 用来按顺序存取 num 最后 getMin 只用返回最顶层的数字即可
}

MinStack.prototype.push = function (num) {
	this.stack.push(num);
	// 若当前 存入的数字小于 栈2 的最小值 则推入栈2
	if (
		this.stack2.length === 0 ||
		num <= this.stack2[this.stack2.length - 1]
	) {
		this.stack2.push(num);
	}
};

MinStack.prototype.pop = function () {
	// 若当前 推出的数字等于 栈2 的最小值 则推出栈2
	if (this.stack.pop() === this.stack2[this.stack2.length - 1]) {
		this.stack2.pop();
	}
};

MinStack.prototype.top = function () {
	if (!this.stack || !this.stack.length) {
		return;
	}
	return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
	if (!this.stack2 || !this.stack2.length) {
		return;
	}
	return this.stack2[this.stack2.length - 1];
};
