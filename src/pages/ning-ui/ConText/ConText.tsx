import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CodeBox from 'components/CodeBox/CodeBox';

interface States{
    is_hover: boolean;
}

interface Props{
    str: string;
    hover_str: string;
}

class HoverSpan extends React.Component<Props, States> {
    constructor(props: any) {
        super(props)
        this.state = {
            is_hover: false,
        }
    }

    onMouseOver = () => {
        this.setState({
            is_hover: !this.state.is_hover,
        });
    }

    onMouseOut = () => {
        this.setState({
            is_hover: !this.state.is_hover,
        });
    }

    render() {
        return (
                <span className="p-sm" onMouseOver={() => this.onMouseOver()} onMouseOut={() => this.onMouseOut()}>
                    <span className={this.state.is_hover ? "m-r-sm" : ''}>{this.props.str}</span>
                    <span className='_xs'>{this.state.is_hover ? this.props.hover_str : ''}</span>
                </span>
                )
    }
}

class ConText extends React.Component {
    render() {
        return (
            <div>
                <h1>颜色及文字<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>颜色</p>
                <div className="example-box">
                    <div className="flex-row-box">
                        <span className="_white b-dark"><HoverSpan str="白色" hover_str="#fff" /></span>
                        <span className="_gray"><HoverSpan str="灰色" hover_str="#9FA9B7" /></span>
                        <span className="_dark"><HoverSpan str="黑色" hover_str="#394C66" /></span>
                        <span className="_blue"><HoverSpan str="蓝色" hover_str="#4284ED" /></span>
                        <span className="_green"><HoverSpan str="绿色" hover_str="#27ae60" /></span>
                        <span className="_orange"><HoverSpan str="橙色" hover_str="#ffb216" /></span>
                        <span className="_red"><HoverSpan str="红色" hover_str="#f5222d" /></span>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<span class="_white">白色</span>
<span class="_gray">灰色</span>
<span class="_dark">黑色</span>
<span class="_blue">蓝色</span>
<span class="_green">绿色</span>
<span class="_orange">橙色</span>
<span class="_red">红色</span>`
                        }
                    }
                />
                <p>颜色(5阶划分)，主要使用以下颜色和其扩展，分别代表【蓝色-主题】【绿色-成功】【橙色-警告】【红色-失败】【黑灰色-文字】</p>
                <p>参考链接  <a className="_blue" href="https://material.io/guidelines/style/color.html#color-color-palette">Material Design Color Palette</a></p>
                <div className="example-box ning-row flex-row-box">
                    <div className="col-2 flex-col-box">
                        <p className="b-blue-1 p-sm _white tc"><HoverSpan str="blue-1" hover_str="#C6DAFA" /></p>
                        <p className="b-blue-2 p-sm _white tc"><HoverSpan str="blue-2" hover_str="#A1C2F6" /></p>
                        <p className="b-blue-3 p-sm _white tc"><HoverSpan str="blue-3" hover_str="#7BA9F2" /></p>
                        <p className="b-blue-4 p-sm _white tc"><HoverSpan str="blue-4" hover_str="#5E96F0" /></p>
                        <p className="b-blue-5 p-sm _white tc"><HoverSpan str="blue-5" hover_str="#4284ED" /></p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-green-1 p-sm _white tc"><HoverSpan str="green-1" hover_str="#BEE7CF" /></p>
                        <p className="b-green-2 p-sm _white tc"><HoverSpan str="green-2" hover_str="#93D7B0" /></p>
                        <p className="b-green-3 p-sm _white tc"><HoverSpan str="green-3" hover_str="#68C690" /></p>
                        <p className="b-green-4 p-sm _white tc"><HoverSpan str="green-4" hover_str="#47BA78" /></p>
                        <p className="b-green-5 p-sm _white tc"><HoverSpan str="green-5" hover_str="#27ae60" /></p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-orange-1 p-sm _white tc"><HoverSpan str="orange-1" hover_str="#FFE8B9" /></p>
                        <p className="b-orange-2 p-sm _white tc"><HoverSpan str="orange-2" hover_str="#FFD98B" /></p>
                        <p className="b-orange-3 p-sm _white tc"><HoverSpan str="orange-3" hover_str="#FFC95C" /></p>
                        <p className="b-orange-4 p-sm _white tc"><HoverSpan str="orange-4" hover_str="#FFBE39" /></p>
                        <p className="b-orange-5 p-sm _white tc"><HoverSpan str="orange-5" hover_str="#FFB216" /></p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-red-1 p-sm _white tc"><HoverSpan str="red-1" hover_str="#FCBDC0" /></p>
                        <p className="b-red-2 p-sm _white tc"><HoverSpan str="red-2" hover_str="#FA9196" /></p>
                        <p className="b-red-3 p-sm _white tc"><HoverSpan str="red-3" hover_str="#F8646C" /></p>
                        <p className="b-red-4 p-sm _white tc"><HoverSpan str="red-4" hover_str="#F7434D" /></p>
                        <p className="b-red-5 p-sm _white tc"><HoverSpan str="red-5" hover_str="#F5222D" /></p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-border p-sm _white tc"><HoverSpan str="border" hover_str="#e2ecf4" /></p>
                        <p className="b-light p-sm _white tc"><HoverSpan str="light" hover_str="#f5f5f5" /></p>
                        <p className="b-gray p-sm _white tc"><HoverSpan str="gray" hover_str="#9FA9B7" /></p>
                        <p className="b-dark p-sm _white tc"><HoverSpan str="dark" hover_str="#394C66" /></p>
                    </div>
                </div>
                <p>尺寸</p>
                <div className="example-box">
                    <div className="flex-center-box">
                        <span className="_blue _xs">小字体</span>
                        <span className="_blue _sm m-l-md">基础字体</span>
                        <span className="_blue _md m-l-md">中字体</span>
                        <span className="_blue _lg m-l-md">大字体</span>
                        <span className="_blue _xl m-l-md">超大字体</span>
                        <span className="_blue _normal _md m-l-md">正常字体</span>
                        <span className="_blue _bold _md m-l-md">加粗字体</span>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<span class="_xs">超小字体</span>
<span class="_sm">小字体</span>
<span class="_md">正常字体</span>
<span class="_lg">大字体</span>
<span class="_xl">超大字体</span>
<span class="_normal">正常字体</span>
<span class="_bold">加粗字体</span>`,
                        }
                    }
                />
                <p>文字对齐</p>
                <div className="example-box">
                    <p className="tl p-sm _white b-blue-3">文字左对齐</p>
                    <p className="tr p-sm _white b-blue-3 m-t-sm">文字右对齐</p>
                    <p className="tc p-sm _white b-blue-3 m-t-sm">文字居中对齐</p>
                    <p className="tlr p-sm _white b-blue-3 m-t-sm">文字左右对齐</p>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<p class="tl">文字左对齐</p>
<p class="tr">文字右对齐</p>
<p class="tc">文字居中对齐</p>
<p class="tlr">文字左右对齐</p>`,
                        }
                    }
                />
                <p>文字省略</p>
                <div className="example-box">
                    <p className="elis" style={{width: '500px'}}>单行省略单行省略单行省略单行省略单行省略单行省略单行省略单行省略单行省略单行省略
                    单行省略单行省略单行省略单行省略单行省略</p>
                    <p className="elis-2 m-t-sm" style={{width: '500px', "WebkitBoxOrient": "vertical"}}>多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略
                    多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略</p>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<p class="elis">...</p>
<p class="elis-2">...</p>`,
                        }
                    }
                />
                <p>react项目中，<code>-webkit-box-orient: vertical;</code>失效。
                <br/>所以我们需要在需要超出加省略号的标签上加一个行内样式：<code>style="WebkitBoxOrient": "vertical"</code>。</p>
            </div>
        )
    }
}

export default ConText;