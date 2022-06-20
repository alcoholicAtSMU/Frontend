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
      url: `/collectioninfo/user`,
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

  const onCardClick = () => {};

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

      {collectionList.length == 0 ? (
        <p className="no-collection">컬렉션이 없습니다.</p>
      ) : (
        <div className="MyCollection-List-Container">
          {collectionList.map((value, i: number) => (
            <div
              className="MyCollection-List-cardContainer"
              onClick={onCardClick}
            >
              <div className="MyCollection-title">{value.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollection;
