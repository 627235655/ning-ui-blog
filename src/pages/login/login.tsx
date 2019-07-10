import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './login.scss';
import util from 'assets/js/utils';
import notify from 'assets/ning-ui/js/notify.js';
// import creatHistory from 'history/createBrowserHistory';

interface States{
	username: string;
	password: string;
}

// const history = creatHistory();

class Login extends React.Component<{}, States> {
	constructor(props: any) {
		super(props)
		this.state = {
			username: '',
			password: '',
		}
	}

	render() {
		return (
			<div id="login">
				<div className="content">
					<div className="left">
						<p className="tc">少年听雨<br/>歌楼上，红烛昏罗帐。<br/>壮年听雨<br/>客舟中，江阔云低、<br/>断雁叫西风。<br/>
								而今听雨<br/>僧庐下，鬓已星星也。<br/>悲欢离合总无情。一任阶前、点滴到天明。
						</p>
						<div className="flex-center-box">
							<Link to="/blog/index/home" className="ning-line-btn _fillet _fill m-r-lg">My&nbsp;&nbsp;Blog</Link>
							<Link to="/blog/profile" className="ning-line-btn _fillet _fill">About&nbsp;&nbsp;Me</Link>
						</div>
						<div className="content-footer">
						<p>Copyright© 20019 - 2019 n顾盼神飞</p>
							<p>
								<a href="#">weibo</a>
								<a href="#" className="center-tag">github</a>
								<a href="#">weixin</a>
							</p>
						</div>
					</div>
					<div className="login-box">
						<div id="login_form">
							<div className="form-item">
								<input onChange={(e) => this.setUserName(e.target.value)} type="text" placeholder="userName"/>
								<label className="label-placeholder">UserName</label>
								<i className="ning-icon icon-person"></i>
							</div>
							<div className="form-item">
								<input onChange={(e) => this.setPassword(e.target.value)} type="password" placeholder="password"/>
								<label className="label-placeholder">PassWord</label>
								<i className="ning-icon icon-password"></i>
							</div>
							<button onClick={() => this.signIn()} className="ning-line-btn _fillet _cover">Sign&nbsp;&nbsp;In</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	setUserName(username: string) {
		this.setState({
			username,
		});
	}

	setPassword(password: string) {
		this.setState({
			password,
		});
	}

	signIn() {
		let data = this.state;
		if (!data.username) {
			notify.warning('请输入 userName!');
			return;
		}
		if (!data.password) {
			notify.warning('请输入 passWord!');
			return;
		}
		let url = '/api/signIn',
			cb = (res: any) => {
				notify.success(res.message);
				window.user_name = data.username;
				history.back();
				// history.goBack();
			},
			errcb = (res: any) => {
				notify.warning(res.message);
			};
		util.axiosFn({url, data, method: 'get',cb, errcb})
	}
}

export default Login;