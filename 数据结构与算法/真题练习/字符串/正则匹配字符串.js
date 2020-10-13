// 真题描述： 设计一个支持以下两种操作的数据结构：
// void addWord(word)
// bool search(word)
// search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
// . 可以表示任何一个字母。

// 示例: addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// 说明:
// 你可以假设所有单词都是由小写字母 a-z 组成的。

// 构造函数
function WordDictionary() {
	// 作为一个 map 来存储数据
	this.words = {};
}
// 添加 addWord 方法
WordDictionary.prototype.addWord = function (word) {
	// 缓存字符长度
	const len = word.length;
	// 用长度作为 map 的 key，值的数组作为 map 的 value 是为了提高查找效率
	if (this.words[len]) {
		// 若存在该长度的属性 则直接添加
		this.words[len].push(word);
	} else {
		// 若不存在该长度的属性 则初始化
		this.words[len] = [word];
	}
};
// 添加 search 方法
WordDictionary.prototype.search = function (word) {
	const len = word.length;
	if (!this.words[len]) {
		// 若不存在该长度的属性 则返回 false
		return false;
	}
	// 判断是不是正则表达式
	if (!word.includes('.')) {
		// 若不是正则 则直接查找
		return this.words[len].includes(word);
	} else {
		// 若是正则 则判断正则
		let reg = new RegExp(word);
		return this.words[len].some((v) => {
			return reg.test(v);
		});
	}
};
