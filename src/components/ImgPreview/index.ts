import './animation/animation';
import './animation/tween';
import './index.scss';

// 工具函数
let bodyScrollTop;
const fixedBody = () => {
  let body = document.body.children[0] as HTMLElement;
  bodyScrollTop = getScrollTop();
  body.style.cssText = `overflow: hidden;
						  height: 100vh;
						  filter: blur(20px);
						 `;
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
  // TODO
  // window.pageYOffset = scrollTop;
};

const scrollBody = () => {
  let body = document.body.children[0] as HTMLElement;
  body.style.cssText = `overflow: inherit;
						  height: auto;
						  filter: none;
						 `;
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
 * 获取中点
 */
function getMidpoint(p1, p2) {
  let x = (p1.pageX + p2.pageX) / 2,
    y = (p1.pageY + p2.pageY) / 2;
  return [x, y];
}

// 常量
const TRIGGER_CLASSNAME = 'ning-img-preview-trigger';
const MASK_CLASSNAME = 'ning-img-preview-mask';
const PLACEHOLDER_CLASSNAME = 'ning-img-preview-img-placeholder';
const MIN_SCALE = 1;
const MAX_SCALE = 3;
// 获取窗口大小
const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;

// 变量
let isTouch = false;
let isDoubleTouch = false; // 是否为多触点
let start = []; // 存放触点坐标
let now, delta; // 当前时间，两次触发事件时间差
let timer = null; // 计时器，触发单击事件
let transformOriginPoint; // 变换的中心点

// 事件声明
const gesturestart = new CustomEvent('gesturestart', {
  detail: {
    midPoint: null,
  },
});
const gesturechange = new CustomEvent('gesturechange', {
  detail: {
    scaleNum: null,
  },
});
const gestureend = new CustomEvent('gestureend');
const doubleTouch = new CustomEvent('doubleTouch', {
  detail: {
    doubleTouchPoint: null,
  },
});
const oneTouch = new CustomEvent('oneTouch');

// 事件
function handleTouchStart(e) {
  e.preventDefault();
  if (e.touches.length >= 2) {
    //判断是否有两个点在屏幕上
    isDoubleTouch = true;
    start = e.touches as unknown as []; // 得到第一组两个点
    let touchMidPoint = getMidpoint(start[0], start[1]); // 获取两个触点中心坐标
    gesturestart.detail.midPoint = [touchMidPoint[0], touchMidPoint[1]];
    console.log('触发滑动开始事件');
    e.target.dispatchEvent(gesturestart);
  } else {
    delta = Date.now() - now; //计算两次点击时间差
    now = Date.now();
    if (delta > 0 && delta <= 250) {
      // 双击事件
      clearTimeout(timer);
      // 记录点击屏幕的点的坐标
      doubleTouch.detail.doubleTouchPoint = [
        e.touches[0].pageX,
        e.touches[0].pageY,
      ];
      console.log('触发双击事件');
      e.target.dispatchEvent(doubleTouch);
    } else {
      // 滑动事件
      timer = setTimeout(function () {
        console.log('触发单击事件');
        e.target.dispatchEvent(oneTouch); // 单击事件
      }, 260);
    }
    isTouch = true;
  }
}

function handleTouchmove(e) {
  e.preventDefault();
  clearTimeout(timer);
  if (e.touches.length >= 2 && isDoubleTouch) {
    // 缩放
    let now = e.touches; // 得到第二组两个点
    let scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]); // 得到缩放比例
    gesturechange.detail.scaleNum = Number(scale.toFixed(2));
    console.log('触发滑动事件');
    e.target.dispatchEvent(gesturechange);
  } else if (isTouch) {
    // 拖拽
  }
}

function handleTouchend(e) {
  e.preventDefault();
  if (isDoubleTouch) {
    isDoubleTouch = false;
    console.log('触发滑动结束事件');
    e.target.dispatchEvent(gestureend);
  }
}

class ImgPreview {
  triggerClassName: string;
  elMask: any;
  elPlaceholder: any;
  isZooming: boolean;
  isAnimating: boolean;
  initPlaceholderRect: any;
  defaultPlaceholderRect: any;
  currentPlaceholderRect: any;
  isDefaultPostion: boolean;
  defaultPostionCssTextObj: any;
  scaleNum: number;

