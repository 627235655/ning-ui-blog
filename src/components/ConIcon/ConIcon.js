import React, { Component } from 'react';
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
                    	<span>icon-plus</span>
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
    componentDidMount() {
    }
}

export default ConUtils;