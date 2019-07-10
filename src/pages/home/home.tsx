import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './home.scss';
import {
    Link
} from 'react-router-dom';
import util from 'assets/js/utils';
import server from 'server/server';
import TagLink from 'components/TagLink/TagLink'
import ArticleItem from 'components/ArticleItem/ArticleItem'
const blog_chart: string = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/blog-chart.png',
        ning_ui = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/ning-ui.png',
        blog_article_list = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/blog-article-list.png',
        blog_admin = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/blog-admin.png',
        antd_admin = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/antd-admin.png',
        blog_hexo = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/blog-hexo.png',
        online_resume = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/online-resume.png';

interface IProps{
    history: any;
}

interface IState{
    articleList: Array<any>;
    work_list: Array<any>;
}

class Home extends React.Component<IProps, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
            articleList: [],
            work_list: [{
            	name: 'ning-ui',
            	name_url: '/blog/index/ning-ui/mind',
            	desc_list: [{
            		desc: 'Ant Design 的设计理念',
            	},{
            		desc: '原生 Js 和 Css，不拘泥于框架',
            	},{
            		desc: '单标签 Icon，轻便易用',
            	}],
            	github_url: 'https://github.com/627235655/ning-ui-blog/tree/master/src/assets/ning-ui',
            	img_adress: ning_ui,
            },{
            	name: 'antd-admin',
            	desc_list: [{
            		desc: '基于 Antd，后台管理系统',
            	},{
            		desc: '解耦项目，颗粒度的页面配置及控制',
            	},{
            		desc: '多 Tab 子页面，提升效率',
            	}],
            	github_url: 'https://github.com/627235655/antd-admin-framework',
            	img_adress: antd_admin,
            },{
            	name: 'my-blog',
            	name_url: '/blog/index/article-list',
            	desc_list: [{
            		desc: '自由设计，随心所欲',
            	},{
            		desc: 'React + Node + MongoDB',
            	},{
            		desc: '记录前端路上的点滴',
            	}],
            	github_url: 'https://github.com/627235655/ning-ui-blog',
            	img_adress: blog_article_list,
            },{
            	name: 'blog-admin',
            	name_url: '/blog/index/article-list',
            	desc_list: [{
            		desc: '集成 MarkDown 编辑器',
            	},{
            		desc: 'Vue + MongoDB + ning-ui',
            	},{
            		desc: '博客相关，数据可视化',
            	}],
            	github_url: 'https://github.com/627235655/ning-ui-blog/admin',
            	img_adress: blog_admin,
            },{
            	name: 'online-resume',
            	name_url: '/blog/profile',
            	desc_list: [{
            		desc: '欲将心事付瑶琴',
            	},{
            		desc: 'G2 + Swiper + Canvas',
            	},{
            		desc: '知音少，弦断有谁听',
            	}],
            	img_adress: online_resume,
            },{
            	name: 'hexo-blog',
            	name_url: 'https://627235655.github.io/#',
            	desc_list: [{
            		desc: '静态资源博客',
            	},{
            		desc: 'hexo + github',
            	},{
            		desc: '样式自定义，已弃用',
            	}],
            	github_url: 'https://github.com/627235655/627235655.github.io',
            	img_adress: blog_hexo,
            }]
        }
    }
    // ,{
    //             name: '喜马拉雅 APP - 我的客服',
    //             name_url: 'https://627235655.github.io/#',
    //             desc_list: [{
    //                 desc: '静态资源博客',
    //             },{
    //                 desc: 'hexo + github',
    //             },{
    //                 desc: '样式自定义，已弃用',
    //             }],
    //             img_adress: blog_hexo,
    //         }

	render() {
		let el_article_list = this.state.articleList.map((v: any, i: number) => {
            return (
                <li key={i} className="blog-list-item">
					<span className="flex-1 content-wrap flex-col-box">
						<Link to={`/index/article-detail/${v._id}`}>
							<span className="title" style={{"WebkitBoxOrient": "vertical"}}>{v.articleName}</span>
						</Link>
						<span className="summary" style={{"WebkitBoxOrient": "vertical"}}>
							{v.articleSummary}
						</span>
						<span className="flex-row-box">
							<span>
								{
			                        v.articleTags.map((v2: any, i2: number) => {
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

        let work_list_dom = this.state.work_list.map((v: any, i: number) => {
			return 	<li key={i}>
            			<img className="ning-imgview-trigger" src={v.img_adress} alt={v.name}/>
            			<div>
            				<h2>{v.name_url ? <a target="_blank" href={v.name_url}>{v.name}</a> : v.name}</h2>
            				{
            					v.desc_list.map((v2: any, i2: number) => {
            						return <p key={i2}>{v2.desc}</p>
            					})
            				}
            			</div>
            			{
            				v.github_url
            				&&
            				<a target="_blank" href={v.github_url} className="github-badge">Fork me on GitHub</a>
            			}
            		</li>
		})
		return (
			<div id="home">
				<div className="ning-container flex-col-box">
					{/*个人介绍*/}
	            	<section className="overview">
		            	<div className="profile-wrap">
		            		<div className="head"></div>
		            		<h1>n顾盼神飞</h1>
		            		<p>享受生命中每一个脚步</p>
		            		<Link to="/profile" className="ning-line-btn _fillet _fill blue">关于我</Link>
		            	</div>
		            	<ul className="work-list">
		            		{work_list_dom}
		            	</ul>
	            	</section>
	            	<section className="flex-row-box">
	            		<div className="blog-desc-wrap">
	            			<div className="blog-desc">
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
	            		<div className="col-6 blog-list">
	            			<div className="flex-col-box">
	            				<ul>
	            					<li className="flex-row-box flex-center-box">
	            						<span className="_bold flex-center-box"><i className="ning-icon icon-article m-r-sm"></i>Blogs</span>
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
        let self = this,
        	data = {
	            currentPage: 1,
	            pageSize: 4,
	        },
	        cb = (res: any) => {
	        	self.setState({
                    articleList: res.data.list,
                })
	        }
        util.axiosFn({url: server.getArticleList, method: 'get', data, cb})
    }

    componentDidMount() {
        this.getArticleList();
    }
}

export default Home;