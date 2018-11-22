import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../sass/home.scss';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import blog_img from '../images/WechatIMG2.jpeg'

class Home extends Component {
    render() {
        return (
        	<div id="home">
           		<Header/>
				<div className="ning-container p-lg flex-col-box">
	            	<section className="header">
	            		<div className="author-box flex-row-box">
							<div className="h-100 flex-col-box">
								<p className="_xs _light">窗前明月光</p>
								<p className="_lg">享受生命中每一个脚步</p>
							</div>
							<div className="h-100 flex-row-box">
								<div className="tr">
									<p>qeqweqeqqeqweqeq</p>
									<p>qweqw</p>
								</div>
								<div className="icon"></div>
							</div>
	            		</div>
	            		<div className="aside-box">
	            		</div>
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
            						<li>
            							<img src={blog_img} alt=""/>
            							<a href="#" className="flex-1 elis-2" style={{"WebkitBoxOrient": "vertical"}}>绝大多数操作都只需要访问本地文件和资源绝大多数操作都只需要访问本地文件和资源绝大</a>
        							</li>
        							<li>
            							<img src={blog_img} alt=""/>
            							<a href="#" className="flex-1 elis-2" style={{"WebkitBoxOrient": "vertical"}}>绝大多数操作都只需要访问本地文件和资源绝大多数操作都只需要访问本地文件和资源绝大多数操作都只需要访问本地文件和资源绝大多数操作都只需要访问本地文件和资源绝大多数操作都只需要访问本地文件和资源</a>
        							</li>
        							<li>
            							<img src={blog_img} alt=""/>
            							<a href="#" className="flex-1 elis-2" style={{"WebkitBoxOrient": "vertical"}}>绝大多数操作都只需要访问本地文件和资源</a>
        							</li>
        							<li>
            							<img src={blog_img} alt=""/>
            							<a href="#" className="flex-1 elis-2" style={{"WebkitBoxOrient": "vertical"}}>绝大多数操作都只需要访问本地文件和资源</a>
        							</li>
        							<li>
            							<img src={blog_img} alt=""/>
            							<a href="#" className="flex-1 elis-2" style={{"WebkitBoxOrient": "vertical"}}>绝大多数操作都只需要访问本地文件和资源</a>
        							</li>
	            				</ul>
	            			</div>
	            		</div>
	            	</section>
	            </div>
	            <Footer/>
        	</div>
        )
    }

    
}

export default Home;