import * as type from "../Types";

export const SET_TOTALPOSTS = "changeTotalPostAction/SET_TOTALPOSTS" as const;

// type : action의 type
// payload : action의 인자
export const setTotalPost = (TotalPosts: number) => ({
  type: SET_TOTALPOSTS,
  payload: TotalPosts,
});
