import React, { useCallback } from "react";
import axios from "axios";

import * as type from "../Redux/Types";
import { useDispatch } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";

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

function useGetAlcoholList(filterObj: filterState["filterObj"]) {
  const dispatch = useDispatch();
  //dispatch를 최상단 함수에서만 사용
  const setBoard = useCallback(
    (boardItemList: type.boardItem[]) => dispatch(setBoardList(boardItemList)),
    [dispatch]
  );

  const GetAlcoholList = () => {
    axios({
      method: "GET",
      url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${filterObj.price[0]}&priceTo=${filterObj.price[1]}&degreeFrom=${filterObj.alcoholLevel[0]}&degreeTo=${filterObj.alcoholLevel[1]}`,
    })
      .then((res) => {
        // dispatch(setBoardList(res.data));
        setBoard(res.data);
      })
      .catch((err) => {
        console.log("리스트 가져오기 에러", err);
      });
  };

  return { GetAlcoholList };
}

export default useGetAlcoholList;
