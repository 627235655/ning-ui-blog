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

class BasicRoute extends Component {
	render() {
		return (
			<Router basename="/blog">
		        <Switch>
		            <Route path="/index" component={indexHtml}/>
		            <Route path="/login" component={Login}/>
		        </Switch>
		    </Router>
		);
	}
}

export default BasicRoute;