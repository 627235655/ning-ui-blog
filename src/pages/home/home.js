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
	            	</section>
	            	<section className="con-box flex-row-box">
	            		<div className="ning-ui-item flex-allcenter-box">
	            			<div className="img"></div>
	            			<div className="title">基于 Atnd</div>
	            		</div>
	            		<div className="ning-ui-item flex-allcenter-box">
	            			<div className="img"></div>
	            			<div className="title">半封装</div>
	            		</div>
	            		<div className="ning-ui-item flex-allcenter-box">
	            			<p className="_lg _bold">Ning-UI</p>
	            			<p className="_light m-t-md m-b-md">绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快</p>
	            			<a className="ning-btn" href="#/index/ning-ui">了解更多</a>
	            		</div>
	            		<div className="ning-ui-item flex-allcenter-box">
	            			<div className="img"></div>
	            			<div className="title">原生 Js 组件</div>
	            		</div>
	            		<div className="ning-ui-item flex-allcenter-box">
	            			<div className="img"></div>
	            			<div className="title">单标签 Icon</div>
	            		</div>
	            	</section>
	            	<section className="con-box ning-row">
	            		<div className="col-6 flex-col-box p-l-lg p-r-lg p-b-lg">
	            			<div>
	            				<p className="_lg _bold m-b-md">绝大多数</p>
	            				<p>绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快</p>
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