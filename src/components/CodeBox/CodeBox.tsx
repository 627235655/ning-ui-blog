import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ConBox.scss'

interface IProps{
    params: any;
}

interface IState{
    is_active: boolean;
}

class CodeBox extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            is_active: false,
        }
    }

    render() {
        let params = this.props.params;
        return (
            <div className="code-box">
                <pre className={this.state.is_active ? 'active' : ''}>
                    <code className={params.type}>
                        {params.content}
                    </code>
                </pre>
                <div
                    className="code-toggle"
                    onClick={() => {this.setState({
                        is_active: !this.state.is_active
                    })}}
                >{this.state.is_active ? '收起代码' : '显示代码'}</div>
            </div>
        )
    }
}

export default CodeBox;