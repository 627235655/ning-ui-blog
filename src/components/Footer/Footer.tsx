import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer className="ning-row">
                <div className="last-content">
                    <span>Designed & Powerd by zongyuan.ning</span>
                    <span>Copyright© 2019 - 2019 n顾盼神飞</span>
                    <span>蜀 ICP 备 19016370 号</span>
                </div>
            </footer>
        )
    }
}

export default Footer;