import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './CopyRight.scss'

interface IProps{
    createDate: string;
}

class CopyRight extends React.Component<IProps> {
    render() {
        return (
            <div className="copyright">
                <p>本文可全文转载，个人网站无需授权，只要保留原作者、出处以及文中链接即可，任何网站均可摘要聚合，商用请联系授权</p>
                <p className="_xs tr m-t-sm">--- <a href="/blog/profile" target="_blank">n顾盼神飞</a> 创作于 {this.props.createDate}</p>
            </div>
        )
    }
}

export default CopyRight;