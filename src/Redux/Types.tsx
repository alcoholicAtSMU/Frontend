import { setBoardList } from "./Actions/changeBoardListAction";
import { setFilterObj } from "./Actions/changeFilterObjectAction";
import { setTotalPost } from "./Actions/changeTotalPostAction";

export type Image = {
  src: string;
};

export interface boardItem {
  id: number;
  type: string;
  name: string;
  price: number;
  capacity: number;
  degree: number;
  image: string;
  reviews: Array<Object>;
  manufacturer: string;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  content: string;
}

export type BOARDLIST = {
  boardlist: Array<boardItem>;
};

export type changeBoardListAction = ReturnType<typeof setBoardList>;

export interface filterObj {
  alcoholLevel: Array<number>;
  alcoholType: Array<string>;
  price: Array<number>;
}

export type FILTEROBJECT = {
  filterobject: filterObj;
};

export type changeFilterObjectAction = ReturnType<typeof setFilterObj>;

// export type totalPosts = {
//   total_Posts: number;
// };

export type TOTALPOST = {
  totalposts: number;
};

export type changeTotalPostAction = ReturnType<typeof setTotalPost>;
