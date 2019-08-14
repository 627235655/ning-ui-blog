const STATE = {
    // 文章列表
    articleList: [],
    // 请求是否完成
    done: false,
    //总量
    totalCount: 0,
    err: false
};

export default function ArticleReducer(state = STATE, action) {
    switch (action.type) {
        case "SAVE_ARTICLE_LIST":
            return Object.assign({}, state, {
                articleList: action.data.list,
                done: true,
                total: action.data.totalCount,
                err: false
            });
        case "ARTICLE_LIST_ERR":
            return Object.assign({}, state, {
                err: true
            });
        default:
            return state;
    }
}
