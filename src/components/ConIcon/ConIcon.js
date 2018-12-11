import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConUtils extends Component {
    render() {
        return (
            <div>
                <h1>图标<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>单元素</p>
                <div className="example-box flex-box" id="test">
                	<div className="icon-box">
                    	<i className="ning-icon icon-plus"></i>
                    	<span>icon-plus</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-minus"></i>
                    	<span>icon-minus</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-asterisk"></i>
                    	<span>icon-asterisk</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-menu"></i>
                    	<span>icon-menu</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-heart"></i>
                    	<span>icon-heart</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-star"></i>
                    	<span>icon-star</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-search"></i>
                    	<span>icon-search</span>
                	</div>
                	<div className="icon-box">
                    	<i className="ning-icon icon-list"></i>
                    	<span>icon-list</span>
                	</div>
                    <div className="icon-box">
                        <i className="ning-icon icon-person"></i>
                        <span>icon-person</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-email"></i>
                        <span>icon-email</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-phone"></i>
                        <span>icon-phone</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-password"></i>
                        <span>icon-password</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-transfer"></i>
                        <span>icon-transfer</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-prev"></i>
                        <span>icon-prev</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-next"></i>
                        <span>icon-next</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-home"></i>
                        <span>icon-home</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-ning"></i>
                        <span>icon-ning</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-article"></i>
                        <span>icon-article</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-time"></i>
                        <span>icon-time</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-tag"></i>
                        <span>icon-tag</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-count"></i>
                        <span>icon-count</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-date"></i>
                        <span>icon-date</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-sign-in"></i>
                        <span>icon-sign-in</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-sign-up"></i>
                        <span>icon-sign-up</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-add"></i>
                        <span>icon-add</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-about"></i>
                        <span>icon-about</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-percentage"></i>
                        <span>icon-percentage</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-admin"></i>
                        <span>icon-admin</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-upload"></i>
                        <span>icon-upload</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-return"></i>
                        <span>icon-return</span>
                    </div>
                    <div className="icon-box">
                        <i className="ning-icon icon-log-out"></i>
                        <span>icon-log-out</span>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: ``,
                        }
                    }
                />
            </div>
        )
    }
    componentDidMount() {}
}

export default ConUtils;