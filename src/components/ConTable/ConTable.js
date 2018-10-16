import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConTable extends Component {
    render() {
        return (
            <div>
                <h1>表格<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>格子表格</p>
                <div className="example-box flex-col-box">
                    <table className="ning-border-table">
                        <thead>
                            <tr>
                                <th>表头一</th>
                                <th>表头二</th>
                                <th>表头三</th>
                                <th>表头四</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>表头一</td>
                                <td>表头二</td>
                                <td>表头三</td>
                                <td>表头四</td>
                            </tr>
                            <tr>
                                <td>表头一</td>
                                <td>表头二</td>
                                <td>表头三</td>
                                <td>表头四</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<table className="ning-border-table"></table>`,
                        }
                    }
                />
                <p>行表格</p>
                <div className="example-box flex-col-box">
                    <table className="ning-border-table _row">
                        <thead>
                            <tr>
                                <th>表头一</th>
                                <th>表头二</th>
                                <th>表头三</th>
                                <th>表头四</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>表头一</td>
                                <td>表头二</td>
                                <td>表头三</td>
                                <td>表头四</td>
                            </tr>
                            <tr>
                                <td>表头一</td>
                                <td>表头二</td>
                                <td>表头三</td>
                                <td>表头四</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<table className="ning-border-table _row"></table>`,
                        }
                    }
                />
                <p>no-data表格</p>
                <div className="example-box flex-col-box">
                    <table className="ning-border-table w-100">
                        <thead>
                            <tr>
                                <th>表头一</th>
                                <th>表头二</th>
                                <th>表头三</th>
                                <th>表头四</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="no-data" colSpan="99"></td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<table className="ning-border-table w-100">
                                            <thead></thead>
                                            <tbody>
                                                <tr><td className="no-data" colSpan="99"></td></tr>
                                            </tbody>
                                        </table>`,
                        }
                    }
                />
                <p>fixed-header表格（双div+双table模拟，为最外层设定高度即可）</p>
                <div className="example-box flex-col-box">
                    <div className="ning-fixed-header-table" style={{height: 120}}>
                        <table className="ning-border-table">
                            <thead>
                                <tr>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="scroll-y">
                            <table className="ning-border-table">
                                <tbody>
                                    <tr>
                                        <td>表头一</td>
                                        <td>表头二</td>
                                        <td>表头三</td>
                                        <td>表头四</td>
                                    </tr>
                                    <tr>
                                        <td>表头一</td>
                                        <td>表头二</td>
                                        <td>表头三</td>
                                        <td>表头四</td>
                                    </tr>
                                    <tr>
                                        <td>表头一</td>
                                        <td>表头二</td>
                                        <td>表头三</td>
                                        <td>表头四</td>
                                    </tr>
                                    <tr>
                                        <td>表头一</td>
                                        <td>表头二</td>
                                        <td>表头三</td>
                                        <td>表头四</td>
                                    </tr>
                                    <tr>
                                        <td>表头一</td>
                                        <td>表头二</td>
                                        <td>表头三</td>
                                        <td>表头四</td>
                                    </tr>
                                    <tr>
                                        <td>表头一</td>
                                        <td>表头二</td>
                                        <td>表头三</td>
                                        <td>表头四</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-fixed-header-table" style={{height: 120}}>
                                        <table className="ning-border-table">
                                            <thead>...</thead>
                                        </table>
                                        <div className="scroll-y">
                                            <table className="ning-border-table">
                                                <tbody>...</tbody>
                                            </table>
                                        </div>
                                    </div>`,
                        }
                    }
                />
                <p>scroll-x表格（div+table模拟，为外层div加宽度即可，不加则为js计算的parent Element 的宽度，即100%父元素宽度）</p>
                <div className="example-box flex-col-box">
                    <div className="ning-scroll-x-table">
                        <table className="ning-border-table">
                            <thead>
                                <tr>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                    <th>表头一</th>
                                    <th>表头二</th>
                                    <th>表头三</th>
                                    <th>表头四</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                </tr>
                                <tr>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                    <td>表头一</td>
                                    <td>表头二</td>
                                    <td>表头三</td>
                                    <td>表头四</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-scroll-x-table" style={{height: 120}}>
                                        <table className="ning-border-table">
                                            <thead>...</thead>
                                            <tbody>...</tbody>
                                        </table>
                                    </div>`,
                        }
                    }
                />
                <p>优化：</p>
                <ul className="style-ul">
                    <li>移动上去滚动条出现，移出消失</li>
                </ul>
            </div>
        )
    }
    componentDidMount() {
    }
}

export default ConTable;