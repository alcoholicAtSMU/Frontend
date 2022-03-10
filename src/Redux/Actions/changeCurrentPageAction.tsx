import * as type from "../Types";

export const SET_CURRENTPAGE =
  "changeCurrentPageAction/SET_CURRENTPAGE" as const;

// type : action의 type
// payload : action의 인자
export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENTPAGE,
  payload: currentPage,
});
