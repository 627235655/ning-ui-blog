import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import './article-detail.scss';
import axios from 'axios';
import marked from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/ocean.css' //样式文件


class ArticleDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			_id: this.props.match.params.id,
			articleDetail: {},
		}
	}

	componentWillMount() {
	    marked.setOptions({
	      	highlight: code => hljs.highlightAuto(code).value
	    })
  	}

	render() {
		let data = this.state.articleDetail;
		if (JSON.stringify(data) === "{}") {
			return null
		} else {
			return (
				<div id="article_detail" className="ning-container p-md">
					<div className="article-detail-wrap">
		                <div className="article_preview-header" style={{backgroundImage: `url(${data.thumbnailUrl})`}}>
		                    <h2 className="article_preview-title">{ data.articleName }</h2>
		                	<p className="article_preview-summary">{ data.articleSummary }</p>
		                	<p className="article_preview-header_footer">
			                	{ data.articleTags.length > 0 &&
				                    <span className="article_preview-tags flex-center-box">
				                        <i className="ning-icon icon-tag m-r-xs"></i>
				                        {
				                        	data.articleTags.map((v, i, a) => {
				                        		return `【${v}】`
				                        	})
				                    	}
				                    </span>
				                }
		                		<span className="flex-center-box">
		                			<i className="ning-icon icon-count m-r-xs"></i>字数：{ data.articleContentLength }
		                			<span className="m-l-md flex-center-box"><i className="ning-icon icon-time m-r-xs"></i> 阅读时长约：{ Math.ceil(data.articleContentLength / 400) } min</span>
		                		</span>
		                		<span className="m-l-md flex-center-box"><i className="ning-icon icon-date m-r-xs"></i>{ new Date(data.createDate).Format().substr(0,10).replace('-', '年 ').replace('-', '月 ') + '日' } </span>
	                		</p>
		                </div>
		                <div id="articleContentResult" dangerouslySetInnerHTML={{ __html: marked(data.articleContent) }} />
					</div>
	            </div>
			)
		}

	}

	componentDidMount() {
		this.getArticleDetail()
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
						articleDetail: res.data
					})
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}
}

export default ArticleDetail;