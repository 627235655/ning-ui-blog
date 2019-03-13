import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './TagLink.scss';

class TagLink extends Component {
    render() {
        return (
            <span className="tag-link" onClick={() => {this.props.history.replace(`/index/article-list?tagName=${this.props.tagName}`)}}>{this.props.tagName}</span>
        )
    }
}

export default TagLink;