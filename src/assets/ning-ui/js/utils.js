/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-05-21 16:35:40
 * @version $Id$
 */

import axios from 'axios';
import notify from './notify'

class Util {
    init = () => {
        this.bindEvents();
    }

    bindEvents = () => {
        let self = this;

        // yyyy-MM-dd hh:mm:ss
        Date.prototype.Format = function(param) {
            let fmt = param || "yyyy-MM-dd hh:mm";
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

        // 去掉所有空格
        String.prototype.$trim = function() {
            return this.replace(/\s+/g, "");
        }
        // 去掉前后空格
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

    isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
    isString = this.isType('String');
    isNumber = this.isType('Number');
    isBoolean = this.isType('Boolean');
    isSymbol = this.isType('Symbol');
    isNull = this.isType('Null');
    isUndefined = this.isType('Undefined');
    isArray = this.isType('Array');
    isObject = this.isType('Object');
    isFunction = this.isType('Function');


    excelExport = ({ url, params }) => {
        url = url + '?';
        for (let key in params) {
            if (params[key] !== undefined) {
                url += `${key}=${params[key]}&`;
            }
        }
        url = url.substring(0, url.length - 1)
        window.location.href = url;
    }

    excelExportAsJson = ({ url, params }) => {
        url = `${url}?searchJson=${encodeURI(JSON.stringify(params))}`
        window.location.href = url;
    }

    clone = (source) => {
        return JSON.parse(JSON.stringify(source));
    };

    axiosFn = (url, data, type, cb, btn, errcb) => {
        return new Promise((resolve, reject) => {
            // 全局 loading active
            let globalLoading = document.querySelector('#global_loading')
            if (globalLoading) globalLoading.className = 'global-loading active'
            // 按钮禁用
            btn && (btn.disabled = true);
            // axios 主体
            axios({
                method: type,
                url: url,
                data: (type === 'post' || type === 'POST') && data,
                params: (type === 'get' || type === 'GET') && data,
            }).then(function(res) {
                resolve(true)
                if (res.data.status === 200) {
                    cb && cb(res.data);
                } else {
                    if (errcb) {
                        errcb()
                    } else {
                        notify.warning(res.data.message)
                    }
                }
                // 全局 loading inactive
                if (globalLoading && globalLoading.className.indexOf('error') === -1) {
                    globalLoading.className = 'global-loading inactive'
                }
                // 按钮开放
                btn && (btn.disabled = false);
            }).catch(function(error) {
                reject(false)
                if (globalLoading) globalLoading.className = 'global-loading active error'
                btn && (btn.disabled = false);
                notify.danger('网络或服务异常:' + error);
            });
        })
    };

    /**
     * 时间戳转时间
     * String connect:连接符;Boolean time:是否显示时分秒
     */
    timestampToTime = (timestamp, connect = ".", time = true) => {
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
    timeToTimestamp(time) {
        if (!time) {
            return
        } else {
            let date = new Date(time);
            let timestamp = Date.parse(date);
            return timestamp
        }
    }

    /**
     * 获取日期
     * Number num:与当前时间差距的天数;String str:格式符
     */
    getDay(num, str) {
        let today = new Date();
        let nowTime = today.getTime();
        let ms = 24 * 3600 * 1000 * num;
        today.setTime(parseInt(nowTime + ms));
        let oYear = today.getFullYear();
        let oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        let oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    }

    /**
     * 获取页面url参数
     */
    getUrlParams() {
        const pageUrl = window.location.href;
        let result = {};
        let query = (pageUrl.indexOf('?') > -1) ? pageUrl.split("?")[1] : null;
        let queryArr = query ? query.split("&") : [];
        if (queryArr) {
            queryArr.forEach(function(item) {
                let key = item.split("=")[0];
                let value = item.split("=")[1];
                result[key] = value;
            });
            result['length'] = queryArr.length;
        }
        return result;
    }

    /**
     * 去除 html 字符串的 html 标签， 可选择保留部分 标签
     * params tags = ['p', 'em'] 等等
     */
    formatHtmlStr(str = null, tags = []) {
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
}

let util = new Util();
util.init();
export default util;