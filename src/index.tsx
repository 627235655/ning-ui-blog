import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from 'router/router';
import 'assets/sass/common.scss';
import util from 'assets/js/utils';
import server from 'server/server'

declare global {
   interface Window { user_name: string }
}

let isSignIn = () => {
    let cb = (res: any) => {
            window.user_name = res.data;
            ReactDOM.render(
                <Router/>,
                document.getElementById('app') as HTMLElement
            )
        },
        errcb = (res: any) => {
            ReactDOM.render(
                <Router/>,
                document.getElementById('app') as HTMLElement
            )
        };
    util.axiosFn({
        url: server.isSignIn,
        data: {},
        method: 'get',
        cb,
        errcb,
    })
}

isSignIn()