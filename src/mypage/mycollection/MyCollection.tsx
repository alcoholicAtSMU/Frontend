import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./myCollection.css";

interface collectionProps {
  id: number;
  title: string;
  description: string;
  image: Array<string>;
}

const MyCollection = () => {
  const navigate = useNavigate();

  const [collectionList, setCollectionList] = useState<Array<collectionProps>>(
    []
  );

  useEffect(() => {
    axios({
      method: "GET",
      url: `/myCollection`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        setCollectionList(res.data);
      })
      .catch((err) => {
        console.log("내 컬렉션 리스트 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="MyCollection-Top-Container">
      <button
        className="add-Collection-Button"
        onClick={() => {
          navigate(`/createCollection`);
        }}
      >
        +
      </button>
      <div className="MyCollection-List-Container">
        <div className="MyCollection-List-cardContainer">
          <div className="MyCollection-card-imgContainer">
            <img className="MyCollection-somenail" src={""} alt="이미지대체" />
          </div>
          <div className="MyCollection-title">컬렉션제목</div>
        </div>
        <div className="MyCollection-List-cardContainer">
          <div className="MyCollection-card-imgContainer">
            <img className="MyCollection-somenail" src={""} alt="이미지대체" />
          </div>
          <div className="MyCollection-title">컬렉션제목컬렉션제목</div>
        </div>
        <div className="MyCollection-List-cardContainer">
          <div className="MyCollection-card-imgContainer">
            <img className="MyCollection-somenail" src={""} alt="이미지대체" />
          </div>
          <div className="MyCollection-title">
            컬렉션제목컬렉션제목컬렉션제목컬렉션제목
          </div>
        </div>
        <div className="MyCollection-List-cardContainer">
          <div className="MyCollection-card-imgContainer">
            <img className="MyCollection-somenail" src={""} alt="이미지대체" />
          </div>
          <div className="MyCollection-title">
            컬렉션제목컬렉션제목컬렉션제목컬렉션제목
          </div>
        </div>
      </div>

      {/* {collectionList === null ? (
        <span className="MyCollection-none">아직 컬렉션이 없습니다.</span>
      ) : (
        <div className="MyCollection-List-Container">
          {collectionList.map((value, i: number) => (
            <div className="MyCollection-List-cardContainer">
              <div className="MyCollection-card-imgContainer">
                <img
                  className="MyCollection-somenail"
                  src={value.image[0]}
                  alt="이미지대체"
                />
              </div>
              <div className="MyCollection-title">{value.title}</div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default MyCollection;
