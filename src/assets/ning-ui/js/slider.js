/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2019-06-06 17:43:55
 * @version 1.0.0
 */

// 提示组件 ning-Slider
class Slider {
    init() {
        let self = this;
        let body = document.body;
        // js事件委托
        body.addEventListener('mouseover', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.className.indexOf('ning-Slider-trigger') > -1) {
                let el_trigger = target;
                el_trigger.setAttribute('ning-Slider-id', 'ning-Slider-' + Number(new Date()))
                let params = {
                    width: el_trigger.offsetWidth,
                    left: self.offsetBody(el_trigger).left,
                    top: self.offsetBody(el_trigger).top,
                    id: el_trigger.getAttribute('ning-Slider-id'),
                    el_attr: self.htmlAttrToObject(el_trigger.getAttribute('data-Slider'))
                }
                if (!params.el_attr.content) {
                    return;
                }
                self.appendSlider(params)
            }
        })

        body.addEventListener('mouseout', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.className.indexOf('ning-Slider-trigger') > -1) {
                let id = target.getAttribute('ning-Slider-id'),
                    el_Slider = document.getElementById(id);
                target.removeAttribute('ning-Slider-id');
                if (el_Slider) {
                    self.removeSlider(el_Slider);
                }
            }
        })
    }
}

let Slider = new Slider();
export default Slider;
