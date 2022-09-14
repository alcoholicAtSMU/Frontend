import * as type from "../Types";

export const SET_BOARDLIST = "changeBoardListAction/SET_BOARDLIST" as const;

// type : action의 type
// payload : action의 인자
export const setBoardList = (boardItemList: type.boardItem[]) => ({
  type: SET_BOARDLIST,
  payload: boardItemList,
});
