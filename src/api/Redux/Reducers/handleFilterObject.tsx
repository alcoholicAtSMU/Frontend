import * as type from "../Types";
import { SET_FILTEROBJECT } from "../Actions/changeFilterObjectAction";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.FILTEROBJECT = {
  filterobject: {
    alcoholLevel: [0, 30],
    alcoholType: ["전체"],
    price: [0, 100000],
  },
};

//draft : 기존의 state, action : 새로운 action
const filterobject = createReducer<
  type.FILTEROBJECT,
  type.changeFilterObjectAction
>(initialState, {
  [SET_FILTEROBJECT]: (state, action) =>
    produce(state, (draft) => {
      draft.filterobject = action.payload;
    }),
});

export default filterobject;
