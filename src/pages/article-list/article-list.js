import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import './article-list.scss';
import axios from 'axios';
import paginator from 'assets/ning-ui/js/paginator';

class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tagList: [],
            tagTotalCount: 0,
            articleList: [],
            currentPage: 1,
            pageSize: 12,
            totalCount: 0,
            item: {},
            filter: {
                articleTags: [],
            }
        }
    }

    render() {
        let el_tag_list = this.state.tagList.map((v, i, a) =>{
            return (
                <div key={i} className="ning-form-item tag-item p-0">
                    <div className="checkbox-wrap">
                        <span>
                            <input type="checkbox" value={v.tagName} id={v._id} />
                            <span className="virtual-checkbox"></span>
                            <label htmlFor={v._id}>{v.tagName}</label>
                        </span>
                    </div>
                </div>
            )
        })
        let el_article_list = this.state.articleList.map((v, i, a) => {
            return (
                <li key={v._id} className="col-4 p-md">
                    <Link  to={`/index/article-detail/${v._id}`} className="article-list-item">
                        <div className="cover" style={{backgroundImage: `url(${v.thumbnailUrl})`}}>
                            <p className="title elis-2" style={{"WebkitBoxOrient": "vertical"}}>{v.articleName}</p>
                        </div>
                        <div className="content-wrap">
                            <div className="p-t-md p-b-md">
                                <p className="elis-2" style={{"WebkitBoxOrient": "vertical"}}>{v.articleSummary}</p>
                            </div>
                            <div className="flex-row-box flex-center-box">
                                <p>
                                {
                                    v.articleTags.map((v2, i2, a2) => {
                                        return <span key={i2} className="tag-item">{v2}</span>
                                    })
                                }
                                </p>
                                <span className="_xs _light">{new Date(v.createDate).Format().substr(0,10).replace('-', '年 ').replace('-', '月 ') + '日'}</span>
                            </div>
                        </div>
                    </Link>
                </li>
            )
        })
        return (
            <div id="article_list">
                <div className="ning-container flex-box">
                    <ul className="article-list-aside">
                        { el_tag_list }
                    </ul>
                    <div className="article-list-container">
                        <ul className="ning-row">
                            { el_article_list }
                        </ul>
                        <div className="ning-paginator" id="article_list_paginator">
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // goDetail = (_id) => {
    //     console.log(this.props)
    //     this.props.history.push({
    //         path: '/article-detail',
    //         state: {
    //             _id: _id
    //         }
    //     })
    // }

    checkActive = (which_one) => {
        this.setState({
            which_active: which_one,
        })
    }

    getArticleList = (currentPage) => {
        let self = this;
        self.setState({
            currentPage,
        })
        let data = {
            currentPage: self.state.currentPage,
            pageSize: self.state.pageSize,
            filter: self.state.filter,
        }
        axios.get('/api/getArticleList', {
                params: data
            })
            .then(function(response) {
                let res = response.data;
                if (res.status === 200) {
                    if (self.state.currentPage > 1 && res.data.list.length === 0) {
                        self.state.currentPage--;
                        self.setState({
                            currentPage: self.state.currentPage
                        })
                        self.getArticleList(self.state.currentPage);
                    }
                    self.setState({
                        articleList: res.data.list,
                        totalCount: res.data.totalCount
                    })
                    let params = {
                        element: document.querySelector('#article_list_paginator'),
                        current_page: self.state.currentPage,
                        total_count: self.state.totalCount,
                        page_size: self.state.pageSize,
                        cb: self.getArticleList,
                    }
                    paginator.init(params)
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    getTagList() {
        let self = this;
        axios.get('/api/getTagList')
            .then(function(response) {
                let res = response.data;
                if (res.status === 200) {
                    self.setState({
                        tagList: res.data.list,
                        totalCount: res.data.tagTotalCount
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getArticleList(this.state.currentPage);
        this.getTagList(this.state.currentPage);
    }
}

export default ArticleList;