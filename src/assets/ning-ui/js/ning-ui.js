import prompt from './prompt.js'
import modal from './modal.js'
import tabs from './tabs.js'

class Common {
	init() {
		prompt.init();
		modal.init();
		tabs.init();

		String.prototype.firstUpperCase = function(){
		    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
		        return $1.toUpperCase() + $2.toLowerCase();
		    });
		}

		Date.prototype.Format = function(param) {
		    let fmt = param || "yyyy-MM-dd hh:mm:ss";
		    let o = {
		        "M+": this.getMonth() + 1, //月份
		        "d+": this.getDate(), //日
		        "h+": this.getHours(), //小时
		        "m+": this.getMinutes(), //分
		        "s+": this.getSeconds(), //秒
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
		        "S": this.getMilliseconds() //毫秒
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (let k in o)
		        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		};
	}
}

let common = new Common();
export default common;
