<template>
    <div id="home">
        <h2 class="page-title">主页</h2>
        <hr/>
        <div class="ning-row border p-md">
            <div class="col-12 overview">
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box flex-center-box">{{this.overviewData.dateTotal}} 天<span class="tips">{{this.overviewData.dateRange}}</span></h2>
                    <p>创作时长</p>
                    <p class="tips">走的每一步，都值得被铭记</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md">{{this.overviewData.articleTotal}} 篇</h2>
                    <p>文章</p>
                    <p class="tips">笔落惊风雨，下笔如有神</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box">
                        <span>{{this.overviewData.wordCountTotal}}</span>
                        <span>|</span>
                        <span>{{this.overviewData.maxWordCount}}</span>
                    </h2>
                    <p class="flex-row-box">
                        <span>总字数</span>
                        <span>|</span>
                        <a :href="this.overviewData.maxWordCountUrl">单篇最多字数</a>
                    </p>
                    <p class="tips">不积跬步，无以至千里</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box">
                        <span>{{this.totalChartData.tag_total}}</span>
                        <span>|</span>
                        <span>{{this.overviewData.maxTag}}</span>
                    </h2>
                    <p class="flex-row-box">
                        <span>标签</span>
                        <span>|</span>
                        <span>最常使用标签</span>
                    </p>
                    <p class="tips">术业有专攻，如是而已</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box">
                        <span>{{this.overviewData.readCountTotal}}</span>
                        <span>|</span>
                        <span>{{this.overviewData.maxReadCount}}</span>
                    </h2>
                    <p class="flex-row-box">
                        <span>阅读量</span>
                        <span>|</span>
                        <span><a :href="this.overviewData.maxReadCountUrl">单篇最高阅读</a></span>
                    </p>
                    <p class="tips">coder love sharing!</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box">
                        <span>{{this.overviewData.likeCountTotal}}</span>
                        <span>|</span>
                        <span>{{this.overviewData.maxLikeCount}}</span>
                    </h2>
                    <p class="flex-row-box">
                        <span>点赞数</span>
                        <span>|</span>
                        <span><a :href="this.overviewData.maxLikeCountUrl">单篇最高点赞</a></span>
                    </p>
                    <p class="tips">高山流水，幸甚至哉</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box">
                        <span>{{this.overviewData.commentCountTotal}}</span>
                        <span>|</span>
                        <span>{{this.overviewData.maxCommentCount}}</span>
                    </h2>
                    <p class="flex-row-box">
                        <span>评论</span>
                        <span>|</span>
                        <span><a :href="this.overviewData.maxCommentCountUrl">单篇最高评论</a></span>
                    </p>
                    <p class="tips">坐而论道，不亦乐乎</p>
                </div>
                <div class="overview-item">
                    <h2 class="m-b-md flex-row-box">
                        <span>{{this.overviewData.articleTotal}}</span>
                        <span>|</span>
                        <span>{{this.overviewData.maxActiveDayArticleTotal}}</span>
                    </h2>
                    <p class="flex-row-box">
                        <span>活跃天数</span>
                        <span>|</span>
                        <span>最活跃日期</span>
                    </p>
                    <p class="tips">古之成大事者，不惟有超世之才，亦必有坚忍不拔之志</p>
                </div>
            </div>
            <div class="col-6 border p-sm m-b-md">
                <h3 class="p-b-md flex-center-box"><i class="ning-icon icon-count m-r-sm"></i>总数统计</h3>
                <!-- 文章数, 标签数，总字数 -->
                <div id="total_chart"></div>
            </div>
            <div class="flex-1 border p-sm m-b-md m-l-md">
                <h3 class="p-b-md flex-center-box"><i class="ning-icon icon-percentage m-r-sm"></i>标签占比</h3>
                <!-- 文章数, 标签数，总字数 -->
                <div id="tags_chart"></div>
            </div>
            <div class="col-12 border p-sm">
                <h3 class="p-b-md flex-center-box"><i class="ning-icon icon-date m-r-sm"></i>时间活跃度</h3>
                <!-- 文章数, 标签数，总字数 -->
                <div id="date_chart"></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import showdown from 'showdown';
