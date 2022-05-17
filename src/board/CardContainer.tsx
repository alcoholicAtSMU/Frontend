import React from "react";
import "./cardContainer.css";
import * as type from "../Redux/Types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface cardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  reviews: number;
}

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
  zzim: boolean;
}

const CardContainer = ({ id, name, price, image, reviews }: cardProps) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    axios({
      method: "GET",
      url: `/board/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);

        const s: BoardDetailState = {
          capacity: res.data.alcoholDetail.capacity,
          content: res.data.alcoholDetail.content,
          degree: res.data.alcoholDetail.degree,
          id: res.data.alcoholDetail.id,
          image: res.data.alcoholDetail.image,
          manufacturer: res.data.alcoholDetail.manufacturer,
          name: res.data.alcoholDetail.name,
          price: res.data.alcoholDetail.price,
          reviews: res.data.alcoholDetail.reviews,
          taste_1: res.data.alcoholDetail.taste_1,
          taste_2: res.data.alcoholDetail.taste_2,
          taste_3: res.data.alcoholDetail.taste_3,
          taste_4: res.data.alcoholDetail.taste_4,
          taste_5: res.data.alcoholDetail.taste_5,
          type: res.data.alcoholDetail.type,
          zzim: res.data.zzim,
        };
        navigate(`/board/${id}`);
      })
      .catch((err) => {
        console.log("상세 페이지 가져오기 에러", err);
      });
  };

  return (
    <div className="card-Container" onClick={onCardClick}>
      <div className="card-imgContainer">
        <img className="alcohol-image" src={image}></img>
      </div>

      <div className="alcohol-name">{name}</div>
      <div className="alcohol-content">
        <p className="alcohol-price">{price}</p>
        <p className="alcohol-review">리뷰 {reviews}</p>
      </div>
    </div>
  );
};

export default CardContainer;
