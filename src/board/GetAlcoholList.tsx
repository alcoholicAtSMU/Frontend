import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Image = {
  src: string;
};
interface boardItem {
  boardItem: {
    a_id: number;
    type: string;
    name: string;
    price: number;
    capacity: number;
    degree: number;
    image: Image;
    reviews: number;
    manufacturer: string;
    taste_1: string;
    taste_2: string;
    taste_3: string;
    taste_4: string;
    taste_5: string;
    intro: string;
  };
}

interface filterState {
  filterObj: {
    alcoholLevel: Array<number>;
    alcoholType: Array<string>;
    price: Array<number>;
  };
  setFilterObj: React.Dispatch<
    React.SetStateAction<{
      alcoholLevel: Array<number>;
      alcoholType: Array<string>;
      price: Array<number>;
    }>
  >;
}

interface boardItemState {
  boardItem: boardItem | undefined;
  setBoardItem: React.Dispatch<React.SetStateAction<boardItem | undefined>>;
}

export function GetAlcoholList(
  { boardItem, setBoardItem }: boardItemState,
  filterObj: filterState["filterObj"]
) {
  axios({
    method: "GET",
    url: `/board?type=${filterObj.alcoholType[0]}&priceFrom=${filterObj.price[0]}&priceTo=${filterObj.price[1]}&degreeFrom=${filterObj.alcoholLevel[0]}&degreeTo=${filterObj.alcoholLevel[1]}`,
  })
    .then((res) => {
      console.log(res);
      //setBoardItem(res.)
      //console.log(boardItem);
    })
    .catch((err) => {
      console.log(filterObj.alcoholType[0] + "\n리스트 가져오기 에러", err);
    });
  return <div className="GetAlcohol-Top-Container">GetAlcohol</div>;
}
export default GetAlcoholList;