import notify from '../assets/ning-ui/js/notify'
import modal from '../assets/ning-ui/js/modal'
import util from '../assets/ning-ui/js/utils'
import G2 from '@antv/g2';

let initDateChartData = function(length) {
    let today = new Date();
    let start_day = new Date('2018-11-01');
    let timestamp = new Date().getTime();
    let len = length || Math.ceil((timestamp - start_day.getTime())/ (3600 * 1000 * 24)); // 得出总天数
    let arr = [];
    for (let i = 0; i < len; i++) {
        let current_date = new Date(timestamp - 3600 * 1000 * 24 * i)
        let obj = {
            "date": current_date.Format('yyyy-MM-dd'),
            "articles": 0,
            "month": current_date.getMonth(),
            "day": current_date.getDay(),
            "week": Math.ceil((len + 4 - i) / 7 ).toString() // 因为 2018-11-01 是周四
        }
        arr.unshift(obj)
    }
    return arr
}

export default {
    name: 'home',
    data() {
        return {
            tagList: [],
            articleList: [],
            totalChartData: {
                tag_total: 0,
                article_total: 0,
                count_total: 0,
            },
            tagsChartData: [],
            dateChartData: [],
            overviewData:{
                dateTotal: null,
                dateRange: null,
                articleTotal: null,
                wordCountTotal: null,
                maxWordCount: null,
                maxWordCountUrl: null,
                tagTotal: null,
                maxTag: null,
                maxTagTotal: null,
                readCountTotal: null,
                maxReadCount: null,
                maxReadCountUrl: null,
                likeCountTotal: null,
                maxLikeCount: null,
                maxLikeCountUrl: null,
                commentCountTotal: null,
                maxCommentCount: null,
                maxCommentCountUrl: null,
                activeDayTotal: null,
                maxActiveDay: null,
                maxActiveDayArticleTotal: null,
            }
        }
    },
    mounted: function() {
        this.dateChartData = initDateChartData();
        Promise.all([this.getTagList(), this.getArticleList()]).then((result) => {
            if (!result.includes(false)) {
                this.renderTotalChart();
                this.renderTagsChart();
                this.renderDateChart();
            }
        }).catch((error) => {
            console.log(error) // 失败了，打出 '失败'
        })

    },
    methods: {
        setOverView(totalArticleList) {
            let wordCountTotal = 0,
                maxWordCount = 0,
                maxWordCountUrl,
                maxTag,
                maxTagTotal = 0,
                maxTagList = [],
                readCountTotal = 0,
                maxReadCount = 0,
                maxReadCountUrl,
                likeCountTotal = 0,
                maxLikeCount = 0,
                maxLikeCountUrl,
                commentCountTotal = 0,
                maxCommentCount = 0,
                maxCommentCountUrl;

            this.overviewData.articleTotal = totalArticleList.length
            this.overviewData.dateTotal = ((new Date(totalArticleList.pop().createDate).getTime() - new Date(totalArticleList[0].createDate).getTime()) / (3600 * 24 * 1000)).toFixed(0)
            this.overviewData.dateRange = new Date(totalArticleList[0].createDate).Format('yy-MM-dd') + '~' + new Date(totalArticleList.pop().createDate).Format('yy-MM-dd')
            totalArticleList.forEach((v, i) => {
                let len = util.formatHtmlStr(v.articleContentResult).length
                if (len > maxWordCount) {
                    maxWordCount = len
                    maxWordCountUrl = v._id
                }
                if (v.readCount > maxReadCount) {
                    maxReadCount = v.readCount
                    maxReadCountUrl = v._id
                }
                if (v.likeCount > maxLikeCount) {
                    maxLikeCount = v.likeCount
                    maxLikeCountUrl = v._id
                }
                if (v.commentCount > maxCommentCount) {
                    maxCommentCount = v.commentCount
                    maxCommentCountUrl = v._id
                }
                wordCountTotal += len
                readCountTotal += v.readCount
                likeCountTotal += v.likeCount
                commentCountTotal += v.commentCount
            })
            this.overviewData.wordCountTotal = wordCountTotal
            this.overviewData.maxWordCount = maxWordCount
            this.overviewData.maxWordCountUrl = `#/addArticle?_id=${maxWordCountUrl}&view_type=detail`
            this.overviewData.readCountTotal = readCountTotal
            this.overviewData.maxReadCount = maxReadCount
            this.overviewData.maxReadCountUrl = maxReadCountUrl
            this.overviewData.likeCountTotal = likeCountTotal
            this.overviewData.maxLikeCount = maxLikeCount
            this.overviewData.maxLikeCountUrl = maxLikeCountUrl
            this.overviewData.commentCountTotal = commentCountTotal
            this.overviewData.maxCommentCount = maxCommentCount
            this.overviewData.maxCommentCountUrl = maxCommentCountUrl

        },
        getTagList() {
            let self = this,
                data = {},
                url = '/api/getTagList',
                cb = res => {
                    self.tagList = res.data.list;
                    self.totalChartData.tag_total = res.data.totalCount;
                    self.tagList.map(function(v, i) {
                        let obj = {
                            item: v.tagName,
                            count: 0,
                            percent: 0
                        }
                        self.tagsChartData.push(obj);
                    })
                }
            return util.axiosFn(url, data, 'get', cb);
        },
        getArticleList() {
            let self = this,
                data = {},
                url = '/api/getArticleList',
                cb = res => {
                    self.articleList = res.data.list;
                    let len = self.articleList.length;;
                    self.totalChartData.article_total = res.data.totalCount;
                    self.articleList.map(function(v, i) {
                        self.totalChartData.count_total += v.articleContentLength;
                        self.tagsChartData.forEach(function(item, j) {
                            if (v.articleTags.includes(item.item)) {
                                item.count++;
                            }
                        })
                        let createDate = new Date(v.createDate);
                        self.dateChartData.forEach(function(v, i) {
                            if (v.date === createDate.Format('yyyy-MM-dd')) {
                                v.articles++
                            }
                        })
                    })
                    self.setOverView(res.data.list)
                }
            return util.axiosFn(url, data, 'get', cb);
        },
        renderTotalChart() {
            let self = this;
            const data = [
                { genre: '标签', sold: self.totalChartData.tag_total },
                { genre: '文章', sold: self.totalChartData.article_total },
                { genre: '总字数(w)', sold: self.totalChartData.count_total / 10000 },
            ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
            // Step 1: 创建 Chart 对象
            const chart = new G2.Chart({
                container: 'total_chart', // 指定图表容器 ID
                forceFit: true,
                height: 300 // 指定图表高度
            });
            // Step 2: 载入数据源
            chart.source(data);
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            chart.interval().position('genre*sold').color('genre')
            // Step 4: 渲染图表
            chart.render();
        },
        renderTagsChart() {
            let self = this;
            let article_total_count = 0;
            self.tagsChartData.map(function(v, i, a) {
                article_total_count += v.count;
            });
            self.tagsChartData.map(function(v, i, a) {
                v.percent = v.count / article_total_count;
            });
            let data = self.tagsChartData;
            // 求最常用标签
            let max_use_tag_count = 0;
            data.forEach((v, i) => {
                if (v.count > max_use_tag_count) {
                    max_use_tag_count = v.count;
                    this.overviewData.maxTag = v.item;
                }
            })
            var chart = new G2.Chart({
                container: 'tags_chart',
                forceFit: true,
                height: 300,
                padding: [20, 20, 110, 20],
            });
            chart.source(data, {
                percent: {
                    formatter: function formatter(val) {
                        val = (val.toFixed(2) * 100 + '').substr(0, 4) + '%';
                        return val;
                    }
                }
            });
            chart.coord('theta');
            chart.tooltip({
                showTitle: false
            });
            chart.intervalStack().position('percent').color('item').label('percent', {
                offset: 20,
                textStyle: {
                    textAlign: 'center',
                    shadowBlur: 0,
                    shadowColor: 'rgba(0, 0, 0, .45)'
                }
            }).tooltip('item*percent', function(item, percent) {
                // percent = percent * 100 + '%';
                let article_count = article_total_count * percent;
                return {
                    name: item,
                    value: article_count + '篇'
                };
            }).style({
                lineWidth: 1,
                stroke: '#fff'
            });
            chart.render();
        },
        renderDateChart() {
            let self = this;
            var Shape = G2.Shape;
            var Util = G2.Util;
            Shape.registerShape('polygon', 'boundary-polygon', {
                draw: function draw(cfg, container) {
                    if (!Util.isEmpty(cfg.points)) {
                        var attrs = {
                            stroke: '#fff',
                            lineWidth: 1,
                            fill: cfg.color,
                            fillOpacity: cfg.opacity
                        };
                        var points = cfg.points;
                        var path = [
                            ['M', points[0].x, points[0].y],
                            ['L', points[1].x, points[1].y],
                            ['L', points[2].x, points[2].y],
                            ['L', points[3].x, points[3].y],
                            ['Z']
                        ];
                        attrs.path = this.parsePath(path);
                        var polygon = container.addShape('path', {
                            attrs: attrs
                        });

                        if (cfg.origin._origin.lastWeek) {
                            var linePath = [
                                ['M', points[2].x, points[2].y],
                                ['L', points[3].x, points[3].y]
                            ];
                            // 最后一周的多边形添加右侧边框
                            container.addShape('path', {
                                zIndex: 1,
                                attrs: {
                                    path: this.parsePath(linePath),
                                    lineWidth: 1,
                                    stroke: '#404040'
                                }
                            });
                            if (cfg.origin._origin.lastDay) {
                                container.addShape('path', {
                                    zIndex: 1,
                                    attrs: {
                                        path: this.parsePath([
                                            ['M', points[1].x, points[1].y],
                                            ['L', points[2].x, points[2].y]
                                        ]),
                                        lineWidth: 1,
                                        stroke: '#404040'
                                    }
                                });
                            }
                        }
                        container.sort();
                        return polygon;
                    }
                }
            });
            let data = self.dateChartData;
            // 求最活跃天数
            let max_one_day_article_num = 0;
            data.forEach((v, i) => {
                if (v.articles > max_one_day_article_num) {
                    max_one_day_article_num = v.articles;
                    this.overviewData.maxActiveDayArticleTotal = v.date;
                }
            })
            var chart = new G2.Chart({
                container: 'date_chart',
                forceFit: true,
                height: 300,
            });
            chart.source(data, {
                day: {
                    type: 'cat',
                    values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                },
                week: {
                    type: 'cat',
                },
                articles: {
                    alias: '新增文章',
                    sync: true
                }
            });
            chart.axis('week', {
                position: 'top',
                tickLine: null,
                line: null,
                label: {
                    autoRotate: false,
                    offset: 12,
                    textStyle: {
                        fontSize: 12,
                        fill: '#666',
                        textBaseline: 'top'
                    },
                    formatter: function formatter(val) {
                        const start_time = new Date('2018-10-27').getTime(),
                              one_week_time = 60 * 60 * 24 * 7 * 1000;
                        let date = new Date(start_time + one_week_time * val).Format('yyyy-MM-dd'),
                            day = new Date(start_time + one_week_time * val).getDate()
                        if (day < 8) {
                            return date.substr(0, 7)
                        }
                        return '';
                    }
                }
            });
            chart.axis('day', {
                grid: null
            });
            chart.legend(false);
            chart.tooltip({
                title: 'date'
            });
            chart.coord().reflect('y');
            chart.polygon().position('week*day*date').color('articles', '#BAE7FF-#1890FF-#0050B3').shape('boundary-polygon');
            chart.render();
        },
    }
}
</script>
<style lang="scss">
canvas {
    width: 100% !important;
    transition: .25s;
}
.overview{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: $md;
    .overview-item{
        width: 22%;
        padding: $md;
        margin-bottom: $md;
        border: 1px solid $b_c;
        border-radius: $xs;
    }
    .tips{
        font-size: 12px;
        font-weight: normal;
        color: $gray;
    }
}
</style>