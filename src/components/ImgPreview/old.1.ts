import './index.scss';

interface IProps {}

let bodyScrollTop;

const fixedBody = () => {
	let body = document.body;
	bodyScrollTop = getScrollTop();
	body.style.overflow = 'hidden';
	body.style.height = '100vh';
};

const getScrollTop = () => {
	let scrollTop =
		document.documentElement.scrollTop ||
		window.pageYOffset ||
		document.body.scrollTop;
	return scrollTop;
};

const setScrollTop = (scrollTop = 0) => {
	document.body.scrollTop = scrollTop;
	document.documentElement.scrollTop = scrollTop;
	// TODO - 发布时放开注释
	// window.pageYOffset = scrollTop;
};

const scrollBody = () => {
	let body = document.body;
	body.style.overflow = 'inherit';
	body.style.height = 'auto';
	setTimeout(() => {
		setScrollTop(bodyScrollTop);
		bodyScrollTop = 0;
	}, 0);
};

/*
* 两点的距离
*/
function getDistance(p1, p2) {
	let x = p2.pageX - p1.pageX,
		y = p2.pageY - p1.pageY;
	return Math.sqrt(x * x + y * y);
}
/*
* 两点的夹角
*/
function getAngle(p1, p2) {
	let x = p1.pageX - p2.pageX,
		y = p1.pageY - p2.pageY;
	return (Math.atan2(y, x) * 180) / Math.PI;
}
/*
* 获取中点 
*/
function getMidpoint(p1, p2) {
	let x = (p1.pageX + p2.pageX) / 2,
		y = (p1.pageY + p2.pageY) / 2;
	return [x, y];
}

function throttle(func, wait = 100) {
	console.log('throttle');

	let previous = 0;
	return function() {
		let now = Date.now();
		let context = this;
		let args = arguments;
		if (now - previous > wait) {
			func.apply(context, args);
			previous = now;
		}
	};
}

// 常量
const TRIGGER_CLASSNAME = 'ning-img-preview-trigger';
const DEFAULT_ZINDEX = 1000;
const MIN_SCALE = 1;
const MAX_SCALE = 3;

// 获取窗口大小
const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;
const clientCenterPoint = { x: clientWidth / 2, y: clientHeight / 2 };
console.log(
	'clientWidth,clientHeight ',
	clientWidth,
	clientHeight,
	document.body.offsetWidth,
	document.body.offsetHeight,
	clientCenterPoint
);

// 绑定缩放事件
// 绑定拖拽事件
let isTouch = false;
let isDoubleTouch = false; // 是否为多触点
let start = []; // 存放触点坐标
let now, delta; // 当前时间，两次触发事件时间差
let timer = null; // 计时器，触发单击事件
let startPosition, movePosition, endPosition; // 滑动起点，移动，结束点坐标
let originLast, maxSwipeLeft, maxSwipeRight, maxSwipeTop, maxSwipeBottom;

// 事件声明
let gesturestart = new CustomEvent('gesturestart', {
	detail: {
		midPoint: null,
	},
});
let gesturechange = new CustomEvent('gesturechange', {
	detail: {
		scaleNum: null,
	},
});
let gestureend = new CustomEvent('gestureend', {
	detail: {
		position: null,
	},
});
let swipeMove = new CustomEvent('swipeMove', {
	detail: {
		distance: null,
	},
});
let doubleTouch = new CustomEvent('doubleTouch', {
	detail: {
		position: null,
	},
});
let oneTouch = new CustomEvent('oneTouch');

