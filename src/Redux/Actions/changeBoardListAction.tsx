import * as type from "../Types";
import { createReducer } from "typesafe-actions";

export const SET_BOARDLIST = "changeBoardList/SET_BOARDLIST" as const;

// type : action의 type
// payload : action의 인자
export const setBoardList = (boardItemList: type.boardItem[]) => ({
  type: SET_BOARDLIST,
  payload: boardItemList,
});

export const GET_BOARDLIST = "changeBoardList/GET_BOARDLIST" as const;

export const getBoardList = () => ({
  type: GET_BOARDLIST,
});

// export const SET_BOARDLIST = "changeBoardList/SET_BOARDLIST" as const;
// export const setBoardList = createStandardAction(SET_BOARDLIST)<{
//   boardlist: type.BoardList;
// }>();

// export const GET_BOARDLIST = "changeBoardList/GET_BOARDLIST" as const;
// export const getBoardList = createStandardAction(SET_BOARDLIST)<{
//   boardlist: type.BoardList;
// }>();
