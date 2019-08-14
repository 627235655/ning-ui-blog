import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className="ning-container demo-box" id="layout">
                    <h4>双飞翼 布局</h4>
                    <div className="body" id="sfy">
                        <div className="header">header</div>
                        <div className="container">
                            <div className="content">
                                主题
                            </div>
                        </div>
                        <div className="left">
                            左侧边栏
                        </div>
                        <div className="right">
                            右侧边栏
                        </div>
                        <div className="footer">footer</div>
                    </div>
                    <h4>圣杯 布局</h4>
                    <div className="body" id="sb">
                        <div className="header">header</div>
                        <div className="container">
                            <div className="content">
                                主题
                            </div>
                            <div className="left">
                                左侧边栏
                            </div>
                            <div className="right">
                                右侧边栏
                            </div>
                        </div>
                        <div className="footer">footer</div>
                    </div>
                    <h4>flex 布局</h4>
                    <div className="body" id="flex">
                        <div className="header">header</div>
                        <div className="container">
                            <div className="content">
                                主题
                            </div>
                            <div className="left">
                                左侧边栏
                            </div>
                            <div className="right">
                                右侧边栏
                            </div>
                        </div>
                        <div className="footer">footer</div>
                    </div>
                    <h4>calc 布局</h4>
                    <div className="body" id="calc">
                        <div className="header">header</div>
                        <div className="container">
                            <div className="content">
                                主题
                            </div>
                            <div className="left">
                                左侧边栏
                            </div>
                            <div className="right">
                                右侧边栏
                            </div>
                        </div>
                        <div className="footer">footer</div>
                    </div>
            </div>
        )
    }
}

export default Layout;