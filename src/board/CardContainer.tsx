import React from "react";
import "./cardContainer.css";

type Image = {
  src: string;
};

interface cardProps {
  image: Image;
  name: string;
  price: number;
  review: number;
}

const CardContainer = ({ image, name, price, review }: cardProps) => {
  return (
    <div className="card-Container">
      <img className="alcohol-image" src={image.src}></img>
      <div className="alcohol-name">{name}</div>

      <div className="alcohol-content">
        <p className="alcohol-price">{price}</p>
        <p className="alcohol-review">리뷰{review}</p>
      </div>
    </div>
  );
};

export default CardContainer;
