import React from "react";
import axios from "axios";

import * as type from "../Redux/Types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { RootState } from "../Redux/Reducers/rootReducer";

interface filterState {
  filterObj: {
    alcoholLevel: Array<number>;
    alcoholType: Array<string>;
    price: Array<number>;
  };
  setFilterObj: React.Dispatch<
    React.SetStateAction<{
      alcoholLevel: Array<number>;
      alcoholType: Array<string>;
      price: Array<number>;
    }>
  >;
}

export const GetAlcoholList = (filterObj: filterState["filterObj"]) => {
  const dispatch = useDispatch();

  axios({
    method: "GET",
    url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${filterObj.price[0]}&priceTo=${filterObj.price[1]}&degreeFrom=${filterObj.alcoholLevel[0]}&degreeTo=${filterObj.alcoholLevel[1]}`,
  })
    .then((res) => {
      // console.log(res.data);
      dispatch(setBoardList(res.data));
    })
    .catch((err) => {
      console.log("리스트 가져오기 에러", err);
    });
  return <div className="GetAlcohol-Top-Container">GetAlcohol</div>;
};
// export function GetAlcoholList(filterObj: filterState["filterObj"]) {
//   // const boardList = useSelector(
//   //   (state: RootState) => state.handleBoardList.boardlist,
//   //   shallowEqual
//   // );
//   const dispatch = useDispatch();

//   axios({
//     method: "GET",
//     url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${filterObj.price[0]}&priceTo=${filterObj.price[1]}&degreeFrom=${filterObj.alcoholLevel[0]}&degreeTo=${filterObj.alcoholLevel[1]}`,
//   })
//     .then((res) => {
//       // console.log(res.data);
//       dispatch(setBoardList(res.data));
//     })
//     .catch((err) => {
//       console.log("리스트 가져오기 에러", err);
//     });
//   return <div className="GetAlcohol-Top-Container">GetAlcohol</div>;
// }
export default GetAlcoholList;
