import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';
import modal from 'assets/ning-ui/js/modal'

class ConMind extends Component {
    openModal = (modal_id) => {
        modal.open(modal_id)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="flex-col-box">
                <h1>模态框</h1>
                <hr/>
                <p>理想做的是一个开放，可配置的 modal。HTML 格式-三段划分，头部 title、中间 content、底部 footer，当然 content 必不可少</p>
                <div className="example-box">
                    <div className="flex-box">
                        <button className="ning-btn" onClick={() => this.openModal('modal1')}>完整的模态框</button>
                        <button className="ning-btn m-l-md" onClick={() => this.openModal('modal3')}>无 footer</button>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-modal-wrap active">
    <div className="ning-modal">
        <div className="ning-modal-header">
            <span>标题</span>
            <i className="ning-modal-close-btn ning-icon icon-plus"></i>
        </div>
        <div className="ning-modal-content">内容</div>
        <div className="ning-modal-footer">
            <button className="ning-btn">确定</button>
            <button className="ning-btn _white m-l-md">取消</button>
        </div>
    </div>
</div>`,
                        }
                    }
                />

                <div className="ning-modal-wrap" id="modal1">
                    <div className="ning-modal">
                        <div className="ning-modal-header">
                            <span>标题</span>
                            <i tabIndex="1" className="ning-modal-close-btn ning-icon icon-plus"></i>
                        </div>
                        <div className="ning-modal-content">内容</div>
                        <div className="ning-modal-footer">
                            <button className="ning-btn">确定</button>
                            <button className="ning-modal-close-btn ning-btn _white m-l-md">取消</button>
                        </div>
                    </div>
                </div>
                <div className="ning-modal-wrap" id="modal3">
                    <div className="ning-modal">
                        <div className="ning-modal-header">
                            <span>标题</span>
                            <i tabIndex="1" className="ning-modal-close-btn ning-icon icon-plus"></i>
                        </div>
                        <div className="ning-modal-content">内容</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConMind;