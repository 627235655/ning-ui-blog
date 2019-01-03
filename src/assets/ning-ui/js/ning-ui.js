import prompt from './prompt.js'
import modal from './modal.js'
import tabs from './tabs.js'
import notify from './notify.js'

class Common {
	init() {
		prompt.init();
		modal.init();
		tabs.init();
		this.bindEvents();

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

	bindEvents() {
        // click 事件委托
        document.body.addEventListener('click', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            // notify 触发
            if (target.className.indexOf('ning-notify-trigger') > -1) {
                notify.init({
                    text: 'this is a notify!',
                    theme: target.getAttribute('data-theme') || '',
                })
            }

            // div virtual-select
            if (target.className.indexOf('virtual-select') > -1) {
                let virtual_options = target.firstElementChild;
                target.className = target.className.indexOf('active') > -1 ? 'virtual-select' : 'virtual-select active';
                virtual_options.className = virtual_options.className.indexOf('active') > -1 ? 'virtual-options' : 'virtual-options active';
            }
        })

        // 文本域字数统计
        let el_textarea_list = document.querySelectorAll('textarea');
        el_textarea_list.forEach(function(v, i, a) {
            let maxlength = v.getAttribute('maxlength');
            if (maxlength) {
                v.parentNode.setAttribute('textarea-length', 0 + '/' + maxlength)
            }
        })
        // input 事件委托
        document.body.addEventListener('input', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement,
                target_parent = target.parentNode,
                max_length = target.getAttribute('maxlength'),
                current_length = target.value.length;
            if (target.tagName !== 'TEXTAREA' || max_length === null) {
                return;
            }
            target_parent.setAttribute('textarea-length', current_length + '/' + max_length);
        })
        // 文本域高度自适应
        let auto_height_textarea_list = document.querySelectorAll('.auto-height-textarea');
        auto_height_textarea_list.forEach(function(v, i, a) {
            autoTextarea(v);
        })

        function autoTextarea(elem, extra, maxHeight) {
            extra = extra || 0;
            var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function(type, callback) {
                    elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function(name) {
                    var val = elem.currentStyle[name];
                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                    };
                    return val;
                } : function(name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));
            elem.style.resize = 'none';
            var change = function() {
                var scrollTop, height,
                    padding = 0,
                    style = elem.style;
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
                if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = 'auto';
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = 'hidden';
                    };
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                };
            };
            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        }
    }
}

let common = new Common();
export default common;
