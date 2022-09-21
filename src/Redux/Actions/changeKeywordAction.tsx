import * as type from "../Types";

export const SET_KEYWORD = "changeKeywordAction/SET_KEYWORD" as const;

// type : action의 type
// payload : action의 인자
export const setKeyword = (Keyword: String) => ({
  type: SET_KEYWORD,
  payload: Keyword,
});
