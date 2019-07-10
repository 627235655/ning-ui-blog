import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	Route
} from 'react-router-dom';
import notify from 'assets/ning-ui/js/notify'

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import Home from 'pages/home/home';
import NingUI from 'pages/ning-ui/ning-ui';
import ArticleList from 'pages/article-list/article-list'
import ArticleDetail from 'pages/article-detail/article-detail'
import Demos from 'pages/demos/demos'
import PseudoDemos from 'pages/demos-pseudo/demos-pseudo'

import util from 'assets/js/utils';
import server from 'server/server'

declare global {
   interface Window {
       user_name: string;
   }

   interface Math{
       easeout: (A: number, B: number, rate: number, callback: any) => void;
   }
}

interface IProps{
    location: any;
}

interface IState {
    nav_active_item: string;
    user_name: string;
    show_return_top: boolean;
}

class IndexHtml extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			nav_active_item: this.props.location.pathname,
            user_name: window.user_name,
            show_return_top: false,
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
                    <Route path="/index/demos" component={Demos}/>
                    <Route path="/index/pseudo-demos" component={PseudoDemos}/>
				</div>
	            <Footer/>
        		<button className={ this.state.show_return_top ? 'return-top active' : 'return-top'} onClick={() => this.returnTop()}>返回顶部</button>
		    </div>
		);
	}

	componentWillReceiveProps(nextProps: any) {
		this.setState({
			nav_active_item: nextProps.location.pathname,
		});
	}

	componentDidMount() {
		let self = this;
        // ning_ui.init();
		Math.easeout = function(A, B, rate, callback) {
            if (A == B || typeof A != 'number') {
                return;
            }
            B = B || 0;
            rate = rate || 5;

            var step = function() {
                A = A + (B - A) / rate;

                if (A < 1) {
                    callback(B, true);
                    return;
                }
                callback(A, false);
                requestAnimationFrame(step);
            };
            step();
        };
        // window.onscroll = function(e: any) {
        //     var doc = document.body.scrollTop ? document.body : document.documentElement;
        //     let show_return_top = (doc.scrollTop - doc.clientHeight) > 0;
        //     if (self.state.show_return_top !== show_return_top) {
        //         self.setState({
        //             show_return_top,
        //         })
        //     }
        // }
    }

    // 滚动到顶部缓动实现
    // rate表示缓动速率，默认是5
    // author: https://www.zhangxinxu.com
    returnTop = (rate?: number) => {
        var doc = document.body.scrollTop ? document.body : document.documentElement;
        Math.easeout(doc.scrollTop, 0, rate, function(value: any) {
            doc.scrollTop = value;
        });
    }

    logOut = () => {
        let self = this,
            url = server.logOut,
            data = {},
            cb = (res: any) => {
                notify.success(res.message);
                self.setState({
                    user_name: null,
                }, () => {
                    window.user_name = undefined;
                })
            }
    	util.axiosFn({url, data, method: 'post', cb});
    }
}

export default IndexHtml;