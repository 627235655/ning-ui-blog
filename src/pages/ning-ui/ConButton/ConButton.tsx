import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CodeBox from 'components/CodeBox/CodeBox';



class ConButton extends React.Component {
    render() {
            return (
                    <div>
                <h1>按钮<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p className="ning-summary">
                    实现的重点技巧就是利用::first-line伪元素的文字控色技术（仅支持单行文字按钮）
                    <a href="/#/index/article-detail/5c0e36c9ef41a871c7add3a4" className="_blue" target="_blank">详情</a>
                </p>
                <p>三种样式，基础按钮(主要)，线框按钮（次要），文字按钮</p>
                <div className="example-box">
                    <div className="flex-box">
                        <button className="ning-btn">基础按钮</button>
                        <button className="ning-line-btn m-l-md">线框按钮</button>
                        <button className="ning-txt-btn m-l-md">文字按钮</button>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<button class="ning-btn">基础按钮</button>
<button class="ning-line-btn">线框按钮</button>
<button class="ning-txt-btn">文字按钮</button>`,
                        }
                    }
                />
                <p>颜色</p>
                <div className="example-box">
                    <div className="flex-row-box">
                        <button className="ning-btn _white">白色</button>
                        <button className="ning-btn _gray">灰色</button>
                        <button className="ning-btn _dark">黑色</button>
                        <button className="ning-btn">蓝色</button>
                        <button className="ning-btn _green">绿色</button>
                        <button className="ning-btn _orange">橙色</button>
                        <button className="ning-btn _red">红色</button>
                    </div>
                    <div className="flex-row-box m-t-md">
                        <button className="ning-line-btn _white">白色</button>
                        <button className="ning-line-btn _gray">灰色</button>
                        <button className="ning-line-btn _dark">黑色</button>
                        <button className="ning-line-btn">蓝色</button>
                        <button className="ning-line-btn _green">绿色</button>
                        <button className="ning-line-btn _orange">橙色</button>
                        <button className="ning-line-btn _red">红色</button>
                    </div>
                    <div className="flex-row-box m-t-md">
                        <button className="ning-txt-btn _white b-drak">白色</button>
                        <button className="ning-txt-btn _gray">灰色</button>
                        <button className="ning-txt-btn _dark">黑色</button>
                        <button className="ning-txt-btn">蓝色</button>
                        <button className="ning-txt-btn _green">绿色</button>
                        <button className="ning-txt-btn _orange">橙色</button>
                        <button className="ning-txt-btn _red">红色</button>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<button class="ning-btn _white">白色</button>
<button class="ning-btn _gray">灰色</button>
<button class="ning-btn _dark">黑色</button>
<button class="ning-btn _blue">蓝色</button>
<button class="ning-btn _green">绿色</button>
<button class="ning-btn _orange">橙色</button>
<button class="ning-btn _yellow">黄色</button>
<button class="ning-btn _purple">紫色</button>
<button class="ning-btn _red">红色</button>`,
                        }
                    }
                />
                <p>尺寸</p>
                <div className="example-box">
                    <div className="flex-center-box">
                        <button className="ning-btn _sm">小按钮</button>
                        <button className="ning-btn m-l-md">中按钮</button>
                        <button className="ning-btn _lg m-l-md">大按钮</button>
                        <button className="ning-line-btn _sm m-l-md">小按钮</button>
                        <button className="ning-line-btn m-l-md">中按钮</button>
                        <button className="ning-line-btn _lg m-l-md">大按钮</button>
                        <button className="ning-txt-btn _sm m-l-md">小按钮</button>
                        <button className="ning-txt-btn m-l-md">中按钮</button>
                        <button className="ning-txt-btn _lg m-l-md">大按钮</button>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<button class="ning-btn _sm">小按钮</button>
<button class="ning-btn _md">中按钮</button>
<button class="ning-btn _lg">大按钮</button>`,
                        }
                    }
                />
                <p>特效</p>
                <div className="example-box">
                    <div className="flex-center-box">
                        <button className="ning-btn _shadow">阴影3D</button>
                        <button className="ning-btn _cover m-l-md">背景滑动</button>
                        <button className="ning-btn _visional m-l-md">虚影按钮</button>
                        <button className="ning-line-btn _fill m-l-md">背景填充</button>
                        <button className="ning-line-btn _fillet m-l-md">圆角</button>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<button class="ning-btn _shadow">阴影3D</button>
<button class="ning-btn _cover">背景滑动</button>
<button class="ning-btn _visional">虚影按钮</button>
<button class="ning-line-btn _fill">背景填充</button>
<button class="ning-line-btn _fillet">圆角</button>`,
                        }
                    }
                />
                <p>非<code>{`<button>`}</code>标签，用<code>{`<a>`}</code><code>{`<span>`}</code><code>{`<div>`}</code>来模拟按钮，一定要加上<code>role="button"</code><code>tabIndex="0"</code>
                <a href="http://localhost:4000/2018/06/21/accessibility-web/" className="_blue" target="_blank">why?</a>
                </p>
                <div className="example-box">
                    <div className="flex-center-box">
                        <a role="botton" tabIndex={0} className="ning-btn">a</a>
                        <span role="botton" tabIndex={0} className="ning-btn m-l-md">span</span>
                        <label role="botton" tabIndex={0} className="ning-btn m-l-md">label</label>
                        <div role="botton" tabIndex={0} className="ning-btn m-l-md">div</div>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<a role="botton" tabIndex="0" class="ning-btn">a</a>
<span role="botton" tabIndex="0" class="ning-btn">span</span>
<label role="botton" tabIndex="0" class="ning-btn">label</label>
<div role="botton" tabIndex="0" class="ning-btn">div</div>`,
                        }
                    }
                />
                <p>禁用按钮，所有颜色的按钮皆为如下样式</p>
                <div className="example-box">
                    <div className="flex-center-box">
                        <button className="ning-btn" disabled>基础按钮</button>
                        <button className="ning-line-btn m-l-md" disabled>线框按钮</button>
                        <button className="ning-txt-btn m-l-md" disabled>文字按钮</button>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<button class="ning-btn" disabled>基础按钮</button>
<button class="ning-line-btn" disabled>线框按钮</button>
<button class="ning-txt-btn" disabled>文字按钮</button>`,
                        }
                    }
                />
            </div>
        )
    }
}

export default ConButton;