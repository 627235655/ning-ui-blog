/*
 * @Author: your name
 * @Date: 2020-07-17 14:05:34
 * @LastEditTime: 2020-07-17 14:06:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /react-demo/src/assets/js/validtor.ts
 */

const strategies = {
	isEmpty: function (val, errorMsg) {
		if (val == '') {
			return errorMsg;
		}
	},
	maxLength: function (val, length, errorMsg) {
		if (val.length > length) {
			return errorMsg;
		}
	},
};

export default class Validator {
	cache: any[];
	constructor() {
		// 校验函数缓存列表
		this.cache = [];
	}

	// 添加校验函数
	add(val, rules) {
		!rules && console.log('Validator add 请填写参数 rules');
		// 校验单个规则
		if (Object.prototype.toString.call(rules) === '[object Object]') {
			this.initStrategy(val, rules);
		}
		// 校验多个校验规则
		if (Object.prototype.toString.call(rules) === '[object Array]') {
			for (let rule of rules) {
				this.initStrategy(val, rule);
			}
		}
	}

	// 初始化校验函数
	initStrategy(val, rule) {
		// 解构 规则名和其参数 用 : 分隔
		let args = rule.strategy.split(':');

		this.cache.push(function () {
			let strategy = args.shift();
			// 解构规则校验函数的参数 val args errorMsg
			args = [val, ...args, rule.errorMsg];
			console.log(`Validator ${strategy} args`, args);
			return strategies[strategy].apply(null, args);
		});
	}

	// 开始校验
	start() {
		for (let validataFun of this.cache) {
			let errorMsg = validataFun();
			if (errorMsg) {
				return errorMsg;
			}
		}
	}
}
