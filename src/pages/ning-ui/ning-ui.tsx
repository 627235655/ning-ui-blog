import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ning-ui.scss';
import Aside from './Aside/Aside';
import Container from './Container/Container';

const nav_list: Array<object> = [{
    text: '思想',
    id: 'mind',
}, {
    text: '颜色及文字',
    id: 'text',
}, {
    text: '按钮',
    id: 'button',
}, {
    text: '栅格',
    id: 'grid',
}, {
    text: '布局',
    id: 'layout',
}, {
    text: '面包屑',
    id: 'breadcrumb',
}, {
    text: '标签页',
    id: 'tabs',
}, {
    text: '表单',
    id: 'form',
}, {
    text: '表格',
    id: 'table',
}, {
    text: '工具组件',
    id: 'utils',
}, {
    text: '图标',
    id: 'icon',
}
, {
    text: '动画',
    id: 'animation',
}, {
    text: '模态框',
    id: 'modal',
} ]


interface IProps{
    location: any;
}

interface States{
    nav_list: Array<object>;
}

class NingUI extends React.Component<IProps, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            nav_list,
        }
    }

    render() {
        return (
            <div id="ning_ui">
            	<div className="ning-container flex-box">
            		<Aside
                        nav_list={this.state.nav_list}
                        pathname={this.props.location.pathname}
                    />
            		<Container
                        nav_list={this.state.nav_list}
                        pathname={this.props.location.pathname}
                    />
                </div>
            </div>
        )
    }
}

export default NingUI;