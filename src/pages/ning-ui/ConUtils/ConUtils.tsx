import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CodeBox from 'components/CodeBox/CodeBox';

class ConUtils extends React.Component {
    render() {
        return (
            <div>
                <h1>工具类<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>badge 徽标</p>
                <div className="example-box flex-row-box" id="test">
                    <span className="ning-badge">1</span>
                    <span className="ning-badge blue">12</span>
                    <span className="ning-badge green">123</span>
                    <span className="ning-badge orange">1234</span>
                    <span className="ning-badge red">12345</span>
                    <span className="ning-badge gray">123456</span>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<span class="ning-badge '' || 'blue' || 'green' || 'orange' || 'red' || 'gray'">徽标内容</span>`,
                        }
                    }
                />
                <p>tag 标签</p>
                <div className="example-box flex-row-box" id="test">
                    <span className="ning-tag">默认标签</span>
                    <span className="ning-tag blue">蓝色标签</span>
                    <span className="ning-tag green">绿色标签</span>
                    <span className="ning-tag orange">橙色标签</span>
                    <span className="ning-tag red">红色标签</span>
                    <span className="ning-tag gray">灰色标签</span>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<span class="ning-tag '' || 'blue' || 'green' || 'orange' || 'red' || 'gray'">标签内容</span>`,
                        }
                    }
                />
                <p>skeleton 骨架loading</p>
                <div className="example-box" id="test">
                    <div className="ning-skeleton" style={{height: '100px', width: '100%',}}></div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<div class="ning-skeleton">...</div>`,
                        }
                    }
                />
                <p>alert 提示</p>
                <div className="example-box" id="test">
                    <div className="ning-alert">基础提示信息</div>
                    <div className="ning-alert blue m-t-sm">蓝色提示信息</div>
                    <div className="ning-alert green m-t-sm">绿色提示信息</div>
                    <div className="ning-alert orange m-t-sm">橙色提示信息</div>
                    <div className="ning-alert red m-t-sm">红色提示信息</div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<div class="ning-alert '' || 'blue' || 'green' || 'orange' || 'red'">提示信息</div>`,
                        }
                    }
                />
                <p>notify 提示</p>
                <div className="example-box" id="test">
                    <button className="ning-btn ning-notify-trigger">基础提示</button>
                    <button className="ning-btn ning-notify-trigger m-l-md" data-theme="green">成功提示</button>
                    <button className="ning-btn ning-notify-trigger m-l-md" data-theme="orange">警告提示</button>
                    <button className="ning-btn ning-notify-trigger m-l-md" data-theme="red">错误提示</button>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `notify.init({
    text: '...',
    theme: 'red' || 'orange' || 'green' || '',
    time: 5000,
})`,
                        }
                    }
                />
                <p>prompt 提示</p>
                <div className="example-box" id="test">
                    <p className="m-b-md ning-prompt-trigger" data-prompt="{content: '这里是居左提示', location: 'left'}">这里是居左提示这里是居左提示这里是居左提示这里是居左提示这里是居左提示这里是居左提示</p>
                    <p className="m-b-md ning-prompt-trigger" data-prompt="{content: '这里是居中提示', location: 'center'}">这里是居中提示这里是居中提示这里是居中提示这里是居中提示这里是居中提示这里是居中提示这里是居中提示这里是居中提示这里是</p>
                    <p className="m-b-md ning-prompt-trigger tr" data-prompt="{content: '这里是居右提示', location: 'right'}">这里是居右提示这里是居右提示这里是居右提示这里是居右提示这里是居右提示这里是居右提示</p>
                    <button className="ning-btn ning-prompt-trigger m-r-md" data-prompt="{content: '黑色(默认)主题'}">黑色(默认)主题</button>
                    <button className="ning-btn ning-prompt-trigger m-r-md" data-prompt="{content: '蓝色主题', theme: 'blue'}">蓝色主题</button>
                    <button className="ning-btn ning-prompt-trigger m-r-md" data-prompt="{content: '绿色主题', theme: 'green'}">绿色主题</button>
                    <button className="ning-btn ning-prompt-trigger m-r-md" data-prompt="{content: '橙色主题', theme: 'orange'}">橙色主题</button>
                    <button className="ning-btn ning-prompt-trigger" data-prompt="{content: '红色主题', theme: 'red'}">红色主题</button>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<p class="ning-prompt-trigger" data-prompt="{content: '...', location: 'left', theme: 'red'}">...</p>
<p class="ning-prompt-trigger" data-prompt="{content: '...', location: 'right', theme: 'blue'}">...</p>
<button class="ning-btn ning-prompt-trigger" data-prompt="{content: '...', location: 'center', theme: 'black'}">...</button>`,
                        }
                    }
                />
                <p>分割线(可以带提示文字)</p>
                <div className="example-box flex-col-box">
                    <hr/>
                    <hr data-text="我是萌萌哒的分割线~"/>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<hr/>
<hr text="我是萌萌哒的分割线~"/>`,
                        }
                    }
                />
                <p>文字动态loading(颜色继承主体文字或自定义)</p>
                <div className="example-box flex-col-box">
                    <div dangerouslySetInnerHTML={{ __html: `<dot></dot>`}} />
                    <p className="_blue">加载中<span dangerouslySetInnerHTML={{ __html: `<dot></dot>`}} /></p>
                    <div dangerouslySetInnerHTML={{ __html: `<p className="_blue">加载中<dot className="_red"></dot></p>`}} />
                    {/*<dot></dot>
                    <p className="_blue">加载中<dot></dot></p>
                    <p className="_blue">加载中<dot className="_red"></dot></p>*/}
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<dot></dot>
<p class="_blue">加载中<dot></dot></p>
<p class="_blue">加载中<dot class="_red"></dot></p>`,
                        }
                    }
                />
            </div>
        )
    }
    componentDidMount() {}
}

export default ConUtils;