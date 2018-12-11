import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { a } from 'react-router-dom';
import './Header.scss';

const LOGO_URL = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/1543199721357.png'

class Header extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <header>
                <nav className="flex-center-box">
                    <a href="#/index/home">
                        <img className="logo" src={LOGO_URL} alt="logo"/>
                    </a>
                    <ul className="flex-box flex-1">
                        <li className={this.props.nav_active_item === '/index/home' ? 'active' : ''}>
                            <a href="#/index/home"><i className="ning-icon icon-home"></i>Home</a>
                        </li>
                        <li className={this.props.nav_active_item === '/index/ning-ui' ? 'active' : ''}>
                            <a href="#/index/ning-ui"><i className="ning-icon icon-ning"></i>ning-ui</a>
                        </li>
                        <li className={this.props.nav_active_item === '/index/article-list' ? 'active' : ''}>
                            <a href="#/index/article-list"><i className="ning-icon icon-article"></i>ArticleList</a>
                        </li>
                        { this.props.user_name &&
                            <li>
                                <a href="/admin.html" target="_blank"><i className="ning-icon icon-admin"></i>Admin</a>
                            </li>
                        }
                        <li className="flex-1 flex-end sign-box">
                            {
                                this.props.user_name ?
                                (
                                    <span className="flex-center-box">
                                        <a href="#/index/profile">Hello，{this.props.user_name}</a>
                                        <span className="flex-center-box" id="log_out_btn" onClick={() => this.props.logOut()}><i className="ning-icon icon-log-out"></i></span>
                                    </span>
                                ) :
                                (
                                    <span>
                                        <a href="#/login"><i className="ning-icon icon-sign-in"></i>Sign-in</a>
                                        <a href="#/login?signup=1"><i className="ning-icon icon-sign-up"></i>Sign-up</a>
                                    </span>
                                )
                            }
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;