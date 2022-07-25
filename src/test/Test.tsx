import React, { useState, useEffect } from "react";
import axios from "axios";
import "./test.css";
import tastes from "./tastes";
import questions from "./questions";
import Radio from "./Radio";
const Test = () => {
  const background = require("../static/banner3.png");

  const [selectedMenu, setSelectedMenu] = useState("page1");
  const [seletedTypeIdx, setSelectedTypeIdx] = useState<number>(0);
  const [degree, setDegree] = useState<string>("");
  const [taste1, setTaste1] = useState<string>("없음");
  const [taste2, setTaste2] = useState<string>("없음");
  const [taste3, setTaste3] = useState<string>("없음");
  const [taste4, setTaste4] = useState<string>("없음");
  const [taste5, setTaste5] = useState<string>("없음");

  const onNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // className : 선택된 버튼의 className
    const className = event.currentTarget.className;

    if (className.charAt(6) !== selectedMenu.charAt(9)) {
      //selectedMenu에 해당하는 component display : block 처리
      document.getElementsByClassName(selectedMenu)[0].classList.add("hide");

      // 이전에 보여졌던 메뉴 display : none 처리
      //parentNode : 선택된 버튼과 동일한 번호의 컴포넌트
      const parentNode = document.getElementsByClassName("Test-page");

      if (className == "next-button1 start-button") {
        parentNode[1].classList.remove("hide");
        // 선택된 버튼의 다음 번호의 page로 selectedMenu 초기화
        setSelectedMenu((selectedMenu) => (selectedMenu = "page2"));
      } else if (className == "next-button2 next-button") {
        if (seletedTypeIdx == 2) {
          parentNode[2].classList.remove("hide");
          setSelectedMenu((selectedMenu) => (selectedMenu = "page25"));
        } else {
          parentNode[3].classList.remove("hide");
          setSelectedMenu((selectedMenu) => (selectedMenu = "page3"));
        }
      } else if (className == "next-button25 next-button") {
        parentNode[3].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page3"));
      } else if (className == "next-button3 next-button") {
        parentNode[4].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page4"));
      } else if (className == "next-button4 next-button") {
        parentNode[5].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page5"));
      } else if (className == "next-button5 next-button") {
        parentNode[6].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page6"));
      } else if (className == "next-button6 next-button") {
        parentNode[7].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page7"));
      } else if (className == "next-button7 submit-button") {
        // 완료 버튼
        parentNode[8].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page8"));
        showResult();
      } else if (className == "next-button8 next-button") {
        // 처음으로 버튼
        parentNode[0].classList.remove("hide");
        setSelectedMenu((selectedMenu) => (selectedMenu = "page1"));
      }
    }
  };

  const showResult = () => {
    const result = {
      type: tastes[seletedTypeIdx].type,
      degree: degree,
      taste1: taste1,
      taste2: taste2,
      taste3: taste3,
      taste4: taste4,
      taste5: taste5,
    };
    console.log(result);
    axios({
      method: "GET",
      url: `/recommendation`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: result,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(" 결과 가져오기 에러", err);
      });
  };

  return (
    <div className="Test-Top-Container">
      <img className="background" src={background} />
      <div className="Test-header-container">
        <p className="Test-header">나만의 전통주 알아보기</p>
      </div>
      <div className="Test-bottom-container">
        <div className="Test-page page1">
          <p className="Test-content">
            시작하기를 눌러 나만의 전통주를 알아보세요!
          </p>
          <button className="next-button1 start-button" onClick={onNextClick}>
            시작하기
          </button>
        </div>
        {/* 주종 선택 */}
        <div className="Test-page page2 hide">
          <p className="question">{questions[0].question}</p>
          <p className="answer">
            <label>
              {questions[0].answers[0]}
              <input
                type="radio"
                value={questions[0].answers[0]}
                checked={seletedTypeIdx === 0}
                onChange={() => setSelectedTypeIdx(0)}
              ></input>
            </label>{" "}
            <label className="answer">
              {questions[0].answers[1]}
              <input
                type="radio"
                value={questions[0].answers[1]}
                checked={seletedTypeIdx === 1}
                onChange={() => setSelectedTypeIdx(1)}
              ></input>
            </label>{" "}
          </p>
          <p className="answer">
            <label>
              {questions[0].answers[2]}
              <input
                type="radio"
                value={questions[0].answers[2]}
                checked={seletedTypeIdx === 2}
                onChange={() => setSelectedTypeIdx(2)}
              ></input>
            </label>{" "}
            <label className="answer">
              {questions[0].answers[3]}
              <input
                type="radio"
                value={questions[0].answers[3]}
                checked={seletedTypeIdx === 3}
                onChange={() => setSelectedTypeIdx(3)}
              ></input>
            </label>{" "}
          </p>
          <button className="next-button2 next-button" onClick={onNextClick}>
            다음
          </button>
        </div>

        <div className="Test-page page25 hide">
          <p className="question">증류주의 도수를 골라주세요</p>
          <p className="answer">
            <label>
              25도 이하
              <input
                type="radio"
                value="low"
                checked={degree === "low"}
                onChange={() => setDegree("low")}
              ></input>
            </label>{" "}
            <label className="answer">
              25도 초과
              <input
                type="radio"
                value={"high"}
                checked={degree === "high"}
                onChange={() => setDegree("high")}
              ></input>
            </label>{" "}
          </p>
          <button className="next-button25 next-button" onClick={onNextClick}>
            다음
          </button>
        </div>

        {/* 맛1 선택 */}
        <div className="Test-page page3 hide">
          <Radio
            taste={taste1}
            setTaste={setTaste1}
            seletedTypeIdx={seletedTypeIdx}
            tasteIdx={0}
          ></Radio>
          <button className="next-button3 next-button" onClick={onNextClick}>
            다음
          </button>
        </div>
        {/* 맛2 선택 */}
        <div className="Test-page page4 hide">
          <Radio
            taste={taste2}
            setTaste={setTaste2}
            seletedTypeIdx={seletedTypeIdx}
            tasteIdx={1}
          ></Radio>
          <button className="next-button4 next-button" onClick={onNextClick}>
            다음
          </button>
        </div>
        {/* 맛3 선택 */}
        <div className="Test-page page5 hide">
          <Radio
            taste={taste3}
            setTaste={setTaste3}
            seletedTypeIdx={seletedTypeIdx}
            tasteIdx={2}
          ></Radio>
          <button className="next-button5 next-button" onClick={onNextClick}>
            다음
          </button>
        </div>
        {/* 맛4 선택 */}
        <div className="Test-page page6 hide">
          <Radio
            taste={taste4}
            setTaste={setTaste4}
            seletedTypeIdx={seletedTypeIdx}
            tasteIdx={3}
          ></Radio>
          <button className="next-button6 next-button" onClick={onNextClick}>
            다음
          </button>
        </div>
        {/* 맛5 선택 */}
        <div className="Test-page page7 hide">
          <Radio
            taste={taste5}
            setTaste={setTaste5}
            seletedTypeIdx={seletedTypeIdx}
            tasteIdx={4}
          ></Radio>
          <button className="next-button7 submit-button" onClick={onNextClick}>
            완료
          </button>
        </div>
        <div className="Test-page page8 hide">
          <div>
            <p>결과</p>
            <p>주종 : {tastes[seletedTypeIdx].type}</p>
            <p>도수 : {degree}</p>

            <p>
              {tastes[seletedTypeIdx].taste[0]}
              {taste1}
            </p>
            <p>
              {tastes[seletedTypeIdx].taste[1]}
              {taste2}
            </p>
            <p>
              {tastes[seletedTypeIdx].taste[2]}
              {taste3}
            </p>
            <p>
              {tastes[seletedTypeIdx].taste[3]}
              {taste4}
            </p>
            <p>
              {tastes[seletedTypeIdx].taste[4]}
              {taste5}
            </p>
            <button className="next-button8 next-button" onClick={onNextClick}>
              처음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
