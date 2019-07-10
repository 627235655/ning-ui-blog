import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './demos.scss';
import {
    Link
} from 'react-router-dom';
import TagLink from 'components/TagLink/TagLink'
// import pic_1 from 'assets/images/random/material-5.png'
// import pic_2 from 'assets/images/random/material-8.png'
// import pic_3 from 'assets/images/random/material-6.png'
import CodeBox from 'components/CodeBox/CodeBox';

const pic_1 = require('assets/images/random/material-5.png');
const pic_2 = require('assets/images/random/material-8.png');
const pic_3 = require('assets/images/random/material-6.png');

const slider_class_config: Array<object> = [{
    className: 'fade',
    title: 'opacity-淡入淡出'
},{
    className: 'scale',
    title: 'scale-放大缩小-中'
},{
    className: 'scale-l',
    title: 'scaleX-展开折叠-左'
},{
    className: 'scale-r',
    title: 'scaleX-展开折叠-右'
},{
    className: 'scale-t',
    title: 'scaleY-展开折叠-上'
},{
    className: 'scale-b',
    title: 'scaleY-展开折叠-下'
},{
    className: 'translate-t',
    title: 'translateY-滑入滑出-上'
},{
    className: 'translate-r',
    title: 'translateX-滑入滑出-右'
},{
    className: 'translate-b',
    title: 'translateY-滑入滑出-下'
},{
    className: 'translate-l',
    title: 'translateX-滑入滑出-左'
},{
    className: 'rotate-x',
    title: 'rotateX-上下翻转'
},{
    className: 'rotate-y',
    title: 'rotateY-左右翻转'
}]

const slider_class_config_clip_path: Array<object> = [{
    className: 'clip-circle',
    title: '圆形效果'
},{
    className: 'clip-triangle',
    title: '三角效果'
},{
    className: 'clip-radius',
    title: '圆角矩形效果'
},{
    className: 'clip-diamond',
    title: '菱形效果'
},{
    className: 'clip-to-react',
    title: '十字星到矩形效果'
},{
    className: 'clip-sector',
    title: '扇形效果'
},{
    className: 'clip-123',
    title: '自定义效果'
}]

const slider_class_config_mask: Array<object> = [{
    className: 'clip-circle',
    title: '圆形'
}]


interface IProps{

}

interface IState{
    articleList: Array<any>;
    active_slider_num: number;
    active_slider_class: string;
    shape_box_1_class: string;
    shape_box_4_class: string;
    grid6_class: string;
    grid8_class: string;
}

