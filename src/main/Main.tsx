import React from "react";
import "./main.css";
import Slick from "../component/Slick";

const Main = () => {
  const banner1 = require("../static/banner1.png");
  const banner2 = require("../static/banner2.png");

  const item1 = require("../static/1000억_유산균_막걸리.jpg");
  const item2 = require("../static/고도리_샤인머스켓_화이트와인.jpg");
  const item3 = require("../static/나루_생막걸리_6도.jpg");
  const item4 = require("../static/꿀샘16.jpg");

  interface itemsProps {
    item: string;
    name: string;
  }

  const prized: itemsProps[] = [
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
  ];
  const gift: itemsProps[] = [
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item4,
      name: "꿀샘16",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item4,
      name: "꿀샘16",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item4,
      name: "꿀샘16",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item4,
      name: "꿀샘16",
    },
  ];
  const user1: itemsProps[] = [
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
  ];
  const user2: itemsProps[] = [
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item4,
      name: "꿀샘16",
    },
    {
      item: item1,
      name: "1000억 유산균 막걸리",
    },
    {
      item: item2,
      name: "고도리 샤인머스켓 화이트와인",
    },
    {
      item: item3,
      name: "나루 생막걸리 6도",
    },
    {
      item: item4,
      name: "꿀샘16",
    },
  ];

  return (
    <div className="Main-Top-Container">
      <div className="Banner-Container">
        <img className="Banner-img" src={banner2}></img>
        <div className="Banner-content">
          <div className="Banner-header">전통주(傳統酒)</div>
          <div className="Banner-detail">
            전통주는 한국에서 전통적으로 내려오는 제조 방법에 따라 만드는 술을
            부르는 말이다. <br />
            우리나라 고유의 술, 전통주의 매력에 빠져보자
          </div>
        </div>
      </div>
      <div className="header1">[서비스명] 이 추천하는 우리술 모음</div>
      <div className="Card-Slider">
        <div className="second-header1">수상 경험이 있는 우리술</div>
        <Slick>
          {prized.map((item, index) => (
            <div className="SliderItem" key={index}>
              <img src={item.item} alt={item.name} />
              <div className="itemName">{item.name}</div>
            </div>
          ))}
        </Slick>
      </div>

      <div className="Card-Slider">
        <div className="second-header2">선물하기 좋은 술</div>
        <Slick>
          {gift.map((item, index) => (
            <div className="SliderItem" key={index}>
              <img src={item.item} alt={item.name} />{" "}
              <div className="itemName">{item.name}</div>
            </div>
          ))}
        </Slick>
      </div>

      <div className="header2">사용자가 직접 추천하는 우리술 모음</div>
      <div className="Card-Slider">
        <div className="second-header3">
          김어진 님의 리스트 '내가 먹으려고 모아놓는 폴더'
        </div>
        <Slick>
          {user1.map((item, index) => (
            <div className="SliderItem" key={index}>
              <img src={item.item} alt={item.name} />{" "}
              <div className="itemName">{item.name}</div>
            </div>
          ))}
        </Slick>
      </div>

      <div className="Card-Slider">
        <div className="second-header4">
          김경은 님의 리스트 '친구랑 마실 술'
        </div>
        <Slick>
          {user2.map((item, index) => (
            <div className="SliderItem" key={index}>
              <img src={item.item} alt={item.name} />{" "}
              <div className="itemName">{item.name}</div>
            </div>
          ))}
        </Slick>
      </div>
    </div>
  );
};

export default Main;
