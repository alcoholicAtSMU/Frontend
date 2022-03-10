import { combineReducers } from "redux";
import handleBoardList from "./handleBoardList";
import handleFilterObject from "./handleFilterObject";
import handleTotalPosts from "./handleTotalPosts";
import handleCurrentPage from "./handleCurrentPage";

const rootReducer = combineReducers({
  handleBoardList,
  handleFilterObject,
  handleTotalPosts,
  handleCurrentPage,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
