// 批量操作？？
// 缓存策略？？
// 通过更新时间判断是否需要同步
import axiosFn from '../libs/ning-ui/js/axios';
import api from '../server/api';

// 读取 md 文件
const marked = require('marked');
const fs = require('fs-extra');

const formatParamsFromString = (string) => ({
  articleSummary: '',
  commentCount: '',
  createDate: '',
  isPrivate: '',
  likeCount: '',
  readCount: '',
  thumbnailUrl: '',
  updateDate: '',
  __v: '',
  _id: '',
  ...string
    .split('&')
    .filter((v) => v)
    .reduce((acc, curr) => {
      let entries = curr.split('=');
      acc[entries[0]] = entries[1];
      return acc;
    }, {}),
});

let res = fs.readFile('./test.md', function (err, data) {
  if (err) {
    return console.error(err);
  }
  const articleContent = data.toString();
  let dataArr = articleContent.split('\n').filter((v) => v);
  if (dataArr.length < 1) {
    console.log('检查 文档 是否有内容');
    return;
  }
  const articleContentResult = marked.parse(articleContent);
  // 取标题
  const articleName = dataArr[0].split(' ')[1];
  // 取标签
  const articleTags = dataArr[1].split('[]')[0].split('|');
  // 拼接数据
  let articleData: IArticleItem = {
    articleContent,
    articleContentLength: 6,
    articleContentResult,
    articleName,
    articleTags,
    // 取其余字段
    ...formatParamsFromString(dataArr[1].split('[]')[1]),
  };
  console.log(
    '🚀 ~ file: syncLocalDataToDB.ts ~ line 26 ~ res ~ articleData',
    articleData
  );
  addArticle(articleData);
});
console.log('12312');

// 解析字段
// - 标题
// - 标签 无则新建
// 调取接口
// - 有 id 为更新 如果没有回调 从 db 到local 同步数据 那么本地文件是没有 id 的 比对标题来判断
// - 无 id 则新增

// 约定规范 取出文章的值
// 通过空白 a 标签来存储 id updateTime 等字段？？
// let elInfoP = document.getElementsByTagName('p')[0];
// let tags = elInfoP.innerText.split('|');
// let detail = elInfoP.children[0].href.split('/').pop().split('&');

const addArticle = (data) => {
  if (!data.articleName) {
    console.log('请输入文章标题!');
    return;
  }
  if (data.articleTags.length === 0) {
    console.log('请选择文章标签!');
    return;
  }
  if (!data.articleContent) {
    console.log('请输入文章内容!');
    return;
  }
  data.updateDate = new Date();
  if (data._id) {
    axiosFn({
      type: 'post',
      url: api.updateArticle,
      data,
      cb: (res) => {
        console.log(res.message);
      },
    });
  } else {
    data.createDate = new Date();
    axiosFn({
      type: 'post',
      url: api.addArticle,
      data,
      cb: (res) => {
        console.log(res.message);
      },
    });
  }
};
