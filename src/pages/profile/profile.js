import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import './profile.scss';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';
import Swiper from 'swiper'
import css from 'style-loader!css-loader!swiper/dist/css/swiper.min.css';
import G2 from '@antv/g2';

// import me from 'assets/images/me.png'
import ximalaya from 'assets/images/ximalaya.jpeg'
import xiakedaoli from 'assets/images/xiakedaoli.jpeg'
import maipu from 'assets/images/maipu.jpg'
import ning_ui from 'assets/images/ning-ui.png'
import blog_article_list from 'assets/images/blog-article-list.png'
import blog_admin from 'assets/images/blog-admin.png'
import blog_hexo from 'assets/images/blog-hexo.png'
import bgt_pc from 'assets/images/bgt-pc.png'
import antd_admin from 'assets/images/antd-admin.png'



class Profile extends Component {
	constructor(props) {
        super(props)
        this.state = {
            str: '享受生命中每一个脚步。<br/>前端开发，<br/>可写 Html、Css、Javascript、JQuery、React、Vue、Angluar1.x...',
            str_index: 1,
            chart: null,
        }
    }

	render() {
		return (
            <div id="profile">
            <canvas id="cas"></canvas>
                <header className="flex-row-box flex-center-box">
                    <h1>宁宗源<span className="m-l-md _normal _sm">前端开发工程师</span></h1>
                    <span className="flex-row-box flex-center-box">
                        <span className="flex-center-box m-r-md">
                            <i className="ning-icon icon-email m-r-sm"></i>
                            627235655@qq.com
                        </span>
                        <a target="_blank" href="/blog/index/home" className="ning-line-btn _xs _fill _fillet">My Blog</a>
                    </span>
                </header>
                <div className="swiper-container" id="swiper1">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="wrapper flex-row-box flex-center-box">
                                <div className="flex-1">
                                    <p id="divTyping"></p>
                                </div>
                                <img className="pic" src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/imgad/pic/item/3812b31bb051f8192aca6141d2b44aed2f73e7ca.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="wrapper flex-col-box flex-center-box">
                                <h2 className="section-title">深入前端，涉猎后端</h2>
                                <p className="section-sub-title">逐渐完善的 web 技术栈</p>
                                <div className="skills-chart m-t-lg" id="skills_chart"></div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="wrapper flex-col-box flex-center-box">
                                <h2 className="section-title">2 年工作经验</h2>
                                <p className="section-sub-title m-b-lg">从零开始到统筹兼顾各项工作</p>
                                <div className="swiper-container" id="swiper2">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <img className="m-l-lg" src={ximalaya} alt=""/>
                                            <div className="flex-1 p-lg">
                                                <h3>喜马拉雅FM(2018.04 - 至今)</h3>
                                                <p className="m-t-sm m-b-sm">基于 react 的后台框架 - 前端开发工程师 - es6 / react / antd / webpack </p>
                                                <ul className="style-ul">
                                                    <li>主要负责将客服系统从旧的运营系统迁出</li>
                                                    <li>基于 react 和 antd 搭建一套全新的后台框架</li>
                                                    <li>数据可视化，监控客服质量</li>
                                                    <li>将客服团队运营效率整体提升一个档次</li>
                                                </ul>
                                                <p className="m-t-sm m-b-sm">工单系统-钉钉微应用 - 前端开发工程师 - es6 / css / h5 </p>
                                                <ul className="style-ul">
                                                    <li>主要负责钉钉 pc 端和移动端的工单系统</li>
                                                    <li>为公司成员提供快捷的业务沟通方式</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img className="m-l-lg" src={xiakedaoli} alt=""/>
                                            <div className="flex-1 p-lg">
                                                <h3>成都侠客岛企业管理公司(2016.10 - 2018.03)</h3>
                                                <p className="m-t-sm m-b-sm">办公町官网（pc+移动端） - 前端开发工程师 - angular1.x / jQuery / php / fis3</p>
                                                <ul className="style-ul">
                                                    <li>主要负责 pc 端和移动端官网(php + jq)、后台运营系统(angular1.x)</li>
                                                    <li>基于 fis3 的 web 构建方案，提高开发效率</li>
                                                    <li>pc 端应用 flex 布局，移动端应用 rem 布局</li>
                                                    <li>为公司的运营和业务提供有力的内容展示和数据支持</li>
                                                </ul>
                                                <p className="m-t-sm m-b-sm">后台内部管理系统 - 前端开发工程师 - angular1.x / ionic</p>
                                                <ul className="style-ul">
                                                    <li>项目旨在建设侠客岛公司的后台内部管理系统平台和运营 app</li>
                                                    <li>主要负责前端页面的开发，包括页面制作，数据处理，单元测试等</li>
                                                    <li>能合理分解业务功能点，高还原 ui 原型图</li>
                                                    <li>最终大幅提升公司运营和内部管理效率</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img className="m-l-lg" src={maipu} alt=""/>
                                            <div className="flex-1 p-lg">
                                                <h3>迈普通信技术有限公司(2016.06 - 2016.09)</h3>
                                                <p className="m-t-sm m-b-sm">基于 wamp 的管理平台 - 前端实习生 - jQuery / bootstrap / thinkPHP / svn</p>
                                                <ul className="style-ul">
                                                    <li>旨在为公司各级别人员提供度量审计信息及数据可视化</li>
                                                    <li>主要负责数据库的构建(mysql)；后台业务逻辑的编码(php)；前端页面的开发(html、css、js)</li>
                                                    <li>利用 JQuery 实现页面上的动态效果以及交互效果</li>
                                                    <li>在项目中对表现与数据分离、Web 语义化、JavaScript 面向对象编程等有了逐渐深入理解</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination" id="swiper_pagination2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="wrapper flex-col-box flex-center-box">
                                <h2 className="section-title">丰富的项目经历</h2>
                                <p className="section-sub-title m-b-lg">业余项目与公司项目两开花</p>
                                <div className="swiper-container" id="swiper3">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <ul className="works-list">
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">ning-ui(js + css)</h3>
                                                        <ul className="style-ul">
                                                            <li>Ant Design 的设计理念</li>
                                                            <li>基于原生 js 和 css，不拘泥于框架</li>
                                                            <li>单标签 icon，轻便易用</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light m-r-md" href="https://github.com/627235655/ning-ui-blog/tree/master/src/assets/ning-ui">github 地址</a>
                                                                <a target="_blank" className="_xs _light" href="/blog/index/ning-ui/mind">在线地址</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src={ning_ui} alt=""/>
                                                </li>
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">个人博客(react)</h3>
                                                        <ul className="style-ul">
                                                            <li>react + node + mogodb</li>
                                                            <li>自己设计，随心所欲</li>
                                                            <li>记录前端路上的点滴</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light m-r-md" href="https://github.com/627235655/ning-ui-blog">github 地址</a>
                                                                <a target="_blank" className="_xs _light" href="/blog/index/home">在线地址</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src={blog_article_list} alt=""/>
                                                </li>
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">喜马拉雅客服系统框架(react + antd)</h3>
                                                        <ul className="style-ul">
                                                            <li>基于 antd 的后台管理系统框架</li>
                                                            <li>子页面通过 iframe 嵌入</li>
                                                            <li>支持 tab 打开多个子页面</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light" href="https://github.com/627235655/antd-admin-framework">github 地址</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src={antd_admin} alt=""/>
                                                </li>
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">办公町官网 + 后台管理系统</h3>
                                                        <ul className="style-ul">
                                                            <li>基于 php + jq 开发官网 pc 端和移动端</li>
                                                            <li>pc 和移动端分别基于 flex / rem 布局</li>
                                                            <li>拓展公司市场，推进在线业务</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light m-r-md" href="https://www.bgt.work/">在线地址-pc版</a>
                                                                <a target="_blank" className="_xs _light" href="https://m.bgt.work/">在线地址-移动版</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src={bgt_pc} alt=""/>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="swiper-slide">
                                            <ul className="works-list">
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">个人博客(hexo)</h3>
                                                        <ul className="style-ul">
                                                            <li>基于 hexo 开发的博客</li>
                                                            <li>UI 基于 material 且自行修改</li>
                                                            <li>已弃用</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light m-r-md" href="https://github.com/627235655/627235655.github.io">github 地址</a>
                                                                <a target="_blank" className="_xs _light" href="https://627235655.github.io/">在线地址</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src={blog_hexo} alt=""/>
                                                </li>
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">博客后端管理系统(vue + ning-ui)</h3>
                                                        <ul className="style-ul">
                                                            <li>基于 vue-cli 开发的管理系统</li>
                                                            <li>UI 基于自己设计的 ning-ui</li>
                                                            <li>集成 markdown 编辑器</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light" href="https://github.com/627235655/ning-ui-blog/tree/master/admin">github 地址</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src={blog_admin} alt=""/>
                                                </li>
                                                <li className="works-list-item">
                                                    <div className="flex-1 flex-col-box">
                                                        <h3 className="m-b-sm">侠客岛后台管理系统(angular1.x)</h3>
                                                        <ul className="style-ul">
                                                            <li>项目成员，主要负责公司租赁合同部分</li>
                                                            <li>计算均由前端实现，兼顾多业务场景</li>
                                                            <li>提高合同流转效率，减少人工出错率</li>
                                                            <li>
                                                                <a target="_blank" className="_xs _light" href="">github 地址</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <img src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/imgad/pic/item/3812b31bb051f8192aca6141d2b44aed2f73e7ca.jpg" alt=""/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination" id="swiper_pagination3"></div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="wrapper flex-col-box flex-center-box">
                                <h2 className="section-title">联系我</h2>
                                <p className="section-sub-title m-b-lg">email: 627235655@qq.com</p>
                                <div>
                                    <a target="_blank" href="index/home" className="ning-line-btn _shadow _fillet">我的博客</a>
                                    <a target="_blank" href="index/home" className="ning-line-btn _shadow _fillet m-l-md">简历 pdf</a>
                                </div>
                                <p className="m-t-lg">享受生命中每一个脚步，感谢观看~</p>
                            </div>
                        </div>
                    </div>
                    {/*<!-- 如果需要分页器 -->*/}
                    <div className="swiper-pagination" id="swiper_pagination1"></div>
                </div>
            </div>
		)
	}

