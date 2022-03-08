import { combineReducers } from "redux";
import handleBoardList from "./handleBoardList";
import handleFilterObject from "./handleFilterObject";
import handleTotalPosts from "./handleTotalPosts";

const rootReducer = combineReducers({
  handleBoardList,
  handleFilterObject,
  handleTotalPosts,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
