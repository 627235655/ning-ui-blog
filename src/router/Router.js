import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import indexHtml from 'pages/index';
import Login from 'pages/login/login';
import Profile from 'pages/profile/profile';
import TimeProgressBar from 'pages/time-progress-bar/time-progress-bar';
import NingEditor from 'pages/ning-editor/ning-editor';


class BasicRoute extends Component {
	render() {
		return (
			<Router basename="/blog">
		        <Switch>
		            <Route path="/index" component={indexHtml}/>
		            <Route path="/login" component={Login}/>
		            <Route path="/profile" component={Profile}/>
		            <Route path="/time-progress-bar" component={TimeProgressBar}/>
		            <Route path="/ning-editor" component={NingEditor}/>
		        </Switch>
		    </Router>
		);
	}
}

export default BasicRoute;