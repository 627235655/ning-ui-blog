import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import './home.scss';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';
import TagLink from 'components/TagLink/TagLink'
import blog_chart from 'assets/images/blog-chart.png'

class Home extends Component {
	constructor(props) {
        super(props)
        this.state = {
            articleList: [],
        }
    }

	render() {
		let el_article_list = this.state.articleList.map((v, i, a) => {
            return (
                <li key={i} className="blog-list-item">
					<span className="flex-1 content-wrap flex-col-box">
						<Link to={`/index/article-detail/${v._id}`}>
							<span className="title elis" style={{"WebkitBoxOrient": "vertical"}}>{v.articleName}</span>
						</Link>
						<span className="summary elis" style={{"WebkitBoxOrient": "vertical"}}>
							{v.articleSummary}
						</span>
						<span className="flex-row-box">
							<span>
								{
			                        v.articleTags.map((v2, i2, a2) => {
			                            return <TagLink
	                                                key={i2}
	                                                tagName={v2}
	                                                history={this.props.history}
	                                            />
			                        })
			                    }
		                    </span>
							<span className="_xs _gray">{new Date(v.createDate).Format().substr(0,10)}</span>
						</span>
					</span>
					<img src={v.thumbnailUrl} alt={v.articleName}/>
				</li>
            )
        })
		return (
			<div id="home">
				<div className="ning-container p-md flex-col-box">
	            	<section className="con-box header">
		            	<div>
		            		<Link to="/profile" className="ning-line-btn _fillet _fill">about me</Link>
		            	</div>
	            	</section>
	            	<section className="con-box flex-center-box">
	            		<div className="ning-ui-item">
	            			<div className="ning-ui-item-wrap">
	            				<p>自然交互</p>
		            			<p>面向设计</p>
	            			</div>
	            			<div className="title">基于 Atnd</div>
	            		</div>
	            		<div className="ning-ui-item">
	            			<div className="ning-ui-item-wrap">
		            			<p>基本构架</p>
		            			<p>灵活配置</p>
	            			</div>
	            			<div className="title">半封装</div>
	            		</div>
	            		<div className="ning-ui-item">
	            			<div className="ning-ui-item-wrap">
	            				<i className="ning-icon icon-ning"></i>
	            			</div>
	            			<Link className="title" to="/index/ning-ui/mind">ning-ui</Link>
	            		</div>
	            		<div className="ning-ui-item">
	            			<div className="ning-ui-item-wrap">
	            				<p>不拘于框架</p>
		            			<p>拥抱原生</p>
	            			</div>
	            			<div className="title">原生 Js 组件</div>
	            		</div>
	            		<div className="ning-ui-item">
	            			<div className="ning-ui-item-wrap">
	            				<p>自定义</p>
		            			<p>少网络请求</p>
	            			</div>
	            			<div className="title">单标签 Icon</div>
	            		</div>
	            	</section>
	            	<section className="con-box ning-row">
	            		<div className="col-6 flex-col-box p-l-lg p-r-lg p-b-lg">
	            			<div>
	            				<p className="_lg _bold m-b-md">技术博客</p>
	            				<p>
	            					搭建博客，构思久已<br/>
	            					却停滞于行动，此次趁着受人之托，得以窥见其中一二<br/>
	            					<br/>
	            					享受生命中每一个脚步<br/>
	            					<a href="/index/home">前台博客系统</a>基于 <a href="https://github.com/reactjs/reactjs.org">react</a>，<a href="/admin.html">后台管理系统</a>基于 <a href="https://github.com/vuejs/vue">react</a>，UI 基于自造框架 <a href="/index/ning-ui/mind">ning-ui</a><br/>
	            					知行合一，如是而已
            					</p>
	            			</div>
	            			<img className="blog-chart" src={blog_chart} alt="" />
	            		</div>
	            		<div className="col-6 flex-row-box p-l-lg">
	            			<div className="blog-list flex-col-box">
	            				<ul>
	            					<li className="flex-row-box flex-center-box">
	            						<span className="_bold flex-center-box"><i className="ning-icon icon-article m-r-sm"></i>My Blogs</span>
	            						<Link to="/index/article-list" className="flex-center-box"><i className="ning-icon icon-more m-r-sm"></i></Link>
            						</li>
            						{ el_article_list }
	            				</ul>
	            			</div>
	            		</div>
	            	</section>
	            </div>
        	</div>
		)
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

    componentDidMount() {
        this.getArticleList(this.state.currentPage);
    }


}

export default Home;