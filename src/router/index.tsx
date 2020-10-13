import React, { Component, useContext } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import indexHtml from '../pages/index';
import Login from '../pages/login';
import Profile from '../pages/profile/profile';
import TimeProgressBar from '../pages/time-progress-bar/time-progress-bar';
import NingEditor from '../pages/ning-editor/ning-editor';

const BASE_NAME = globalThis.__POWERED_BY_QIANKUN__ ? '/index/react/' : '/blog';

class BasicRoute extends Component {
	render() {
		return (
			<Router basename={BASE_NAME}>
				<Switch>
					<Route path='/index' component={indexHtml} />
					<Route path='/login' component={Login} />
					<Route path='/profile' component={Profile} />
					<Route
						path='/time-progress-bar'
						component={TimeProgressBar}
					/>
					<Route path='/ning-editor' component={NingEditor} />
					<Redirect path='/' exact={true} to='/index/home' />
				</Switch>
			</Router>
		);
	}
}

export default BasicRoute;