  constructor(params) {
    this.triggerClassName = params.triggerClassName;
  }

  mount = () => {
    console.log(this.triggerClassName);
    document.addEventListener('click', this.handleClick);
    // this.setDefaultStyle();
  };

  // 挂载 css
  // setDefaultStyle = () => {
  // 	var css = `
  // 			.ning-img-preview-mask {
  // 				position: fixed;
  // 				z-index: -1;
  // 				top: 0;
  // 				left: 0;
  // 				overflow: scroll;
  // 				width: 100vw;
  // 				height: 100vh;
  // 				font-size: 14px;
  // 				user-select: none;
  // 				transition: all linear .2s;
  // 				background-color: transparent;
  // 				scroll-behavior: smooth;
  // 			}
  // 			.ning-img-preview-mask.active {
  // 				z-index: 999;
  // 				background-color: rgba(0, 0, 0, .85);
  // 			}
  // 			.ning-img-preview-mask.inactive {
  // 				z-index: -1;
  // 				background-color: transparent;
  // 			}
  // 			.ning-img-preview-mask .ning-img-preview-img-placeholder {
  // 				position: absolute;
  // 				z-index: 1001;
  // 				max-width: none;
  // 				user-select: none;
  // 				transition: all linear .2s;
  // 			}
  // 		`,
  // 		head = document.getElementsByTagName('head')[0],
  // 		style = document.createElement('style');
  // 	style.type = 'text/css';
  // 	if (style.styleSheet) {
  // 		style.styleSheet.cssText = css;
  // 	} else {
  // 		style.appendChild(document.createTextNode(css));
  // 	}
  // 	head.appendChild(style);
  // };

  toggleMaskClassName = () => {
    this.elMask.className =
      this.elMask.className === MASK_CLASSNAME ||
      this.elMask.className === `${MASK_CLASSNAME} inactive`
        ? `${MASK_CLASSNAME} active`
        : `${MASK_CLASSNAME} inactive`;
  };

  openMask = () => {
    this.toggleMaskClassName();
    // 页面禁止滚动
    fixedBody();
  };

  closeMask = () => {
    // 切换容器开关状态（类名）
    this.toggleMaskClassName();
    // 页面恢复滚动
    scrollBody();
    // 图片恢复原位置
    this.resetImgPosition();
    // 销毁 PLACEHOLDER_CLASSNAME dom 节点
    setTimeout(() => {
      document.querySelector(`.${PLACEHOLDER_CLASSNAME}`).remove();
    }, 200);
  };

  isOpenMask = () => {
    return this.elMask.className === `${MASK_CLASSNAME} active`;
  };

  handleMaskClick = (event) => {
    event.stopPropagation();
    if (event.target.className.includes(MASK_CLASSNAME)) {
      this.closeMask();
    }
  };

  resetImgPosition = () => {
    this.resetImgPlaceholderAnimation();
    // 销毁事件绑定
    this.elPlaceholder.removeEventListener(
      'gesturestart',
      this.gesturef,
      false
    );
    this.elPlaceholder.removeEventListener(
      'gesturechange',
      this.gesturef,
      false
    );
    this.elPlaceholder.removeEventListener('gestureend', this.gesturef, false);
    this.elPlaceholder.removeEventListener('swipeMove', this.gesturef, false);
    this.elPlaceholder.removeEventListener('doubleTouch', this.gesturef, false);
    this.elPlaceholder.removeEventListener('oneTouch', this.gesturef, false);
    // 销毁 touchstart 事件
    document.removeEventListener('touchstart', handleTouchStart, false);
    // 销毁 touchmove事件
    document.removeEventListener('touchmove', handleTouchmove, false);
    // 销毁 touchend事件
    document.removeEventListener('touchend', handleTouchend, false);
    // 删除当前触发器
    this.elPlaceholder = null;
  };

  initMask = () => {
    if (!this.elMask) {
      let dom = document.createElement('div');
      dom.innerHTML = `<div class=${MASK_CLASSNAME}></div>`;
      this.elMask = dom.children[0];
      document.body.appendChild(this.elMask);
      // 给遮罩层注册点击事件 - 即关闭遮罩层
      document
        .querySelector(`.${MASK_CLASSNAME}`)
        .addEventListener('click', this.handleMaskClick);
    }
  };

