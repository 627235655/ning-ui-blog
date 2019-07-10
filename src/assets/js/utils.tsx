/**
 * 工具函数
 * @authors zongyuan.ning<627235655@qq.com>
 * @date    2019-05-21 16:35:40
 * @version 1.0.0
 */

import axios from 'axios';
import notify from 'assets/ning-ui/js/notify'

interface AxiosOptions{
    url: string;
    data: object;
    method: string;
    cb: (res:any) => void;
    btn?: any;
    errcb?: (res:any) => void;
}

declare global {
    interface String{
        firstUpperCase: () => string;
        $trim: () => string;
        trim: () => string;
    }

    interface Date{
        Format: (param?: any) => string;
    }

    interface Array<T>{
        hasRepeatItem: () => void;
    }
}


class Util {
    init = () => {
        this.bindEvents();
    }

    bindEvents = () => {
        let self = this;

        String.prototype.firstUpperCase = function() {
            return this.replace(/\b(\w)(\w*)/g, function($0: any, $1: any, $2: any) {
                return $1.toUpperCase() + $2.toLowerCase();
            });
        }

        Date.prototype.Format = function(param) {
            let fmt: string = param || "yyyy-MM-dd hh:mm:ss";
            let o: any = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o){
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                };
            }
            return fmt;
        };

        String.prototype.$trim = function() {
            return this.replace(/\s+/g,"");
        }

        String.prototype.trim = function() {
          return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }

        Array.prototype.hasRepeatItem = function() {
            return !(this.length === [...new Set(this)].length)
        }
    }

    // isType = type => {
    //     return target => {
    //         return `[object ${type}]` === Object.prototype.toString.call(target)
    //     }
    // }

    isType = (type: string) => (target: any) => `[object ${type}]` === Object.prototype.toString.call(target);
    isString = this.isType('String');
    isNumber = this.isType('Number');
    isBoolean = this.isType('Boolean');
    isSymbol = this.isType('Symbol');
    isNull = this.isType('Null');
    isUndefined = this.isType('Undefined');
    isArray = this.isType('Array');
    isObject = this.isType('Object');
    isFunction = this.isType('Function');


    excelExport = ({url, params}: { url: string; params: any }) => {
        url = url + '?';
        for (let key in params) {
            if (params[key] !== undefined) {
                url += `${key}=${params[key]}&`;
            }
        }
        url = url.substring(0, url.length - 1)
        window.location.href = url;
    }

    excelExportAsJson = ({url, params}: { url: string; params: any }) => {
        url = `${url}?searchJson=${encodeURI(JSON.stringify(params))}`
        window.location.href = url;
    }

    clone = (source: any) => {
        return JSON.parse(JSON.stringify(source));
    };

    /**
     * 封装 axios
     * @param  {[string]}   url   [接口地址]
     * @param  {[string]}   data  [请求数据]
     * @param  {[string]}   method  [请求方法]
     * @param  {Function} cb    [成功回调]
     * @param  {[string]}   btn   [按钮]
     * @param  {Function}   errcb [错误回调]
     * @return {[type]}         [a promise]
     */
    axiosFn = (options: AxiosOptions) => {
        return new Promise((resolve: any, reject: any) => {
            // 全局 loading active
            let globalLoading = document.querySelector('#global_loading')
            if (globalLoading) globalLoading.className = 'global-loading active'
            // 按钮禁用
            options.btn && (options.btn.disabled = true);
            // axios 主体
            axios({
                method: options.method,
                url: options.url,
                data: (options.method === 'post' || options.method === 'POST') && options.data,
                params: (options.method === 'get' || options.method === 'GET') && options.data,
            }).then(function(res) {
                resolve(true)
                if (res.data.status === 200) {
                    options.cb && options.cb(res.data);
                } else {
                    if (options.errcb) {
                        options.errcb(res)
                    } else {
                        notify.warning(res.data.message)
                    }
                }
                // 全局 loading inactive
                if (globalLoading && globalLoading.className.indexOf('error') === -1) {
                    globalLoading.className = 'global-loading inactive'
                }
                // 按钮开放
                options.btn && (options.btn.disabled = false);
            }).catch(function(error) {
                reject(false)
                if (globalLoading) globalLoading.className = 'global-loading active error'
                options.btn && (options.btn.disabled = false);
                notify.danger('网络或服务异常:' + error);
            });
        })
    };

    /**
     * 时间戳转时间
     * String connect:连接符;Boolean time:是否显示时分秒
     */
    timestampToTime = (timestamp: number, connect: string = ".", time: string = "") => {
        let itemdate = timestamp ? new Date(timestamp) : new Date();
        let year = itemdate.getFullYear();
        let month = itemdate.getMonth() < 9 ? "0" + (itemdate.getMonth() + 1) : itemdate.getMonth() + 1;
        let date = itemdate.getDate() < 10 ? "0" + itemdate.getDate() : itemdate.getDate();
        let hour = itemdate.getHours() < 10 ? "0" + itemdate.getHours() : itemdate.getHours();
        let minute = itemdate.getMinutes() < 10 ? "0" + itemdate.getMinutes() : itemdate.getMinutes();
        let second = itemdate.getSeconds() < 10 ? "0" + itemdate.getSeconds() : itemdate.getSeconds();
        if (time === "minute") {
            return year + connect + month + connect + date + " " + hour + ":" + minute;
        } else if (time === "hour") {
            return year + connect + month + connect + date + " " + hour;
        }
        return year + connect + month + connect + date + (time ? " " + hour + ":" + minute + ":" + second : "");
    };

    /**
     * 时间转时间戳
     */
    timeToTimestamp(time: Date) {
        if (!time) {
            return
        } else {
            return new Date(time).getTime()
        }
    }

    /**
     * 获取日期
     * Number num:与当前时间差距的天数;String str:格式符
     */
    getDay(num: number, str: string) {
        let today = new Date();
        let nowTime = today.getTime();
        let ms = 24 * 3600 * 1000 * num;
        today.setTime(nowTime + ms);
        let oYear:number = today.getFullYear();
        let oMoth: string = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        let oDay: string = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    }

    /**
     * 去除 html 字符串的 html 标签， 可选择保留部分 标签
     * params tags = ['p', 'em'] 等等
     */
    formatHtmlStr(str: string = '', tags: Array<string> = []) {
        let tags_str = '';
        if (!str) {
            console.log('请传入参数-需要格式化的html字符串~');
            return
        } else {
            if (tags.length === 0) { // 即全部替换
                return str.replace(/<\/?[^>]*>/g, '')
            } else {
                tags.map((v, i) => {
                    tags_str += `${v}|\\/${v}${i === tags.length - 1 ? '' : '|'}`
                })
                let reg = new RegExp(`<(?!(${tags_str})).*?>`, 'g');
                return str.replace(reg, '')
            }
        }
    }

    getMonthFirstDay = (date: Date) => {
        let y = date.getFullYear();
        let m = date.getMonth();
        return new Date(y, m, 1)
    }

    getMonthLastDay = (date: Date) => {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        return new Date(y, m, 0)
    }

    firstUpperCase(str: string) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    // 存储单位转换
    bytesToSize(bytes: number) {
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
        let result: any = {},
            queryArr = window.location.search.substr(1).split('&'),
            len = queryArr.length;
        if (len > 0) {
            queryArr.forEach(function(item: any) {
                let key = item.split("=")[0];
                let value = item.split("=")[1];
                result[key] = value;
            });
            result['length'] = len;
        }
        return result;
    }

    checkEmail(email: string) {
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(email);
    }

    getPassedTime(old_time: Date) {
        old_time = new Date(old_time)
        let now_time = new Date();
        let gap:any = now_time.getTime() - old_time.getTime();
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

    getElOffset(el: any) { //获取某元素以浏览器左上角为原点的坐标
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
        return {
            top: t,
            right: r,
            left: l,
        }
    }

    // 获取随机颜色
    getRandomRGB = (opacity: number = 1) => {
        return 'rgba('+(Math.random() * 255)+','+(Math.random() * 255)+','+(Math.random() * 255)+',' + opacity+')';
    }

    // 气泡
   fnTextPopup = (point: any) => {
        let self = this,
            x = point.pageX,
            y = point.pageY
        // 主逻辑
        let eleText = document.createElement('i');
        eleText.className = 'text-popup ning-icon icon-heart';
        document.body.appendChild(eleText);
        // 生成颜色
        eleText.style.color = self.getRandomRGB(Math.random());
        // 位置
        eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
        eleText.style.top = (y - eleText.clientHeight) + 'px';
        // 动画结束后删除自己
        eleText.addEventListener('animationend', function() {
            eleText.parentNode.removeChild(eleText);
        });
    }

}

let util = new Util();
util.init();
export default util;