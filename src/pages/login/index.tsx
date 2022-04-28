import notify from "@/assets/ning-ui/js/notify";
import { STATE_CODE } from "@/constants";
import * as API from "@/server";
import { GlobalDataContext, SET_LOGIN_USER_INFO } from "@/store";
import { debouce } from "@/utils";
import { createBrowserHistory } from "history";
import React, { useContext, useState } from "react";
import "./index.scss";

const history = createBrowserHistory();

const Login = () => {
  const { globalData, dispatch } = useContext(GlobalDataContext);

  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");

  let setUserName = debouce((event) => {
    let userName = event.target.value;
    setuserName(userName);
  });

  const handleSetUserName = (event) => {
    event.persist();
    setUserName(event);
  };

  let setPassWord = debouce((event) => {
    let passWord = event.target.value;
    setpassWord(passWord);
  });

  const handleSetPassWord = (event) => {
    event.persist();
    setPassWord(event);
  };

  const signIn = async () => {
    if (!userName) {
      notify.warning("请输入 userName!");
      return;
    }
    if (!passWord) {
      notify.warning("请输入 passWord!");
      return;
    }
    let res = await API.signIn({
      username: userName,
      password: passWord
    });
    console.log("signIn res", res);
    if (res.status === STATE_CODE.success) {
      notify.success(res.message);
      dispatch({
        type: SET_LOGIN_USER_INFO,
        data: {
          loginUserInfo: {
            userName
          }
        }
      });
      history.goBack();
    } else {
      notify.warning(res.message);
    }
  };

  return (
    <div id="login">
      <div className="content">
        <div className="left">
          <p className="tc">
            少年听雨
            <br />
            歌楼上，红烛昏罗帐。
            <br />
            壮年听雨
            <br />
            客舟中，江阔云低、
            <br />
            断雁叫西风。
            <br />
            而今听雨
            <br />
            僧庐下，鬓已星星也。
            <br />
            悲欢离合总无情。一任阶前、点滴到天明。
          </p>
          <div className="flex-center-box">
            <a
              href="/blog/index/home"
              className="ning-line-btn _fillet _fill m-r-lg"
            >
              My&nbsp;&nbsp;Blog
            </a>
            <a href="/blog/profile" className="ning-line-btn _fillet _fill">
              About&nbsp;&nbsp;Me
            </a>
          </div>
          <div className="content-footer">
            <p>Copyright© 20018 - 2018 n顾盼神飞</p>
            <p>
              <a href="#">weibo</a>
              <a href="#" className="center-tag">
                github
              </a>
              <a href="#">weixin</a>
            </p>
          </div>
        </div>
        <div className="login-box">
          <div id="login_form">
            <div className="form-item">
              <input
                onChange={handleSetUserName}
                type="text"
                placeholder="userName"
              />
              <label className="label-placeholder">UserName</label>
              <i className="ning-icon icon-person"></i>
            </div>
            <div className="form-item">
              <input
                onChange={handleSetPassWord}
                type="password"
                placeholder="password"
              />
              <label className="label-placeholder">PassWord</label>
              <i className="ning-icon icon-password"></i>
            </div>
            <button onClick={signIn} className="ning-line-btn _fillet _cover">
              Sign&nbsp;&nbsp;In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
