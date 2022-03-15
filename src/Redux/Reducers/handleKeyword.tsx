import * as type from "../Types";
import { SET_KEYWORD } from "../Actions/changeKeywordAction";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.KEYWORD = {
  keyword: "",
};

//draft : 기존의 state, action : 새로운 action
const keyWord = createReducer<type.KEYWORD, type.changeKeywordAction>(
  initialState,
  {
    [SET_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        console.log("action payload : " + action.payload);
        draft.keyword = action.payload;
      }),
  }
);

export default keyWord;