function handleTouchStart(e) {
	if (e.touches.length >= 2) {
		//判断是否有两个点在屏幕上
		isDoubleTouch = true;
		start = (e.touches as unknown) as []; // 得到第一组两个点
		let screenMinPoint = getMidpoint(start[0], start[1]); // 获取两个触点中心坐标
		console.log('screenMinPoint', screenMinPoint);

		gesturestart.detail.midPoint = [
			// screenMinPoint[0] - e.target.offsetLeft,
			// screenMinPoint[1] - e.target.offsetTop,
			screenMinPoint[0],
			screenMinPoint[1],
		];
		e.target.dispatchEvent(gesturestart);
	} else {
		delta = Date.now() - now; //计算两次点击时间差
		now = Date.now();
		startPosition = [e.touches[0].pageX, e.touches[0].pageY];
		if (delta > 0 && delta <= 250) {
			// 双击事件
			clearTimeout(timer);
			// 记录点击屏幕的点的坐标
			doubleTouch.detail.position = [
				e.touches[0].pageX,
				e.touches[0].pageY,
			];
			e.target.dispatchEvent(doubleTouch);
		} else {
			// 滑动事件
			timer = setTimeout(function() {
				e.target.dispatchEvent(oneTouch); //单击事件
			}, 260);
		}
		isTouch = true;
	}
}

function handleTouchmove(e) {
	clearTimeout(timer);
	if (e.touches.length >= 2 && isDoubleTouch) {
		// 缩放
		let now = e.touches; // 得到第二组两个点
		let scale =
			getDistance(now[0], now[1]) / getDistance(start[0], start[1]); // 得到缩放比例
		gesturechange.detail.scaleNum = Number(scale.toFixed(2));
		e.target.dispatchEvent(gesturechange);
	} else if (isTouch) {
		// 拖拽
		movePosition = [e.touches[0].pageX, e.touches[0].pageY];
		endPosition = movePosition;
		movePosition = [
			movePosition[0] - startPosition[0],
			movePosition[1] - startPosition[1],
		];
		startPosition = [e.touches[0].pageX, e.touches[0].pageY];
		swipeMove.detail.distance = [
			movePosition[0].toFixed(2),
			movePosition[1].toFixed(2),
		];
		e.target.dispatchEvent(swipeMove);
	}
}

function handleTouchend(e) {
	if (isDoubleTouch) {
		isDoubleTouch = false;
		gestureend.detail.position = endPosition;
		e.target.dispatchEvent(gestureend);
	}
}

function maxMove(tMatrix, elWidth, elHeight) {
	// 最大可拖动范围
	let sca = tMatrix[0];
	maxSwipeLeft = Math.abs(sca - 1) * originLast[0];
	maxSwipeRight = Math.abs(sca - 1) * (elWidth - originLast[0]);
	maxSwipeTop = Math.abs(sca - 1) * originLast[1];
	maxSwipeBottom = Math.abs(sca - 1) * (elHeight - originLast[1]);
	console.log(
		'maxMove',
		tMatrix,
		maxSwipeLeft,
		maxSwipeRight,
		maxSwipeTop,
		maxSwipeBottom
	);
}

class ImgPreview {
	triggerClassName: string;
	elMask: any;
	elImg: any;
	// 设置图片层级
	prevZindex: number | string;
	// transform 矩阵
	tMatrix: number[];
	defaultTMatrix: number[];
	prevTMatrix: number[];
	defaultScale: any;
	elWidth: number;
	elHeight: number;
	isZooming: boolean;
	isMoveing: boolean;

	constructor(params) {
		this.triggerClassName = params.triggerClassName;
		this.tMatrix = [1, 0, 0, 1, 0, 0]; //  x 缩放，无，无，y 缩放，x 平移，y 平移
	}

	mount = () => {
		console.log(this.triggerClassName);
		document.addEventListener('click', this.handleClick);
	};

	openMask = () => {
		this.elMask.className = 'ning-img-preview-mask active';
		// 页面禁止滚动
		fixedBody();
	};

	closeMask = () => {
		this.elMask.className = 'ning-img-preview-mask';
		// 页面恢复滚动
		scrollBody();
		this.resetImgPosition();
	};

	isOpenMask = () => {
		return this.elMask.className === 'ning-img-preview-mask active';
	};

