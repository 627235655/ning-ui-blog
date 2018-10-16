import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConText extends Component {
    render() {
        return (
            <div>
                <h1>颜色及文字<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>颜色</p>
                <div className="example-box">
                    <div className="flex-row-box">
                        <span className="_white b-drak">白色</span>
                        <span className="_gray">灰色</span>
                        <span className="_dark">黑色</span>
                        <span className="_blue">蓝色</span>
                        <span className="_green">绿色</span>
                        <span className="_orange">橙色</span>
                        <span className="_red">红色</span>
                    </div>
                </div>
                <p>颜色(5阶划分)，主要使用以下颜色和其扩展，分别代表【蓝色-主题】【绿色-成功】【橙色-警告】【红色-失败】【黑灰色-文字】</p>
                <p>参考链接  <a className="_blue" href="https://material.io/guidelines/style/color.html#color-color-palette">Material Design Color Palette</a></p>
                <div className="example-box ning-row flex-row-box">
                    <div className="col-2 flex-col-box">
                        <p className="b-blue-1 p-sm _white tc">blue-1</p>
                        <p className="b-blue-2 p-sm _white tc">blue-2</p>
                        <p className="b-blue-3 p-sm _white tc">blue-3</p>
                        <p className="b-blue-4 p-sm _white tc">blue-4</p>
                        <p className="b-blue-5 p-sm _white tc">blue-5</p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-green-1 p-sm _white tc">green-1</p>
                        <p className="b-green-2 p-sm _white tc">green-2</p>
                        <p className="b-green-3 p-sm _white tc">green-3</p>
                        <p className="b-green-4 p-sm _white tc">green-4</p>
                        <p className="b-green-5 p-sm _white tc">green-5</p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-orange-1 p-sm _white tc">orange-1</p>
                        <p className="b-orange-2 p-sm _white tc">orange-2</p>
                        <p className="b-orange-3 p-sm _white tc">orange-3</p>
                        <p className="b-orange-4 p-sm _white tc">orange-4</p>
                        <p className="b-orange-5 p-sm _white tc">orange-5</p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-red-1 p-sm _white tc">red-1</p>
                        <p className="b-red-2 p-sm _white tc">red-2</p>
                        <p className="b-red-3 p-sm _white tc">red-3</p>
                        <p className="b-red-4 p-sm _white tc">red-4</p>
                        <p className="b-red-5 p-sm _white tc">red-5</p>
                    </div>
                    <div className="col-2 flex-col-box">
                        <p className="b-gray-3 p-sm _white tc">提示文字色</p>
                        <p className="b-gray p-sm _white tc">禁用灰色</p>
                        <p className="b-gray-2 p-sm _white tc">副文字色</p>
                        <p className="b-gray-1 p-sm _white tc">主文字色</p>
                        <p className="b-dark p-sm _white tc">背景黑色</p>
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
                            content: `<span className="_xs">超小字体</span>
                            <span className="_sm">小字体</span>
                            <span className="_md">正常字体</span>
                            <span className="_lg">大字体</span>
                            <span className="_xl">超大字体</span>
                            <span className="_normal">正常字体</span>
                            <span className="_bold">加粗字体</span>`,
                        }
                    }
                />
                <p>文字对齐</p>
                <div className="example-box">
                    <p className="tl b_light">文字左对齐</p>
                    <p className="tr b_light m-t-sm">文字右对齐</p>
                    <p className="tc b_light m-t-sm">文字居中对齐</p>
                    <p className="tlr b_light m-t-sm">文字左右对齐</p>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<p className="tl">文字左对齐</p>
                            <p className="tr">文字右对齐</p>
                            <p className="tc">文字居中对齐</p>
                            <p className="tlr">文字左右对齐</p>`,
                        }
                    }
                />
                <p>其他相关</p>
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
                            content: `<p className="elis">...</p>
                            <p className="elis-n">...</p>`,
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