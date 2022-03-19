import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./review.css";
import axios from "axios";
import Slick from "./ReviewSlick";
import "./reviewSlick.css";
import ReviewCardContainer from "./ReviewCardContainer";

interface ReviewProps {
  alcohol_id: number;
  content: string;
  id: number;
  image: Array<string>;
  modified_date: string;
  star: number;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  user_id: number;
}

interface ReviewHeaderProps {
  top_taste_1: string;
  top_taste_2: string;
  top_taste_3: string;
  top_taste_4: string;
  top_taste_5: string;
  total_star: number;
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
  taste: tasteType;
}

const Review = ({ id, taste }: reveiwCreateProps) => {
  const navigate = useNavigate();
  const graphInfo: reveiwCreateProps = {
    taste: {
      taste_1: taste.taste_1,
      taste_2: taste.taste_2,
      taste_3: taste.taste_3,
      taste_4: taste.taste_4,
      taste_5: taste.taste_5,
    },
    id: id,
  };

  const [reviewHeaderProps, setReviewHeaderProps] = useState<ReviewHeaderProps>(
    {
      top_taste_1: "보통",
      top_taste_2: "보통",
      top_taste_3: "보통",
      top_taste_4: "보통",
      top_taste_5: "보통",
      total_star: 0,
    }
  );

  const [reviewList, setReviewList] = useState<Array<ReviewProps>>([
    {
      alcohol_id: 0,
      content: "none",
      id: 0,
      image: ["none"],
      modified_date: "none",
      star: 0,
      taste_1: "none",
      taste_2: "none",
      taste_3: "none",
      taste_4: "none",
      taste_5: "none",
      user_id: 0,
    },
  ]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/review/alcohol/${graphInfo.id}`,
    })
      .then((res) => {
        console.log(res);
        setReviewHeaderProps({
          top_taste_1: res.data.top_taste_1,
          top_taste_2: res.data.top_taste_2,
          top_taste_3: res.data.top_taste_3,
          top_taste_4: res.data.top_taste_4,
          top_taste_5: res.data.top_taste_5,
          total_star: res.data.total_star,
        });
        setReviewList(res.data.reviewResponseDtoList);
        console.log(reviewHeaderProps);

        console.log(reviewList);
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
            평균 평점 <p>⭐ {reviewHeaderProps.total_star}</p>
          </p>
        </div>
        <div className="Review-graph">
          <p className="graphInfo-head">
            {graphInfo.taste.taste_1}
            <p> : {reviewHeaderProps.top_taste_1}</p>
          </p>
          <p className="graphInfo-head">
            {graphInfo.taste.taste_2}
            <p> : {reviewHeaderProps.top_taste_2}</p>
          </p>
          <p className="graphInfo-head">
            {graphInfo.taste.taste_3}
            <p> : {reviewHeaderProps.top_taste_3}</p>
          </p>
          <p className="graphInfo-head">
            {graphInfo.taste.taste_4}
            <p> : {reviewHeaderProps.top_taste_4}</p>
          </p>
          <p className="graphInfo-head">
            {graphInfo.taste.taste_5}
            <p> : {reviewHeaderProps.top_taste_5}</p>
          </p>
        </div>
        <div className="Review-button-container">
          <button
            className="Review-button"
            onClick={() =>
              navigate(`/createReview`, {
                state: { reviewprops: graphInfo },
              })
            }
          >
            리뷰작성하기
          </button>
        </div>
      </div>

      {reviewList[0].alcohol_id === 0 && reviewList[0].user_id === 0 ? (
        <p className="noReview">리뷰없음</p>
      ) : (
        <div className="ReviewListConatainer">
          {reviewList.map((value, i: number) => (
            <ReviewCardContainer
              alcohol_id={value.alcohol_id}
              content={value.content}
              id={value.id}
              image={value.image}
              modified_date={value.modified_date}
              star={value.star}
              taste_1={value.taste_1}
              taste_2={value.taste_2}
              taste_3={value.taste_3}
              taste_4={value.taste_4}
              taste_5={value.taste_5}
              user_id={value.user_id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Review;