	handleMaskClick = () => {
		this.closeMask();
	};

	resetImgPosition = () => {
		// 恢复图片层级
		this.elImg.style.zIndex = this.prevZindex;
		// 删除位移属性
		this.elImg.style.transform = 'none';
		this.elImg.style.transformOrigin = '50% 50%';
		// 销毁事件绑定
		this.elImg.removeEventListener('gesturestart', this.gesturef, false);
		this.elImg.removeEventListener('gesturechange', this.gesturef, false);
		this.elImg.removeEventListener('gestureend', this.gesturef, false);
		this.elImg.removeEventListener('swipeMove', this.gesturef, false);
		this.elImg.removeEventListener('doubleTouch', this.gesturef, false);
		this.elImg.removeEventListener('oneTouch', this.gesturef, false);
		// 销毁 touchstart 事件
		document.removeEventListener('touchstart', handleTouchStart, false);
		// 销毁 touchmove事件
		document.removeEventListener('touchmove', handleTouchmove, false);
		// 销毁 touchend事件
		document.removeEventListener('touchend', handleTouchend, false);
		// 删除当前触发器
		this.elImg = null;
	};

	initMask = () => {
		if (!this.elMask) {
			let dom = document.createElement('div');
			//<div class="ning-img-preview-page">1/4</div>
			//<div class="ning-img-preview-download">下载</div>;
			dom.innerHTML = `<div class='ning-img-preview-mask'></div>`;
			this.elMask = dom.children[0];
			document.body.appendChild(this.elMask);
			// 给遮罩层注册点击事件 - 即关闭遮罩层
			document
				.querySelector('.ning-img-preview-mask')
				.addEventListener('click', this.handleMaskClick);
		}
	};

	setTransform = (tMatrix) => {
		console.log('setTransform tMatrix', tMatrix);
		this.elImg.style.transform = `matrix(${tMatrix.join(',')})`;
	};

	setZindex = () => {
		this.prevZindex = window.getComputedStyle(this.elImg)['z-index'];
		this.elImg.style.zIndex = DEFAULT_ZINDEX;
	};

	hasTransform = () => {
		return this.defaultTMatrix[0] !== this.tMatrix[0];
	};

	getTransformOrigin = (point) => {
		// x = 放大倍数 *
		// y =
		return [point[0], point[1] - (clientHeight / 2 - this.elHeight)];
	};

