import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Footer.scss';

class Footer extends Component {
	render() {
		return (
			<footer className="ning-row">
				<div className="last-content">
					<span>Designed & Powerd by zongyuan.ning</span>
					<span>Copyright© 2019 - 2020 n顾盼神飞</span>
					<a href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action;jsessionid=48i9Kb-v42k6wCOR5dGGgtnZfGpHfZUxtuNlB8SzndfA1bG4FhXc!-738760798">
						蜀 ICP 备 19016370 号
					</a>
				</div>
			</footer>
		);
	}
}

export default Footer;
