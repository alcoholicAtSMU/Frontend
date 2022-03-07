import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./board.css";
import axios from "axios";

import BoardFilter from "./BoardFilter";
import BoardDetail from "../boardDetail/BoardDetail";
import GetAlcoholList from "./GetAlcoholList";
import CardContainer from "./CardContainer";
import Pagination from "../component/Pagination";

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

const Board = () => {
  // 서버에 전달할 필터링 객체 -> 주종에 아무것도 안오면 전체로 취급하기
  const [filterObj, setFilterObj] = useState<filterState["filterObj"]>({
    alcoholLevel: [0, 30],
    alcoholType: ["전체"],
    price: [0, 100000],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
    axios({
      method: "GET",
      url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${filterObj.price[0]}&priceTo=${filterObj.price[1]}&degreeFrom=${filterObj.alcoholLevel[0]}&degreeTo=${filterObj.alcoholLevel[1]}`,
    })
      .then((res) => {
        // console.log(res.data);
        dispatch(setBoardList(res.data));
        console.log(boardList);
      })
      .catch((err) => {
        console.log("리스트 가져오기 에러", err);
      });
  }, []);

  const boardList = useSelector(
    (state: RootState) => state.handleBoardList.boardlist,
    shallowEqual
  );

  // const boardList = useSelector(
  //   (state: RootState) => ({ boardList: state.handleBoardList.boardlist }),
  //   (prev, next) => {
  //     return prev.boardList === next.boardList;
  //   }
  // );

  console.log(boardList);

  //pagination을 위한 변수
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostPerPage] = useState<number>(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = boardList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="Board-Top-Container">
      <Routes>
        {/* <Route path={`${match.path}/:id`} component={UserDetail} /> */}
        <Route path="/:a_id" element={<BoardDetail />} />
      </Routes>

      <div className="boardFilter">
        <BoardFilter filterObj={filterObj} setFilterObj={setFilterObj} />
      </div>

      {/* boardList를 순회하여 card component에 담아 보여줌 */}
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
          totalPosts={boardList.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Board;