	gesturef = (event) => {
		console.log('gesturef', event.type, event);
		let elImg = this.elImg;
		let tMatrix = this.tMatrix;
		let defaultScale = this.defaultScale;

		switch (event.type) {
			case 'gesturestart':
				console.log('gesturestart event.detail', event.detail);
				if (!event.detail.midPoint) return;
				if (this.isMoveing) return;
				// 获取中心点坐标相对目标元素坐标
				// let x = event.detail.midPoint[0];
				// let y = event.detail.midPoint[1];
				let point = this.getTransformOrigin(event.detail.midPoint);
				let x = point[0];
				let y = point[1];

				originLast = event.detail.midPoint;
				console.log('originLast', originLast);

				// elImg.style.transformOrigin =
				// 	x / tMatrix[0] + 'px ' + y / tMatrix[3] + 'px';
				break;
			case 'gesturechange':
				console.log('gesturechange', event.detail.scaleNum);
				if (!event.detail.scaleNum) return;
				this.isZooming = true;
				// 在上一次的缩放大小的基础上操作
				// let prevScaleX = this.prevTMatrix[0];
				// let prevScaleY = this.prevTMatrix[3];
				let prevScaleX = this.defaultTMatrix[0];
				let prevScaleY = this.defaultTMatrix[3];
				let scaleNum = parseFloat(event.detail.scaleNum);
				// 不缩小比初始值还小
				tMatrix[0] = prevScaleX * scaleNum;
				tMatrix[3] = prevScaleY * scaleNum;
				if (tMatrix[0] <= defaultScale * MIN_SCALE) return;
				this.setTransform(tMatrix);
				break;
			case 'gestureend':
				// 判断是否超过最大缩放大小
				if (tMatrix[0] >= defaultScale * MAX_SCALE) {
					tMatrix[0] = defaultScale * MAX_SCALE;
					tMatrix[3] = defaultScale * MAX_SCALE;
					this.setTransform(tMatrix);
				}
				if (tMatrix[0] <= defaultScale * MIN_SCALE) {
					tMatrix[0] = defaultScale * MIN_SCALE;
					tMatrix[3] = defaultScale * MIN_SCALE;
					this.setTransform(tMatrix);
				}
				console.log('gestureend');
				this.isZooming = false;
				this.isMoveing = false;
				// this.prevTMatrix = tMatrix;
				maxMove(tMatrix, this.elWidth, this.elHeight);
				break;
			case 'swipeMove':
				console.log(
					'swipeMove',
					maxSwipeLeft,
					maxSwipeRight,
					maxSwipeTop,
					maxSwipeBottom
				);
				console.log('swipeMove.detail.distance', event.detail.distance);
				// 未放大不能拖拽
				if (!this.hasTransform()) return;
				// 在缩放不能移动
				if (this.isZooming) return;
				this.isMoveing = true;
				// if (
				// 	!maxSwipeLeft ||
				// 	!maxSwipeRight ||
				// 	!maxSwipeTop ||
				// 	!maxSwipeBottom
				// )
				// 	return;
				// // 向左平移 但是 平移值 > 最大左移值 return
				// if (event.detail.distance[0] > 0 && maxSwipeLeft < tMatrix[4])
				// 	return;
				// // 向右平移 但是 平移值 > 最大右移值 return
				// if (event.detail.distance[0] < 0 && maxSwipeRight < -tMatrix[4])
				// 	return;
				// if (event.detail.distance[1] > 0 && maxSwipeTop < tMatrix[5])
				// 	return;
				// if (
				// 	event.detail.distance[1] < 0 &&
				// 	maxSwipeBottom < -tMatrix[5]
				// )
				// 	return;
				let _scaleNum = tMatrix[0];
				let translateX = true;
				let translateY = true;
				// 如果放大后的高度小于屏幕 则不能上下拖拽 只能左右拖拽
				if (
					event.detail.distance[1] != 0 &&
					_scaleNum * this.elHeight < clientHeight
				) {
					translateY = false;
				}
				// 如果放大后的宽度小于屏幕 则不能左右拖拽 只能上下拖拽
				if (
					event.detail.distance[0] != 0 &&
					_scaleNum * this.elWidth < clientWidth
				) {
					translateX = false;
				}
				translateX &&
					(tMatrix[4] =
						tMatrix[4] + parseInt(event.detail.distance[0]));
				translateY &&
					(tMatrix[5] =
						tMatrix[5] + parseInt(event.detail.distance[1]));
				this.setTransform(tMatrix);
				break;
			case 'doubleTouch':
				// 如果是放大则缩小为初始位置和大小
				if (this.hasTransform()) {
					// 变换中心复位为 50% 50%
					elImg.style.transformOrigin = '50% 50%';
					this.tMatrix = [...this.defaultTMatrix];
					this.setTransform(this.tMatrix);
				} else {
					// 如果是初始位置和大小则以点击点为中心放大
					// 计算出点击点在图片上的变换中心
					originLast = event.detail.position;
					console.log('originLast', originLast);
					let clickPoint = this.getTransformOrigin(originLast);
					console.log('clickPoint', clickPoint);
					elImg.style.transformOrigin =
						originLast[0] / tMatrix[0] +
						'px ' +
						(originLast[1] -
							(clientHeight / 2 -
								(this.elHeight * tMatrix[0]) / 2)) /
							tMatrix[3] +
						'px';

					// elImg.style.transformOrigin =
					// 	clickPoint[0] / tMatrix[0] +
					// 	'px ' +
					// 	clickPoint[1] / tMatrix[3] +
					// 	'px';
					console.log();

					// 放大到最大倍数
					tMatrix[0] = defaultScale * MAX_SCALE;
					tMatrix[3] = defaultScale * MAX_SCALE;
					this.setTransform(tMatrix);
					// 设置移动边界
					maxMove(tMatrix, this.elWidth, this.elHeight);
				}
				break;
			case 'oneTouch':
				this.closeMask();
				break;
			default:
				break;
		}
	};