	initSwiper1 = () => {
        let self = this;
        var mySwiper = new Swiper ('#swiper1', {
            direction: 'vertical', // 垂直切换选项
            pagination: {
              el: '#swiper_pagination1',
              clickable: true,
            },
            mousewheel: true,
            on: {
                slideChangeTransitionEnd: function(){
                    this.activeIndex === 1 && self.renderChart();
                },
              },
        })
    }

    initSwiper2 = () => {
        let self = this;
        var mySwiper = new Swiper ('#swiper2', {
            pagination: {
              el: '#swiper_pagination2',
              clickable: true,
            },
            autoplay: true,
            loop: true,
        })
    }

    initSwiper3 = () => {
        let self = this;
        var mySwiper = new Swiper ('#swiper3', {
            pagination: {
              el: '#swiper_pagination3',
              clickable: true,
            },
            autoplay: true,
            loop: true,
        })
    }

    typing = () => {
        var divTyping = document.getElementById('divTyping');
        if (this.state.str_index <= this.state.str.length) {
            this.state.str_index++
            this.setState({
                str_index: this.state.str_index
            },() => {
                divTyping.innerHTML = this.state.str.slice(0, this.state.str_index) + '_';
                setTimeout(() => {this.typing()}, 200);//递归调用
            });
        }
        else{
            divTyping.innerHTML = this.state.str;//结束打字,移除 _ 光标
        }
    }

