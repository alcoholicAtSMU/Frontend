import { combineReducers } from "redux";
import handleBoardList from "./handleBoardList";

const rootReducer = combineReducers({ handleBoardList });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