  initImgPlaceholder = (imgOrigin) => {
    if (!this.elPlaceholder) {
      // 生成 DOM
      let img = document.createElement('img');
      img.src = imgOrigin.src;
      img.className = PLACEHOLDER_CLASSNAME;
      // 设置 placeholder 的位置，基于原图片位置，覆盖其上，只是层级高一些
      let rect = imgOrigin.getBoundingClientRect();
      this.initPlaceholderRect = rect;
      console.log('this.initPlaceholderRect', this.initPlaceholderRect);
      img.style.cssText = `width: ${rect.width}px;
							 height: ${rect.height}px;
							 top: ${rect.top}px;
							 left: ${rect.left}px;
							`;
      this.elPlaceholder = img;
      document.querySelector(`.${MASK_CLASSNAME}`).appendChild(img);
    }
    this.initImgPlaceholderAnimation();
  };

  // 设置占位图片 x 方向铺满 到屏幕中心
  initImgPlaceholderAnimation = () => {
    // 获取元素的位置的缓存
    let rect = this.initPlaceholderRect;
    // 计算初始缩放比例 - 默认 X 方向 100% 铺满
    let defaultScale = clientWidth / rect.width;
    console.log('defaultScale', defaultScale);
    // 计算新的 cssTextObj
    let offsetTop =
      defaultScale * rect.height > clientHeight
        ? -rect.top
        : (clientHeight - rect.height * defaultScale) / 2 - rect.top;
    let offsetLeft = -rect.left;
    let cssTextObj = {
      width: rect.width * defaultScale,
      height: rect.height * defaultScale,
      top: rect.top + offsetTop,
      left: rect.left + offsetLeft,
    };
    console.log('initImgPlaceholderAnimation cssTextObj', cssTextObj);
    this.setPlaceHolderPosition(cssTextObj);
    this.defaultPlaceholderRect = cssTextObj;
    this.isDefaultPostion = true;
    this.defaultPostionCssTextObj = cssTextObj;
  };

  setPlaceHolderPosition = (cssTextObj) => {
    this.elPlaceholder.style.cssText = `width: ${cssTextObj.width}px;
							 height: ${cssTextObj.height}px;
							 top: ${cssTextObj.top}px;
							 left: ${cssTextObj.left}px;
							`;
  };

  resetImgPlaceholderAnimation = () => {
    let initPlaceholderRect = this.initPlaceholderRect;
    console.log(
      'resetImgPlaceholderAnimation initPlaceholderRect',
      initPlaceholderRect
    );
    this.setPlaceHolderPosition(initPlaceholderRect);
  };

