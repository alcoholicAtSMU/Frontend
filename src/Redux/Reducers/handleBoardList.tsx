import * as type from "../Types";
import { SET_BOARDLIST, GET_BOARDLIST } from "../Actions/changeBoardListAction";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.BOARDLIST = {
  boardlist: [],
};

//draft : 기존의 state, action : 새로운 action
const boardlist = createReducer<type.BOARDLIST, type.changeBoardListAction>(
  initialState,
  {
    [SET_BOARDLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.boardlist = action.payload;
      }),
    // [GET_BOARDLIST]: (state) =>
    //   produce(state, (draft) => {
    //     draft.boardlist.concat(state.boardlist);
    //     console.log("GET_BOARDLIST:" + boardlist);
    //   }),
  }
);

export default boardlist;
