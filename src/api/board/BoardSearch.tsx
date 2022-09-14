import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./api/boardSearch.css";
import axios from "axios";
import CardContainer from "./CardContainer";
import Pagination from "./Pagination";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setCurrentPage } from "../Redux/Actions/changeCurrentPageAction";
import { RootState } from "../Redux/Reducers/rootReducer";

const BoardSearch = () => {
  //useSelector를 통해 boardList에 리덕스 스토어에 저장된 값 불러오기
  const boardList = useSelector(
    (state: RootState) => state.handleBoardList.boardlist,
    shallowEqual
  );

  const totalPosts = useSelector(
    (state: RootState) => state.handleTotalPosts.totalposts
  );

  const keyword = useSelector(
    (state: RootState) => state.handleKeyword.keyword
  );

  const currentPosts = boardList;
  return (
    <div className="BoardSearch-Top-Container">
      {totalPosts == 0 ? (
        <p className="BoardSearch-header">{keyword}의 검색 결과가 없습니다.</p>
      ) : (
        <>
          <p className="BoardSearch-header">
            {totalPosts}개의 " {keyword} " 검색 결과가 있습니다.
          </p>
          <div className="BoardSearch-Container">
            {currentPosts.map((value, i: number) => (
              <CardContainer
                id={value.id}
                name={value.name}
                price={value.price}
                image={value.image}
                reviews={value.review}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default BoardSearch;
