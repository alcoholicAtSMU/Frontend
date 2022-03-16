import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./review.css";
import axios from "axios";
import Slick from "./ReviewSlick";
import "./reviewSlick.css";
import ReviewCardContainer from "./ReviewCardContainer";

interface ReviewProps {
  alcohol_id: number;
  tasteType: tasteType;
}

interface tasteType {
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}

interface reveiwCreateProps {
  id: number;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}
// data:
// reviewResponseDtoList: Array(5)
// 0: {id: 4, user_id: 9, alcohol_id: 5, content: 'content', image: '0c920d87-8761-462f-86ab-49b2f3d1c262.jpg,01f64109-6dd3-420a-ac75-e0024a2b46a7.jpg', …}
// 1: {id: 5, user_id: 3, alcohol_id: 5, content: 'content', image: null, …}
// 2: {id: 6, user_id: 6, alcohol_id: 5, content: 'content', image: null, …}
// 3: {id: 7, user_id: 8, alcohol_id: 5, content: 'content', image: null, …}
// 4: {id: 8, user_id: 10, alcohol_id: 5, content: 'content', image: null, …}
// length: 5
// [[Prototype]]: Array(0)
// top_taste_1: "약함"
// top_taste_2: "강함"
// top_taste_3: "보통"
// top_taste_4: "보통"
// top_taste_5: "보통"
// total_star: 3.2
const Review = ({ alcohol_id, tasteType }: ReviewProps) => {
  const navigate = useNavigate();
  const s: reveiwCreateProps = {
    taste_1: tasteType.taste_1,
    taste_2: tasteType.taste_2,
    taste_3: tasteType.taste_3,
    taste_4: tasteType.taste_4,
    taste_5: tasteType.taste_5,
    id: alcohol_id,
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `/review/alcohol/${alcohol_id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("리뷰리스트 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="Review-Top-Container">
      <div className="Review-Header">
        <div className="Review-info">
          <p>
            평균 평점 <p>⭐ 4.0</p>
          </p>
        </div>
        <div className="Review-graph"></div>
        <div className="Review-button-container">
          <button
            className="Review-button"
            onClick={() =>
              navigate(`/createReview`, {
                state: { reviewprops: s },
              })
            }
          >
            리뷰작성하기
          </button>
        </div>
      </div>
      <ReviewCardContainer />
    </div>
  );
};
export default Review;
