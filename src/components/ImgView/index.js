// 全局组件 imgview
import React from 'react';

import './index.scss';

let rootScrollTop;

const fixedBody = () => {
	let root = document.getElementById('root');
	rootScrollTop = getScrollTop();
	console.log('rootScrollTop' + rootScrollTop);
	root.style.overflow = 'hidden';
	root.style.height = '100vh';
};

const getScrollTop = () => {
	var scrollTop =
		document.documentElement.scrollTop ||
		window.pageYOffset ||
		document.body.scrollTop;
	return scrollTop;
};

const setScrollTop = (scrollTop = 0) => {
	document.body.scrollTop = scrollTop;
	document.documentElement.scrollTop = scrollTop;
	window.pageYOffset = scrollTop;
};

const scrollBody = () => {
	let root = document.getElementById('root');
	root.style.overflow = 'inherit';
	root.style.height = 'auto';
	console.log('rootScrollTop' + rootScrollTop);
	setTimeout(() => {
		setScrollTop(rootScrollTop);
		rootScrollTop = 0;
	}, 0);
};

class Imgview extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		let body = document.body,
			el_imgview_wrap = document.getElementById('ning_imgview_wrap'),
			el_imgview_img;
		if (!el_imgview_wrap) return;

		el_imgview_img = el_imgview_wrap.children[0].children[0];

		// js事件委托
		function imgViewInit(ev) {
			ev = ev || window.event;
			let target = ev.target || ev.srcElement;
			if (
				target.tagName === 'IMG' &&
				!!target.className &&
				typeof target.className === 'string' &&
				target.className.indexOf('ning-imgview-trigger') > -1
			) {
				let el_trigger = target,
					img_src = target.getAttribute('src');
				if (!img_src) {
					console.log('请检查该图片是否含有属性 src');
				}
				// 弹出 el_imgview_wrap
				el_imgview_img.setAttribute('src', img_src);
				el_imgview_wrap.className += ' active';
				fixedBody();
			}
			if (
				!!target.className &&
				typeof target.className === 'string' &&
				(target.className.indexOf('ning-imgview-wrap') > -1 ||
					target.className.indexOf('ning-imgview-img') > -1 ||
					target.className.indexOf('ning-imgview-content') > -1)
			) {
				el_imgview_img.setAttribute('src', '');
				el_imgview_wrap.className = el_imgview_wrap.className.replace(
					' active',
					''
				);
				scrollBody();
			}
		}
		body.addEventListener('click', imgViewInit, false);
	}

	render() {
		return (
			<div className="ning-imgview-wrap" id="ning_imgview_wrap">
				<div className="ning-imgview-content">
					<img className="ning-imgview-img" src="" alt="" />
				</div>
			</div>
		);
	}
}
export default Imgview;
