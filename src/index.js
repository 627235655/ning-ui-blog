// import "@babel/polyfill";
import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import Router from 'router/router';
import 'assets/sass/common.scss';
import util from 'assets/ning-ui/js/utils.js';
import { AppContainer } from "react-hot-loader"; // 1、首先引入AppContainre
import server from 'server/server.js'

/*初始化*/
renderWithHotReload(Router); // 2、初始化

/*热更新*/
if (module.hot) { // 3、热更新操作
  module.hot.accept("./router/router.js", () => {
    const Router = require("./router/router.js").default;
    renderWithHotReload(Router);
  });
}


function renderWithHotReload(Router) {  // 4、定义渲染函数
    let isSignIn = () => {
        let cb = res => {
            window.user_name = res.data;
            ReactDOM.render(
                <AppContainer>
                    <Router/>
                </AppContainer>,
                document.getElementById('app')
            )
        },
        errcb = res => {
            ReactDOM.render(
                <AppContainer>
                    <Router/>
                </AppContainer>,
                document.getElementById('app')
            )
        };
        util.axiosFn(server.isSignIn, {}, 'get', cb, null, errcb)
    }

    isSignIn()
}





