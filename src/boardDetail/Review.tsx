import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./review.css";
import axios from "axios";
import Slick from "./ReviewSlick";
import "./reviewSlick.css";

//props : review 객체
const Review = () => {
  const image = require("../static/나루_생막걸리_6도.jpg");
  const image2 = require("../static/고도리_샤인머스켓_화이트와인.jpg");

  const imageArray = [image, image2];

  return (
    <div className="Review-Top-Container">
      {/* reviewCardContainer */}
      <div className="reviewcard-Container">
        <div className="reviewcard-header">
          <ul></ul>
          <p className="reviewcard-name">김어진 님의 리뷰</p>
          <p className="reviewcard-date">2022-03-13</p>
        </div>

        <div className="reviewcard-content-Container">
          <div className="reviewcard-taste">
            <ul>
              <li className="taste1">
                <p>단맛</p> <p>보통</p>
              </li>
              <li className="taste2">
                <p>신맛</p>
                <p>보통</p>
              </li>
              <li className="taste3">
                <p>탄닌감</p>
                <p>보통</p>
              </li>
              <li className="taste4">
                <p>바디감</p>
                <p>보통</p>
              </li>
              <li className="taste5">
                <p>탄산</p>
                <p>보통</p>
              </li>
            </ul>
          </div>
          <div className="reviewcard-average-content">
            <p className="reviewcard-average">평점 ⭐⭐⭐⭐⭐</p>
            <p className="reviewcard-content">
              {/* 공백 포함 : 374 */}
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사아자차카타파하
              가나다라마바사아자차카타파하 가나다라마바사
            </p>
          </div>

          {imageArray.length > 1 ? (
            <div className="review-Image-Slider">
              <Slick>
                {imageArray.map((item, index) => (
                  <div className="review-SliderItem" key={index}>
                    <img src={item} />
                  </div>
                ))}
              </Slick>
            </div>
          ) : (
            <div className="reviewcard-imgContainer">
              <img className="reviewcard-image" src={image}></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Review;
