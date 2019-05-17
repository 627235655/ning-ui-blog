import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import './demos.scss';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';
import TagLink from 'components/TagLink/TagLink'
import blog_chart from 'assets/images/blog-chart.png'
import CodeBox from 'components/CodeBox/CodeBox';


class Demos extends Component {
	constructor(props) {
        super(props)
        this.state = {
            articleList: [],
        }
    }

	render() {
		return (
            <div>
                <div className="ning-container demo-box">
                    <h4 id="all-center-box">水平垂直居中的实现</h4>
                    <div className="example-box flex-row-box">
                        <div className="all-center-box all-center-box-1">
                            适合文字,t-a-c,lh=h
                        </div>
                        <div className="all-center-box all-center-box-2">
                            <div>table + table-cell</div>
                        </div>
                        <div className="all-center-box all-center-box-3">
                            <div>flex</div>
                        </div>
                        <div className="all-center-box all-center-box-7">
                            <div>flex + margin: auto;</div>
                        </div>
                        <div className="all-center-box">
                            <div className="all-center-box-4">
                                绝对定位 + margin: auto;
                            </div>
                        </div>
                        <div className="all-center-box">
                            <div className="all-center-box-5">
                                绝对定位 + margin: -50%;
                            </div>
                        </div>
                        <div className="all-center-box">
                            <div className="all-center-box-6">
                                绝对定位 + transform;
                            </div>
                        </div>
                        <div className="all-center-box all-center-box-8">
                            <div>
                                inline-block + 伪元素;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="head-light">头像 hover 高光</h4>
                    <div className="example-box">
                        <div className="head-light"></div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: ``,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="palceholder-shown">:placeholder-shown 伪类实现 Material Design 占位符交互效果</h4>
                    <div className="example-box">
                        <div className="ning-form-item material-design">
                            <input placeholder="邮箱"/>
                            <label className="label-placeholder">邮箱</label>
                        </div>
                        <div className="ning-form-item material-design">
                            <select placeholder="邮箱">
                                <option value=""></option>
                                <option value="">啊啊啊</option>
                                <option value="">啊啊啊啊啊啊啊啊啊啊a</option>
                                <option value="">啊啊啊</option>
                            </select>
                            <label className="label-placeholder">邮箱</label>
                        </div>
                        <div className="ning-form-item material-design">
                            <textarea placeholder="邮箱"></textarea>
                            <label className="label-placeholder">邮箱</label>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.material-design{
        /* 默认placeholder颜色透明不可见 */
        input,
        select,
        textarea{
            position: relative;
            &:placeholder-shown::placeholder {
                color: transparent;
            }
        }
        .label-placeholder{
            position: absolute;
            z-index: 1;
            top: 20px;
            left: 20px;
            width: auto;
            min-width: 0;
            padding: 0 2px;
            background: #fff;
            font-size: 12px;
            font-weight: normal;
            color: $gray;
            pointer-events: none;
            transition: .25s;
        }
        input:not(:placeholder-shown) ~ .label-placeholder,
        input:focus ~ .label-placeholder,
        select:not(:placeholder-shown) ~ .label-placeholder,
        select:focus ~ .label-placeholder,
        textarea:not(:placeholder-shown) ~ .label-placeholder,
        textarea:focus ~ .label-placeholder {
            transform: scale(0.8) translate(0, -20px);
            color: $blue-3;
        }
    }`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="box-decoration-break">box-decoration-break 实现不规则的内联文本整体渐变效果</h4>
                    <div className="example-box">
                        <div className="box-decoration-break">
                            <span>
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。 言念君子，温其如玉
                            </span>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.box-decoration-break{
        width: 200px;
        span{
            padding: 4px;
            background-image: linear-gradient(to right, $blue, $red 200px); // 200px 是保证 渐变色一致
            -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
            color: #fff;
        }
        &:first-child{
            border-radius: 5px;
        }
    }`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-typing">纯 CSS 实现打字动画效果</h4>
                    <div className="example-box">
                        <div className="typing m-b-lg">
                            簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                        </div>
                        <div className="typing1">簪子上有八个字，便是仅算粗通</div>
                        <div className="typing2">文墨的少女，也觉得极为动人。</div>
                        <div className="typing3">言念君子，温其如玉。</div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.typing {
    width: 37em; // 与字数相同
    line-height: 1;
    white-space: nowrap;
    animation: typing 10s steps(37, end), blink-caret .75s step-end infinite;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 37em; }
}
/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-progress">不可思议的纯 CSS 滚动进度条效果</h4>
                    <div className="example-box">
                        <div className="css-progress">
                            <div className="progress-box">
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                            </div>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.typing {
    width: 37em; // 与字数相同
    line-height: 1;
    white-space: nowrap;
    animation: typing 10s steps(37, end), blink-caret .75s step-end infinite;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 37em; }
}
/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-gradient-dashed-border">纯CSS实现 渐变虚框及边框滚动动画</h4>
                    <div className="example-box">
                        <div className="css-gradient-dashed-border flex-row-box">
                            <div className="box-1">
                                hahahahah
                            </div>
                            <div className="box-2">
                                <div className="content">内容占位</div>
                            </div>
                            <div className="box-3">
                                <img src="mm1.jpg" width="128" height="96"/>
                            </div>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.typing {
    width: 37em; // 与字数相同
    line-height: 1;
    white-space: nowrap;
    animation: typing 10s steps(37, end), blink-caret .75s step-end infinite;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 37em; }
}
/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="underscore">防抖和节流</h4>
                    <div className="example-box">
                        <div className="flex-center-box">
                            请连续向输入框填写内容
                            <button className="ning-btn m-l-md" onClick={() => this.clear()}>重置</button>
                        </div>
                        <div className="ning-form-item">
                            <input type="text" className="flex-1" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-inherit">css-secret-inherit</h4>
                    <div className="example-box">
                        <button className="ning-btn">对话框</button>
                        <p className="css-secret-inherit">
                            独立小桥风清袖，平林新月人归后
                        </p>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.css-secret-inherit{
    position: relative;
    &:after{
        content: '';
        position: absolute;
        top: 20px;
        left: -6px;
        padding: 5px;
        border: inherit;
        border-top: 0;
        border-right: 0;
        background: inherit;
        transform: rotate(45deg);
    }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-border">css-secret-border</h4>
                    <div className="example-box flex-row-box css-secret-border">
                        <div className="flex-col-box flex-center-box">
                            <p>box-shadow-多重边框</p>
                            <div className="box-shadow-border"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>透明边框</p>
                            <div className="opacity-border"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>outline-多重边框</p>
                            <div className="outline-border"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-auto-bg">css-secret-auto-bg</h4>
                    <div className="example-box flex-row-box css-secret-auto-bg">
                        <div className="flex-col-box flex-center-box">
                            <p>background-postion: bottom right</p>
                            <div className="bg-box _traditional">哈哈</div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>background-postion: bottom right</p>
                            <div className="bg-box _pos_num">哈哈</div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>background-origin: content-box</p>
                            <div className="bg-box _origin">哈哈</div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>background-position: calc(100% - 16px) calc(100% - 16px)</p>
                            <div className="bg-box _calc">哈哈</div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-inset-radius">css-secret-inset-radius</h4>
                    <div className="example-box flex-row-box css-secret-inset-radius">
                        <div className="flex-col-box flex-center-box">
                            <p>外圆内方</p>
                            <div className="outradius-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>外方内圆</p>
                            <div className="insetradius-box"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-bg-list">css-secret-bg-list</h4>
                    <div className="example-box flex-row-box css-secret-bg-list">
                        <div className="flex-col-box flex-center-box">
                            <p>横向条纹</p>
                            <div className="bg-row-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>竖向条纹</p>
                            <div className="bg-col-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>斜向条纹</p>
                            <div className="bg-lean-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>斜向条纹2</p>
                            <div className="bg-lean-box-2"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-column-list">css-column-list</h4>
                    <div className="example-box flex-row-box">
                        <ul className="css-column-list">
                            <li>Multiple-column布局，也称多列布局、多栏布局，我自己喜欢叫做分栏布局，这种布局可以讲内容布局到一组列框，类似于报纸上的排版。Multiple-column布局，也称多列布局、多栏布局，我自己喜欢叫做分栏布局，这种布局可以讲内容布局到一组列框，类似于报纸上的排版。</li>
                            <li>分栏布局非常特殊，有别于传统布局方法，它将包括包括所有子元素在内的所有内容拆分为列，这与我们打印网页时候时页面内容分割成不同的页面的方式类似。</li>
                            <li>分栏布局IE10+都可以使用，API稳定，移动端兼容性比flex布局要好，虽然设计初衷不一样，但很多布局都可以实现。甚至某些场景下，只能使用分栏布局才能实现。很有学习的必要。分栏布局IE10+都可以使用，API稳定，移动端兼容性比flex布局要好，虽然设计初衷不一样，但很多布局都可以实现。甚至某些场景下，只能使用分栏布局才能实现。很有学习的必要。</li>
                            <li>column-width表示每一栏/列的最佳宽度。如果我们只设定column-width，浏览器会自动根据现有容器宽度划分栏目的个数。</li>
                            <li>表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。</li>
                            <li>表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。</li>
                        </ul>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-bg-list-2">css-secret-bg-list-2</h4>
                    <div className="example-box flex-row-box css-secret-bg-list-2">
                        <div className="flex-col-box flex-center-box">
                            <p>网格1</p>
                            <div className="bg-grids-box-1"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>网格2</p>
                            <div className="bg-grids-box-2"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>网格3</p>
                            <div className="bg-grids-box-3"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>波点1</p>
                            <div className="bg-bodian-box-1"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>波点2</p>
                            <div className="bg-bodian-box-2"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>棋盘1</p>
                            <div className="bg-chessboard-box-1"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>棋盘2</p>
                            <div className="bg-chessboard-box-2"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>伪随机背景</p>
                            <div className="bg-paseudorandom-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>信封边框</p>
                            <div className="border-mail-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>蚂蚁行军边框</p>
                            <div className="border-ants-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>折角1</p>
                            <div className="bevel-box-1">
                                折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角
                            </div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>折角2</p>
                            <div className="bevel-box-2">
                                折角折角折角折角折角折角折角折角折角折角折角角折角折角折角折角折角折角
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}

    handleChange = () => {
        console.log(1)
        this.debounce(() => {console.log('防抖。。。')}, 1000)
    }

    /**
     * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
     *
     * @param  {function} func        传入函数
     * @param  {number}   wait        表示时间窗口的间隔
     * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
     * @return {function}             返回客户调用函数
     */
    debounce = (func, wait, immediate) => {
        var timeout = null;
        return function(event) {
            if (timeout) {
                clearTimeout(timeout);
                event.persist && event.persist()   //保留对事件的引用
                timeout = setTimeout(() => {
                    func.call(this, arguments)
                }, wait)
            }
        }
      //   let self = this;
      //   var timeout, args, context, timestamp, result;

      //   var later = function() {
      //   // 据上一次触发时间间隔
      //   var last = self.now() - timestamp;

      //   // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      //   if (last < wait && last > 0) {
      //     timeout = setTimeout(later, wait - last);
      //   } else {
      //     timeout = null;
      //     // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      //     if (!immediate) {
      //       result = func.apply(context, args);
      //       if (!timeout) context = args = null;
      //     }
      //   }
      // };

      // return function() {
      //   context = this;
      //   args = arguments;
      //   timestamp = self.now();
      //   var callNow = immediate && !timeout;
      //   // 如果延时不存在，重新设定延时
      //   if (!timeout) timeout = setTimeout(later, wait);
      //   if (callNow) {
      //     result = func.apply(context, args);
      //     context = args = null;
      //   }

      //   return result;
      // };
    }

    /**
     * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
     *
     * @param  {function}   func      传入函数
     * @param  {number}     wait      表示时间窗口的间隔
     * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
     *                                如果想忽略结尾边界上的调用，传入{trailing: false}
     * @return {function}             返回客户调用函数
     */
    throttle = (func, wait, options) => {
        let self = this;
      var context, args, result;
      var timeout = null;
      // 上次执行时间点
      var previous = 0;
      if (!options) options = {};
      // 延迟执行函数
      var later = function() {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : self.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = self.now();
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) previous = now;
        // 延迟执行时间间隔
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        //如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

    now = () => {
        return new Date().getTime();
    }

    clear = () => {
        document.getElementById('debounce_res').innerHTML = '';
    }

    componentDidMount() {
    }
}

export default Demos;