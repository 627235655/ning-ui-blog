import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './ning-editor.scss';


class NingEditor extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    render() {
        return (
            <div className="ning-editor-wrap">
              <div className="ning-editor">
                <div className="ning-editor-menu">
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-h">h 标签</i>
                    <ul className="ning-editor-h-list">
                      <li>设置标签</li>
                      <li><h1>H1</h1></li>
                      <li><h2>H2</h2></li>
                      <li><h3>H3</h3></li>
                      <li><h4>H4</h4></li>
                      <li><h5>H5</h5></li>
                      <li>正文</li>
                    </ul>
                  </span>
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-b">加粗</i>
                  </span>
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-i">倾斜</i>
                  </span>
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-u">下划线</i>
                  </span>
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-d">删除线</i>
                  </span>
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-f">字体</i>
                  </span>
                  <span className="ning-editor-menu-item">
                    <i className="ning-icon icon-t">文字尺寸</i>
                  </span>
                  <span className="ning-editor-menu-item">字色</span>
                  <span className="ning-editor-menu-item">背色</span>
                  <span className="ning-editor-menu-item">对齐</span>
                  <span className="ning-editor-menu-item">列表</span>
                  <span className="ning-editor-menu-item">引用</span>
                  <span className="ning-editor-menu-item">表格</span>
                  <span className="ning-editor-menu-item">链接</span>
                  <span className="ning-editor-menu-item">表情</span>
                  <span className="ning-editor-menu-item">图片</span>
                  <span className="ning-editor-menu-item">视频</span>
                  <span className="ning-editor-menu-item">代码</span>
                  <span className="ning-editor-menu-item">撤销</span>
                  <span className="ning-editor-menu-item">重做</span>
                  <span className="ning-editor-menu-item">html</span>
                  <span className="ning-editor-menu-item">全屏</span>
                  <span className="ning-editor-menu-item">预览</span>
                  <span className="ning-editor-menu-item">帮助</span>
                </div>
                <div className="ning-editor-content" contentEditable="true">
                </div>
              </div>
            </div>
        )
    }
}

export default NingEditor;