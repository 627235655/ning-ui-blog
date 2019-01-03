class Util {

    init() {
        String.prototype.firstUpperCase = function() {
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

    firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    // 存储单位转换
    bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }

    // 获取页面url参数
    getUrlParams() {
        if (!window.location.search) {
            return {};
        }
        let result = {},
            queryArr = window.location.search.substr(1).split('&'),
            len = queryArr.length;
        if (len > 0) {
            queryArr.forEach(function(item) {
                let key = item.split("=")[0];
                let value = item.split("=")[1];
                result[key] = value;
            });
            result['length'] = len;
        }
        return result;
    }

    checkEmail(email) {
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(email);
    }

    getPassedTime(old_time) {
        old_time = new Date(old_time)
        let now_time = new Date();
        let gap = now_time.getTime() - old_time.getTime();
        gap = Math.ceil(gap / 1000)
        if (gap >= 3600 * 24 * 2) {
            gap = old_time.Format()
        }
        if (3600 * 24 <= gap && gap < 3600 * 24 * 2) {
            gap = '一天前'
        }
        if (3600 <= gap && gap < 3600 * 24) {
            gap = Math.ceil(gap / 3600) + '小时前'
        }
        if (60 <= gap && gap < 3600) {
            gap = Math.ceil(gap / 60) + '分钟前'
        }
        if (gap < 60) {
            gap = gap + '秒前'
        }
        return gap;
    }

    getElOffset(el) { //获取某元素以浏览器左上角为原点的坐标
        var t = el.offsetTop, // 获取该元素对应父容器的上边距
            l = el.offsetLeft, // 对应父容器的上边距
            el_w = el.offsetWidth,
            client_w = document.body.offsetWidth,
            r;
        // 判断是否有父容器，如果存在则累加其边距
        while (el = el.offsetParent) { // 等效 obj = obj.offsetParent;while (obj != undefined)
            t += el.offsetTop; // 叠加父容器的上边距
            l += el.offsetLeft; // 叠加父容器的左边距
            r += el
        }
        r = (client_w - l - el_w);
        return{
            top: t,
            right: r,
            left: l,
        }
    }
}
let util = new Util();
util.init();
export default util;