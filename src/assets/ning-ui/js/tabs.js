class Tabs {
    init() {
        // 初始化
        let ning_tabs = document.querySelectorAll('.ning-tabs');
        for (let obj of ning_tabs) {
            let navs = obj.firstChild.children,
                body = obj.lastChild,
                body_style = {
                    transform: '',
                }
            for (let i = 0, len = navs.length; i < len; i++) {
                if (navs[i].className.indexOf('active') > -1) {
                    body_style.transform = `translate3d(-${i}00%, 0px, 0px)`;
                }
            }
            Object.assign(body.style, body_style);
        }
        this.handle();
    }

    handle() {
        // click 事件委托
        document.body.addEventListener('click', function(ev) {
            ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            // 选项卡 初始化
            if (target.className.indexOf('ning-tabs_nav-item') > -1) {
                // 现获取当前的 ning-tabs 组件
                let ning_tabs_navs = target.parentNode.children,
                    ning_tabs_body = target.parentNode.nextSibling,
                    ning_tabs_body_style = {
                        transform: '',
                    };
                // 改变样式
                if (target.className.indexOf('disabled') > -1) {
                    return;
                }
                for (let i = 0, len = ning_tabs_navs.length; i < len; i++) {
                    let obj = ning_tabs_navs[i];
                    obj.className = obj.className.replace('active', '');
                    if (target === obj) {
                        ning_tabs_body_style.transform = `translate3d(-${i}00%, 0px, 0px)`;
                    }
                }
                target.className += ' active';
                Object.assign(ning_tabs_body.style, ning_tabs_body_style);
            }
        })
    }
}

let tabs = new Tabs();
export default tabs;