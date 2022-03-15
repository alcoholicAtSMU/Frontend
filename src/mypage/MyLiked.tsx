import React, { useState, useEffect } from "react";
import axios from "axios";

const MyPick = () => {
  useEffect(() => {
    axios({
      method: "GET",
      url: `/myZzim`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("찜리스트 가져오기 에러", err);
      });
  }, []);
  return <div className="MyPick-Top-Container">MyPick</div>;
};

export default MyPick;
