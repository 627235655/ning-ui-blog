import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './ning-ui.scss';
import Util from '../../assets/js/util'
import Aside from '../../components/Aside/Aside';
import Container from '../../components/Container/Container';

const nav_list = [{
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
},, {
    text: '模态框',
    id: 'modal',
} ]

class NingUI extends Component {
    constructor(props) {
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