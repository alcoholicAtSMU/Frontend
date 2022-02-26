import React, { useEffect, useState } from "react";
import "./mypage.css";
import MyReview from "./MyReview";
import MyCollection from "./MyCollection";
import MyPick from "./MyPick";
import UserInfo from "./UserInfo";
import axios from "axios";

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("component1");

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const className = event.currentTarget.className;

    //selectedMenu에 해당하는 component display : block 처리
    document.getElementsByClassName(selectedMenu)[0].classList.add("hide");

    // 기존 선택됐던 메뉴 display : none 처리
    // 선택된 버튼과 동일한 번호의 컴포넌트로 selectedMenu 초기화

    const parentNode = document.getElementsByClassName("Mypage-component");

    if (className == "button1") {
      parentNode[0].classList.remove("hide");
      setSelectedMenu((selectedMenu) => (selectedMenu = "component1"));
    } else if (className == "button2") {
      parentNode[1].classList.remove("hide");
      setSelectedMenu((selectedMenu) => (selectedMenu = "component2"));
    } else if (className == "button3") {
      parentNode[2].classList.remove("hide");
      setSelectedMenu((selectedMenu) => (selectedMenu = "component3"));
    } else if (className == "button4") {
      parentNode[3].classList.remove("hide");
      setSelectedMenu((selectedMenu) => (selectedMenu = "component4"));
    }
  };

  return (
    <div className="MyPage-Top-Container">
      <div className="MyPage-nav-container">
        <div className="MyPage-nav-content">
          <span>menu</span>
          <button className="button1" onClick={onMenuClick}>
            나의 리뷰
          </button>
          <button className="button2" onClick={onMenuClick}>
            나의 컬렉션
          </button>
          <button className="button3" onClick={onMenuClick}>
            내가 찜한 술
          </button>
          <button className="button4" onClick={onMenuClick}>
            회원 정보
          </button>
        </div>
      </div>
      <div className="MyPage-Right-container">
        <div className="Mypage-component component1">
          <MyReview />
        </div>
        <div className="Mypage-component component2 hide">
          <MyCollection />
        </div>
        <div className="Mypage-component component3 hide">
          <MyPick />
        </div>
        <div className="Mypage-component component4 hide">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
