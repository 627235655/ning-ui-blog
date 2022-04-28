/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2018-11-21 17:43:55
 * @version 1.0.0
 */

// dialog 组件
class Modal {
    init() {
        let self = this;
        // 鼠标控制
        document.body.addEventListener('click', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            // 关闭弹窗
            if (target.className.indexOf('ning-modal-close-btn') > -1) {
                let id = target.parentNode.parentNode.parentNode.getAttribute('id');
                self.close(id);
            }
            // 关闭弹窗
            if (target.className.indexOf('ning-modal-wrap') > -1) {
                let id = target.getAttribute('id');
                self.close(id);
            }
        })

        // 键盘控制
        document.body.addEventListener('keydown', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (ev.keyCode === 13) {
                // 关闭弹窗
                if (target.className.indexOf('ning-modal-close-btn') > -1) {
                    self.closeAll();
                }
            }
        })
    }

    open(el_name) {
        let modal = document.getElementById(el_name);
        modal.className += ' active';
        // 页面 body 不能 滚动
        this.fixedBody();
    }

    close(el_name) {
        let modal = document.getElementById(el_name);
        modal.className = modal.className.replace('active', '');
        this.scrollBody();
    }

    fixedBody = () => {
        document.body.style.overflow = 'hidden';
    }

    scrollBody = () => {
        document.body.style.overflow = 'inherit';
    }

    closeAll() {
        let self = this;
        let modals = document.querySelectorAll('.ning-modal-wrap');
        modals.forEach(function(v, i, a) {
            self.close(v.getAttribute('id'));
        })
        this.scrollBody();
    }
}

let modal = new Modal();
modal.init();
export default modal;