    renderChart = () => {
        this.state.chart !== null && this.state.chart.destroy();
        // 注意由于分类轴的顺序是从下往上的，所以数组的数值顺序要从小到大
        var data = [{
            type_name: 'node / php',
            type_level: 1
        }, {
            type_name: 'angular / ts',
            type_level: 2
        }, {
            type_name: 'webpack / git',
            type_level: 3
        }, {
            type_name: 'react / vue',
            type_level: 3
        }, {
            type_name: 'bootstrap / antx',
            type_level: 3
        },{
            type_name: 'react / vue',
            type_level: 3
        }, {
            type_name: 'js / es6 / jquery',
            type_level: 4
        }, {
            type_name: 'css / css3',
            type_level: 4
        }];

        this.setState({
            chart: new G2.Chart({
                container: 'skills_chart',
                forceFit: true,
                height: 400,
                padding: [0, 20, 40, 120]
            })
        }, () => {
        let chart = this.state.chart;
            chart.source(data);

            chart.axis('type_name', {
                line: null,
                tickLine: null,
            })
            chart.axis('type_level', {
                label: {
                    offset: 12,
                    formatter(text, item, index) {
                        return ['了解','熟悉','理解','掌握','精通'][Number(text) - 1]
                    },
                }
            });
            chart.coord().transpose();
            chart.interval().position('type_name*type_level');
            chart.tooltip({
                triggerOn: 'none',
            });
            chart.render();
        });
    }

