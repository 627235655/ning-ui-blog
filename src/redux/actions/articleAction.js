/*
 * action 类型
 */

export const GET_ARTICLE_LIST = 'GET_ARTICLE_LIST';

/*
 * action 创建函数
 */
export function getArticleList(filter) {
    return {
        type: GET_ARTICLE_LIST
    }
}