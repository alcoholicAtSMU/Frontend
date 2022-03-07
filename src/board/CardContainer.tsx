import React from "react";
import "./cardContainer.css";
import * as type from "../Redux/Types";

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
  return (
    <div className="card-Container">
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
