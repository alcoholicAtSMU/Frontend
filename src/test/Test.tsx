import React, { useState, useEffect } from "react";
import "./test.css";

const Test = () => {
  const [selectedMenu, setSelectedMenu] = useState("page1");

  const onNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // className : 선택된 버튼의 className
    const className = event.currentTarget.className;

    if (className.charAt(6) !== selectedMenu.charAt(9)) {
      //selectedMenu에 해당하는 component display : block 처리
      document.getElementsByClassName(selectedMenu)[0].classList.add("hide");

      // // 이전 보여졌던 메뉴 폰트 두께 없애기
      // const buttonParentNode = document.getElementsByClassName("button");
      // for (let i = 0; i < buttonParentNode.length; i++) {
      //   buttonParentNode[i].classList.remove("show");
      // }
      // // 선택된 버튼에 메뉴 폰트 두께 적용
      // document.getElementsByClassName(className)[0].classList.add("show");

      // 이전에 보여졌던 메뉴 display : none 처리
      //parentNode : 선택된 버튼과 동일한 번호의 컴포넌트
      const parentNode = document.getElementsByClassName("Test-page");

      if (className == "button1 button") {
        parentNode[0].classList.remove("hide");
        // 선택된 버튼의 다음 번호의 page로 selectedMenu 초기화
        setSelectedMenu((selectedMenu) => (selectedMenu = "page2"));
      } else if (className == "button2 button") {
        parentNode[1].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page3"));
      } else if (className == "button3 button") {
        parentNode[2].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page4"));
      } else if (className == "button4 button") {
        parentNode[3].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page5"));
      } else if (className == "button5 button") {
        parentNode[4].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page6"));
      } else if (className == "button6 button") {
        parentNode[5].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page7"));
      } else if (className == "button7 button") {
        // 완료 버튼
        parentNode[6].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page8"));
      } else if (className == "button8 button") {
        // 처음으로 버튼
        parentNode[7].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page1"));
      }
    }
  };

  const showResult = () => {};

  return (
    <div className="Test-Top-Container">
      <div className="Test-nav-container">
        <div className="Test-nav-content">
          <span>나만의 전통주 알아보기</span>
          {/* <button className="button1 show button" onClick={onMenuClick}>
            나의 리뷰
          </button>
          <button className="button2 button" onClick={onMenuClick}>
            나의 컬렉션
          </button>
          <button className="button3 button" onClick={onMenuClick}>
            내가 찜한 술
          </button>
          <button className="button4 button" onClick={nMenuClick}>
            나의 주점리뷰
          </button>
          <button className="button5 button" onClick={onMenuClick}>
            회원 정보
          </button> */}
        </div>
      </div>
      <div className="Test-Right-container">
        <div className="Test-page page1">
          <button className="button1 show button" onClick={onNextClick}>
            시작하기
          </button>
        </div>
        <div className="Test-page page2 hide">
          <div>
            <p>주종을 선택해주세요</p>
            <button className="button2 button" onClick={onNextClick}>
              다음
            </button>
          </div>
        </div>
        <div className="Test-page page3 hide">
          <div>
            <p>맛1 선택</p>
            <button className="button3 button" onClick={onNextClick}>
              다음
            </button>
          </div>
        </div>
        <div className="Test-page page4 hide">
          <div>
            {" "}
            <p>맛2 선택</p>
            <button className="button4 button" onClick={onNextClick}>
              다음
            </button>
          </div>
        </div>
        <div className="Test-page page5 hide">
          <div>
            {" "}
            <p>맛3 선택</p>
            <button className="button5 button" onClick={onNextClick}>
              다음
            </button>
          </div>
        </div>
        <div className="Test-page page6 hide">
          <div>
            <p>맛4 선택</p>
            <button className="button6 button" onClick={onNextClick}>
              다음
            </button>
          </div>
        </div>
        <div className="Test-page page7 hide">
          <div>
            <p>맛5 선택</p>
            <button className="button7 button" onClick={onNextClick}>
              완료
            </button>
          </div>
        </div>{" "}
        <div className="Test-page page8 hide">
          <div>
            <p>결과</p>
            <button className="button8 button" onClick={onNextClick}>
              처음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
