import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./barDetail.css";

interface barProps {
  content: string;
  id: number;
  image: string;
  location: string;
  modified_date: string;
  nickname: string;
  title: string;
}

const BarDetail = () => {
  const array = window.location.href.split("/");
  const barId = array[array.length - 1];
  const img = require("../static/cat.jpg");

  const [barObj, setBarObj] = useState<barProps>();

  useEffect(() => {
    axios({
      method: "GET",
      url: `/bar/${barId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data.length == 0) alert("게시물이 존재하지 않습니다.");
        else setBarObj(res.data[0]);
        console.log(barObj);
      })
      .catch((err) => {
        alert("게시물 불러오기에 실패하였습니다.");
        console.log("주점 객체 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="Bar-Detail-Top-Container">
      {barObj && (
        <div className="Bar-Detail-container">
          <div className="Bar-Detail-image-container">
            <img className="Bar-Detail-image" src={img}></img>
          </div>
          <div className="Bar-Detail-content-container">
            <p className="Bar-Detail-Mid">
              <span className="Bar-Detail-content-title">{barObj.title}</span>
              <span className="Bar-Detail-content-writer">
                by {barObj.nickname}
              </span>
            </p>
            <p className="Bar-Detail-Bottom">
              <span className="Bar-Detail-content-area">
                지역 : {barObj.location}
              </span>
              <span className="Bar-Detail-content-date">
                작성일 : {barObj.modified_date}
              </span>
            </p>
            <p className="Bar-Detail-content-content">{barObj.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarDetail;
