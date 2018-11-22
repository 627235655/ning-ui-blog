import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Header.scss';
import axios from 'axios';

class Header extends Component {
    constructor () {
        super()
        this.state = {
            nav_active_item: location.pathname,
            is_login: false,
            user_name: null,
        }
        this.isSignIn();
    }

    render() {
        return (
            <header>
                <nav className="flex-box">
                    <ul className="flex-box flex-1">
                        <li className={this.state.nav_active_item === '#/home' ? 'active' : ''}><a href="#/home">Home</a></li>
                        <li className={this.state.nav_active_item === '#/ning-ui' ? 'active' : ''}><a href="#/ning-ui">Ningui</a></li>
                        <li className={this.state.nav_active_item === '#/article-list' ? 'active' : ''}><a href="#/article-list">ArticleList</a></li>
                        <li><a href="/admin.html" target="_blank">Admin</a></li>
                        <li className="flex-1 flex-end sign-box">
                            {
                            this.state.is_login ?
                            (<a href="#/profile">你好，{this.state.user_name}</a>) :
                            (<span>
                                <a href="#/login">登录</a>
                                <a href="#/login?signup=1">注册</a>
                            </span>)
                            }
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }

    isSignIn() {
        let self = this;
        axios.get('/api/isSignIn')
          .then(function (response) {
            let res = response.data;
            console.log(res)
            if (res.ststus === 500) {
                self.setState({
                    is_login: true,
                    user_name: res.data,
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default Header;