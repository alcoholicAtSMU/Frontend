import { combineReducers } from "redux";
import handleBoardList from "./handleBoardList";
import { boardItem, BOARDLIST } from "../Types";

const rootReducer = combineReducers({ handleBoardList });

// export type RootState = {
//   boardlist: BOARDLIST;
// };

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
