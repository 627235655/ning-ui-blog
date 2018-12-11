import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	HashRouter,
	Route,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import notify from 'assets/ning-ui/js/notify'

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Home from 'pages/home/home';
import NingUI from 'pages/ning-ui/ning-ui';
import ArticleList from 'pages/article-list/article-list'
import ArticleDetail from 'pages/article-detail/article-detail'


class IndexHtml extends Component {
	constructor(props) {
		super(props)
		this.state = {
			nav_active_item: this.props.location.pathname,
            user_name: null,
		}
	}

	render() {
		return (
			<div>
				<Header
					nav_active_item={this.state.nav_active_item}
					user_name={this.state.user_name}
					logOut={this.logOut}
				/>
				<div className="common-container">
					<Route path="/index/home" component={Home}/>
	            	<Route path="/index/ning-ui" component={NingUI}/>
	            	<Route path="/index/article-list" component={ArticleList}/>
	            	<Route path="/index/article-detail/:id" component={ArticleDetail}/>
				</div>
	            <Footer/>
		    </div>
		);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			nav_active_item: nextProps.location.pathname,
		});
	}

	componentDidMount() {
        this.isSignIn();
    }

    isSignIn = () => {
        let self = this;
        axios.get('/api/isSignIn')
            .then(function(response) {
                let res = response.data;
                if (res.status === 200) {
                    self.setState({
                        user_name: res.data,
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    logOut = () => {
    	let self = this;
        axios.post('/api/logOut')
            .then(function(response) {
                let res = response.data;
                if (res.status === 200) {
                	notify.success(res.message);
                    self.setState({
                        user_name: null,
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default IndexHtml;