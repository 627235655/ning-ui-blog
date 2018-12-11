import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import './home.scss';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';

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
                <Link key={i} to={`/index/article-detail/${v._id}`}>
					<img src={v.thumbnailUrl} alt={v.articleName}/>
					<span className="flex-1 flex-row-box">
						<span className="flex-col-box">
							<span className="elis" style={{"WebkitBoxOrient": "vertical"}}>{v.articleName}</span>
							<span>
								{
			                        v.articleTags.map((v2, i2, a2) => {
			                            return <span key={i2} className="ning-tag">{v2}</span>
			                        })
			                    }
							</span>
						</span>
						<span className="_xs _light">{new Date(v.createDate).Format().substr(0,10).replace('-', '年 ').replace('-', '月 ') + '日'}</span>
					</span>
				</Link>
            )
        })
		return (
			<div id="home">
				<div className="ning-container p-lg flex-col-box">
	            	<section className="header">
	            	</section>
	            	<section className="content ning-row">
	            		<div className="col-4 flex-allcenter-box">
	            			<div>
	            			<p className="_lg _bold">Ning-UI</p>
	            			<p className="_light m-t-md m-b-md">绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快</p>
	            			<a className="ning-btn" href="#/ning-ui">了解更多</a>
	            			</div>
	            		</div>
	            		<div className="col-8 flex-row-box p-l-lg">
	            			<div className="feature-box">123</div>
	            			<div className="feature-box"></div>
	            			<div className="feature-box"></div>
	            			<div className="feature-box"></div>
	            		</div>
	            	</section>
	            	<section className="content ning-row">
	            		<div className="col-6 flex-allcenter-box">
	            			<p className="_lg _bold">绝大多数</p>
	            			<p className="_light m-t-md m-b-md">绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快绝大多数操作都只需要访问本地文件和资源，而且与每个提交都是所有文件的完整副本，因此速度非常快</p>
	            			<button className="ning-btn">了解更多</button>
	            		</div>
	            		<div className="col-6 flex-row-box p-l-lg">
	            			<div className="blog-list flex-col-box">
	            				<ul>
	            					<li className="flex-row-box flex-center-box">
	            						<span className="_bold">MY BLOGS</span>
	            						<a href="/article-list" className="_xs light">全部好文</a>
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
            pageSize: 5,
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