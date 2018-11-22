class Paginator {
    init(params) {
        if (params.total_count === 0) {
            params.element.innerHTML = '';
            return;
        }
        let self = this;
        let total_page = Math.ceil(params.total_count / params.page_size);
        let total_count_dom =  self.renderTotalCount(params.total_count);
        let item_list = self.initItem(params.current_page, total_page);
        let item_list_dom = self.renderItem(params.current_page, item_list);
        let doms = total_count_dom + item_list_dom;
        params.element.innerHTML = doms;
        self.removeEvent(params);
        self.bindEvent(params);
    }

    removeEvent(params) {
        let self = this;
        document.querySelectorAll(".ning-paginator-item").forEach(function(v, i, a) {
            v.removeEventListener("click", self.clickEvent.bind(this, params, self), false);
        });
    }

    bindEvent(params) {
        let self = this;
        document.querySelectorAll(".ning-paginator-item").forEach(function(v, i, a) {
            v.addEventListener("click", self.clickEvent.bind(this, params, self), false);
        });
    }

    clickEvent(params, self, ev) {
        ev = ev || window.event;
        ev.stopPropagation();
        // ev.preventDefault();
        let target = ev.target || ev.srcElement;
        let total_page = Math.ceil(params.total_count / params.page_size);
        if (target.className.indexOf('ning-paginator-item') > -1) {
            let current_page = params.current_page;
            // 第一页
            if (target.className.indexOf('page_min') > -1) {
                    current_page = 1;
            }
            // 最后一页
            else if (target.className.indexOf('page_max') > -1) {
                current_page = total_page;
            }
            // 向前移动一页
            else if (target.className.indexOf('prev') > -1) {
                if (current_page === 1) {
                    current_page = 1;
                } else {
                    current_page--;
                }
            }
            // 向后移动一页
            else if (target.className.indexOf('next') > -1) {
                if (current_page === total_page) {
                    current_page = total_page;
                } else {
                    current_page++;
                }
            }
            // 更多页
            else if (target.className.indexOf('more') > -1) {
                let max_page = Number(target.previousElementSibling.innerHTML);
                current_page = max_page + 1;
            }
            // 某一页
            else {
                current_page = Number(target.innerHTML)
            }
            params.cb(current_page)
        }
    }

    renderTotalCount(total_count) {
        let total_count_dom = `<span class="total-count">总条数： ${total_count}</span>`;
        return total_count_dom;
    }

    initItem(current_page, total_page) {
        let item_list = [];
        let has_last_page = false;
        if (total_page === 1) {
            has_last_page = true;
            item_list = [1];
            return item_list;
        }
        if (total_page <= 5) {
            has_last_page = true;
            for (let i = 1; i <= total_page; i++) {
                item_list.push(i);
            }
        }
        if (total_page > 5) {
            let min_page = 5 * (Math.ceil(current_page / 5) - 1) + 1;
            let max_page = total_page - min_page > 5 ? min_page + 4 : total_page;
            for (let i = min_page; i <= max_page; i++) {
                if (i === total_page) {
                    has_last_page = true;
                }
                item_list.push(i);
            }
        }
        item_list.unshift('prev');
        item_list.unshift('page_min')
        if (!has_last_page) {
            item_list.push('more');
        }
        item_list.push('next');
        item_list.push('page_max');
        return item_list;
    }

    renderItem(current_page, item_list) {
        let item_list_dom = '';
        item_list.forEach(function(v, i, a) {
            if (v === 'page_min') {
                item_list_dom += '<li class="ning-paginator-item page_min">首页</li>';
            } else if (v === 'page_max') {
                item_list_dom += '<li class="ning-paginator-item page_max">尾页</li>';
            } else if (v === 'prev') {
                item_list_dom +=   `<li class="ning-paginator-item prev">
                                        <i class="ning-icon icon-prev"></i>
                                    </li>`;
            } else if (v === 'next') {
                item_list_dom +=   `<li class="ning-paginator-item next">
                                        <i class="ning-icon icon-next"></i>
                                    </li>`;
            } else if (v === 'more') {
                item_list_dom += '<li class="ning-paginator-item more">...</li>';
            } else {
                if (v === Number(current_page)) {
                    item_list_dom += `<li class="ning-paginator-item active">${v}</li>`;
                } else {
                    item_list_dom += `<li class="ning-paginator-item ning-paginator-item-${v}">${v}</li>`;
                }
            }
        })
        item_list_dom = `<ul>${item_list_dom}</ul>`
        return item_list_dom;
    }
}

let paginator = new Paginator();
export default paginator;