  gesturef = (event) => {
    console.log('gesturef', event.type, event);
    switch (event.type) {
      case 'gesturestart':
        console.log('gesturestart event.detail', event.detail);
        if (!event.detail.midPoint) return;
        // 记录初始的元素 rect
        // 计算双指的中心点
        transformOriginPoint = event.detail.midPoint;
        this.currentPlaceholderRect =
          this.elPlaceholder.getBoundingClientRect();
        break;
      case 'gesturechange':
        console.log('gesturechange', event.detail.scaleNum);
        if (!event.detail.scaleNum) return;
        let scaleNum =
          (event.detail.scaleNum * this.currentPlaceholderRect.width) /
          this.defaultPlaceholderRect.width;
        if (scaleNum > MAX_SCALE + 0.5) return;
        if (scaleNum < MIN_SCALE - 0.1) return;
        // 计算出基于 default 的放大倍数
        console.log('gesturechange scaleNum', scaleNum);
        this.scaleNum = scaleNum;
        this.isDefaultPostion = scaleNum === 1;
        // 基于 default 放大缩小
        let rect = this.defaultPlaceholderRect;
        // 计算新的 cssTextObj

        let top = (clientHeight - scaleNum * rect.height) / 2;
        let left = 0;
        let cssTextObj = {
          width: rect.width * scaleNum,
          height: rect.height * scaleNum,
          top,
          left,
        };
        console.log('gesturechange cssTextObj', cssTextObj);
        this.setPlaceHolderPosition(cssTextObj);
        let self = this;
        // // 让父容器滚动条 - 滚动至指定位置
        let scrollLeft =
          scaleNum * rect.width > clientWidth
            ? (MAX_SCALE - 1) * (transformOriginPoint[0] - rect.left) +
              rect.left
            : 0;
        let scrollTop =
          scaleNum * rect.height > clientHeight
            ? (MAX_SCALE - 1) * (transformOriginPoint[1] - rect.top) + rect.top
            : 0;
        scrollTop > 0 &&
          Math.animation(
            rect.top,
            scrollTop,
            function (value) {
              self.elMask.scrollTop = value;
            },
            'Linear',
            1
          );
        scrollLeft > 0 &&
          Math.animation(
            rect.left,
            scrollLeft,
            function (value) {
              self.elMask.scrollLeft = value;
            },
            'Linear',
            1
          );
        // Math.animation(
        // 	rect.width,
        // 	cssTextObj.width,
        // 	function(value) {
        // 		self.elPlaceholder.style.width = `${value}px`;
        // 	},
        // 	'Linear',
        // 	1
        // );
        // Math.animation(
        // 	rect.height,
        // 	cssTextObj.height,
        // 	function(value) {
        // 		self.elPlaceholder.style.height = `${value}px`;
        // 	},
        // 	'Linear',
        // 	1
        // );
        // Math.animation(
        // 	rect.top,
        // 	cssTextObj.top,
        // 	function(value) {
        // 		self.elPlaceholder.style.top = `${value}px`;
        // 	},
        // 	'Linear',
        // 	1
        // );
        // Math.animation(
        // 	rect.left,
        // 	cssTextObj.left,
        // 	function(value) {
        // 		self.elPlaceholder.style.left = `${value}px`;
        // 	},
        // 	'Linear',
        // 	1
        // );
        break;
      case 'gestureend':
        console.log('gestureend this.scaleNum', this.scaleNum);
        console.log(
          'this.defaultPostionCssTextObj',
          this.defaultPostionCssTextObj
        );
        // 判断是否超过最大缩放大小 - 是则缩小为最大放大倍数
        if (this.scaleNum > MAX_SCALE) {
          let top =
            (clientHeight - MAX_SCALE * this.defaultPostionCssTextObj.height) /
            2;
          let left = 0;
          let cssTextObj = {
            width: this.defaultPostionCssTextObj.width * MAX_SCALE,
            height: this.defaultPostionCssTextObj.height * MAX_SCALE,
            top,
            left,
          };
          this.setPlaceHolderPosition(cssTextObj);
        }
        // 判断是否小于最小缩放大小 - 是则放大为最小放大倍数
        if (this.scaleNum < MIN_SCALE) {
          let top =
            (clientHeight - MIN_SCALE * this.defaultPostionCssTextObj.height) /
            2;
          let left = 0;
          let cssTextObj = {
            width: this.defaultPostionCssTextObj.width * MIN_SCALE,
            height: this.defaultPostionCssTextObj.height * MIN_SCALE,
            top,
            left,
          };
          this.setPlaceHolderPosition(cssTextObj);
        }
        break;
      case 'doubleTouch':
        transformOriginPoint = event.detail.doubleTouchPoint;
        if (this.isDefaultPostion) {
          if (this.isZooming) return;
          this.isZooming = true;
          this.isDefaultPostion = false;
          // 如果是初始位置和大小则以点击点为中心放大
          let rect = this.elPlaceholder.getBoundingClientRect();
          // 计算新的 cssTextObj
          // 放大后的总高度小于屏幕高度则计算，大于屏幕高度则置为 0
          let top =
            MAX_SCALE * rect.height < clientHeight
              ? (clientHeight - MAX_SCALE * rect.height) / 2
              : 0;
          let left = 0;
          let cssTextObj = {
            width: rect.width * MAX_SCALE,
            height: rect.height * MAX_SCALE,
            top,
            left,
          };
          let self = this;
          this.setPlaceHolderPosition(cssTextObj);
          // Math.animation(
          // 	rect.width,
          // 	cssTextObj.width,
          // 	function(value) {
          // 		self.elPlaceholder.style.width = `${value}px`;
          // 	},
          // 	'Linear',
          // 	200
          // );
          // Math.animation(
          // 	rect.height,
          // 	cssTextObj.height,
          // 	function(value) {
          // 		self.elPlaceholder.style.height = `${value}px`;
          // 	},
          // 	'Linear',
          // 	200
          // );
          // Math.animation(
          // 	rect.top,
          // 	cssTextObj.top,
          // 	function(value) {
          // 		self.elPlaceholder.style.top = `${value}px`;
          // 	},
          // 	'Linear',
          // 	200
          // );
          // Math.animation(
          // 	rect.left,
          // 	cssTextObj.left,
          // 	function(value) {
          // 		self.elPlaceholder.style.left = `${value}px`;
          // 	},
          // 	'Linear',
          // 	200
          // );
          // 让父容器滚动条 - 滚动至指定位置
          let scrollLeft =
            MAX_SCALE * rect.width > clientWidth
              ? (MAX_SCALE - 1) * (transformOriginPoint[0] - rect.left) +
                rect.left
              : 0;
          let scrollTop =
            MAX_SCALE * rect.height > clientHeight
              ? (MAX_SCALE - 1) * (transformOriginPoint[1] - rect.top) +
                rect.top
              : 0;
          console.log(
            'doubleTouch scrollTop scrollLeft',
            scrollTop,
            scrollLeft
          );
          scrollTop > 0 &&
            Math.animation(
              self.elMask.scrollTop,
              scrollTop,
              function (value) {
                self.elMask.scrollTop = value;
              },
              'Linear',
              200
            );
          scrollLeft > 0 &&
            Math.animation(
              self.elMask.scrollLeft,
              scrollLeft,
              function (value) {
                self.elMask.scrollLeft = value;
              },
              'Linear',
              200
            );
          // 恢复点击
          setTimeout(() => {
            this.isZooming = false;
          }, 200);
        } else {
          // 如果是放大则缩小为初始位置和大小
          this.isDefaultPostion = true;
          this.setPlaceHolderPosition(this.defaultPostionCssTextObj);
        }
        break;
      case 'oneTouch':
        // 恢复原位
        this.closeMask();
        break;
      default:
        break;
    }
  };

