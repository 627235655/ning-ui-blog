import TagLink from "@/components/TagLink/TagLink";
import { STATE_CODE } from "@/constants";
import * as API from "@/server";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import antdAdmin from "~/static/images/antd-admin.png";
import blogAdmin from "~/static/images/blog-admin.png";
import blogArticleList from "~/static/images/blog-article-list.png";
import blogChart from "~/static/images/blog-chart.png";
import blogHexo from "~/static/images/blog-hexo.png";
import ningUi from "~/static/images/ning-ui.png";
import onlineResume from "~/static/images/online-resume.png";
import "./index.scss";

const workList = [
  {
    name: "ning-ui",
    nameUrl: "/blog/index/ning-ui/mind",
    descList: [
      {
        desc: "Ant Design 的设计理念"
      },
      {
        desc: "原生 Js 和 Css，不拘泥于框架"
      },
      {
        desc: "单标签 Icon，轻便易用"
      }
    ],
    github_url:
      "https://github.com/627235655/ning-ui-blog/tree/master/src/assets/ning-ui",
    imgAdress: ningUi
  },
  {
    name: "antd-admin",
    descList: [
      {
        desc: "基于 Antd，后台管理系统"
      },
      {
        desc: "解耦项目，颗粒度的页面配置及控制"
      },
      {
        desc: "多 Tab 子页面，提升效率"
      }
    ],
    github_url: "https://github.com/627235655/antd-admin-framework",
    imgAdress: antdAdmin
  },
  {
    name: "my-blog",
    nameUrl: "/blog/index/article-list",
    descList: [
      {
        desc: "自由设计，随心所欲"
      },
      {
        desc: "React + Node + MongoDB"
      },
      {
        desc: "记录前端路上的点滴"
      }
    ],
    github_url: "https://github.com/627235655/ning-ui-blog",
    imgAdress: blogArticleList
  },
  {
    name: "blog-admin",
    nameUrl: "/blog/index/article-list",
    descList: [
      {
        desc: "集成 MarkDown 编辑器"
      },
      {
        desc: "Vue + MongoDB + ning-ui"
      },
      {
        desc: "博客相关，数据可视化"
      }
    ],
    github_url: "https://github.com/627235655/ning-ui-blog/admin",
    imgAdress: blogAdmin
  },
  {
    name: "online-resume",
    nameUrl: "/blog/profile",
    descList: [
      {
        desc: "欲将心事付瑶琴"
      },
      {
        desc: "G2 + Swiper + Canvas"
      },
      {
        desc: "知音少，弦断有谁听"
      }
    ],
    imgAdress: onlineResume
  },
  {
    name: "hexo-blog",
    nameUrl: "https://627235655.github.io/#",
    descList: [
      {
        desc: "静态资源博客"
      },
      {
        desc: "hexo + github"
      },
      {
        desc: "样式自定义，已弃用"
      }
    ],
    github_url: "https://github.com/627235655/627235655.github.io",
    imgAdress: blogHexo
  }
];

export default function Home(props: RouteComponentProps) {
  console.log("props", props);
  const { history } = props;

  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    const res = await API.getArticleList({
      currentPage: 1,
      pageSize: 4
    });
    if (res.status === STATE_CODE.success) {
      setArticleList(res.data.list || []);
    }
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <div id="home">
      <div className="ning-container flex-col-box">
        {/* 个人介绍 */}
        <section className="overview">
          <div className="profile-wrap">
            <div className="head" />
            <h1>n顾盼神飞</h1>
            <p>享受生命中每一个脚步</p>
            <Link to="/profile" className="ning-line-btn _fillet _fill blue">
              关于我
            </Link>
          </div>
          <ul className="work-list">
            {workList.map((v) => (
              <li key={v.name}>
                <img
                  className="ning-imgview-trigger"
                  src={v.imgAdress}
                  alt={v.name}
                />
                <div>
                  <h2>
                    {v.nameUrl ? (
                      <a target="_blank" href={v.nameUrl} rel="noreferrer">
                        {v.name}
                      </a>
                    ) : (
                      v.name
                    )}
                  </h2>
                  {v.descList.map((v2, i2) => {
                    return <p key={i2}>{v2.desc}</p>;
                  })}
                </div>
                {v.github_url && (
                  <a
                    target="_blank"
                    href={v.github_url}
                    className="github-badge"
                    rel="noreferrer"
                  >
                    Fork me on GitHub
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="flex-row-box">
          <div className="blog-desc-wrap">
            <div className="blog-desc">
              <p className="_lg _bold m-b-md">技术博客</p>
              <p>
                搭建博客，构思久已
                <br />
                却停滞于行动，此次趁着受人之托，得以窥见其中一二
                <br />
                <br />
                享受生命中每一个脚步
                <br />
                <a href="/index/home">前台博客系统</a>
                基于 <a href="https://github.com/reactjs/reactjs.org">react</a>
                ，<a href="/admin.html">后台管理系统</a>
                基于 <a href="https://github.com/vuejs/vue">vue</a>
                ，UI 基于自造框架 <a href="/index/ning-ui/mind">ning-ui</a>
                <br />
                知行合一，如是而已
              </p>
            </div>
            <img className="blog-chart" src={blogChart} alt="" />
          </div>
          <div className="col-6 blog-list">
            <div className="flex-col-box">
              <ul>
                <li className="flex-row-box flex-center-box">
                  <span className="_bold flex-center-box">
                    <i className="ning-icon icon-article m-r-sm" />
                    Blogs
                  </span>
                  <Link to="/index/article-list" className="flex-center-box">
                    <i className="ning-icon icon-more m-r-sm" />
                  </Link>
                </li>
                {articleList.map((v: any) => (
                  <li key={v._id} className="blog-list-item">
                    <span className="flex-1 content-wrap flex-col-box">
                      <Link to={`/index/article-detail/${v._id}`}>
                        <span
                          className="title"
                          style={{
                            WebkitBoxOrient: "vertical"
                          }}
                        >
                          {v.articleName}
                        </span>
                      </Link>
                      <span
                        className="summary"
                        style={{
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        {v.articleSummary}
                      </span>
                      <span className="flex-row-box">
                        <span>
                          {v.articleTags.map((v2: object, i2: number) => {
                            return (
                              <TagLink
                                key={i2}
                                tagName={v2}
                                history={history}
                              />
                            );
                          })}
                        </span>
                        <span className="_xs _gray">
                          {new Date(v.createDate).Format().substr(0, 10)}
                        </span>
                      </span>
                    </span>
                    <img src={v.thumbnailUrl} alt={v.articleName} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