	getTranslateObj = (startPoint) => {
		return {
			x: clientCenterPoint.x - startPoint.x,
			y: clientCenterPoint.y - startPoint.y,
		};
	};

	handleClick = (event) => {
		if (this.elMask && this.isOpenMask()) return;
		event.stopPropagation();
		let target = event.target;
		if (!target) return;
		if (!target.className || !target.className.includes(TRIGGER_CLASSNAME))
			return;
		// 拿到触发器-图片 开始主逻辑
		this.elImg = target;
		console.log('this.elImg', this.elImg);
		let elImg = this.elImg;
		// 初始化 遮罩层 - 单例
		this.initMask();
		// 弹出遮罩层
		this.openMask();
		// 初始化参数
		let tMatrix = this.tMatrix;
		// 获取元素的位置
		let rect = elImg.getBoundingClientRect();
		this.elWidth = rect.width;
		this.elHeight = rect.height;
		console.log('rect', rect, clientWidth, clientHeight);
		// 计算偏移量 - 即图片中心对齐屏幕可见区域的中心
		let elCenterPoint = {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		};
		let translateX = this.getTranslateObj(elCenterPoint).x;
		let translateY = this.getTranslateObj(elCenterPoint).y;
		console.log('translateX, translateY', translateX, translateY);
		tMatrix[4] = Number(translateX.toFixed(2));
		tMatrix[5] = Number(translateY.toFixed(2));
		// 计算初始缩放比例 - 默认 X 方向 100% 铺满
		this.defaultScale = clientWidth / rect.width;
		console.log('defaultScale', this.defaultScale);
		tMatrix[0] = Number(this.defaultScale.toFixed(2));
		tMatrix[3] = Number(this.defaultScale.toFixed(2));
		this.defaultTMatrix = [...tMatrix];
		// this.prevTMatrix = [...tMatrix];
		// 设置图片层级 - 浮动到最顶层展示
		this.setZindex();
		// 设置偏移量 - 设置初始缩放比例 - 减少重绘
		this.setTransform(tMatrix);
		// 添加事件监听
		// 监听 touchstart 事件
		document.addEventListener('touchstart', handleTouchStart, false);
		// 监听 touchmove 事件
		document.addEventListener('touchmove', handleTouchmove, false);
		// 监听 touchend 事件
		document.addEventListener('touchend', handleTouchend, false);
		// 监听 elImg 手势事件
		elImg.addEventListener('gesturestart', this.gesturef, false);
		elImg.addEventListener('gesturechange', this.gesturef, false);
		elImg.addEventListener('gestureend', this.gesturef, false);
		elImg.addEventListener('swipeMove', this.gesturef, false);
		elImg.addEventListener('doubleTouch', this.gesturef, false);
		elImg.addEventListener('oneTouch', this.gesturef, false);
	};

	unMount = () => {
		// 销毁全局点击事件
		document.removeEventListener('click', this.handleClick);
		// 销毁遮罩层点击事件
		document
			.querySelector('.ning-img-preview-mask')
			.removeEventListener('click', this.handleMaskClick);
		// 销毁 ning-img-preview-mask dom 节点
		document.querySelector('.ning-img-preview-mask').remove();
	};
	// TODO 切换到其他页面时关闭遮罩层
}

export default ImgPreview;
