import React, { useState, useEffect } from "react";
import "./userInfo.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userProps {
  name: string;
  email: string;
  sex: string;
  age_range: string;
  nickname: string | null;
  capacitiy: string | null;
}

const UserInfo = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState<userProps>({
    name: "none",
    email: "none",
    sex: "female",
    age_range: "20-29",
    nickname: null,
    capacitiy: null,
  });

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
        setUserState({
          name: res.data.name,
          email: res.data.email,
          sex: res.data.sex,
          age_range: res.data.age_range,
          nickname: res.data.nickname,
          capacitiy: res.data.capacitiy,
        });
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
      <h2>회원정보</h2>
      <div className="UserInfo-Content-Container">
        <p className="UserInfo-List-header">
          <span>이름 :</span> <p>{userState.name}</p>
        </p>
        <p className="UserInfo-List-header">
          <span>성별 :</span>
          <p>{userState.sex == "female" ? "여성" : "남성"}</p>
        </p>
        <p className="UserInfo-List-header">
          <span>email :</span> <p>{userState.email}</p>
        </p>
        <p className="UserInfo-List-header">
          <span>주량 :</span> <p>{userState.capacitiy}</p>
        </p>
        <p className="UserInfo-List-header">
          <span>닉네임 :</span> <p>{userState.nickname}</p>
        </p>
      </div>
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