  handleClick = (event) => {
    if (this.elMask && this.isOpenMask()) return;
    event.stopPropagation();
    let target = event.target;
    if (!target) return;
    if (!target.className || !target.className.includes(TRIGGER_CLASSNAME))
      return;
    window.vant.ImagePreview({
      images: [target.src],
      startPosition: 0,
      onClose() {
        // do something
      },
      closeable: true,
    });
    // 拿到触发器-图片 开始主逻辑
    // 初始化 遮罩层 - 单例
    // console.log(target.src);
    // this.initMask();
    // // 初始化预览图片拷贝
    // this.initImgPlaceholder(target);
    // // 弹出遮罩层
    // this.openMask();
    // // 添加事件监听
    // // 监听 touchstart 事件
    // document.addEventListener('touchstart', handleTouchStart, {
    // 	passive: false,
    // });
    // // 监听 touchmove 事件
    // document.addEventListener('touchmove', handleTouchmove, {
    // 	passive: false,
    // });
    // // 监听 touchend 事件
    // document.addEventListener('touchend', handleTouchend, {
    // 	passive: false,
    // });
    // // 监听 elImg 手势事件
    // this.elPlaceholder.addEventListener(
    // 	'gesturestart',
    // 	this.gesturef,
    // 	false
    // );
    // this.elPlaceholder.addEventListener(
    // 	'gesturechange',
    // 	this.gesturef,
    // 	false
    // );
    // this.elPlaceholder.addEventListener('gestureend', this.gesturef, false);
    // this.elPlaceholder.addEventListener('swipeMove', this.gesturef, false);
    // this.elPlaceholder.addEventListener(
    // 	'doubleTouch',
    // 	this.gesturef,
    // 	false
    // );
    // this.elPlaceholder.addEventListener('oneTouch', this.gesturef, false);
  };

  unMount = () => {
    // 销毁全局点击事件
    document.removeEventListener('click', this.handleClick);
    // 销毁遮罩层点击事件
    document
      .querySelector(`.${MASK_CLASSNAME}`)
      .removeEventListener('click', this.handleMaskClick);
    // 销毁 MASK_CLASSNAME dom 节点
    document.querySelector(`.${MASK_CLASSNAME}`).remove();
  };

  // TODO 切换到其他页面时关闭遮罩层
}

export default ImgPreview;
