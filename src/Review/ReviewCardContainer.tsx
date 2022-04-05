import React, { useState } from "react";
import "./reviewcardcontainer.css";
import "../mypage/myreviewCard.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Slick from "../boardDetail/ReviewSlick";
import "../boardDetail/reviewSlick.css";
interface tasteType {
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}
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
  nickname: string;
  component: string;
  tastes: tasteType;
}

export interface reviewUpdateProps {
  alcohol_id: number;
  content: string;
  id: number;
  image: Array<string>;
  star: number;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  tastes: tasteType;
}

const ReviewCardContainer = ({
  alcohol_id,
  content,
  id,
  image,
  modified_date,
  star,
  taste_1,
  taste_2,
  taste_3,
  taste_4,
  taste_5,
  user_id,
  nickname,
  component,
  tastes,
}: ReviewProps) => {
  const navigate = useNavigate();
  let starIcon = "⭐⭐⭐⭐⭐";
  if (star == 5) starIcon = "⭐⭐⭐⭐⭐";
  else if (star == 4) starIcon = "⭐⭐⭐⭐";
  else if (star == 3) starIcon = "⭐⭐⭐";
  else if (star == 2) starIcon = "⭐⭐";
  else if (star == 1) starIcon = "⭐";

  const [reviewUpdateProps, setReviewUpdateProps] = useState<reviewUpdateProps>(
    {
      alcohol_id: alcohol_id,
      content: content,
      id: id,
      image: image,
      star: star,
      taste_1: taste_1,
      taste_2: taste_2,
      taste_3: taste_3,
      taste_4: taste_4,
      taste_5: taste_5,
      tastes: tastes,
    }
  );

  const onDeleteReviewClick = () => {
    if (
      window.confirm(
        "해당 리뷰를 정말로 삭제하시겠습니까?(삭제 후 복구 불가능)"
      )
    ) {
      axios({
        method: "DELETE",
        url: `/review/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          alert("삭제가 완료되었습니다.");
          window.location.replace("/mypage");
        })
        .catch((err) => {
          console.log("리뷰 삭제 에러", err);
        });
    } else alert("삭제가 취소되었습니다.");
  };

  return (
    <>
      {component === "review" ? (
        <div className="reviewcard-Container">
          <div className="reviewcard-header">
            <p className="reviewcard-name">{nickname} 님의 리뷰</p>
            <p className="reviewcard-date">{modified_date}</p>
          </div>

          <div className="reviewcard-content-Container">
            <div className="reviewcard-taste">
              <ul>
                <li className="taste1">
                  <p>단맛</p> <p>{taste_1}</p>
                </li>
                <li className="taste2">
                  <p>신맛</p>
                  <p>{taste_2}</p>
                </li>
                <li className="taste3">
                  <p>탄닌감</p>
                  <p>{taste_3}</p>
                </li>
                <li className="taste4">
                  <p>바디감</p>
                  <p>{taste_4}</p>
                </li>
                <li className="taste5">
                  <p>탄산</p>
                  <p>{taste_5}</p>
                </li>
              </ul>
            </div>
            <div className="reviewcard-average-content">
              <p className="reviewcard-average">평점 {starIcon}</p>
              <p className="reviewcard-content">{content}</p>
            </div>
            {image.length == 0 ? (
              <></>
            ) : image.length > 1 ? (
              <div className="reviewcard-Image-Slider">
                <Slick>
                  {console.log(image)}
                  {image.map((item, index) => (
                    <div className="review-SliderItem" key={index}>
                      <img src={item} />
                    </div>
                  ))}
                </Slick>
              </div>
            ) : (
              <div className="reviewcard-imgContainer">
                <img className="reviewcard-image" src={image[0]}></img>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="myreviewcard-Container">
          <div className="myreviewcard-content-Container">
            <div className="myreviewcard-taste">
              <ul>
                <li className="taste1">
                  <p>{tastes.taste_1}</p> <p>{taste_1}</p>
                </li>
                <li className="taste2">
                  <p>{tastes.taste_2}</p>
                  <p>{taste_2}</p>
                </li>
                <li className="taste3">
                  <p>{tastes.taste_3}</p>
                  <p>{taste_3}</p>
                </li>
                <li className="taste4">
                  <p>{tastes.taste_4}</p>
                  <p>{taste_4}</p>
                </li>
                <li className="taste5">
                  <p>{tastes.taste_5}</p>
                  <p>{taste_5}</p>
                </li>
              </ul>
            </div>
            <div className="myreviewcard-average-content">
              <div className="myreviewcard-content-header">
                <p className="myreviewcard-average">평점 {starIcon}</p>
                <p className="myreviewcard-date">{modified_date}</p>
              </div>

              <p className="myreviewcard-content">{content}</p>
              <div className="myreviewcard-buttons">
                <button
                  className="myreviewcard-update-button"
                  onClick={() => {
                    if (localStorage.getItem("token")) {
                      navigate(`/updateReview`, {
                        state: { updateReviewState: reviewUpdateProps },
                      });
                    } else {
                      alert("리뷰 수정 불가");
                    }
                  }}
                >
                  수정
                </button>
                <button
                  className="myreviewcard-delete-button"
                  onClick={onDeleteReviewClick}
                >
                  삭제
                </button>
              </div>
            </div>
            {image.length == 0 ? (
              <></>
            ) : image.length > 1 ? (
              <div className="myreviewcard-Image-Slider">
                <Slick>
                  {image.map((item, index) => (
                    <div className="myreview-SliderItem" key={index}>
                      <img className="myreviewcard-slider-image" src={item} />
                    </div>
                  ))}
                </Slick>
              </div>
            ) : (
              <div className="myreviewcard-imgContainer">
                <img className="myreviewcard-image" src={image[0]}></img>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCardContainer;
