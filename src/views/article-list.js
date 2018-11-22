import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../sass/article-list.scss';
import axios from 'axios';
import Paginator from '../libs/ning-ui/paginator';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Aside/Aside';
import Container from '../components/Container/Container';

class ArticleList extends Component {
    constructor () {
        super()
        this.state = {
            article_list: [],
            which_active: 'text',
            nav_list: [
                        {
                            text: '思想',
                            id: 'mind',
                        },
                        {
                            text: '颜色及文字',
                            id: 'text',
                        }
                    ]
        }
    }

    checkActive(which_one) {
        this.setState({
            which_active: which_one,
        })
    }

    render() {
        return (
            <div id="article_list">
                <Header/>
                <div className="ning-container flex-box">
                    <Aside
                        nav_list={this.state.nav_list}
                        which_active={this.state.which_active}
                        checkActive={this.checkActive}
                    />
                    <div className="article-list-container">
                        <ul>
                            <li className="article-list-item">
                                <img className="cover" src="../images/material-9.png" alt="../images/material-9.png" />
                                <div className="pos-r">
                                    <span className="tag">css</span>
                                    <span className="like">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-heart"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                    <span className="transfer">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-transfer"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                </div>
                                <p className="title elis">我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题</p>
                                <p className="content elis-2" style={{"WebkitBoxOrient": "vertical"}}>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
                                <div className="author-info">
                                    <div className="flex-center-box">
                                        <img className="head" src="../images/material-9.png" alt="../images/material-9.png" ></img>
                                        <span>by <span className="_blod">zongyuan.ning</span></span>
                                    </div>
                                    <span>n顾盼神飞</span>
                                </div>
                            </li>
                            <li className="article-list-item">
                                <img className="cover" src="../images/material-9.png" alt="../images/material-9.png" />
                                <div className="pos-r">
                                    <span className="tag">css</span>
                                    <span className="like">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-heart"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                    <span className="transfer">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-transfer"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                </div>
                                <p className="title">titletitle</p>
                                <p className="content">content</p>
                                <div className="author-info">
                                    <div className="flex-center-box">
                                        <img className="head" src="../images/material-9.png" alt="../images/material-9.png" ></img>
                                        <span>by <span className="_blod">zongyuan.ning</span></span>
                                    </div>
                                    <span>n顾盼神飞</span>
                                </div>
                            </li>
                            <li className="article-list-item">
                                <img className="cover" src="../images/material-9.png" alt="../images/material-9.png" />
                                <div className="pos-r">
                                    <span className="tag">css</span>
                                    <span className="like">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-heart"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                    <span className="transfer">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-transfer"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                </div>
                                <p className="title">titletitle</p>
                                <p className="content">content</p>
                                <div className="author-info">
                                    <div className="flex-center-box">
                                        <img className="head" src="../images/material-9.png" alt="../images/material-9.png" ></img>
                                        <span>by <span className="_blod">zongyuan.ning</span></span>
                                    </div>
                                    <span>n顾盼神飞</span>
                                </div>
                            </li>
                            <li className="article-list-item">
                                <img className="cover" src="../images/material-9.png" alt="../images/material-9.png" />
                                <div className="pos-r">
                                    <span className="tag">css</span>
                                    <span className="like">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-heart"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                    <span className="transfer">
                                        <span className="icon-wrap">
                                            <i className="ning-icon icon-transfer"></i>
                                        </span>
                                        <span>999</span>
                                    </span>
                                </div>
                                <p className="title">titletitle</p>
                                <p className="content">content</p>
                                <div className="author-info">
                                    <div className="flex-center-box">
                                        <img className="head" src="../images/material-9.png" alt="../images/material-9.png" ></img>
                                        <span>by <span className="_blod">zongyuan.ning</span></span>
                                    </div>
                                    <span>n顾盼神飞</span>
                                </div>
                            </li>
                        </ul>
                        <div className="ning-paginator" id="test">
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    getList(pageNo = 1) {
        let self = this;
        console.log(pageNo)
        let params = {
            element: document.querySelector('#test'),
            current_page: pageNo,
            total_count: 200,
            page_size: 10,
            cb: self.getList.bind(this),
        }
        Paginator.init(params)
    }

    componentDidMount() {
        let self = this;
        self.getList();
    }
}

// Class ArticleListContainer extends Component {
//     render() {
//         return (
//             <div>
//                 123
//             </div>
//         )
//     }
// }

// Class ArticleListContainerItem extends Component {
//     render() {
//         return (
//             <div>
//                 123
//             </div>
//         )
//     }
// }



export default ArticleList;