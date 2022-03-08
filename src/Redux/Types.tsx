import { setBoardList } from "./Actions/changeBoardListAction";

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