class Demos extends React.Component<IProps, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
            articleList: [],
            active_slider_num: 1,
            active_slider_class: 'fade',
            shape_box_1_class: 'none',
            shape_box_4_class: 'circle1',
            grid6_class: 'stretch6',
            grid8_class: 'row8',
        }
    }

    handleSlider(num: number) {
        this.setState({
            active_slider_num: num,
        });
    }

    setSliderActiveClass = (e: any) => {
        this.setState({
            active_slider_class: e.target.value,
        });
    }

    componentDidMount() {
        this.autoChange();
    }

    autoChange = () => {
        setInterval(() => {
            let num = this.state.active_slider_num === 3 ? 1 : this.state.active_slider_num + 1;
            this.setState({
                active_slider_num: num,
            });
        }, 2000)
    }

    setShapeOutsideClass = (e: any) => {
        this.setState({
            shape_box_1_class: e.target.value
        });
    }

    setShapeOutside4Class = (e: any) => {
        this.setState({
            shape_box_4_class: e.target.value
        });
    }

    setGrid6Class = (e: any) => {
        this.setState({
            grid6_class: e.target.value
        });
    }

    setGrid8Class = (e: any) => {
        this.setState({
            grid8_class: e.target.value
        });
    }

	render() {
		return (
            <div>
                <div className="ning-container demo-box" id="grid">
                    <h4>grid 布局</h4>
                    <div className="example-box flex-row-box">
                        <div className="grid2">
                            <div>网格一</div>
                            <div>网格二</div>
                            <div>网格三</div>
                            <div>网格四</div>
                        </div>
                        <div className="grid3">
                            <div>网格一</div>
                            <div>网格二</div>
                            <div>网格三</div>
                            <div>网格四</div>
                        </div>
                        <div className="grid4">
                            <div>宽度：auto</div>
                            <div>宽度：1fr</div>
                            <div>宽度：1fr</div>
                            <div>宽度：1fr</div>
                        </div>
                        <div className="grid5">
                            <div>宽度：auto</div>
                            <div>宽度：.25fr</div>
                            <div>宽度：.25fr</div>
                            <div>宽度：.25fr</div>
                        </div>
                        <div className="grid1">
                            <div className="con">主体</div>
                            <div className="aside1">侧边栏</div>
                            <div className="header">顶部</div>
                            <div className="footer">尾部</div>
                        </div>
                        <div>
                            <div className="ning-form-item">
                                <label className="w-auto">justify-items：</label>
                                <div className="flex-1 flex-box">
                                    <label htmlFor='stretch6' className="radio-label">
                                        <input
                                            id='stretch6'
                                            value='stretch6'
                                            type="radio"
                                            name="radio6"
                                            defaultChecked={this.state.grid6_class === 'stretch6'}
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        stretch
                                    </label>
                                    <label htmlFor='start6' className="radio-label">
                                        <input
                                            id='start6'
                                            value='start6'
                                            type="radio"
                                            name="radio6"
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        start
                                    </label>
                                    <label htmlFor='end6' className="radio-label">
                                        <input
                                            id='end6'
                                            value='end6'
                                            type="radio"
                                            name="radio6"
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        end
                                    </label>
                                    <label htmlFor='center6' className="radio-label">
                                        <input
                                            id='center6'
                                            value='center6'
                                            type="radio"
                                            name="radio6"
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        center
                                    </label>
                                </div>
                            </div>
                            <div className="ning-form-item">
                                <label className="w-auto">align-items：</label>
                                <div className="flex-1 flex-box">
                                    <label htmlFor='stretch7' className="radio-label">
                                        <input
                                            id='stretch7'
                                            value='stretch7'
                                            type="radio"
                                            name="radio7"
                                            defaultChecked={this.state.grid6_class === 'stretch7'}
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        stretch
                                    </label>
                                    <label htmlFor='start7' className="radio-label">
                                        <input
                                            id='start7'
                                            value='start7'
                                            type="radio"
                                            name="radio7"
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        start
                                    </label>
                                    <label htmlFor='end7' className="radio-label">
                                        <input
                                            id='end7'
                                            value='end7'
                                            type="radio"
                                            name="radio7"
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        end
                                    </label>
                                    <label htmlFor='center7' className="radio-label">
                                        <input
                                            id='center7'
                                            value='center7'
                                            type="radio"
                                            name="radio7"
                                            onChange={(e: any) => this.setGrid6Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        center
                                    </label>
                                </div>
                            </div>
                            <div className={"grid6 " + this.state.grid6_class}>
                                <div>
                                    <img src={pic_1} alt=""/>
                                </div>
                                <div>
                                    <img src={pic_1} alt=""/>
                                </div>
                                <div>
                                    <img src={pic_1} alt=""/>
                                </div>
                                <div>
                                    <img src={pic_1} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="grid7">
                            <div className="item1"></div>
                            <div className="item2"></div>
                            <div className="item3"></div>
                        </div>
                        <div>
                            <div className="ning-form-item">
                                <label className="w-auto">grid-auto-flow: </label>
                                <div className="flex-1 flex-box">
                                    <label htmlFor='row8' className="radio-label">
                                        <input
                                            id='row8'
                                            value='row8'
                                            type="radio"
                                            name="radio8"
                                            defaultChecked={this.state.grid8_class === 'row8'}
                                            onChange={(e: any) => this.setGrid8Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        row
                                    </label>
                                    <label htmlFor='column8' className="radio-label">
                                        <input
                                            id='column8'
                                            value='column8'
                                            type="radio"
                                            name="radio8"
                                            onChange={(e: any) => this.setGrid8Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        column
                                    </label>
                                    <label htmlFor='row-dense8' className="radio-label">
                                        <input
                                            id='row-dense8'
                                            value='row-dense8'
                                            type="radio"
                                            name="radio8"
                                            onChange={(e: any) => this.setGrid8Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        row dense
                                    </label>
                                    <label htmlFor='column-dense8' className="radio-label">
                                        <input
                                            id='column-dense8'
                                            value='column-dense8'
                                            type="radio"
                                            name="radio8"
                                            onChange={(e: any) => this.setGrid8Class(e)}/>
                                        <span className="virtual-radio"></span>
                                        column dense
                                    </label>
                                </div>
                            </div>
                                <div className={"grid8 " + this.state.grid8_class }>
                                    <div className="item-a"></div>
                                    <div className="item-b"></div>
                                    <div className="item-c"></div>
                                    <div className="item-d"></div>
                                    <div className="item-e"></div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box" id="shape">
                    <h4>shapes 布局</h4>
                    <div className="example-box shapes1">
                        <div className="ning-form-item">
                            <label className="w-auto">shape-outside：</label>
                            <div className="flex-1 flex-box">
                                <label htmlFor='none' className="radio-label">
                                    <input
                                        id='none'
                                        value='none'
                                        type="radio"
                                        name="radio1"
                                        defaultChecked={this.state.shape_box_1_class === 'none'}
                                        onChange={(e: any) => this.setShapeOutsideClass(e)}/>
                                    <span className="virtual-radio"></span>
                                    none
                                </label>
                                <label htmlFor='content-box' className="radio-label">
                                    <input
                                        id='content-box'
                                        value='content-box'
                                        type="radio"
                                        name="radio1"
                                        onChange={(e: any) => this.setShapeOutsideClass(e)}/>
                                    <span className="virtual-radio"></span>
                                    content-box
                                </label>
                                <label htmlFor='padding-box' className="radio-label">
                                    <input
                                        id='padding-box'
                                        value='padding-box'
                                        type="radio"
                                        name="radio1"
                                        onChange={(e: any) => this.setShapeOutsideClass(e)}/>
                                    <span className="virtual-radio"></span>
                                    padding-box
                                </label>
                                <label htmlFor='border-box' className="radio-label">
                                    <input
                                        id='border-box'
                                        value='border-box'
                                        type="radio"
                                        name="radio1"
                                        onChange={(e: any) => this.setShapeOutsideClass(e)}/>
                                    <span className="virtual-radio"></span>
                                    border-box
                                </label>
                                <label htmlFor='margin-box' className="radio-label">
                                    <input
                                        id='margin-box'
                                        value='margin-box'
                                        type="radio"
                                        name="radio1"
                                        onChange={(e: any) => this.setShapeOutsideClass(e)}/>
                                    <span className="virtual-radio"></span>
                                    margin-box
                                </label>
                            </div>
                        </div>
                        <div>
                            <span className={"shape-box-1 " + this.state.shape_box_1_class }></span>
                        冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将穹苍作烘炉，熔万物为白银。
　　雪将住，风未定，一辆马车自北而来，滚动的车轮辗碎了地上的冰雪，却辗不碎天地间的寂寞。
　　李寻欢打了个呵欠，将两条长腿在柔软的貂皮上尽量伸直，车厢里虽然很温暖，很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生最厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。
　　“人生本就充满了矛盾，任何人都无可奈何。”
　　李寻欢叹了口气，自角落中摸出了个酒瓶，他大口地喝着酒时，也大声地咳嗽起来，不停的咳嗽使得他苍白的脸上，泛起一种病态的嫣红，就仿佛地狱中的火焰，正在焚烧着他的肉体与灵魂。
　　酒瓶空了，他就拿起把小刀，开始雕刻一个人像，刀锋薄而锋锐，他的手指修长而有力。
　　这是个女人的人像，在他纯熟的手法下，这人像的轮廓和线条看来是那么柔和而优美，看来就像是活的。
　　他不但给了“她”动人的线条，也给了她生命和灵魂，只因他的生命和灵魂已悄悄地自刀锋下溜走。
　　他已不再年轻。
　　他眼角布满了皱纹，每一条皱纹里都蓄满了他生命中的忧患和不幸，只有他的眼睛，却是年轻的。
　　这是双奇异的眼睛，竟仿佛是碧绿色的，仿佛春风吹动的柳枝，温柔而灵活，又仿佛夏日阳光下的海水，充满了令人愉快的活力。
　　也许就因为这双眼睛，才使他能活到如今。
　　现在人像终于完成了，他痴痴地瞧着这人像，也不知瞧了多少时候，然后他突然推开车门，跳了下去。
                        </div>
                    </div>
                    <div className="example-box shapes4">
                        <div className="ning-form-item">
                            <label className="w-auto">shape-outside：</label>
                            <div className="flex-1 flex-box">
                                <label htmlFor='circle1' className="radio-label">
                                    <input
                                        id='circle1'
                                        value='circle1'
                                        type="radio"
                                        name="radio4"
                                        defaultChecked={this.state.shape_box_4_class === 'circle1'}
                                        onChange={(e: any) => this.setShapeOutside4Class(e)}/>
                                    <span className="virtual-radio"></span>
                                    circle(50% at 50% 50%)
                                </label>
                                <label htmlFor='ellipse1' className="radio-label">
                                    <input
                                        id='ellipse1'
                                        value='ellipse1'
                                        type="radio"
                                        name="radio4"
                                        onChange={(e: any) => this.setShapeOutside4Class(e)}/>
                                    <span className="virtual-radio"></span>
                                    ellipse(45px 25px at 50% 50%)
                                </label>
                                <label htmlFor='inset' className="radio-label">
                                    <input
                                        id='inset'
                                        value='inset'
                                        type="radio"
                                        name="radio4"
                                        onChange={(e: any) => this.setShapeOutside4Class(e)}/>
                                    <span className="virtual-radio"></span>
                                    inset(10px 20px 30px 40px round 10px);
                                </label>
                                <label htmlFor='polygon' className="radio-label">
                                    <input
                                        id='polygon'
                                        value='polygon'
                                        type="radio"
                                        name="radio4"
                                        onChange={(e: any) => this.setShapeOutside4Class(e)}/>
                                    <span className="virtual-radio"></span>
                                    polygon(0 0, 0 150px, 100px 200px);
                                </label>
                            </div>
                        </div>
                        <div>
                            <span className={"shape-box-4 " + this.state.shape_box_4_class }></span>
                        冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将穹苍作烘炉，熔万物为白银。
　　雪将住，风未定，一辆马车自北而来，滚动的车轮辗碎了地上的冰雪，却辗不碎天地间的寂寞。
　　李寻欢打了个呵欠，将两条长腿在柔软的貂皮上尽量伸直，车厢里虽然很温暖，很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生最厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。
　　“人生本就充满了矛盾，任何人都无可奈何。”
　　李寻欢叹了口气，自角落中摸出了个酒瓶，他大口地喝着酒时，也大声地咳嗽起来，不停的咳嗽使得他苍白的脸上，泛起一种病态的嫣红，就仿佛地狱中的火焰，正在焚烧着他的肉体与灵魂。
　　酒瓶空了，他就拿起把小刀，开始雕刻一个人像，刀锋薄而锋锐，他的手指修长而有力。
　　这是个女人的人像，在他纯熟的手法下，这人像的轮廓和线条看来是那么柔和而优美，看来就像是活的。
　　他不但给了“她”动人的线条，也给了她生命和灵魂，只因他的生命和灵魂已悄悄地自刀锋下溜走。
　　他已不再年轻。
　　他眼角布满了皱纹，每一条皱纹里都蓄满了他生命中的忧患和不幸，只有他的眼睛，却是年轻的。
　　这是双奇异的眼睛，竟仿佛是碧绿色的，仿佛春风吹动的柳枝，温柔而灵活，又仿佛夏日阳光下的海水，充满了令人愉快的活力。
　　也许就因为这双眼睛，才使他能活到如今。
　　现在人像终于完成了，他痴痴地瞧着这人像，也不知瞧了多少时候，然后他突然推开车门，跳了下去。
                        </div>
                    </div>
                    <div className="example-box shapes2">
                        <div>
                            <span className="shape-box-2"></span>
                        冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将穹苍作烘炉，熔万物为白银。
　　雪将住，风未定，一辆马车自北而来，滚动的车轮辗碎了地上的冰雪，却辗不碎天地间的寂寞。
　　李寻欢打了个呵欠，将两条长腿在柔软的貂皮上尽量伸直，车厢里虽然很温暖，很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生最厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。
　　“人生本就充满了矛盾，任何人都无可奈何。”
　　李寻欢叹了口气，自角落中摸出了个酒瓶，他大口地喝着酒时，也大声地咳嗽起来，不停的咳嗽使得他苍白的脸上，泛起一种病态的嫣红，就仿佛地狱中的火焰，正在焚烧着他的肉体与灵魂。
　　酒瓶空了，他就拿起把小刀，开始雕刻一个人像，刀锋薄而锋锐，他的手指修长而有力。
　　这是个女人的人像，在他纯熟的手法下，这人像的轮廓和线条看来是那么柔和而优美，看来就像是活的。
　　他不但给了“她”动人的线条，也给了她生命和灵魂，只因他的生命和灵魂已悄悄地自刀锋下溜走。
　　他已不再年轻。
　　他眼角布满了皱纹，每一条皱纹里都蓄满了他生命中的忧患和不幸，只有他的眼睛，却是年轻的。
　　这是双奇异的眼睛，竟仿佛是碧绿色的，仿佛春风吹动的柳枝，温柔而灵活，又仿佛夏日阳光下的海水，充满了令人愉快的活力。
　　也许就因为这双眼睛，才使他能活到如今。
　　现在人像终于完成了，他痴痴地瞧着这人像，也不知瞧了多少时候，然后他突然推开车门，跳了下去。
                        </div>
                    </div>
                    <div className="example-box shapes3">
                        <div>
                            <span className="shape-box-3-start"></span>
                            <span className="shape-box-3-end"></span>
                            <span className="shape-box-3-content">
                                冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将穹苍作烘炉，熔万物为白银。
　　雪将住，风未定，一辆马车自北而来，滚动的车轮辗碎了地上的冰雪，却辗不碎天地间的寂寞。
　　李寻欢打了个呵欠，将两条长腿在柔软的貂皮上尽量伸直，车厢里虽然很温暖，很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生最厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。
　　“人生本就充满了矛盾，任何人都无可奈何。”
　　李寻欢叹了口气，自角落中摸出了个酒瓶，他大口地喝着酒时，也大声地咳嗽起来，不停的咳嗽使得他苍白的脸上，泛起一种病态的嫣红，就仿佛地狱中的火焰，正在焚烧着他的肉体与灵魂。
　　酒瓶空了，他就拿起把小刀，开始雕刻一个人像，刀锋薄而锋锐，他的手指修长而有力。
　　这是个女人的人像，在他纯熟的手法下，这人像的轮廓和线条看来是那么柔和而优美，看来就像是活的。
　　他不但给了“她”动人的线条，也给了她生命和灵魂，只因他的生命和灵魂已悄悄地自刀锋下溜走。
　　他已不再年轻。
　　他眼角布满了皱纹，每一条皱纹里都蓄满了他生命中的忧患和不幸，只有他的眼睛，却是年轻的。
　　这是双奇异的眼睛，竟仿佛是碧绿色的，仿佛春风吹动的柳枝，温柔而灵活，又仿佛夏日阳光下的海水，充满了令人愉快的活力。
　　也许就因为这双眼睛，才使他能活到如今。
　　现在人像终于完成了，他痴痴地瞧着这人像，也不知瞧了多少时候，然后他突然推开车门，跳了下去。
                            </span>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box" id="column">
                    <h4>columns 布局</h4>
                    <div className="example-box column1">
                        <p>冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将穹苍作烘炉，熔万物为白银。
　　雪将住，风未定，一辆马车自北而来，滚动的车轮辗碎了地上的冰雪，却辗不碎天地间的寂寞。
　　李寻欢打了个呵欠，将两条长腿在柔软的貂皮上尽量伸直，车厢里虽然很温暖，很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生最厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。
　　“人生本就充满了矛盾，任何人都无可奈何。”
　　李寻欢叹了口气，自角落中摸出了个酒瓶，他大口地喝着酒时，也大声地咳嗽起来，不停的咳嗽使得他苍白的脸上，泛起一种病态的嫣红，就仿佛地狱中的火焰，正在焚烧着他的肉体与灵魂。
　　酒瓶空了，他就拿起把小刀，开始雕刻一个人像，刀锋薄而锋锐，他的手指修长而有力。</p>
<p className="fill">我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告我是广告</p>
　　<p>这是个女人的人像，在他纯熟的手法下，这人像的轮廓和线条看来是那么柔和而优美，看来就像是活的。
　　他不但给了“她”动人的线条，也给了她生命和灵魂，只因他的生命和灵魂已悄悄地自刀锋下溜走。
　　他已不再年轻。
　　他眼角布满了皱纹，每一条皱纹里都蓄满了他生命中的忧患和不幸，只有他的眼睛，却是年轻的。
　　这是双奇异的眼睛，竟仿佛是碧绿色的，仿佛春风吹动的柳枝，温柔而灵活，又仿佛夏日阳光下的海水，充满了令人愉快的活力。
　　也许就因为这双眼睛，才使他能活到如今。
　　现在人像终于完成了，他痴痴地瞧着这人像，也不知瞧了多少时候，然后他突然推开车门，跳了下去。</p>
                    </div>
                    <div className="example-box">
                        <div className="view-port">
                            <div className="column2">
                                冷风如刀，以大地为砧板，视众生为鱼肉。万里飞雪，将穹苍作烘炉，熔万物为白银。
　　雪将住，风未定，一辆马车自北而来，滚动的车轮辗碎了地上的冰雪，却辗不碎天地间的寂寞。
　　李寻欢打了个呵欠，将两条长腿在柔软的貂皮上尽量伸直，车厢里虽然很温暖，很舒服，但这段旅途实在太长，太寂寞，他不但已觉得疲倦，而且觉得很厌恶，他平生最厌恶的就是寂寞，但他却偏偏时常与寂寞为伍。
　　“人生本就充满了矛盾，任何人都无可奈何。”
　　李寻欢叹了口气，自角落中摸出了个酒瓶，他大口地喝着酒时，也大声地咳嗽起来，不停的咳嗽使得他苍白的脸上，泛起一种病态的嫣红，就仿佛地狱中的火焰，正在焚烧着他的肉体与灵魂。
　　酒瓶空了，他就拿起把小刀，开始雕刻一个人像，刀锋薄而锋锐，他的手指修长而有力。
　　这是个女人的人像，在他纯熟的手法下，这人像的轮廓和线条看来是那么柔和而优美，看来就像是活的。
　　他不但给了“她”动人的线条，也给了她生命和灵魂，只因他的生命和灵魂已悄悄地自刀锋下溜走。
　　他已不再年轻。
　　他眼角布满了皱纹，每一条皱纹里都蓄满了他生命中的忧患和不幸，只有他的眼睛，却是年轻的。
　　这是双奇异的眼睛，竟仿佛是碧绿色的，仿佛春风吹动的柳枝，温柔而灵活，又仿佛夏日阳光下的海水，充满了令人愉快的活力。
　　也许就因为这双眼睛，才使他能活到如今。
　　现在人像终于完成了，他痴痴地瞧着这人像，也不知瞧了多少时候，然后他突然推开车门，跳了下去。
                            </div>
                        </div>
                    </div>
                    <div className="example-box column3">
                        <div className="img-box small"></div>
                        <div className="img-box large"></div>
                        <div className="img-box mid"></div>
                        <div className="img-box small"></div>
                        <div className="img-box large"></div>
                        <div className="img-box small"></div>
                        <div className="img-box mid"></div>
                        <div className="img-box large"></div>
                        <div className="img-box mid"></div>
                        <div className="img-box small"></div>
                        <div className="img-box mid"></div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-column-list">css-column-list</h4>
                    <div className="example-box flex-row-box">
                        <ul className="css-column-list">
                            <li>Multiple-column布局，也称多列布局、多栏布局，我自己喜欢叫做分栏布局，这种布局可以讲内容布局到一组列框，类似于报纸上的排版。Multiple-column布局，也称多列布局、多栏布局，我自己喜欢叫做分栏布局，这种布局可以讲内容布局到一组列框，类似于报纸上的排版。</li>
                            <li>分栏布局非常特殊，有别于传统布局方法，它将包括包括所有子元素在内的所有内容拆分为列，这与我们打印网页时候时页面内容分割成不同的页面的方式类似。</li>
                            <li>分栏布局IE10+都可以使用，API稳定，移动端兼容性比flex布局要好，虽然设计初衷不一样，但很多布局都可以实现。甚至某些场景下，只能使用分栏布局才能实现。很有学习的必要。分栏布局IE10+都可以使用，API稳定，移动端兼容性比flex布局要好，虽然设计初衷不一样，但很多布局都可以实现。甚至某些场景下，只能使用分栏布局才能实现。很有学习的必要。</li>
                            <li>column-width表示每一栏/列的最佳宽度。如果我们只设定column-width，浏览器会自动根据现有容器宽度划分栏目的个数。</li>
                            <li>表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。</li>
                            <li>表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。表示设定的最佳列宽值。实际呈现的每一栏的宽度可能与指定值不同，具体内容参见下面的细节描述。</li>
                        </ul>
                    </div>
                </div>
                <div className="ning-container demo-box" id="css-selector-4">
                    <h4>mask 实践</h4>
                    <div className="example-box flex-box flex-center-box">
                        <ul className="css-not">
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li className="blue">第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li className="red">第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                        </ul>
                        <ul className="css-matches">
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li className="blue">第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li className="red">第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                            <li>第一项第一项第一项第一项第一项第一项</li>
                        </ul>
                    </div>
                </div>
                <div className="ning-container demo-box" id="mask">
                    <h4>mask 实践</h4>
                    <div className="example-box flex-row-box flex-center-box">
                        <img src={pic_1} alt=""/>
                        <img src={pic_1} alt="" className="mask1"/>
                        <img src={pic_1} alt="" className="mask2"/>
                        <img src={pic_1} alt="" className="mask3"/>
                        <img src={pic_1} alt="" className="mask4"/>
                        <img src={pic_1} alt="" className="mask5"/>
                        <img src={pic_1} alt="" className="mask6"/>
                        <img src={pic_1} alt="" className="mask7"/>
                    </div>
                </div>
                <div className="ning-container demo-box" id="clip_path">
                    <h4>clip-path 图形构建</h4>
                    <div className="example-box flex-row-box flex-center-box">
                        <img src={pic_1} alt=""/>
                        <img src={pic_1} alt="" className="circle"/>
                        <img src={pic_1} alt="" className="triangle"/>
                        <img src={pic_1} alt="" className="diamond"/>
                        <img src={pic_1} alt="" className="szx"/>
                        <img src={pic_1} alt="" className="inset"/>
                        <img src={pic_1} alt="" className="path"/>
                    </div>
                </div>
                <div className="ning-container demo-box"  id="ning_slider">
                    <h4>css 转场动画</h4>
                    <div className="example-box flex-center-box">
                        <div className="flex-1">
                            <div className="ning-form-item">
                                <label>传统转场：</label>
                                <div className="flex-1 flex-box">
                                {
                                    slider_class_config.map((v: any) => {
                                        return <label key={v.className} htmlFor={v.className} className="radio-label">
                                                    <input
                                                        id={v.className}
                                                        value={v.className}
                                                        type="radio"
                                                        name="radio"
                                                        defaultChecked={v.className === 'fade' && this.state.active_slider_class === 'fade'}
                                                        onChange={e => this.setSliderActiveClass(e)}/>
                                                    <span className="virtual-radio"></span>
                                                    {v.title}
                                                </label>
                                    })
                                }
                                </div>
                            </div>
                            <div className="ning-form-item">
                                <label>clip-path：</label>
                                <div className="flex-1 flex-box">
                                {
                                    slider_class_config_clip_path.map((v: any) => {
                                        return <label key={v.className} htmlFor={v.className} className="radio-label">
                                                    <input
                                                        id={v.className}
                                                        value={v.className}
                                                        type="radio"
                                                        name="radio"
                                                        onChange={e => this.setSliderActiveClass(e)}/>
                                                    <span className="virtual-radio"></span>
                                                    {v.title}
                                                </label>
                                    })
                                }
                                </div>
                            </div>
                            <div className="ning-form-item">
                                <label>mask：</label>
                                <div className="flex-1 flex-box">
                                {
                                    slider_class_config_mask.map((v: any) => {
                                        return <label key={v.className} htmlFor={v.className} className="radio-label">
                                                    <input
                                                        id={v.className}
                                                        value={v.className}
                                                        type="radio"
                                                        name="radio"
                                                        onChange={e => this.setSliderActiveClass(e)}/>
                                                    <span className="virtual-radio"></span>
                                                    {v.title}
                                                </label>
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className={"ning-slider " + this.state.active_slider_class}>
                            <div className="ning-slider-list">
                                <a className={(this.state.active_slider_num === 1 ? 'in' : 'out') + " ning-slider-item"}>
                                    <img src={pic_1} alt=""/>
                                </a>
                                <a className={(this.state.active_slider_num === 2 ? 'in' : 'out') + " ning-slider-item"}>
                                    <img src={pic_2} alt=""/>
                                </a>
                                <a className={(this.state.active_slider_num === 3 ? 'in' : 'out') + " ning-slider-item"}>
                                    <img src={pic_3} alt=""/>
                                </a>
                            </div>
                            <ul className="ning-slider-page">
                                <li className="ning-slider-page-item" onClick={() => this.handleSlider(1)}></li>
                                <li className="ning-slider-page-item" onClick={() => this.handleSlider(2)}></li>
                                <li className="ning-slider-page-item" onClick={() => this.handleSlider(3)}></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box"  id="css-dynamic-progress">
                    <h4>css 实现动态进度条</h4>
                    <div className="example-box flex-row-box">
                        <div className="view-box flex-row-box">
                            <div className="dynamic-progress"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box"  id="css-countdown">
                    <h4>css 实现倒计时</h4>
                    <div className="example-box flex-row-box">
                        <div className="view-box flex-row-box">
                            <div className="num-box num5 minutes-ten">9876543210</div>
                            <div className="num-box num9 minutes">9876543210</div>
                            <span className="m-l-xs m-r-xs">:</span>
                            <div className="num-box num5 seconds-ten">9876543210</div>
                            <div className="num-box num9 seconds">9876543210</div>
                            <span className="m-l-xs m-r-xs">:</span>
                            <div className="num-box num9 hundred-ten">9876543210</div>
                            <div className="num-box num9 hundred">9876543210</div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="all-center-box">水平垂直居中的实现</h4>
                    <div className="example-box flex-row-box">
                        <div className="all-center-box all-center-box-1">
                            适合文字,t-a-c,lh=h
                        </div>
                        <div className="all-center-box all-center-box-2">
                            <div>table + table-cell</div>
                        </div>
                        <div className="all-center-box all-center-box-3">
                            <div>flex</div>
                        </div>
                        <div className="all-center-box all-center-box-7">
                            <div>flex + margin: auto;</div>
                        </div>
                        <div className="all-center-box">
                            <div className="all-center-box-4">
                                绝对定位 + margin: auto;
                            </div>
                        </div>
                        <div className="all-center-box">
                            <div className="all-center-box-5">
                                绝对定位 + margin: -50%;
                            </div>
                        </div>
                        <div className="all-center-box">
                            <div className="all-center-box-6">
                                绝对定位 + transform;
                            </div>
                        </div>
                        <div className="all-center-box all-center-box-8">
                            <div>
                                inline-block + 伪元素;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="head-light">头像 hover 高光</h4>
                    <div className="example-box">
                        <div className="head-light"></div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: ``,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="palceholder-shown">:placeholder-shown 伪类实现 Material Design 占位符交互效果</h4>
                    <div className="example-box">
                        <div className="ning-form-item material-design">
                            <input placeholder="邮箱"/>
                            <label className="label-placeholder">邮箱</label>
                        </div>
                        <div className="ning-form-item material-design">
                            <select placeholder="邮箱">
                                <option value=""></option>
                                <option value="">啊啊啊</option>
                                <option value="">啊啊啊啊啊啊啊啊啊啊a</option>
                                <option value="">啊啊啊</option>
                            </select>
                            <label className="label-placeholder">邮箱</label>
                        </div>
                        <div className="ning-form-item material-design">
                            <textarea placeholder="邮箱"></textarea>
                            <label className="label-placeholder">邮箱</label>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.material-design{
        /* 默认placeholder颜色透明不可见 */
        input,
        select,
        textarea{
            position: relative;
            &:placeholder-shown::placeholder {
                color: transparent;
            }
        }
        .label-placeholder{
            position: absolute;
            z-index: 1;
            top: 20px;
            left: 20px;
            width: auto;
            min-width: 0;
            padding: 0 2px;
            background: #fff;
            font-size: 12px;
            font-weight: normal;
            color: $gray;
            pointer-events: none;
            transition: .25s;
        }
        input:not(:placeholder-shown) ~ .label-placeholder,
        input:focus ~ .label-placeholder,
        select:not(:placeholder-shown) ~ .label-placeholder,
        select:focus ~ .label-placeholder,
        textarea:not(:placeholder-shown) ~ .label-placeholder,
        textarea:focus ~ .label-placeholder {
            transform: scale(0.8) translate(0, -20px);
            color: $blue-3;
        }
    }`,
                        }
                    }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="box-decoration-break">box-decoration-break 实现不规则的内联文本整体渐变效果</h4>
                    <div className="example-box">
                        <div className="box-decoration-break">
                            <span>
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。 言念君子，温其如玉
                            </span>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.box-decoration-break{
        width: 200px;
        span{
            padding: 4px;
            background-image: linear-gradient(to right, $blue, $red 200px); // 200px 是保证 渐变色一致
            -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
            color: #fff;
        }
        &:first-child{
            border-radius: 5px;
        }
    }`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-typing">纯 CSS 实现打字动画效果</h4>
                    <div className="example-box">
                        <div className="typing m-b-lg">
                            簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                        </div>
                        <div className="typing1">簪子上有八个字，便是仅算粗通</div>
                        <div className="typing2">文墨的少女，也觉得极为动人。</div>
                        <div className="typing3">言念君子，温其如玉。</div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.typing {
    width: 37em; // 与字数相同
    line-height: 1;
    white-space: nowrap;
    animation: typing 10s steps(37, end), blink-caret .75s step-end infinite;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 37em; }
}
/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-progress">不可思议的纯 CSS 滚动进度条效果</h4>
                    <div className="example-box">
                        <div className="css-progress">
                            <div className="progress-box">
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                                簪子上有八个字，便是仅算粗通文墨的少女，也觉得极为动人。言念君子，温其如玉。
                            </div>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.typing {
    width: 37em; // 与字数相同
    line-height: 1;
    white-space: nowrap;
    animation: typing 10s steps(37, end), blink-caret .75s step-end infinite;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 37em; }
}
/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-gradient-dashed-border">纯CSS实现 渐变虚框及边框滚动动画</h4>
                    <div className="example-box">
                        <div className="css-gradient-dashed-border flex-row-box">
                            <div className="box-1">
                                hahahahah
                            </div>
                            <div className="box-2">
                                <div className="content">内容占位</div>
                            </div>
                            <div className="box-3">
                                <img src="mm1.jpg" width="128" height="96"/>
                            </div>
                        </div>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.typing {
    width: 37em; // 与字数相同
    line-height: 1;
    white-space: nowrap;
    animation: typing 10s steps(37, end), blink-caret .75s step-end infinite;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 37em; }
}
/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="underscore">防抖和节流</h4>
                    <div className="example-box">
                        <div className="flex-center-box">
                            请连续向输入框填写内容
                            <button className="ning-btn m-l-md" onClick={() => this.clear()}>重置</button>
                        </div>
                        <div className="ning-form-item">
                            <input type="text" className="flex-1" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-inherit">css-secret-inherit</h4>
                    <div className="example-box">
                        <button className="ning-btn">对话框</button>
                        <p className="css-secret-inherit">
                            独立小桥风清袖，平林新月人归后
                        </p>
                    </div>
                    <CodeBox
                        params={
                            {
                                type: 'css',
                                content: `.css-secret-inherit{
    position: relative;
    &:after{
        content: '';
        position: absolute;
        top: 20px;
        left: -6px;
        padding: 5px;
        border: inherit;
        border-top: 0;
        border-right: 0;
        background: inherit;
        transform: rotate(45deg);
    }
}`
                            }
                        }
                    />
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-border">css-secret-border</h4>
                    <div className="example-box flex-row-box css-secret-border">
                        <div className="flex-col-box flex-center-box">
                            <p>box-shadow-多重边框</p>
                            <div className="box-shadow-border"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>透明边框</p>
                            <div className="opacity-border"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>outline-多重边框</p>
                            <div className="outline-border"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-auto-bg">css-secret-auto-bg</h4>
                    <div className="example-box flex-row-box css-secret-auto-bg">
                        <div className="flex-col-box flex-center-box">
                            <p>background-postion: bottom right</p>
                            <div className="bg-box _traditional">哈哈</div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>background-postion: bottom right</p>
                            <div className="bg-box _pos_num">哈哈</div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>background-origin: content-box</p>
                            <div className="bg-box _origin">哈哈</div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>background-position: calc(100% - 16px) calc(100% - 16px)</p>
                            <div className="bg-box _calc">哈哈</div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-inset-radius">css-secret-inset-radius</h4>
                    <div className="example-box flex-row-box css-secret-inset-radius">
                        <div className="flex-col-box flex-center-box">
                            <p>外圆内方</p>
                            <div className="outradius-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>外方内圆</p>
                            <div className="insetradius-box"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-bg-list">css-secret-bg-list</h4>
                    <div className="example-box flex-row-box css-secret-bg-list">
                        <div className="flex-col-box flex-center-box">
                            <p>横向条纹</p>
                            <div className="bg-row-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>竖向条纹</p>
                            <div className="bg-col-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>斜向条纹</p>
                            <div className="bg-lean-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>斜向条纹2</p>
                            <div className="bg-lean-box-2"></div>
                        </div>
                    </div>
                </div>
                <div className="ning-container demo-box">
                    <h4 id="css-secret-bg-list-2">css-secret-bg-list-2</h4>
                    <div className="example-box flex-row-box css-secret-bg-list-2">
                        <div className="flex-col-box flex-center-box">
                            <p>网格1</p>
                            <div className="bg-grids-box-1"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>网格2</p>
                            <div className="bg-grids-box-2"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>网格3</p>
                            <div className="bg-grids-box-3"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>波点1</p>
                            <div className="bg-bodian-box-1"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>波点2</p>
                            <div className="bg-bodian-box-2"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>棋盘1</p>
                            <div className="bg-chessboard-box-1"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>棋盘2</p>
                            <div className="bg-chessboard-box-2"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>伪随机背景</p>
                            <div className="bg-paseudorandom-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>信封边框</p>
                            <div className="border-mail-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>蚂蚁行军边框</p>
                            <div className="border-ants-box"></div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>折角1</p>
                            <div className="bevel-box-1">
                                折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角折角
                            </div>
                        </div>
                        <div className="flex-col-box flex-center-box">
                            <p>折角2</p>
                            <div className="bevel-box-2">
                                折角折角折角折角折角折角折角折角折角折角折角角折角折角折角折角折角折角
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}

    handleChange = () => {
        console.log(1)
        // this.debounce(() => {console.log('防抖。。。')}, 1000)
    }

    now = () => {
        return new Date().getTime();
    }

    clear = () => {
        document.getElementById('debounce_res').innerHTML = '';
    }
}

export default Demos;