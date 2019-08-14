// import "@babel/polyfill";
import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import Router from 'router/router';
import { Provider } from "react-redux";
import store from "./redux/index";

import 'assets/sass/common.scss';
import util from 'assets/ning-ui/js/utils.js';
import server from 'server/server.js'

let isSignIn = () => {
    let cb = res => {
        window.user_name = res.data;
        ReactDOM.render(
            <Provider store={store}>
                <Router/>
            </Provider>,
            document.getElementById('app')
        )
    },
    errcb = res => {
        ReactDOM.render(
            <Provider store={store}>
                <Router/>
            </Provider>,
            document.getElementById('app')
        )
    };
    util.axiosFn(server.isSignIn, {}, 'get', cb, null, errcb)
}

isSignIn()





