/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2018-10-11 17:43:55
 * @version 1.0.0
 */

// 提示组件 ning-prompt
class Prompt {
    init() {
        let self = this;
        let body = document.body;
        // js事件委托
        body.addEventListener('mouseover', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.className.indexOf('ning-prompt-trigger') > -1) {
                let el_trigger = target;
                el_trigger.setAttribute('ning-prompt-id', 'ning-prompt-' + Number(new Date()))
                let params = {
                    width: el_trigger.offsetWidth,
                    left: self.offsetBody(el_trigger).left,
                    top: self.offsetBody(el_trigger).top,
                    id: el_trigger.getAttribute('ning-prompt-id'),
                    el_attr: self.htmlAttrToObject(el_trigger.getAttribute('data-prompt'))
                }
                if (!params.el_attr.content) {
                    return;
                }
                self.appendPrompt(params)
            }
        })

        body.addEventListener('mouseout', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.className.indexOf('ning-prompt-trigger') > -1) {
                let id = target.getAttribute('ning-prompt-id'),
                    el_prompt = document.getElementById(id);
                target.removeAttribute('ning-prompt-id');
                if (el_prompt) {
                    self.removePrompt(el_prompt);
                }
            }
        })
    }

    offsetBody(el) {
        let totalLeft = null,
            totalTop = null,
            par = el.offsetParent;
        //首先加自己本身的左偏移和上偏移
        totalLeft += el.offsetLeft;
        totalTop += el.offsetTop
        //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                //累加父级参照物的边框
                totalLeft += par.clientLeft;
                totalTop += par.clientTop
            }
            //累加父级参照物本身的偏移
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop
            par = par.offsetParent;
        }
        return {
            left: totalLeft,
            top: totalTop
        }
    }

    htmlAttrToObject(attr) {
        let JSONstringify = attr.replace(/\'/g, '').replace(/\s*/g, '').replace(/{/g, '{"').replace(/:/g, '":"').replace(/}/g, '"}').replace(/,/g, '","');
        return JSON.parse(JSONstringify)
    }

    appendPrompt(params) {
        let trigger_w = params.width,
            prompt_w,
            prompt_h,
            prompt_theme = params.el_attr.theme ? `${params.el_attr.theme}` : '',
            prompt_class_name = `ning-prompt ${prompt_theme}`,
            prompt_active_class_name = `ning-prompt ${prompt_theme} active`,
            prompt_id = params.id,
            prompt_content = params.el_attr.content,
            prompt_location = params.el_attr.location || 'center',
            div = document.getElementById(prompt_id);
        // 存在则return
        if (div) {
            div.className = prompt_active_class_name;
            return;
        }
        div = document.createElement("div");
        div.className = prompt_class_name;
        div.id = prompt_id;
        div.innerText = prompt_content;
        document.body.appendChild(div);
        setTimeout(function() {
            prompt_w = div.offsetWidth;
            prompt_h = div.offsetHeight;
            if (prompt_location === 'left') {
                div.style.left = params.left + 'px';
            }
            if (prompt_location === 'center') {
                div.style.left = params.left + trigger_w / 2 - prompt_w / 2 + 'px';
            }
            if (prompt_location === 'right') {
                div.style.left = params.left + trigger_w - prompt_w + 'px';
            }
            div.style.top = params.top - prompt_h + 'px';
            div.className = prompt_active_class_name;
        }, 0);
    }

    removePrompt(el_prompt) {
        if (!el_prompt) {
            return;
        } else {
            el_prompt.className = el_prompt.className.replace('active', '');
            setTimeout(function() {
                document.body.removeChild(el_prompt);
            }, 500);
        }
    }
}

let prompt = new Prompt();
export default prompt;
