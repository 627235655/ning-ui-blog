import React, { useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { GlobalDataContext, SET_LOGIN_USER_INFO } from '../../store';
import { LOGO_URL } from '../../constants';

import notify from '../../assets/ning-ui/js/notify';
// 自定义模块
import { STATE_CODE } from '../../constants';
import * as API from '../../server';

import './index.scss';

const navList = [
	{
		key: 'home',
		path: '/index/home',
		iconClass: 'icon-home',
		text: 'Home',
	},
	{
		key: 'ning-ui',
		path: '/index/ning-ui/text',
		iconClass: 'icon-ning',
		text: 'ning-ui',
	},
	{
		key: 'article-list',
		path: '/index/article-list',
		iconClass: 'icon-article',
		text: 'ArticleList',
	},
	{
		key: 'time-progress',
		path: '/time-progress-bar',
		iconClass: 'icon-time',
		text: 'TimeProgress',
	},
];

const Header = (props: RouteComponentProps) => {
	const { globalData, dispatch } = useContext(GlobalDataContext);

	const logOut = async () => {
		let res = await API.logOut({});
		console.log('logOut res', res);
		if (res.status === STATE_CODE.success) {
			notify.success(res.message);
			dispatch({
				type: SET_LOGIN_USER_INFO,
				data: {
					loginUserInfo: {
						userName: null,
					},
				},
			});
		} else {
			notify.warning(res.message);
		}
	};

	return (
		<header>
			<nav className='flex-center-box'>
				<Link to='/index/home' replace>
					<img className='logo' src={LOGO_URL} alt='logo' />
				</Link>
				<ul className='flex-box flex-1'>
					{navList.map((v) => (
						<li
							key={v.key}
							className={
								props.location.pathname.includes(v.key)
									? 'active'
									: ''
							}
						>
							<Link to={v.path} replace>
								<i className={`ning-icon ${v.iconClass}`}></i>
								{v.text}
							</Link>
						</li>
					))}
					{globalData.loginUserInfo.userName && (
						<li>
							<a href='/admin.html' target='_blank'>
								<i className='ning-icon icon-admin'></i>
								Admin
							</a>
						</li>
					)}
					<li className='flex-1 flex-end sign-box'>
						{globalData.loginUserInfo.userName ? (
							<span className='flex-center-box'>
								<Link to='/profile'>
									Hello，
									{globalData.loginUserInfo.userName}
								</Link>
								<span
									className='flex-center-box'
									id='log_out_btn'
									onClick={() => logOut()}
								>
									<i className='ning-icon icon-log-out'></i>
								</span>
							</span>
						) : (
							<span>
								<Link to='/login'>
									<i className='ning-icon icon-sign-in'></i>
									Sign-in
								</Link>
							</span>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default Header;
