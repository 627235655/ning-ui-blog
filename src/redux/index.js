import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import reducer from "./reducers/index";
import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middlewares = [sagaMiddleware];

if (window.location.host !== "activity.ximalaya.com") {
    middlewares.push(logger);
}
const store = createStore(reducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(function*() {
    yield rootSaga();
});

export default store;