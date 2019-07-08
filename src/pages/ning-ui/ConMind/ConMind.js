import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

class ConMind extends Component {
    render() {
        return (
            <div className="flex-col-box">
                <h1>思想</h1>
                <hr/>
                <a className="_md m-b-sm" href="https://ant.design/docs/spec/introduce-cn" target="_blank">Ant Design</a>
                <ul className="style-ul m-b-sm">
                    <li className="m-b-sm">
                        「自然」确立为 Ant Design 的核心价值观
                        <a className="_xs blue m-l-sm" href="https://zhuanlan.zhihu.com/p/44809866" target="_blank">learn more</a>
                    </li>
                </ul>
                <a className="_md m-b-sm" href="https://www.zhangxinxu.com/wordpress/2015/08/semi-package-web-component-development-for-design/" target="_blank">面向设计的半封装web组件开发</a>
                <a className="_md m-b-sm" href="" target="_blank">Web components</a>
            </div>
        )
    }
}

export default ConMind;