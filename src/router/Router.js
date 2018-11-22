import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../views/home';
import NingUI from '../views/ning-ui';
import Login from '../views/login';
import ArticleList from '../views/article-list'

class BasicRoute extends Component {
	render (){
		return (
				    <HashRouter>
				        <Switch>
				            <Route exact path="/home" component={Home}/>
				            <Route exact path="/ning-ui" component={NingUI}/>
				            <Route exact path="/login" component={Login}/>
				            <Route exact path="/article-list" component={ArticleList}/>
				        </Switch>
				    </HashRouter>
				);
	}
}

export default BasicRoute;
