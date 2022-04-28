import Demos from "@/pages/demos";
import indexHtml from "@/pages/index";
import Login from "@/pages/login";
import NingEditor from "@/pages/ning-editor/ning-editor";
import Profile from "@/pages/profile/profile";
import TimeProgressBar from "@/pages/time-progress-bar/time-progress-bar";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

const BASE_NAME = globalThis.__POWERED_BY_QIANKUN__ ? "/index/react/" : "/blog";

// const Demos = lazy(() => import('@/pages/demos'));

const BasicRoute = () => {
  return (
    <Router basename={BASE_NAME}>
      <Switch>
        <Route path="/index" component={indexHtml} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/time-progress-bar" component={TimeProgressBar} />
        <Route path="/ning-editor" component={NingEditor} />
        <Route path="/demos" component={Demos} />
        <Redirect path="/" exact={true} to="/index/home" />
      </Switch>
    </Router>
  );
};

export default BasicRoute;
