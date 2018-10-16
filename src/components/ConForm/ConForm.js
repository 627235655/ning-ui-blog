import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConForm extends Component {
    render() {
        return (
            <div>
                <h1>表单工具<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <div className="ning-summary">注意，所有表单元素样式必须在父元素为<code>class="ning-form-item"</code>的情况下才生效，下文默认该 UI 组件父元素含有该类名。</div>
                <p>Input</p>
                <ul className="style-ul m-t-sm">
                    <li>带图标的输入框还得继续优化</li>
                </ul>
                <div className="example-box" id="test">
                    <div className="ning-form-item">
                        <label htmlFor="">普通输入框</label>
                        <input type="text"/>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">100输入框</label>
                        <input type="text" className="flex-1"/>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">警告输入框</label>
                        <input type="text" className="warning" />
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">禁用输入框</label>
                        <input type="text" disabled/>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">图标输入框</label>
                        <div className="icon-input append">
                            <span className="ning-icon icon-search"></span>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">图标输入框</label>
                        <div className="icon-input prepend">
                            <span className="ning-icon icon-search"></span>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">按钮输入框</label>
                        <div className="button-input append">
                            <input type="text"/>
                            <button className="ning-btn">搜索</button>
                        </div>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">按钮输入框</label>
                        <div className="button-input prepend">
                            <button className="ning-btn">搜索</button>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">按钮输入框</label>
                        <div className="button-input append">
                            <input type="text"/>
                            <button className="ning-btn _white">
                                <span className="ning-icon icon-search "></span>
                            </button>
                        </div>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">数字输入框</label>
                        <input type="number"/>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">日期选择</label>
                        <input type="date"/>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">单选框</label>
                        <input type="radio" name="radio"  value="选项一" defaultChecked/><span className="virtual-radio"></span> 选项一
                        <input type="radio" name="radio" value="选项二" /><span className="virtual-radio"></span> 选项二
                        <input type="radio" name="radio1" disabled defaultChecked/><span className="virtual-radio"></span> 禁用选项一
                        <input type="radio" name="radio1" disabled/><span className="virtual-radio"></span> 禁用选项二

                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">复选框</label>
                        <input type="checkbox" defaultChecked/><span className="virtual-checkbox"></span> 选项一
                        <input type="checkbox"/><span className="virtual-checkbox"></span> 选项二
                        <input type="checkbox" disabled defaultChecked/><span className="virtual-checkbox"></span> 禁用选项一
                        <input type="checkbox" disabled/><span className="virtual-checkbox"></span> 禁用选项二
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">文件上传</label>
                        <label className="ning-btn file-upload" htmlFor="file_upload">选择文件</label>
                        <input type="file" id="file_upload"/>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<input type="text"/>
                                    <input type="text" className="flex-1"/>
                                    <input type="text" className="warning" />
                                    <input type="text" disabled/>
                                    <div className="search-input">
                                        <span className="search-icon"></span>
                                        <input type="text"/>
                                    </div>`,
                        }
                    }
                />
                <p>Select</p>
                <ul className="style-ul m-t-sm">
                    <li>还是用div模拟的好，不然多选下拉和带搜索的下拉不好实现</li>
                </ul>
                <div className="example-box" id="test">
                    <div className="ning-form-item">
                        <label htmlFor="">普通下拉框</label>
                        <select name="" id="">
                            <option value="">条目一</option>
                            <option value="">条目二</option>
                        </select>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">禁用下拉框</label>
                        <select name="" id="" className="warning">
                            <option value="">条目一</option>
                            <option value="">条目二</option>
                        </select>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">禁用下拉框</label>
                        <select name="" id="" disabled>
                            <option value="">条目一</option>
                            <option value="">条目二</option>
                        </select>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">div下拉框</label>
                        <div role="select" className="virtual-select">
                            请选择
                            <ul className="virtual-options">
                                <li>条目一</li>
                                <li className="active">条目二</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">多选下拉框</label>
                        <div role="select" className="virtual-select">
                            请选择
                            <ul className="virtual-options">
                                <li className="ning-form-item"><input type="checkbox"/><span className="virtual-checkbox"></span>条目一</li>
                                <li className="active">条目二</li>
                                <li>条目一</li>
                                <li>条目一</li>
                                <li>条目一条目一条目一</li>
                                <li>条目一</li>
                                <li>条目一</li>
                                <li>条目一</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<input type="text"/>
                                    <input type="text" className="flex-1"/>
                                    <input type="text" className="warning" />
                                    <input type="text" disabled/>
                                    <div className="search-input">
                                        <span className="search-icon"></span>
                                        <input type="text"/>
                                    </div>`,
                        }
                    }
                />
                <p>Textarea</p>
                <ul className="style-ul m-t-sm">
                    <li>文本框默认三行</li>
                </ul>
                <div className="example-box" id="test">
                    <div className="ning-form-item">
                        <label htmlFor="">普通文本框</label>
                        <textarea name="" maxLength="100"></textarea>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">禁用文本框</label>
                        <textarea name="" className="warning"></textarea>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">禁用文本框</label>
                        <textarea name="" maxLength="100" disabled></textarea>
                    </div>
                    <div className="ning-form-item">
                        <label htmlFor="">自适应高度</label>
                        <textarea name="" maxLength="1000" className="auto-height-textarea"></textarea>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'js',
                            content: `<input type="text"/>
                                    <input type="text" className="flex-1"/>
                                    <input type="text" className="warning" />
                                    <input type="text" disabled/>
                                    <div className="search-input">
                                        <span className="search-icon"></span>
                                        <input type="text"/>
                                    </div>`,
                        }
                    }
                />
            </div>
        )
    }
    componentDidMount() {
    }
}

export default ConForm;