/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2019-03-27 17:43:55
 * @version 1.0.0
 */

class ImgView {
    /**
     * [初始化 notify]
     * @param  object params
     * params.text(string) [内部显示文字]
     * params.theme(string) [提示主题]
     * params.time(string) [提示消失延时]
     * @return 生成一个全局提示 notify
     */
    init(params) {
    	let self = this,
    		body = document.body,
    		el_imgview_wrap = document.getElementById('ning_imgview_wrap'),
    		el_imgview_img = el_imgview_wrap.children[0].children[0]
    	if (!el_imgview_wrap) return
    	// js事件委托
        body.addEventListener('click', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.className.indexOf('ning-imgview-trigger') > -1) {
                let el_trigger = target,
                	img_src = target.getAttribute('src')
                if (!img_src) {
                	console.log('请检查该图片是否含有属性 src')
                }
                console.log(el_trigger, img_src)
                // 弹出 el_imgview_wrap
                el_imgview_img.setAttribute('src', img_src)
                el_imgview_wrap.className += ' active'
                self.fixedBody()
            }
            if (target.className.indexOf('ning-imgview-wrap') > -1 || target.className.indexOf('ning-imgview-img') > -1) {
                el_imgview_img.setAttribute('src', '')
                el_imgview_wrap.className = el_imgview_wrap.className.replace(' active', '')
                self.scrollBody()
            }
        })
    }

    fixedBody = () => {
        document.body.style.overflow = 'hidden';
    }

    scrollBody = () => {
        document.body.style.overflow = 'inherit';
    }
}
let imgview = new ImgView();
export default imgview;