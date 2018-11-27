<template>
    <div id="article_list">
        <h2 class="page-title">主页</h2>
        <divider></divider>
        <div class="ning-row border p-md">
            <div class="col-4">
              <h3>总数统计</h3>
                <!-- 文章数, 标签数，总字数 -->
                <div id="total_chart"></div>
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

export default {
    name: 'home',
    data() {
        return {
            tagList: [],
            articleList: [],
            totalChart: {
                tag_total: 0,
                article_total: 0,
            }
        }
    },
    mounted: function() {
        Promise.all([this.getTagList(), this.getArticleList()]).then((result) => {
            if (!result.includes(false)) {
                this.renderChart();
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
                            self.totalChart.tag_total = res.data.totalCount;
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
                            self.totalChart.article_total = res.data.totalCount;
                        }
                    })
                    .catch(function(error) {
                        reject(false)
                        console.log(error);
                    });
            })
        },
        renderChart() {
            let self = this;
            const data = [
                { genre: '标签', sold: self.totalChart.tag_total },
                { genre: '文章', sold: self.totalChart.article_total },
            ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
            console.log(data)
            // Step 1: 创建 Chart 对象
            const chart = new G2.Chart({
                container: 'total_chart', // 指定图表容器 ID
                // width: 300, // 指定图表宽度
                height: 300 // 指定图表高度
            });
            // Step 2: 载入数据源
            chart.source(data);
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            chart.interval().position('genre*sold').color('genre')
            // Step 4: 渲染图表
            chart.render();
        }
    }
}
</script>
<style lang="scss">
  canvas{
    width: 100%;
  }
</style>