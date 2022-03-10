import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./board.css";
import axios from "axios";

import BoardFilter from "./BoardFilter";
import BoardDetail from "../boardDetail/BoardDetail";
import CardContainer from "./CardContainer";
import Pagination from "../component/Pagination";

import * as type from "../Redux/Types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { setTotalPost } from "../Redux/Actions/changeTotalPostAction";
import { setCurrentPage } from "../Redux/Actions/changeCurrentPageAction";
import { RootState } from "../Redux/Reducers/rootReducer";

const Board = () => {
  const dispatch = useDispatch();

  //useSelector를 통해 boardList에 리덕스 스토어에 저장된 값 불러오기
  const boardList = useSelector(
    (state: RootState) => state.handleBoardList.boardlist,
    shallowEqual
  );

  //useSelector를 통해 boardList에 리덕스 스토어에 저장된 값 불러오기
  const filterObj = useSelector(
    (state: RootState) => state.handleFilterObject.filterobject,
    shallowEqual
  );

  const currentPage = useSelector(
    (state: RootState) => state.handleCurrentPage.currentpage,
    shallowEqual
  );

  //pagination을 위한 변수
  const paginate = (pageNumber: number) => dispatch(setCurrentPage(pageNumber));

  useEffect(() => {
    axios({
      method: "GET",
      url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${
        filterObj.price[0]
      }&priceTo=${filterObj.price[1]}&degreeFrom=${
        filterObj.alcoholLevel[0]
      }&degreeTo=${filterObj.alcoholLevel[1]}&page=${currentPage - 1}`,
    })
      .then((res) => {
        dispatch(setBoardList(res.data.content));
        dispatch(setTotalPost(res.data.totalElements));
      })
      .catch((err) => {
        console.log("리스트 가져오기 에러", err);
      });
  }, []);

  const currentPosts = boardList;
  console.log(currentPosts);

  return (
    <div className="Board-Top-Container">
      <Routes>
        <Route path="/:a_id" element={<BoardDetail />} />
      </Routes>

      <div className="boardFilter">
        <BoardFilter />
      </div>

      <div className="Board-Container">
        {currentPosts.map((value, i: number) => (
          <CardContainer
            id={value.id}
            type={value.type}
            name={value.name}
            price={value.price}
            image={value.image}
            reviews={value.reviews}
          />
        ))}

        <Pagination paginate={paginate} />
      </div>
    </div>
  );
};

export default Board;
