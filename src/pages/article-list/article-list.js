import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './article-list.scss';
import axios from 'axios';
import paginator from 'assets/ning-ui/js/paginator';
import ArticleItem from 'components/ArticleItem/ArticleItem'

const URL_PARAMS_GAP = '&';

class ArticleList extends Component {
    constructor(props) {
        super(props)
        let articleTags = props.location.search ? this.getUrlParams(this.props.location.search) : [];
        this.state = {
            dateList: [],
            tagList: [],
            tagTotalCount: 0,
            articleList: [],
            currentPage: 1,
            pageSize: 12,
            totalCount: 0,
            all_total: 0,
            item: {},
            filterType: 'tag',
            filter: {
                articleTags,
                createDates: [],
            }
        }
    }

    getUrlParams = (search) => {
        return search.split('?')[1].split('=')[1].split(URL_PARAMS_GAP).map((v, i, a) => { return decodeURIComponent(v)});
    }

    componentDidMount() {
        this.getTagList();
        this.getDateList();
        this.initPage(this.props);
    }

    initPage(props) {
        let search = props.location.search;
        if (search) {
            if (search.indexOf('tagName') > -1) {
                this.state.filterType = 'tag'
                this.state.filter.articleTags = this.getUrlParams(search)
                this.state.filter.createDates = [];
            }
            if (search.indexOf('createDates') > -1) {
                this.state.filterType = 'date'
                this.state.filter.createDates = this.getUrlParams(search)
                this.state.filter.articleTags = [];
            }
        } else {
            this.state.filter.articleTags = [];
            this.state.filter.createDates = [];
        }
        this.setState({
            filterType: this.state.filterType,
            filter: this.state.filter,
        },() => {
            this.getArticleList()
        })
    }

    componentWillReceiveProps(nextProps) {
        this.initPage(nextProps)
    }

    render() {
        let summary_config = {
            css: '包含 css，css3',
        }
        let el_tag_list = this.state.tagList.map((v, i, a) =>{
            return (
                <span key={i} className={"tag-item " + (this.state.filter.articleTags.includes(v.tagName) ? 'active' : '')} onClick={() => this.setTagList(v.tagName)}>
                        <span className="num">{v.articleNum > 99 ? '99+' : v.articleNum}</span>
                        <span data-prompt={`{content: ${summary_config[v.tagName] || ''}, theme: 'blue'}`} className="txt ning-prompt-trigger">{v.tagName}</span>
                </span>
            )
        })
        let el_article_list;
        if (this.state.articleList.length === 0) {
            el_article_list = (<p className="no-data"></p>)
        } else {
            el_article_list = this.state.articleList.map((v, i, a) => {
                return (
                    <li key={v._id} className="col-3 p-md">
                        <ArticleItem
                            detail={v}
                            history={this.props.history}
                        />
                    </li>
                )
            })
        }
        let el_date_list = this.state.dateList.map((v, i, a) =>{
            return (
                <span key={i} className={"time-item " + (this.state.filter.createDates.includes(v.createDate) ? 'active' : '')} onClick={() => this.setDateList(v.createDate)}>
                    <i className="ning-icon icon-time"></i>
                    <span className="txt">{v.createDate}</span>
                    <span className="num">{v.articleNum}</span>
                </span>
            )
        })
        return (
            <div id="article_list">
                <div className="ning-container flex-box p-lg">
                    <div className="article-list-filter">
                        {
                            this.state.filterType === 'tag' &&
                            <div>
                                <span className={"tag-item " + (this.state.filter.articleTags.length === 0 && 'active')} onClick={() => this.setTagList()}>
                                    <span className="num">{this.state.all_total ? (this.state.all_total > 99 ? '99+' : this.state.all_total) : '++'}</span>
                                    <span className="txt">全部好文</span>
                                </span>
                                { el_tag_list }
                            </div>
                        }
                        {
                            this.state.filterType === 'date' &&
                            <div>
                                <span className={"time-item year " + (this.state.filter.createDates.length === 0 && 'active')} onClick={() => this.setDateList()}>
                                    <i className="ning-icon icon-time"></i>
                                    <span className="txt">全部好文</span>
                                    <span className="num">{this.state.all_total ? (this.state.all_total > 99 ? '99+' : this.state.all_total) : '++'}</span>
                                </span>
                                { el_date_list }
                            </div>
                        }
                        <span className="filter-type-handle">
                            筛选类型：
                            <span className={"flex-center-box item " + (this.state.filterType === 'tag' && 'active')} onClick={() => this.setFilterType('tag')}>
                                <i className={"ning-icon icon-tag m-r-xs"}></i>
                                标签
                            </span>
                            <span className={"flex-center-box item " + (this.state.filterType === 'date' && 'active')} onClick={() => this.setFilterType('date')}>
                                <i className="ning-icon icon-date m-r-xs"></i>
                                时间
                            </span>
                        </span>
                    </div>
                    <ul className="ning-row">
                        { el_article_list }
                    </ul>
                    <div className="ning-paginator p-l-md p-r-md" id="article_list_paginator">
                    </div>
                </div>
            </div>
        )
    }

