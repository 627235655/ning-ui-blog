import { put, takeLatest, all, fork, take } from "redux-saga/effects";
import * as Api from "server/server";

function* GetArticleList() {
    yield takeLatest("GET_ARTICLE_LIST", SaveArticleList);
}

function* SaveArticleList({currentPage, pageSize}) {
    try {
        let res = yield Api.getArticleList({
            currentPage,
            pageSize
        });
        if (res) {
            let data = res.data;
            yield put({
                type: "SAVE_ARTICLE_LIST",
                data
            });
        } else {
            yield put({
                type: "ARTICLE_LIST_ERR",
                data: {}
            });
        }
    } catch (error) {
        yield put({
            type: "ARTICLE_LIST_ERR",
            data: {}
        });
    }
}

export default function* rootSaga() {
    yield all([
        GetArticleList()
    ]);
}
