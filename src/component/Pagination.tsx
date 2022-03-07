import React, { useState } from "react";
import "./pagination.css";

// postsPerPage : 페이지당 표시할 게시글 수
// totalPosts : 전체 게시글 수
// currentPage : 현재 페이지
// paginate : 클릭 시, 부모 component에 페이지 수를 전달
// 클릭된 페이지 숫자는 color를 다르게 하여,
// 현재 머물러있는 페이지를 알 수 있도록 한다.

type Image = {
  src: string;
};

interface paginationProps {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: Function;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: paginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {totalPosts !== 0 ? (
        <ul className="pagination-ul">
          {pageNumbers.map((number) => (
            <li key={number} className="pagination-item">
              <a
                onClick={() => paginate(number)}
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
