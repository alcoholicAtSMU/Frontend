import React, { useState, useEffect } from "react";
import axios from "axios";

const MyCollection = () => {
  useEffect(() => {
    axios({
      method: "GET",
      url: `/myCollection`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("내 컬렉션 리스트 가져오기 에러", err);
      });
  }, []);
  return <div className="MyCollection-Top-Container">MyCollection</div>;
};

export default MyCollection;
