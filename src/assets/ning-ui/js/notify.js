/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2018-10-11 17:43:55
 * @version 1.0.0
 */

class Notify {
	/**
	 * [初始化 notify]
	 * @param  object params
	 * params.text(string) [内部显示文字]
	 * params.theme(string) [提示主题]
	 * params.time(string) [提示消失延时]
	 * @return 生成一个全局提示 notify
	 */
	init(params) {
		if (!params || !params.text) {
			return;
		}

		const el_notify_wrap_styles = {
				position: 'fixed',
				top: 0,
				left: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				textAlign: 'center',
				opacity: 0,
				cursor: 'pointer',
			},
			el_notify_item_styles = {
				flex: 1,
				display: 'inline-flex',
				alignItems: 'center',
				maxWidth: '95%',
				padding: '8px 16px',
				marginTop: '8px',
				borderRadius: '2px',
				boxShadow: '0 0 5px 1px rgba(0,0,0,.1)',
				color: '#fff',
				fontSize: '12px',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				letterSpacing: '1px',
				animation: 'dropDown .3s ease-in-out',
			},
			theme_str_config = ['blue', 'green', 'orange', 'red'],
			theme_config = {
				blue: {
					theme_styles: {
						background: 'rgba(66, 132, 237, .8)',
						border: '1px solid #4284ED',
					},
					icon_class: 'icon-info _blue',
				},
				red: {
					theme_styles: {
						background: 'rgba(245, 34, 45, 0.8)',
						border: '1px solid #f5222d',
					},
					icon_class: 'icon-error _red',
				},
				green: {
					theme_styles: {
						background: 'rgba(39, 174, 96, 0.8)',
						border: '1px solid #27ae60',
					},
					icon_class: 'icon-success _green',
				},
				orange: {
					theme_styles: {
						background: 'rgba(255, 178, 22, 0.8)',
						border: '1px solid #ffb216',
					},
					icon_class: 'icon-warning _orange',
				},
			};

		let self = this,
			el_notify = document.getElementById('notify'),
			el_notify_wrap = document.createElement('div'),
			el_notify_item = document.createElement('span'),
			icon = document.createElement('i');

		params.theme = theme_str_config.includes(params.theme)
			? params.theme
			: 'blue';
		params.time = params.time || 3000;

		let { theme_styles, icon_class } = theme_config[params.theme];

		el_notify_wrap.id = 'notify';
		icon.className = 'ning-icon m-r-sm ' + icon_class;
		el_notify_item.className = 'notify-item';
		el_notify_item.appendChild(icon);
		el_notify_item.appendChild(document.createTextNode(params.text));

		self.assignStyles(el_notify_item.style, el_notify_item_styles);
		self.assignStyles(el_notify_item.style, theme_styles);
		self.assignStyles(el_notify_wrap.style, el_notify_wrap_styles);

		// 不存在 则新建
		if (!el_notify) {
			el_notify = el_notify_wrap;
			el_notify_wrap.appendChild(el_notify_item);
			document.body.appendChild(el_notify_wrap);
		} else {
			// 存在 则在 notify 列表中继续增加 item
			el_notify.appendChild(el_notify_item);
		}

		// 弹出 notify
		setTimeout(function () {
			self.assignStyles(el_notify_wrap.style, {
				opacity: 1,
				zIndex: 999999,
				left: 0,
			});
		}, 0);

		// 收起 notify
		setTimeout(function () {
			self.assignStyles(el_notify_item.style, {
				animation: 'fadeUp .25s linear',
			});
		}, params.time);

		// 删除 dom
		setTimeout(function () {
			let noty_item_list = document.querySelectorAll('.notify-item');
			el_notify.removeChild(el_notify_item);
			if (noty_item_list.length === 0) {
				document.body.removeChild(el_notify);
			}
		}, params.time + 250);
	}

	assignStyles(target, options) {
		Object.assign(target, options);
	}

	info(text) {
		return this.init({
			text,
			theme: 'blue',
		});
	}

	success(text) {
		return this.init({
			text,
			theme: 'green',
		});
	}

	warning(text) {
		return this.init({
			text,
			theme: 'orange',
		});
	}

	danger(text) {
		return this.init({
			text,
			theme: 'red',
		});
	}
}
let notify = new Notify();
export default notify;
