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
          <div className="left">
            <p className="tc">少年听雨<br/>歌楼上，红烛昏罗帐。<br/>壮年听雨<br/>客舟中，江阔云低、<br/>断雁叫西风。<br/>
                而今听雨<br/>僧庐下，鬓已星星也。<br/>悲欢离合总无情。一任阶前、点滴到天明。
            </p>
            <div className="flex-center-box">
              <a href="/blog/index/home" className="ning-line-btn _fillet _fill m-r-lg">My&nbsp;&nbsp;Blog</a>
              <a href="/blog/profile" className="ning-line-btn _fillet _fill">About&nbsp;&nbsp;Me</a>
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
          <div className="login-box">
            <div id="login_form">
              <div className="form-item">
                <input onChange={(e) => this.getUserName(e.target.value)} type="text" placeholder="userName"/>
                <label className="label-placeholder">UserName</label>
                <i className="ning-icon icon-person"></i>
              </div>
              <div className="form-item">
                <input onChange={(e) => this.getPassword(e.target.value)} type="password" placeholder="password"/>
                <label className="label-placeholder">PassWord</label>
                <i className="ning-icon icon-password"></i>
              </div>
              <button onClick={() => this.signIn()} className="ning-line-btn _fillet _cover">Sign&nbsp;&nbsp;In</button>
            </div>
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