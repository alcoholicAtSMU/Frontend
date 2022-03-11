import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./boradDetail.css";
import axios from "axios";

interface Review {
  star: number;
  id: number;
  image: string;
}

interface BoardDetailState {
  capacity: number;
  content: string;
  degree: number;
  id: number;
  image: string;
  manufacturer: string;
  name: string;
  price: number;
  reviews: Array<Review>;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  type: string;
}

type boardDetailLocation = {
  boardDetail: BoardDetailState;
};

const BoardDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as boardDetailLocation;

  const [alcoholDetail, setAlcoholDetail] = useState(state.boardDetail);

  const onShoppingButtonClick = () => {
    window.open(
      `https://search.shopping.naver.com/search/all?catId=50006349&frm=NVSHCAT&origQuery=${alcoholDetail.name}%20${alcoholDetail.manufacturer}&pagingIndex=1&pagingSize=40&productSet=total&query=${alcoholDetail.name}%20${alcoholDetail.manufacturer}&sort=price_asc&timestamp=&viewType=list`,
      "_blank"
    );
  };

  return (
    <div className="BoardDetail-Top-Container">
      <div className="BoardDetail-Introduce-Container">
        <div className="BoardDetail-img-Container">
          <img src={alcoholDetail.image} />
        </div>

        <div className="BoardDetail-Introduce-content">
          <div className="BoardDetail-Introduce-Header">
            <p className="BoardDetail-name">{alcoholDetail.name}</p>
            <p className="BoardDetail-manufacturer">
              {alcoholDetail.manufacturer}
            </p>
          </div>

          <div className="BoardDetail-Introduce-Filter">
            <p className="BoardDetail-type">주종 : {alcoholDetail.type}</p>
            <p className="BoardDetail-degree">도수 : {alcoholDetail.degree}</p>
            <p className="BoardDetail-capacity">
              용량 : {alcoholDetail.capacity}
            </p>
          </div>

          <div className="BoardDetail-Introduce-Reviews">
            <p className="BoardDetail-reviewAverage">
              리뷰 평균 {alcoholDetail.reviews.length}
            </p>
            <p className="BoardDetail-reviewTotal">
              리뷰 {alcoholDetail.reviews.length}
            </p>
          </div>

          <p className="BoardDetail-price">가격 : {alcoholDetail.price} 원</p>
          <button onClick={onShoppingButtonClick}>바로사러가기</button>
        </div>
      </div>
      <div className="BoardDetail-Content-Container">
        <p>{alcoholDetail.content}</p>
      </div>
      <div className="BoardDetail-Review-Container"></div>
    </div>
  );
};
export default BoardDetail;
