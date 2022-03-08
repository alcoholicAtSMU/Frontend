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
import { RootState } from "../Redux/Reducers/rootReducer";

const Board = () => {
  const dispatch = useDispatch();

  //useSelector를 통해 boardList에 리덕스 스토어에 저장된 값 불러오기
  const boardList = useSelector(
    (state: RootState) => state.handleBoardList.boardlist,
    shallowEqual
  );
  // console.log(boardList);

  //useSelector를 통해 boardList에 리덕스 스토어에 저장된 값 불러오기
  const filterObj = useSelector(
    (state: RootState) => state.handleFilterObject.filterobject,
    shallowEqual
  );
  // console.log(filterObj);

  //pagination을 위한 변수
  const [currentPage, setCurrentPage] = useState<number>(0);
  const postsPerPage = 12;
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;

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
        // console.log(res.data.content);

        dispatch(setBoardList(res.data.content));
        dispatch(setTotalPost(res.data.totalElements));
        // console.log(boardList);
      })
      .catch((err) => {
        console.log("리스트 가져오기 에러", err);
      });
  }, []);

  // 전체 페이지를 받아오면? -> currentPosts는 그냥 boardList(slice 안해도 됨)
  // const currentPosts = boardList.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts = boardList;
  console.log(currentPosts);

  return (
    <div className="Board-Top-Container">
      <Routes>
        <Route path="/:a_id" element={<BoardDetail />} />
      </Routes>

      <div className="boardFilter">
        <BoardFilter currentPage={currentPage} />
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

        <Pagination
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Board;
