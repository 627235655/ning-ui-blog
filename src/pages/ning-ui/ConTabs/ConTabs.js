import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConTabs extends Component {
    render() {
        return (
            <div>
                <h1>标签页<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>默认样式</p>
                <div className="example-box">
                    <div className="ning-tabs">
                        <ul className="ning-tabs_nav">
                            <li className="ning-tabs_nav-item">标签页一</li>
                            <li className="ning-tabs_nav-item active">标签页二</li>
                            <li className="ning-tabs_nav-item">标签页三</li>
                            <li className="ning-tabs_nav-item disabled">禁用标签页</li>
                        </ul>
                        <ul className="ning-tabs_body">
                            <li>标签页内容一</li>
                            <li>标签页内容二</li>
                            <li>标签页内容三</li>
                        </ul>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-tabs">
    <ul className="ning-tabs_nav">
        <li className="ning-tabs_nav-item {active || disabled}">标签页一</li> * n
    </ul>
    <ul className="ning-tabs_body">
        <li>标签页内容一</li> * n
    </ul>
</div>`,
                        }
                    }
                />
                <p>文字样式</p>
                <div className="example-box">
                    <div className="ning-tabs">
                        <ul className="ning-tabs_nav text">
                            <li className="ning-tabs_nav-item">标签页一</li>
                            <li className="ning-tabs_nav-item">标签页二</li>
                            <li className="ning-tabs_nav-item active">标签页三</li>
                            <li className="ning-tabs_nav-item disabled">禁用标签页</li>
                        </ul>
                        <ul className="ning-tabs_body">
                            <li>标签页内容一</li>
                            <li>标签页内容二</li>
                            <li>标签页内容三</li>
                        </ul>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-tabs text">
    <ul className="ning-tabs_nav text">
        <li className="ning-tabs_nav-item {active || disabled}">标签页一</li> * n
    </ul>
    <ul className="ning-tabs_body">
        <li>标签页内容一</li> * n
    </ul>
</div>`,
                        }
                    }
                />
            </div>
        )
    }
    componentDidMount() {}
}

export default ConTabs;