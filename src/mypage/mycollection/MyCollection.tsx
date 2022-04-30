import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./myCollection.css";

const MyCollection = () => {
  const navigate = useNavigate();
  const [searchModal, setSearchModal] = useState<boolean>(false);

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
      })
      .catch((err) => {
        console.log("내 컬렉션 리스트 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="MyCollection-Top-Container">
      <span className="collection-none">아직 컬렉션이 없습니다.</span>
      <button
        className="add-Collection-Button"
        onClick={() => {
          navigate(`/createCollection`);
        }}
      >
        +
      </button>
    </div>
  );
};

export default MyCollection;
