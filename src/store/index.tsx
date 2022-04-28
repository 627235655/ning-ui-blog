import React, { createContext, useReducer } from "react";
import { IGlobalData } from "../typings";

export const SET_LOGIN_USER_INFO = "SET_LOGIN_USER_INFO";
export const SET_ACTIVE_NAV_NAME = "SET_ACTIVE_NAV_NAME";

const reducer = (state, action) => {
  // 注意此处是要返回新的 state 不要在原来的 state 上修改 而是复制原来的 state {...state}
  console.log("reducer", state, action);
  switch (action.type) {
    // 设置当前用户信息
    case SET_LOGIN_USER_INFO:
      return { ...state, ...action.data };
    default:
      return state;
      break;
  }
};

const initialState: IGlobalData = {
  loginUserInfo: {
    userName: null
  } // 登录者信息
};

export const GlobalDataContext = createContext({
  globalData: initialState,
  dispatch: (() => 0) as React.Dispatch<{ type: string; data: object }>
});

export const Store = (props) => {
  console.log("Store props", props);

  const [globalData, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalDataContext.Provider value={{ globalData, dispatch }}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};
