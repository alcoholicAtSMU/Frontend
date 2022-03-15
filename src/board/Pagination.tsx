import React, { useState, useCallback } from "react";
import "./pagination.css";
import useGetAlcoholList from "./useGetAlcoholList";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../Redux/Reducers/rootReducer";
import { setCurrentPage } from "../Redux/Actions/changeCurrentPageAction";

// postsPerPage : 페이지당 표시할 게시글 수
// totalPosts : 전체 게시글 수
// currentPage : 현재 페이지
// paginate : 클릭 시, 부모 component에 페이지 수를 전달

interface paginationProps {
  paginate: Function;
}

const Pagination = ({ paginate }: paginationProps) => {
  const dispatch = useDispatch();

  const filterObj = useSelector(
    (state: RootState) => state.handleFilterObject.filterobject,
    shallowEqual
  );

  const currentPage = useSelector(
    (state: RootState) => state.handleCurrentPage.currentpage,
    shallowEqual
  );

  const totalPosts = useSelector(
    (state: RootState) => state.handleTotalPosts.totalposts
  );

  const setCurrentpage = useCallback(
    (currentPage: number) => dispatch(setCurrentPage(currentPage)),
    [dispatch]
  );

  console.log("totalPosts" + totalPosts);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / 12); i++) {
    pageNumbers.push(i);
  }
  const { GetAlcoholList } = useGetAlcoholList();

  return (
    <div className="pagination-container">
      {totalPosts !== 0 ? (
        <ul className="pagination-ul">
          {pageNumbers.map((number) => (
            <li key={number} className="pagination-item">
              <a
                key={number}
                onClick={async () => {
                  await paginate(number);
                  setCurrentpage(number);
                  GetAlcoholList(number, filterObj);
                }}
                className="pagination-num"
                style={
                  currentPage == number
                    ? { color: "#292929" }
                    : { color: "#727272" }
                }
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="pagination-none">결과가 없습니다.</div>
      )}
    </div>
  );
};

export default Pagination;