    renderCanvas = () => {
        var canvas = document.getElementById("cas");
        var ctx = canvas.getContext("2d");
        resize();
        window.onresize = resize;
        function resize() {
            var x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var y = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            canvas.setAttribute('width', x * 2);
            canvas.setAttribute('height', y * 2);
            // ctx.scale(2,2)
        }
        var RAF = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
        })();
        // 鼠标活动时，获取鼠标坐标
        var warea = {x: null, y: null, max: 20000};
        window.onmousemove = function(e) {
        e = e || window.event;
        warea.x = e.clientX * 2;
        warea.y = e.clientY * 2;
        };
        window.onmouseout = function(e) {
        warea.x = null;
        warea.y = null;
        };
        // 添加粒子
        // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
        var dots = [];
        for (var i = 0; i < 200; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var xa = Math.random() * 2 - 1;
        var ya = Math.random() * 2 - 1;
        dots.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 20000
        })
        }
        // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
        setTimeout(function() {
            animate();
        }, 100);
        // 每一帧循环的逻辑
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
            var ndots = [warea].concat(dots);
            dots.forEach(function(dot) {
              // 粒子位移
              dot.x += dot.xa;
              dot.y += dot.ya;
              // 遇到边界将加速度反向
              dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
              dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
              // 绘制点
              ctx.beginPath();
              ctx.arc(dot.x - 0.5,dot.y - 0.5, 2, 0, 360, false);
              ctx.fill();//画实心圆
              ctx.closePath();
              ctx.fillStyle = 'rgba(0,0,0, .6)';
              // 循环比对粒子间的距离
              for (var i = 0; i < ndots.length; i++) {
                var d2 = ndots[i];
                if (dot === d2 || d2.x === null || d2.y === null) continue;
                var xc = dot.x - d2.x;
                var yc = dot.y - d2.y;
                // 两个粒子之间的距离
                var dis = xc * xc + yc * yc;
                // 距离比
                var ratio;
                // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                if (dis  < d2.max) {
                  // 如果是鼠标，则让粒子向鼠标的位置移动
                  if (d2 === warea && dis > (d2.max / 2)) {
                    dot.x -= xc * 0.03;
                    dot.y -= yc * 0.03;
                  }
                  // 计算距离比
                  ratio = (d2.max - dis) / d2.max;
                  // 画线
                  ctx.beginPath();
                  ctx.lineWidth = ratio * 2;
                  ctx.strokeStyle = 'rgba(0,0,0,' + (ratio  *  0.5) + ')';
                  ctx.moveTo(dot.x - 1, dot.y - 1);
                  ctx.lineTo(d2.x - 1, d2.y - 1);
                  ctx.stroke();
                }
              }
              // 将已经计算过的粒子从数组中删除
              ndots.splice(ndots.indexOf(dot), 1);
        });
        RAF(animate);
        }
    }

    componentDidMount() {
        this.renderCanvas();
        this.initSwiper1();
        this.initSwiper2();
        this.initSwiper3();
        this.typing();
        this.renderChart();
    }


}

export default Profile;