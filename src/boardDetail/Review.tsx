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
//props : review 객체
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
