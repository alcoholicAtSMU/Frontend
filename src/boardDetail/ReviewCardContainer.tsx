import React from "react";
// import "./cardContainer.css";
import * as type from "../Redux/Types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
interface reviewProps {
  id: number;
  userName: string;
  image: string;
}

const ReviewCardContainer = ({ id, userName, image }: reviewProps) => {
  const navigate = useNavigate();

  const onimageClick = () => {};

  return (
    <div className="reviewcard-Container">
      <div className="reviewcard-imgContainer">
        <img className="review-image" src={image} onClick={onimageClick}></img>
      </div>

      <div className="review-name">{userName}</div>
      <div className="review-content"></div>
    </div>
  );
};

export default ReviewCardContainer;
