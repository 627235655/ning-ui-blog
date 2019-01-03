import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import './login.scss';
import axios from 'axios';
import notify from 'assets/ning-ui/js/notify'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div id="login">
        <div className="content">
          <div className="content-header">
            <a href="#/index/home" className="flex-center-box m-r-md flex-end"><i className="ning-icon icon-return m-r-sm"></i>返回首页</a>
          </div>
          <div className="content-login flex-allcenter-box">
            <div className="login-box">
              <p className="_md">The&nbsp;&nbsp;Website&nbsp;&nbsp;<span className="_white">For</span></p>
              <h1><span className="_blue">n</span><span className="b-span">顾盼神飞</span></h1>
              <div id="login_form">
                <div className="form-item">
                  <input onChange={(e) => this.getUserName(e.target.value)} type="text" placeholder="userName"/>
                  <i className="ning-icon icon-person"></i>
                </div>
                <div className="form-item">
                  <input onChange={(e) => this.getPassword(e.target.value)} type="password" placeholder="password"/>
                  <i className="ning-icon icon-password"></i>
                </div>
                <button onClick={() => this.signIn()} className="ning-line-btn _fill">Sign&nbsp;&nbsp;In</button>
              </div>
            </div>
          </div>
          <div className="content-footer">
          <p>Copyright© 20018 - 2018 n顾盼神飞</p>
            <p>
              <a href="#">weibo</a>
              <a href="#" className="center-tag">github</a>
              <a href="#">weixin</a>
            </p>
          </div>
        </div>
     	</div>
    )
  }

  getUserName(username) {
    this.setState({
      username: username
    });
  }

  getPassword(password) {
    this.setState({
      password: password
    });
  }

  signIn() {
    let data = this.state;
    if (!data.username) {
      notify.warning('请输入 userName!');
      return;
    }
    if (!data.password) {
      notify.warning('请输入 passWord!');
      return;
    }
    axios.post('/api/signIn', data)
      .then(function(response) {
        let res = response.data;
        if (res.status === 404) {
          notify.warning(res.message);
        }
        if (res.status === 200) {
          notify.success(res.message);
          window.location = '/blog/index/home';
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default Login;