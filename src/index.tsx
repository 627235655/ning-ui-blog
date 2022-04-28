import '@babel/polyfill';
import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Router from '../src/router';
import './assets/sass/common.scss';
// 自定义模块
import { STATE_CODE } from './constants';
import './public-path';
import * as API from './server';
import { GlobalDataContext, SET_LOGIN_USER_INFO, Store } from './store';

const App = () => {
  console.log('App render');

  const { globalData, dispatch } = useContext(GlobalDataContext);

  useEffect(() => {
    isSignIn();
  }, []);

  useEffect(() => {
    console.log('useEffect globalData', globalData);
  }, [globalData]);

  const isSignIn = async () => {
    let res = await API.isSignIn({});
    if (res.status === STATE_CODE.success) {
      dispatch({
        type: SET_LOGIN_USER_INFO,
        data: {
          loginUserInfo: {
            userName: res.data,
          },
        },
      });
    }
  };

  return <Router />;
};

const render = () => {
  ReactDOM.render(
    <Store>
      <App />
    </Store>,
    document.getElementById('reactContainer')
  );
};

// 独立运行时，直接挂载应用
if (!globalThis.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log(props);
  render();
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
