import React, { useEffect, useState } from "react";
import "./mypage.css";
import MyReview from "./MyReview";
import MyCollection from "./mycollection/MyCollection";
import MyLiked from "./mylike/MyLiked";
import MyBar from "./MyBar";
import UserInfo from "./UserInfo";

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("component1");

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // className : 선택된 버튼의 className
    const className = event.currentTarget.className;

    if (className.charAt(6) !== selectedMenu.charAt(9)) {
      //selectedMenu에 해당하는 component display : block 처리
      document.getElementsByClassName(selectedMenu)[0].classList.add("hide");
      // 이전 보여졌던 메뉴 폰트 두께 없애기
      const buttonParentNode = document.getElementsByClassName("button");
      for (let i = 0; i < buttonParentNode.length; i++) {
        buttonParentNode[i].classList.remove("show");
      }

      // 선택된 버튼에 메뉴 폰트 두께 적용
      document.getElementsByClassName(className)[0].classList.add("show");

      // 이전에 보여졌던 메뉴 display : none 처리
      //parentNode : 선택된 버튼과 동일한 번호의 컴포넌트
      const parentNode = document.getElementsByClassName("Mypage-component");

      if (className == "button1 button") {
        parentNode[0].classList.remove("hide");
        // 선택된 버튼과 동일한 번호의 컴포넌트로 selectedMenu 초기화
        setSelectedMenu((selectedMenu) => (selectedMenu = "component1"));
      } else if (className == "button2 button") {
        parentNode[1].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "component2"));
      } else if (className == "button3 button") {
        parentNode[2].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "component3"));
      } else if (className == "button4 button") {
        parentNode[3].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "component4"));
      }
    }
  };

  return (
    <div className="MyPage-Top-Container">
      <div className="MyPage-nav-container">
        <div className="MyPage-nav-content">
          <span>menu</span>
          <button className="button1 show button" onClick={onMenuClick}>
            나의 리뷰
          </button>
          <button className="button2 button" onClick={onMenuClick}>
            나의 컬렉션
          </button>
          <button className="button3 button" onClick={onMenuClick}>
            내가 찜한 술
          </button>
          <button className="button4 button" onClick={onMenuClick}>
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
          <MyLiked />
        </div>
        <div className="Mypage-component component4 hide">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
