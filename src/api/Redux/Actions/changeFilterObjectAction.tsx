import * as type from "../Types";

export const SET_FILTEROBJECT =
  "changeFilterObjectAction/SET_FILTEROBJECT" as const;

// type : action의 type
// payload : action의 인자
export const setFilterObj = (FilterObj: type.filterObj) => ({
  type: SET_FILTEROBJECT,
  payload: FilterObj,
  return: String,
});
