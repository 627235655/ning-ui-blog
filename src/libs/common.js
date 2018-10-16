/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2018-10-15 10:58:40
 * @version 1.1.0
 */

class NingUi {

	on(event, selector, cb) {
		if (!event || !selector)
		document.body.addEventListener(event, function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.className.indexOf(selector) > -1) {
                cb && cb();
            }
        })
	}
}
