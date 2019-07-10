import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './TagLink.scss';

interface Iprops{
    history: any;
    tagName: string;
}

class TagLink extends React.Component<Iprops> {
    render() {
        return (
            <span className="tag-link" onClick={() => {this.props.history.replace(`/index/article-list?tagName=${this.props.tagName}`)}}>{this.props.tagName}</span>
        )
    }
}

export default TagLink;