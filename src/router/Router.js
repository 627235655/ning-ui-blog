import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	HashRouter,
	Route,
	Switch
} from 'react-router-dom';
import indexHtml from 'pages/index';
import Login from 'pages/login/login';

class BasicRoute extends Component {
	render() {
		return (
			<HashRouter>
		        <Switch>
		            <Route path="/index" component={indexHtml}/>
		            <Route path="/login" component={Login}/>
		        </Switch>
		    </HashRouter>
		);
	}
}

export default BasicRoute;