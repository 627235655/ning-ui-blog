<template>
    <div id="home">
        <h2 class="page-title">主页</h2>
        <divider></divider>
        <div class="ning-row border p-md">
            <div class="col-6 border p-sm m-b-md">
                <h3 class="p-b-md">总数统计</h3>
                <!-- 文章数, 标签数，总字数 -->
                <div id="total_chart"></div>
            </div>
            <div class="flex-1 border p-sm m-b-md m-l-md">
                <h3 class="p-b-md">标签占比</h3>
                <!-- 文章数, 标签数，总字数 -->
                <div id="tags_chart"></div>
            </div>
            <div class="col-6 border p-sm">
                <h3 class="p-b-md">时间活跃度</h3>
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
import G2 from '@antv/g2';

let initDateChartData = function(length) {
    let today = new Date();
    let timestamp = new Date().getTime();
    let len = length || today.getDate();
    let arr = [];
    for (let i = 0; i < len; i++) {
        let current_date = new Date(timestamp - 3600 * 1000 * 24 * i)
        let obj = {
            "date": current_date.Format('yyyy-MM-dd'),
            "articles": 0,
            "month": current_date.getMonth(),
            "day": current_date.getDay(),
            "week": Math.ceil((current_date.getDate() + 6 - current_date.getDay()) / 7 ).toString()
        }
        arr.unshift(obj)
        console.log(obj)
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
        getTagList() {
            let self = this;
            return new Promise((resolve, reject) => {
                axios.get('/api/getTagList')
                    .then(function(response) {
                        let res = response.data;
                        if (res.status === 200) {
                            resolve(true)
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
                    })
                    .catch(function(error) {
                        reject(false)
                        console.log(error);
                    });
            })
        },
        getArticleList() {
            let self = this;
            return new Promise((resolve, reject) => {
                axios.get('/api/getArticleList')
                    .then(function(response) {
                        let res = response.data;
                        if (res.status === 200) {
                            resolve(true)
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
                        }
                    })
                    .catch(function(error) {
                        reject(false)
                        console.log(error);
                    });
            })
        },
        renderTotalChart() {
            let self = this;
            const data = [
                { genre: '标签', sold: self.totalChartData.tag_total },
                { genre: '文章', sold: self.totalChartData.article_total },
                { genre: '总字数(k)', sold: self.totalChartData.count_total / 1000 },
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
            var chart = new G2.Chart({
                container: 'tags_chart',
                forceFit: true,
                height: 300,
            });
            chart.source(data, {
                percent: {
                    formatter: function formatter(val) {
                        val = val.toFixed(4) * 100 + '%';
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
                    sync: true
                }
            });
            chart.axis('week', {
                position: 'top',
                tickLine: null,
                line: null,
                label: {
                    offset: 12,
                    textStyle: {
                        fontSize: 12,
                        fill: '#666',
                        textBaseline: 'top'
                    },
                    formatter: function formatter(val) {
                        console.log(val)
                        if (val === '2') {
                            return 'MAY';
                        } else if (val === '6') {
                            return 'JUN';
                        } else if (val === '10') {
                            return 'JUL';
                        } else if (val === '15') {
                            return 'AUG';
                        } else if (val === '19') {
                            return 'SEP';
                        } else if (val === '24') {
                            return 'OCT';
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
</style>