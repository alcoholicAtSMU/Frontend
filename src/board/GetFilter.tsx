import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GetAlcoholList from "./GetAlcoholList";

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
const GetFilter = (
  { boardItem, setBoardItem }: boardItemState,
  filterObj: filterState["filterObj"]
) => {
  useEffect(() => {
    (async () => {
      await GetAlcoholList({ boardItem, setBoardItem }, filterObj);
    })();
    return () => {
      console.log(boardItem);
    };
  }, filterObj.alcoholLevel && filterObj.price && filterObj.alcoholType);

  return <div className="GetFilter-Top-Container"></div>;
};

export default GetFilter;
