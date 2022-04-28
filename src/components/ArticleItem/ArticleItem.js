import TagLink from "@/components//TagLink/TagLink";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ArticleItem.scss";

class ArticleItem extends Component {
  render() {
    let v = this.props.detail;
    return (
      <div className="article-list-item">
        <Link
          to={`/index/article-detail/${v._id}`}
          className="cover"
          style={{ backgroundImage: `url(${v.thumbnailUrl})` }}
        >
          <p className="title elis-2" style={{ WebkitBoxOrient: "vertical" }}>
            {v.articleName}
          </p>
        </Link>
        <div className="content-wrap">
          <div className="p-t-md p-b-md">
            <p className="elis-2" style={{ WebkitBoxOrient: "vertical" }}>
              {v.articleSummary}
            </p>
          </div>
          <div className="footer">
            <p>
              {v.articleTags.map((v2, i2, a2) => {
                return (
                  <TagLink key={i2} tagName={v2} history={this.props.history} />
                );
              })}
            </p>
            <span className="time">
              {new Date(v.createDate).Format().substr(0, 10)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
