// 基础模块
import React, { useState, useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
// 第三方模块
import ning_ui from '../assets/ning-ui/js';

// 自定义模块
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Home from './home';
import NingUI from '../pages/ning-ui/ning-ui';
import ArticleList from '../pages/article-list/article-list';
import ArticleDetail from '../pages/article-detail/article-detail';
import Demos from '../pages/demos/demos';
import PseudoDemos from '../pages/demos-pseudo/demos-pseudo';

const IndexHtml = (props: RouteComponentProps) => {
	console.log('IndexHtml render');

	const [returnTopVisible, setreturnTopVisible] = useState(false);

	useEffect(() => {
		ning_ui.init();
		window.addEventListener('scroll', onscroll);
		return () => {
			window.removeEventListener('scroll', onscroll);
		};
	}, []);

	const onscroll = (e) => {
		var doc = document.body.scrollTop
			? document.body
			: document.documentElement;
		let returnTopVisible = doc.scrollTop - doc.clientHeight > 0;
		setreturnTopVisible(returnTopVisible);
	};

	const returnTop = () => {
		let doc = document.body.scrollTop
			? document.body
			: document.documentElement;
		Math.easeout(doc.scrollTop, 0, 5, function (value) {
			doc.scrollTop = value;
		});
	};

	return (
		<div>
			<Header {...props} />
			<div className='common-container'>
				<Route path='/index/home' component={Home} />
				<Route path='/index/ning-ui' component={NingUI} />
				<Route path='/index/article-list' component={ArticleList} />
				<Route
					path='/index/article-detail/:id'
					component={ArticleDetail}
				/>
				<Route path='/index/demos' component={Demos} />
				<Route path='/index/pseudo-demos' component={PseudoDemos} />
			</div>
			<Footer />
			<button
				className={'return-top' + (returnTopVisible ? ' active' : '')}
				onClick={() => returnTop()}
			>
				返回顶部
			</button>
		</div>
	);
};

export default IndexHtml;
