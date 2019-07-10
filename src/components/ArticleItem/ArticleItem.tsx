import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import './ArticleItem.scss';
import TagLink from 'components/TagLink/TagLink'
import util from 'assets/js/utils';

interface IProps{
    detail: any;
    history: any;
}

class ArticleItem extends React.Component<IProps> {
    render() {
        let v = this.props.detail;
        return (
            <div className="article-list-item">
                <Link  to={`/index/article-detail/${v._id}`} className="cover" style={{backgroundImage: `url(${v.thumbnailUrl})`}}>
                    <p className="title elis-2" style={{"WebkitBoxOrient": "vertical"}}>{v.articleName}</p>
                </Link>
                <div className="content-wrap">
                    <div className="p-t-md p-b-md">
                        <p className="elis-2" style={{"WebkitBoxOrient": "vertical"}}>{v.articleSummary}</p>
                    </div>
                    <div className="footer">
                        <p>
                        {
                            v.articleTags.map((v2: any, i2: number) => {
                                return <TagLink
                                            key={i2}
                                            tagName={v2}
                                            history={this.props.history}
                                        />
                            })
                        }
                        </p>
                        <span className="time">{new Date(v.createDate).Format().substr(0,10)}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleItem;