import React from "react";
// import "./cardContainer.css";
import * as type from "../Redux/Types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slick from "./ReviewSlick";
import "./reviewSlick.css";
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
}: ReviewProps) => {
  const navigate = useNavigate();
  const onimageClick = () => {};

  return (
    <div className="reviewcard-Container">
      <div className="reviewcard-header">
        <ul></ul>
        <p className="reviewcard-name">김어진 님의 리뷰</p>
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
          <p className="reviewcard-average">평점 ⭐⭐⭐⭐⭐</p>
          <p className="reviewcard-content">{content}</p>
        </div>

        {image.length > 1 ? (
          <div className="review-Image-Slider">
            <Slick>
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
  );
};

export default ReviewCardContainer;
