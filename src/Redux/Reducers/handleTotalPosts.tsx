import * as type from "../Types";
import { SET_TOTALPOSTS } from "../Actions/changeTotalPostAction";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.TOTALPOST = {
  totalposts: 0,
};

//draft : 기존의 state, action : 새로운 action
const totalPosts = createReducer<type.TOTALPOST, type.changeTotalPostAction>(
  initialState,
  {
    [SET_TOTALPOSTS]: (state, action) =>
      produce(state, (draft) => {
        console.log("action payload : " + action.payload);
        draft.totalposts = action.payload;
      }),
  }
);

export default totalPosts;
