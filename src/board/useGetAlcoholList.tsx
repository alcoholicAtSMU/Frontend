import React, { useCallback } from "react";
import axios from "axios";

import * as type from "../Redux/Types";
import { useDispatch } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { setTotalPost } from "../Redux/Actions/changeTotalPostAction";

export function useGetAlcoholList() {
  //dispatch를 최상단 함수에서만 사용
  const dispatch = useDispatch();

  const setBoard = useCallback(
    (boardItemList: type.boardItem[]) => dispatch(setBoardList(boardItemList)),
    [dispatch]
  );
  const setTotalpost = useCallback(
    (TotalPosts: number) => dispatch(setTotalPost(TotalPosts)),
    [dispatch]
  );

  const GetAlcoholList = (currentPage: number, filterObj: type.filterObj) => {
    axios({
      method: "GET",
      url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${
        filterObj.price[0]
      }&priceTo=${filterObj.price[1]}&degreeFrom=${
        filterObj.alcoholLevel[0]
      }&degreeTo=${filterObj.alcoholLevel[1]}&page=${currentPage - 1}`,
    })
      .then((res) => {
        setBoard(res.data.content);
        setTotalpost(res.data.totalElements);
      })
      .catch((err) => {
        console.log("리스트 가져오기 에러", err);
      });
  };

  return { GetAlcoholList };
}

export default useGetAlcoholList;