    setFilterType(type) {
        this.state.filterType = type,
        this.setState({
            filter: this.state.filter,
        })
    }

    setTagList = (tag) => {
        let articleTags = this.state.filter.articleTags,
            index;
        if (!tag) { // 全选
            articleTags = [];
            this.props.history.replace(`/index/article-list`)
        } else {
            index = articleTags.indexOf(tag);
            if (index > -1) {
                articleTags.splice(index, 1);
            } else {
                articleTags.push(tag)
            }
            if (articleTags.length === 0) {
                this.props.history.replace(`/index/article-list`)
            } else {
                this.props.history.replace(`/index/article-list?tagName=${articleTags.join(URL_PARAMS_GAP)}`)
            }
        }
    }

    setDateList = (date) => {
        let createDates = this.state.filter.createDates,
            index;
        if (!date) { // 全选
            createDates = [];
            this.props.history.replace(`/index/article-list`)
        } else {
            index = createDates.indexOf(date);
            if (index > -1) {
                createDates.splice(index, 1);
            } else {
                createDates.push(date)
            }
            if (createDates.length === 0) {
                this.props.history.replace(`/index/article-list`)
            } else {
                this.props.history.replace(`/index/article-list?createDates=${createDates.join(URL_PARAMS_GAP)}`)
            }
        }
    }

    getMonthFirstDay = (date) => {
        let y = date.getFullYear();
        let m = date.getMonth();
        return new Date(y, m, 1)
    }

    getMonthLastDay = (date) => {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        return new Date(y, m, 0)
    }

    getArticleList = (currentPage) => {
        let self = this;
        currentPage && self.setState({
            currentPage,
        })
        let data = {
            currentPage: self.state.currentPage,
            pageSize: self.state.pageSize,
            filter: Object.assign({}, self.state.filter),
        }
        if (data.filter.createDates.length > 0) {
            let new_arr = []
            data.filter.createDates.map((v, i) => {
                new_arr.push(this.getMonthFirstDay(new Date(v + '-01')).getTime())
            })
            new_arr = new_arr.sort();
            let startDate = new Date(new_arr[0]);
            let endDate = this.getMonthLastDay(new Date(new_arr.pop()));
            data.filter.createDates = [startDate.Format(), endDate.Format()]
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
                        totalCount: res.data.totalCount,
                        all_total: self.state.filter.articleTags.length === 0 ? res.data.totalCount : self.state.all_total,
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

    getDateList = () => {
        let self = this;
        axios.get('/api/getDateList')
            .then(function(response) {
                let res = response.data;
                if (res.status === 200) {
                    self.setState({
                        dateList: res.data.list,
                    })
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
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default ArticleList;