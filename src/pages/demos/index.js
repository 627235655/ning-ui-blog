import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header";
import React, { lazy, Suspense, useEffect } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import "./index.scss";

const routes = [
  {
    path: "/demos",
    title: "主页",
    to: "/demos/demos"
  },
  {
    path: "/demos/demos",
    title: "demos",
    component: lazy(() => import("./demos"))
  },
  {
    path: "/demos/layout",
    title: "layout 相关",
    component: lazy(() => import("./layout"))
  },
  {
    path: "/demos/css-collapse",
    title: "css 实现展开收取",
    component: lazy(() => import("./css-collapse"))
  },
  {
    path: "/demos/css-collapse-demo",
    title: "css 实现展开收取 demo",
    component: lazy(() => import("./css-collapse-demo"))
  }
];

const Demos = (props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header {...props} />
      <div className="demos">
        <div className="demos-aside">
          {routes.map((v) => (
            <Link key={v.path} to={v.path}>
              {v.title}
            </Link>
          ))}
        </div>
        <div className="demos-content">
          <Suspense
            fallback={
              <div>
                <div>模块加载...</div>
              </div>
            }
          >
            <Switch>
              {routes.length &&
                routes.map((v, i) => {
                  if (v.to) {
                    return (
                      <Route key={i} path={v.path} exact>
                        <Redirect to={v.to} />
                      </Route>
                    );
                  }
                  return (
                    <Route
                      key={i}
                      path={v.path}
                      component={v.component}
                      exact
                    />
                  );
                })}
            </Switch>
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Demos;
