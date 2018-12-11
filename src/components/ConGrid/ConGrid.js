import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CodeBox from '../CodeBox/CodeBox';

class ConGrid extends Component {
    render() {
        return (
            <div>
                <h1>栅格<span className="_md">(代码参看源代码)</span></h1>
                <hr/>
                <p>使用单一的一组 ning-Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 ning-Row 内。</p>
                <p>12等分</p>
                <div className="example-box">
                    <div className="ning-row">
                        <div className="col-12">col-12</div>
                        <div className="col-10">col-10</div>
                        <div className="col-2">col-2</div>
                        <div className="col-9">col-9</div>
                        <div className="col-3">col-3</div>
                        <div className="col-8">col-8</div>
                        <div className="col-4">col-4</div>
                        <div className="col-6">col-6</div>
                        <div className="col-6">col-6</div>
                        <div className="col-4">col-4</div>
                        <div className="col-4">col-4</div>
                        <div className="col-4">col-4</div>
                        <div className="col-3">col-3</div>
                        <div className="col-3">col-3</div>
                        <div className="col-3">col-3</div>
                        <div className="col-3">col-3</div>
                        <div className="col-2">col-2</div>
                        <div className="col-2">col-2</div>
                        <div className="col-2">col-2</div>
                        <div className="col-2">col-2</div>
                        <div className="col-2">col-2</div>
                        <div className="col-2">col-2</div>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-row">
                                            <div className="col-n">col-n</div>
                                        </div>`,
                        }
                    }
                />
                <p>偏移</p>
                <div className="example-box">
                    <div className="ning-row">
                        <div className="col-2 col-offset-10">col-offset-10</div>
                        <div className="col-3 col-offset-9">col-offset-9</div>
                        <div className="col-4 col-offset-8">col-offset-8</div>
                        <div className="col-6 col-offset-6">col-offset-6</div>
                        <div className="col-8 col-offset-4">col-offset-4</div>
                        <div className="col-9 col-offset-3">col-offset-3</div>
                        <div className="col-10 col-offset-2">col-offset-2</div>
                    </div>
                </div>
                <CodeBox
                    params={
                        {
                            type: 'html',
                            content: `<div className="ning-row">
                                            <div className="col-n col-offset-n">col-n</div>
                                        </div>`,
                        }
                    }
                />
            </div>
        )
    }
    componentDidMount() {}
}

export default ConGrid;