import React from "react";
import "./cardContainer.css";
// import * as type from "../Redux/Types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface searchResultCardProps {
  id: number;
  name: string;
  image: string;
}

const SearchResultCardContainer = ({
  id,
  name,
  image,
}: searchResultCardProps) => {
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
    </div>
  );
};

export default SearchResultCardContainer;
