import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './demos-pseudo.scss';
import {
    Link
} from 'react-router-dom';
import CodeBox from 'components/CodeBox/CodeBox';


class PseudoDemos extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="ning-container demo-box">
                    <h4 id="first-letter">:fisrt-letter 伪元素实现 段落首字放大</h4>
                    <div className="example-box">
                        <p className="fisrt-large m-b-md">他不愿阿飞再想这件事，忽然抬头笑道：你看，这棵树上的梅花已开了。 阿飞道：嗯。 李寻欢道：你可知道已开了多少朵？ 阿飞道：十七朵。 李寻欢的心沉落了下去，笑容也冻结。 因为他数过梅花。他了解一个人在数梅花时，那是多么寂寞。 </p>
                        <p className="fisrt-large">冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将苍穹作洪炉，溶万物为白银。雪将住，风未定，一辆马车自北而来，滚动的车轮碾碎了地上的冰雪，却碾不碎天地间的寂寞。李寻欢打了一个哈欠，将两条长腿在柔软的貂皮上尽量伸直，车箱里虽然很温暖很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。人生本就充满了矛盾，任何人都无可奈何。</p>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.fisrt-large:first-letter{
    font-size: 20px;
    font-weight: bold;
}`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="first-line">:fisrt-line 伪元素实现 段落首行字体变色</h4>
                    <div className="example-box">
                        <p className="fisrt-blue m-b-md">他不愿阿飞再想这件事，忽然抬头笑道：你看，这棵树上的梅花已开了。 阿飞道：嗯。 李寻欢道：你可知道已开了多少朵？ 阿飞道：十七朵。 李寻欢的心沉落了下去，笑容也冻结。 因为他数过梅花。他了解一个人在数梅花时，那是多么寂寞。 </p>
                        <p className="fisrt-blue">冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将苍穹作洪炉，溶万物为白银。雪将住，风未定，一辆马车自北而来，滚动的车轮碾碎了地上的冰雪，却碾不碎天地间的寂寞。李寻欢打了一个哈欠，将两条长腿在柔软的貂皮上尽量伸直，车箱里虽然很温暖很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。人生本就充满了矛盾，任何人都无可奈何。</p>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.fisrt-blue:first-line{
    color: #0081fe;
}`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="focus">:focus 伪类实现 输入框样式改变</h4>
                    <div className="example-box">
                        <input type="text" className="focus-input"/>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.focus-input:focus{
    color: #0081fe;
}`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="empty">:empty 伪类实现 内容为空填充默认样式</h4>
                    <div className="example-box">
                        <p>我的名字：<span className="empty-span">顾盼神飞</span></p>
                        <p>我的名字：<span className="empty-span"></span></p>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.empty-span{
    &:empty:before{
        content: '-';
    }
}`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="valid">:valid 伪类实现 表单验证</h4>
                    <div className="example-box">
                        <div className="ning-form-item">
                            <label htmlFor="">邮箱</label>
                            <input className="valid-input" type="email" />
                        </div>
                        <div className="ning-form-item">
                            <label htmlFor="">小于100</label>
                            <input className="valid-input" type="number" min="1" max="100" />
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.valid-input:not(:valid){
    box-shadow: 0 0 0 2px red;
}`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="target">:targer 伪类实现 tab 切换</h4>
                    <div className="example-box">
                        <a className="ning-btn blue" href="#tab1">tab1</a>
                        <a className="ning-btn blue m-l-md" href="#tab2">tab2</a>
                        <div className="target-div" id="tab1">tab1111111111</div>
                        <div className="target-div" id="tab2">tab2222222222</div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.valid-input:not(:valid){
    box-shadow: 0 0 0 2px red;
}`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="type-child">子选择 伪类实现 微信群头像布局</h4>
                    <div className="example-box flex-row-box">
                        <ul className="wx-layout">
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className="wx-layout">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.valid-input:not(:valid){
    box-shadow: 0 0 0 2px red;
}`,
                        }
                    }
                    />
                </div>
            </div>
        )
    }

}

export default PseudoDemos;