import * as type from "../Types";
import { SET_CURRENTPAGE } from "../Actions/changeCurrentPageAction";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.CURRENTPAGE = {
  currentpage: 1,
};

//draft : 기존의 state, action : 새로운 action
const currentPage = createReducer<
  type.CURRENTPAGE,
  type.changeCurrentPageAction
>(initialState, {
  [SET_CURRENTPAGE]: (state, action) =>
    produce(state, (draft) => {
      draft.currentpage = action.payload;
    }),
});

export default currentPage;
