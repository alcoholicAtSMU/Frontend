import React, { useState, useEffect } from "react";
import "./userInfo.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");
    axios({
      method: "GET",
      url: `/myInfo`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("유저 정보 가져오기 에러", err);
      });
  }, []);

  const onWithdrawalButtonClick = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      axios({
        method: "PUT",
        url: `/auth/delete`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("token");
          navigate(`/login`);
          window.alert("탈퇴되었습니다.");
        })
        .catch((err) => {
          console.log("탈퇴 처리 에러", err);
        });
    } else {
      window.alert("탈퇴가 취소되었습니다.");
    }
  };

  const onEditButtonClick = () => {
    // navigate();
  };

  return (
    <div className="UserInfo-Top-Container">
      UserInfo
      <div className="UserInfo-Content-Container">user정보 보여주기</div>
      <div className="UserInfo-button-Container">
        <button
          className="UserInfo-withdrawalButton"
          onClick={onWithdrawalButtonClick}
        >
          탈퇴
        </button>
        <button className="UserInfo-editButton" onClick={onEditButtonClick}>
          수정
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
