import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Header.scss';

const LOGO_URL: string = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/1543199721357.png'

interface IProps {
    nav_active_item: string;
    user_name: string;
    logOut: () => void;
};

class Header extends React.Component<IProps> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <header>
                <nav className="flex-center-box">
                    <Link to="/index/home" replace>
                        <img className="logo" src={LOGO_URL} alt="logo"/>
                    </Link>
                    <ul className="flex-box flex-1">
                        <li className={this.props.nav_active_item.indexOf('home') > -1 ? 'active' : ''}>
                            <Link to="/index/home" replace><i className="ning-icon icon-home"></i>Home</Link>
                        </li>
                        <li className={this.props.nav_active_item.indexOf('ning-ui') > -1 ? 'active' : ''}>
                            <Link to='/index/ning-ui/text' replace><i className="ning-icon icon-ning"></i>ning-ui</Link>
                        </li>
                        <li className={this.props.nav_active_item.indexOf('article-list') > -1 ? 'active' : ''}>
                            <Link to="/index/article-list" replace><i className="ning-icon icon-article"></i>ArticleList</Link>
                        </li>
                        <li className={this.props.nav_active_item.indexOf('time-progress') > -1 ? 'active' : ''}>
                            <Link to='/time-progress-bar' replace><i className="ning-icon icon-time"></i>TimeProgress</Link>
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
                                        <Link to="/profile">Hello，{this.props.user_name}</Link>
                                        <span className="flex-center-box" id="log_out_btn" onClick={() => this.props.logOut()}><i className="ning-icon icon-log-out"></i></span>
                                    </span>
                                ) :
                                (
                                    <span>
                                        <Link to="/login"><i className="ning-icon icon-sign-in"></i>Sign-in</Link>
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