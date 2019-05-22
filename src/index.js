import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import Router from 'router/router';
import 'assets/sass/common.scss';
import util from 'assets/ning-ui/js/utils.js';
import server from 'server/server.js'

let isSignIn = () => {
    let cb = res => {
    	window.user_name = res.data;
    	ReactDOM.render(
			<Router/>,
			document.getElementById('app')
		)
    },
    errcb = res => {
    	ReactDOM.render(
			<Router/>,
			document.getElementById('app')
		)
    };
    util.axiosFn(server.isSignIn, {}, 'get', cb, null, errcb)
}

isSignIn()



