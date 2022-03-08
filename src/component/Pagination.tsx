import React, { useState } from "react";
import "./pagination.css";
import useGetAlcoholList from "../board/useGetAlcoholList";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../Redux/Reducers/rootReducer";

// postsPerPage : 페이지당 표시할 게시글 수
// totalPosts : 전체 게시글 수
// currentPage : 현재 페이지
// paginate : 클릭 시, 부모 component에 페이지 수를 전달
// 클릭된 페이지 숫자는 color를 다르게 하여,
// 현재 머물러있는 페이지를 알 수 있도록 한다.

interface paginationProps {
  postsPerPage: number;
  currentPage: number;
  paginate: Function;
}

const Pagination = ({
  postsPerPage,
  currentPage,
  paginate,
}: paginationProps) => {
  const totalPosts = useSelector(
    (state: RootState) => state.handleTotalPosts.totalposts,
    shallowEqual
  );
  console.log(totalPosts);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
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
                  GetAlcoholList(number);
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
