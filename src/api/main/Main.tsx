import "./main.css";
import Slick from "./Slick";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const banner1 = require("../static/banner1.png");
  const banner2 = require("../static/banner2.png");

  const item1 = require("../static/1000억_유산균_막걸리.jpg");
  const item2 = require("../static/고도리_샤인머스켓_화이트와인.jpg");
  const item3 = require("../static/나루_생막걸리_6도.jpg");
  const item4 = require("../static/꿀샘16.jpg");

  interface itemsProps {
    collectionId: number;
    content: Array<dataProps>;
    description: string;
    title: string;
    username: string;
  }
  interface dataProps {
    id: number;
    image: string;
    name: string;
  }

  const [list1, setList1] = useState<itemsProps>({
    collectionId: 1,
    description: "",
    title: "",
    username: "",
    content: [
      {
        id: 1,
        image: item1,
        name: "1000억 유산균 막걸리",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
      {
        id: 1,
        image: item2,
        name: "고도리 샤인머스켓 화이트와인",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
    ],
  });

  const [list2, setList2] = useState<itemsProps>({
    collectionId: 1,
    description: "",
    title: "",
    username: "",
    content: [
      {
        id: 1,
        image: item1,
        name: "1000억 유산균 막걸리",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
      {
        id: 1,
        image: item2,
        name: "고도리 샤인머스켓 화이트와인",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
    ],
  });

  const [user1, setUser1] = useState<itemsProps>({
    collectionId: 1,
    description: "",
    title: "",
    username: "",
    content: [
      {
        id: 1,
        image: item1,
        name: "1000억 유산균 막걸리",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
      {
        id: 1,
        image: item2,
        name: "고도리 샤인머스켓 화이트와인",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
    ],
  });

  const [user2, setUser2] = useState<itemsProps>({
    collectionId: 1,
    description: "",
    title: "",
    username: "",
    content: [
      {
        id: 1,
        image: item1,
        name: "1000억 유산균 막걸리",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
      {
        id: 1,
        image: item2,
        name: "고도리 샤인머스켓 화이트와인",
      },
      {
        id: 1,
        image: item3,
        name: "나루 생막걸리 6도",
      },
    ],
  });
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/main`,
    })
      .then((res) => {
        // console.log(res);
        setUser1(res.data[0]);
        setUser2(res.data[1]);
        setList1(res.data[2]);
        setList2(res.data[3]);
      })
      .catch((err) => {
        console.log("main 리스트 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="Main-Top-Container">
      <div className="Banner-Container">
        <img className="Banner-img" src={banner2}></img>
        <div className="Banner-content">
          <p className="Banner-header">전통주(傳統酒)</p>
          <p className="Banner-detail">
            전통주는 한국에서 전통적으로 내려오는 제조 방법에 따라 만드는 술을
            부르는 말이다. <br />
            우리나라 고유의 술, 전통주의 매력에 빠져보자
          </p>
        </div>
      </div>

      <div className="Main-Content-Container">
        <p className="header1">술놀음이 추천하는 우리술 모음</p>
        <div className="Card-Slider">
          <div className="second-header1">{list1.title}</div>
          <Slick>
            {list1.content.map((item, index) => (
              <div className="SliderItem" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="itemName">{item.name}</div>
              </div>
            ))}
          </Slick>
        </div>

        <div className="Card-Slider">
          <div className="second-header2">{list2.title}</div>
          <Slick>
            {list2.content.map((item, index) => (
              <div className="SliderItem" key={index}>
                <img src={item.image} alt={item.name} />{" "}
                <div className="itemName">{item.name}</div>
              </div>
            ))}
          </Slick>
        </div>

        <p className="header2">사용자가 직접 추천하는 우리술 모음</p>
        <div className="Card-Slider">
          <div className="second-header3">
            {user1.username} 님의 리스트 '{user1.title}'
          </div>
          <Slick>
            {user1.content.map((item, index) => (
              <div className="SliderItem" key={index}>
                <img src={item.image} alt={item.name} />{" "}
                <div className="itemName">{item.name}</div>
              </div>
            ))}
          </Slick>
        </div>
        <div className="Card-Slider">
          <div className="second-header4">
            {user2.username} 님의 리스트 '{user2.title}'
          </div>
          <Slick>
            {user2.content.map((item, index) => (
              <div className="SliderItem" key={index}>
                <img src={item.image} alt={item.name} />{" "}
                <div className="itemName">{item.name}</div>
              </div>
            ))}
          </Slick>
        </div>
      </div>
    </div>
  );
};

export default Main;
