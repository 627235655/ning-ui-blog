import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import './article-detail.scss';
import util from 'assets/js/util';
import axios from 'axios';
import marked from 'marked'
import hljs from 'highlight.js'
import CommentApp from 'components/CommentApp/CommentApp'
import CopyRight from 'components/CopyRight/CopyRight'
import TagLink from 'components/TagLink/TagLink'
import ArticleCatalogue from 'components/ArticleCatalogue/ArticleCatalogue'


class Catalogue {
	init = (selector) => {
		let node_list = [];
		let h_list = document.querySelectorAll(`${selector} h3, ${selector} h4`);
		h_list.length > 0 && h_list.forEach((v, i) => {
			if (v.nodeName === 'H3') {
				let obj = {
					innerText: v.childNodes[1].nodeValue,
					id: v.childNodes[0].id,
					childNodes: [],
				}
				node_list.push(obj);
			}
			if (v.nodeName === 'H4') {
				let obj = {
					innerText: v.childNodes[1].nodeValue,
					id: v.childNodes[0].id,
					childNodes: [],
				}
				if (node_list.length > 0) {
					node_list[node_list.length - 1].childNodes.push(obj);
				} else {
					node_list.push(obj);
				}
			}
		})
		return node_list;
	}
}
let catalogue = new Catalogue();

class DetialTool extends Component {
	constructor(props) {
		super(props)
		this.state = {
			detail_tool: null,
			top: null,
            left: null,
		}
	}

	componentDidMount() {
		let detail_tool = document.querySelector('.detail-tool'),
			top = util.getElOffset(detail_tool).top,
			left = util.getElOffset(detail_tool).left;
    	this.setState({
    		detail_tool,
    		top,
            left,
    	}, () => {
			window.addEventListener('scroll', this.handleScroll, false)
    	});
	}

	handleScroll = () => {
		let detail_tool = this.state.detail_tool,
			top = this.state.top,
			left = this.state.left,
			doc = document.body.scrollTop ? document.body : document.documentElement,
        	show_model = (doc.scrollTop - top) > 0;
        if (show_model) {
        	let style = {
        		position: 'fixed',
        		left: left,
        	}
        	Object.assign(detail_tool.style, style);
        } else {
        	let style = {
        		position: 'absolute',
        		left: '0',
        	}
        	Object.assign(detail_tool.style, style);
        }
	}

	componentWillUnmount() {
		window.onscroll = '';
	}

	render() {
		return(
				<div className="detail-tool">
					<div className="detail-tool-item ning-prompt-trigger" data-prompt="{content: '喜欢就点个赞吧~', theme: 'blue'}">
						<i className="ning-icon icon-heart"></i>
					</div>
					<div className="detail-tool-item ning-prompt-trigger" data-prompt="{content: '点击我，交流探讨下呢~', theme: 'blue'}">
						<a href="#comment_app">
							<i className="ning-icon icon-comment"></i>
						</a>
					</div>
					<div className="detail-tool-item ning-prompt-trigger" data-prompt="{content: '分享到微博吧~', theme: 'green'}">
						<i className="ning-icon icon-weibo"></i>
					</div>
					<div className="detail-tool-item ning-prompt-trigger" data-prompt="{content: '分享到微信吧~', theme: 'green'}">
						<i className="ning-icon icon-wechat"></i>
					</div>
				</div>
			)
	}
}

class ArticleDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			_id: this.props.match.params.id,
			articleDetail: {},
            articleList: [],
            catalogue_list:[],
		}
	}

	componentWillMount() {
	    marked.setOptions({
	      	highlight: code => hljs.highlightAuto(code).value
	    })
  	}

	render() {
		let el_article_list = this.state.articleList.map((v, i, a) => {
            return (
                <li key={i} className="blog-list-item col-6">
					<Link to={`/index/article-detail/${v._id}`}>
						<span className="title elis" style={{"WebkitBoxOrient": "vertical"}}>《{v.articleName}》</span>
					</Link>
				</li>
            )
        })
		let data = this.state.articleDetail;
		if (JSON.stringify(data) === "{}") {
			return null
		} else {
			return (
				<div id="article_detail" className="ning-container p-md">
					<DetialTool />
					<div className="article-detail-wrap">
		                <div className="article_preview-header" style={{backgroundImage: `url(${data.thumbnailUrl})`}}>
		                    <h2 className="article_preview-title">{ data.articleName }</h2>
		                	<p className="article_preview-summary flex-center-box">{ data.articleSummary }</p>
		                	<p className="article_preview-header_footer">
			                	{ data.articleTags.length > 0 &&
				                    <span className="article_preview-tags flex-center-box">
				                        <i className="ning-icon icon-tag m-r-xs"></i>标签：
				                        {
				                        	data.articleTags.map((v, i, a) => {
				                        		return `【${v}】`
				                        	})
				                    	}
				                    </span>
				                }
	                			<span className="m-l-md flex-center-box"><i className="ning-icon icon-reading m-r-xs"></i>阅读数： { data.readCount || '-' }</span>
	                			<span className="m-l-md flex-center-box"><i className="ning-icon icon-heart m-r-xs"></i>点赞： { data.likeCount || '-' }</span>
		                		<span className="m-l-md flex-center-box"><i className="ning-icon icon-count m-r-xs"></i>字数：{ data.articleContentLength || '-' }</span>
	                			<span className="m-l-md flex-center-box"><i className="ning-icon icon-time m-r-xs"></i>阅读时长：{ Math.ceil(data.articleContentLength / 400) } min</span>
		                		<span className="m-l-md flex-center-box"><i className="ning-icon icon-date m-r-xs"></i>日期：{ new Date(data.createDate).Format().substr(0,10).replace('-', '年 ').replace('-', '月 ') + '日' } </span>
	                		</p>
		                </div>
		                <div className="m-b-lg" id="articleContentResult" dangerouslySetInnerHTML={{ __html: marked(data.articleContentResult) }} />
		                {
		                	this.state.catalogue_list.length > 0 &&
		                	<ArticleCatalogue
			                	catalogue_list={this.state.catalogue_list}
			                />
		                }
		                <CopyRight
		                	createDate={new Date(data.createDate).Format()}
		                />
	                	<h4 className="tc m-t-md m-b-md"><span>相关文章</span></h4>
	                	<ul className="blog-list ning-row">
	                		{ el_article_list }
	                	</ul>
		                <CommentApp articleId={data._id} />
					</div>
	            </div>
			)
		}

	}

	componentDidMount() {
		this.getArticleDetail();
		this.getArticleList();


	}

	getArticleDetail = () => {
		let self = this;
		let data = {
			_id: this.state._id,
		}
		axios.get('/api/getArticleDetail', {
				params: data
			})
			.then(function(response) {
				let res = response.data;
				if (res.status === 200) {
					self.setState({
						articleDetail: res.data,
					}, () => {
						self.setState({
							catalogue_list: catalogue.init('#articleContentResult'),
						})
					})
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	getArticleList = () => {
        let self = this;
        let data = {
            currentPage: 1,
            pageSize: 4,
        }
        console.log(data)
        axios.get('/api/getArticleList', {
                params: data
            })
            .then(function(response) {
                let res = response.data;
                if (res.status === 200) {
                    self.setState({
                        articleList: res.data.list,
                        totalCount: res.data.totalCount
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default ArticleDetail;