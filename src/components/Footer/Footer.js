import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <footer className="ning-row">
                <div className="last-content">
                    <span>Designed & Powerd by zongyuan.ning</span>
                    <span>Copyright© 2018 - 2019 n顾盼神飞</span>
                    <span>还不知道备案号</span>
                </div>
            </footer>
        )
    }
}

export default Footer;