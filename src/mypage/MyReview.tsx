import React, { useState, useEffect } from "react";
import axios from "axios";

const MyReview = () => {
  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: `/review/user/{user_id}`,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("내 리뷰 리스트 가져오기 에러", err);
    //   });
  }, []);
  return <div className="MyCollection-Top-Container">MyReview</div>;
};
export default MyReview;
