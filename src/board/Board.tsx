import React, { useState, useEffect } from "react";
import "./board.css";
import BoardFilter from "./BoardFilter";
import CardContainer from "./CardContainer";
import Pagination from "../component/Pagination";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BoardDetail from "../boardDetail/BoardDetail";
import GetAlcoholList from "./GetAlcoholList";

type Image = {
  src: string;
};

interface cardProps {
  image: Image;
  name: string;
  price: number;
  review: number;
}

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

interface boardItem {
  boardItem: {
    a_id: number;
    type: string;
    name: string;
    price: number;
    capacity: number;
    degree: number;
    image: Image;
    reviews: number;
    manufacturer: string;
    taste_1: string;
    taste_2: string;
    taste_3: string;
    taste_4: string;
    taste_5: string;
    intro: string;
  };
}

interface boardItemState {
  boardItem: boardItem | undefined;
  setBoardItem: React.Dispatch<React.SetStateAction<boardItem | undefined>>;
}

const Board = () => {
  const img1 = require("../static/1000억_유산균_막걸리.jpg");
  const img2 = require("../static/고도리_샤인머스켓_화이트와인.jpg");
  const img3 = require("../static/나루_생막걸리_6도.jpg");
  const img4 = require("../static/꿀샘16.jpg");

  // 서버에 전달할 필터링 객체 -> 주종에 아무것도 안오면 전체로 취급하기
  const [filterObj, setFilterObj] = useState<filterState["filterObj"]>({
    alcoholLevel: [0, 30],
    alcoholType: ["전체"],
    price: [0, 100000],
  });

  const [boardItem, setBoardItem] = useState<boardItem>();

  //Get으로 cardProps에 해당하는 객체 리스트 받아오기
  const postList: cardProps[] = [
    {
      image: { src: img1 },
      name: "1000억 유산균 막걸리",
      price: 8000,
      review: 5,
    },
    {
      image: { src: img2 },
      name: "고도리 샤인머스켓 화이트와인",
      price: 100000,
      review: 30,
    },
    {
      image: { src: img1 },
      name: "1000억 유산균 막걸리",
      price: 8000,
      review: 5,
    },
    {
      image: { src: img2 },
      name: "고도리 샤인머스켓 화이트와인",
      price: 100000,
      review: 30,
    },
    {
      image: { src: img1 },
      name: "1000억 유산균 막걸리",
      price: 8000,
      review: 5,
    },
    {
      image: { src: img2 },
      name: "고도리 샤인머스켓 화이트와인",
      price: 100000,
      review: 30,
    },
    {
      image: { src: img1 },
      name: "1000억 유산균 막걸리",
      price: 8000,
      review: 5,
    },
    {
      image: { src: img2 },
      name: "고도리 샤인머스켓 화이트와인",
      price: 100000,
      review: 30,
    },

    {
      image: { src: img3 },
      name: "나루 생막걸리 6도",
      price: 81000,
      review: 35,
    },
    {
      image: { src: img4 },
      name: "꿀샘16",
      price: 100000,
      review: 25,
    },
    {
      image: { src: img3 },
      name: "나루 생막걸리 6도",
      price: 81000,
      review: 35,
    },
    {
      image: { src: img4 },
      name: "꿀샘16",
      price: 100000,
      review: 25,
    },
    {
      image: { src: img3 },
      name: "나루 생막걸리 6도",
      price: 81000,
      review: 35,
    },
    {
      image: { src: img4 },
      name: "꿀샘16",
      price: 100000,
      review: 25,
    },
    {
      image: { src: img3 },
      name: "나루 생막걸리 6도",
      price: 81000,
      review: 35,
    },
    {
      image: { src: img4 },
      name: "꿀샘16",
      price: 100000,
      review: 25,
    },
    {
      image: { src: img1 },
      name: "1000억 유산균 막걸리",
      price: 8000,
      review: 5,
    },
    {
      image: { src: img2 },
      name: "고도리 샤인머스켓 화이트와인",
      price: 100000,
      review: 30,
    },
    {
      image: { src: img1 },
      name: "1000억 유산균 막걸리",
      price: 8000,
      review: 5,
    },
    {
      image: { src: img2 },
      name: "고도리 샤인머스켓 화이트와인",
      price: 100000,
      review: 30,
    },
  ];

  useEffect(() => {
    (async () => {
      await GetAlcoholList({ boardItem, setBoardItem }, filterObj);
    })();
    return () => {
      console.log(boardItem);
    };
  }, filterObj.alcoholLevel || filterObj.price || filterObj.alcoholType);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  //pagination을 위한 변수
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostPerPage] = useState<number>(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
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

      <div className="Board-Container">
        {currentPosts.map((value, i: number) => (
          <CardContainer
            image={value.image}
            name={value.name}
            price={value.price}
            review={value.review}
          />
        ))}

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={postList.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Board;
