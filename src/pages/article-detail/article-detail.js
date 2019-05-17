import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import './article-detail.scss';
import util from 'assets/js/util';
import server from 'server/server';
import axios from 'axios';
import marked from 'marked'
import hljs from 'highlight.js'
import notify from 'assets/ning-ui/js/notify'
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
					innerText: v.childNodes[1].nodeValue || v.childNodes[1].innerText,
					id: v.childNodes[0].id,
					childNodes: [],
				}
				node_list.push(obj);
			}
			if (v.nodeName === 'H4') {
				let obj = {
					innerText: v.childNodes[1].nodeValue || v.childNodes[1].innerText,
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
					<div className="detail-tool">
						<div className="detail-tool-item" onClick={(e) => this.addAtricleLikeCount(e)}>
							<i className="ning-icon icon-heart"></i>
							{ data.likeCount ? <span className="ning-badge">{data.likeCount}</span> : null }
						</div>
						<a className="detail-tool-item"  href="#comment_app">
							<i className="ning-icon icon-comment"></i>
							{ data.commentCount ? <span className="ning-badge">{data.commentCount}</span> : null }
						</a>
						<a className="detail-tool-item"  href="https://weibo.com/5382177688/profile?topnav=1&wvr=6" target="_blank">
							<i className="ning-icon icon-weibo"></i>
						</a>
						<div className="detail-tool-item">
							<i className="ning-icon icon-wechat"></i>
						</div>
					</div>
					<div className="article-detail-wrap">
		                <div className="article_preview-header" style={{backgroundImage: `url(${data.thumbnailUrl})`}}>
		                    <h2><span className="article_preview-title">{ data.articleName }</span></h2>
		                	<p className="article_preview-summary flex-center-box"><span className="tl">{ data.articleSummary }</span></p>
		                	<p className="article_preview-header_footer">
			                	{ data.articleTags.length > 0 &&
				                    <span className="article_preview-tags flex-center-box">
				                        <i data-prompt="{content: '标签', theme: 'blue'}" className="ning-prompt-trigger ning-icon icon-tag m-r-xs"></i>:
				                        {
				                        	data.articleTags.map((v, i, a) => {
				                        		return `【${v}】`
				                        	})
				                    	}
				                    </span>
				                }
	                			<span className="m-l-md flex-center-box"><i data-prompt="{content: '阅读量', theme: 'blue'}" className="ning-prompt-trigger ning-icon icon-reading m-r-xs"></i>:   { data.readCount || '-' }</span>
	                			<span className="m-l-md flex-center-box"><i data-prompt="{content: '点赞数，thx~', theme: 'blue'}" className="ning-prompt-trigger ning-icon icon-heart m-r-xs"></i>:   { data.likeCount || '-' }</span>
		                		<span className="m-l-md flex-center-box"><i data-prompt="{content: '总字数', theme: 'blue'}" className="ning-prompt-trigger ning-icon icon-count m-r-xs"></i>:  { data.articleContentLength || '-' }</span>
	                			<span className="m-l-md flex-center-box"><i data-prompt="{content: '阅读时长', theme: 'blue'}" className="ning-prompt-trigger ning-icon icon-time m-r-xs"></i>:  { Math.ceil(data.articleContentLength / 400) } min</span>
		                		<span className="m-l-md flex-center-box"><i data-prompt="{content: '发布日期', theme: 'blue'}" className="ning-prompt-trigger ning-icon icon-date m-r-xs"></i>:  { new Date(data.createDate).Format().substr(0,10).replace('-', '年 ').replace('-', '月 ') + '日' } </span>
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
	                	<h4 className="tc m-t-lg m-b-md"><span className="ning-prompt-trigger" data-prompt="{content: '相关文章', theme: 'blue'}">他山之石，可以攻玉</span></h4>
	                	<ul className="blog-list ning-row">
	                		{ el_article_list }
	                	</ul>
		                <CommentApp
		                	articleId={data._id}
		                	articleName={data.articleName}
	                	/>
					</div>
	            </div>
			)
		}

	}

	componentDidMount() {
		this.getArticleDetail(true);
		this.getRecommendArticleList();
	}

	addAtricleReadCount() {
		let data = {
				_id: this.state._id,
				readCount: this.state.articleDetail.readCount ? ++this.state.articleDetail.readCount : 1,
			},
			cb = () => {
				console.log('感谢阅读，thx~')
			}
        util.axiosFn(server.updateArticle, 'post', data, cb)
	}

	addAtricleLikeCount(e) {
		util.fnTextPopup({
			pageX: e.pageX,
			pageY: e.pageY,
		})
		let data = {
				_id: this.state._id,
				likeCount: this.state.articleDetail.likeCount ? ++this.state.articleDetail.likeCount : 1,
			},
			cb = () => {
				notify.info('感谢点赞~您的鼓励是我前进动力~')
				this.getArticleDetail()
			}
        util.axiosFn(server.updateArticle, 'post', data, cb)
	}

	getArticleDetail = (is_add_read_count) => {
		let self = this,
			data = {
				_id: this.state._id,
			},
			cb = res => {
				self.setState({
					articleDetail: res.data,
				}, () => {
					self.setState({
						catalogue_list: catalogue.init('#articleContentResult'),
					})
					is_add_read_count && self.addAtricleReadCount();
				})
			}
        util.axiosFn(server.getArticleDetail, 'get', data, cb)
	}

	getRecommendArticleList = () => {
        let self = this,
        	data = {
	            currentPage: 1,
	            pageSize: 4,
	        },
	        cb = res => {
	        	self.setState({
                    articleList: res.data.list,
                })
	        }
        util.axiosFn(server.getArticleList, 'get', data, cb)
    }
}

export default ArticleDetail;