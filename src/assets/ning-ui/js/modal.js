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
        document.body.addEventListener('click', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            // 关闭弹窗
            if (target.className.indexOf('cancle-modal-btn') > -1) {
                self.closeAll();
            }
            // 关闭弹窗
            if (target.className.indexOf('ning-thumbnail') > -1) {
                self.renderThumbnail(target.getAttribute('src'));
            }
        })
    }
    open(el_name) {
        let modal = document.getElementById(el_name);
        modal.className += ' active';
    }

    close(el_name) {
        let modal = document.getElementById(el_name);
        modal.className = modal.className.replace('active', '');
    }

    closeAll() {
        let self = this;
        let modals = document.querySelectorAll('.ning-modal');
        modals.forEach(function(v, i, a) {
            self.close(v.getAttribute('id'));
        })
    }

    renderThumbnail(params) {}
}

let modal = new Modal();
modal.init();
export default modal;