import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';
import './ConAnimation.scss'

class ConAnimation extends Component {
    render() {
        return (
            <div className="con-animation">
                <h1>动画<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>简单易用的 css 小动画</p>
                <div className="example-box flex-box" id="test">
                	<div className="icon-box">
                    	<ul className="ning-anim anim-loading-1">
                            <li className="anim-loading-1-item"></li>
                            <li className="anim-loading-1-item"></li>
                            <li className="anim-loading-1-item"></li>
                            <li className="anim-loading-1-item"></li>
                            <li className="anim-loading-1-item"></li>
                            <li className="anim-loading-1-item"></li>
                        </ul>
                    	<span>anim-loading-1</span>
                	</div>
                    <div className="icon-box">
                        <ul className="ning-anim anim-loading-2">
                            <li className="anim-loading-2-item"></li>
                            <li className="anim-loading-2-item"></li>
                            <li className="anim-loading-2-item"></li>
                            <li className="anim-loading-2-item"></li>
                        </ul>
                        <span>anim-loading-2</span>
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

export default ConAnimation;