import React from "react";
import "./cardContainer.css";
import * as type from "../Redux/Types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface cardProps {
  id: number;
  type: string;
  name: string;
  price: number;
  image: string;
  reviews: Array<Object>;
}

const CardContainer = ({
  id,
  type,
  name,
  price,
  image,
  reviews,
}: cardProps) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    axios({
      method: "GET",
      url: `/board?a_id=${id}`,
    })
      .then((res) => {
        console.log(res.data);
        navigate(`/board:id=${id}`);
      })
      .catch((err) => {
        console.log("상세 페이지 가져오기 에러", err);
      });
  };

  return (
    <div className="card-Container" onClick={onCardClick}>
      <img className="alcohol-image" src={image}></img>
      <div className="alcohol-name">{name}</div>
      <div className="alcohol-content">
        <p className="alcohol-price">{price}</p>
        <p className="alcohol-review">리뷰{reviews}</p>
      </div>
    </div>
  );
};

export default CardContainer;
