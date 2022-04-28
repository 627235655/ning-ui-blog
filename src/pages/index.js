import ning_ui from "@/assets/ning-ui/js";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ArticleDetail from "./article-detail/article-detail";
import ArticleList from "./article-list/article-list";
import PseudoDemos from "./demos-pseudo/demos-pseudo";
import Demos from "./demos/demos";
import Home from "./home";
import NingUI from "./ning-ui/ning-ui";

const IndexHtml = (props) => {
  console.log("IndexHtml render");

  const [returnTopVisible, setReturnTopVisible] = useState(false);

  useEffect(() => {
    ning_ui.init();
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);

  const onscroll = (e) => {
    var doc = document.body.scrollTop
      ? document.body
      : document.documentElement;
    let returnTopVisible = doc.scrollTop - doc.clientHeight > 0;
    setReturnTopVisible(returnTopVisible);
  };

  const returnTop = () => {
    let doc = document.body.scrollTop
      ? document.body
      : document.documentElement;
    Math.easeout(doc.scrollTop, 0, 5, function (value) {
      doc.scrollTop = value;
    });
  };

  return (
    <div>
      <Header {...props} />
      <div className="common-container">
        <Route path="/index/home" component={Home} />
        <Route path="/index/ning-ui" component={NingUI} />
        <Route path="/index/article-list" component={ArticleList} />
        <Route path="/index/article-detail/:id" component={ArticleDetail} />
        <Route path="/index/demos" component={Demos} />
        <Route path="/index/pseudo-demos" component={PseudoDemos} />
      </div>
      <Footer />
      <button
        className={"return-top" + (returnTopVisible ? " active" : "")}
        onClick={() => returnTop()}
      >
        返回顶部
      </button>
    </div>
  );
};

export default IndexHtml;
