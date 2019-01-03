import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConLayout extends Component {
    render() {
        return (
            <div>
                <h1>布局<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p><code>className="flex-box"</code> flex盒子</p>
                <div className="example-box flex-box">
                    <div className="layout-item-1"></div>
                    <div className="layout-item-2"></div>
                    <div className="layout-item-3"></div>
                </div>
                <p><code>className="flex-row-box"</code> 横向布局</p>
                <div className="example-box flex-row-box">
                    <div className="layout-item-1"></div>
                    <div className="layout-item-2"></div>
                    <div className="layout-item-3"></div>
                </div>
                <p><code>className="flex-col-box"</code> 竖向布局</p>
                <div className="example-box flex-col-box">
                    <div className="layout-item-1 m-b-sm"></div>
                    <div className="layout-item-2 m-b-sm"></div>
                    <div className="layout-item-3"></div>
                </div>
                <p><code>className="flex-center-box"</code> 垂直居中布局</p>
                <div className="example-box flex-center-box">
                    <div className="layout-item-1"></div>
                    <div className="layout-item-2 m-l-sm"></div>
                    <div className="layout-item-3 m-l-sm"></div>
                </div>
                <p><code>className="flex-allcenter-box"</code> 水平垂直居中布局</p>
                <div className="example-box flex-allcenter-box">
                    <div className="layout-item-1"></div>
                    <div className="layout-item-2 m-l-sm"></div>
                    <div className="layout-item-3 m-l-sm"></div>
                </div>
                <p><code>className="con-box"</code> 用于section的样式</p>
                <div className="example-box">
                    <div className="con-box b-blue-1">con-box</div>
                </div>
                <p><code>className="ning-container"</code> 页面主题的样式，一般一个页面只应用一次</p>
                <div className="example-box">
                    <div className="ning-container b-blue-1">ning-container</div>
                </div>
            </div>
        )
    }
    componentDidMount() {}
}

export default ConLayout;