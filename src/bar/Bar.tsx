import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./bar.css";

const Bar = () => {
  const navigate = useNavigate();
  const item = require("../static/cat.jpg");

  const areaList = ["서울", "경기", "충청도", "제주", "전라도", "경상도"];
  const [SelectedArea, setSelectedArea] = useState("서울");

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target);
    setSelectedArea(e.target.value);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `/bar`,
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
  const [keyword, setKeaword] = useState<String>("");

  const handleSearchWithTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeaword(e.target.value);
  };

  const onSearchButtonClick = () => {
    // if (KEAWORD == "") {
    //   alert("검색어를 입력해주세요.");
    // } else {
    //   axios({
    //     method: "GET",
    //     url: `/board/search?name=${KEAWORD}`,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       setBoardlist(res.data);
    //       setTotalpost(res.data.length);
    //       setKeyWord(KEAWORD);
    //     })
    //     .catch((err) => {
    //       window.alert("검색에 실패했습니다.");
    //     });
    // }
  };

  return (
    <div className="bar-container">
      <div className="bar-header">
        <p className="bar-header-title">전통주점</p>
        <p className="bar-header-content">
          다녀온 전통주점을 리뷰, 소개해주세요!
        </p>
      </div>
      <div className="bar-list-container">
        <div className="bar-search-container">
          <select
            value={SelectedArea}
            onChange={onSelectChange}
            name="지역"
            className="Bar-selectArea"
          >
            {areaList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="Bar-Search-input-container">
            <input
              className="Bar-Search-input-Title"
              placeholder="검색어를 입력하세요"
              onChange={handleSearchWithTitle}
            />
            <button
              className="Bar-Search-button"
              type="button"
              onClick={onSearchButtonClick}
            >
              검색
            </button>
          </div>
        </div>{" "}
        <span className="bar-createButton-container">
          <button className="bar-createButton">주점리뷰쓰기</button>
        </span>
        <div className="bar-list">
          <span className="bar-list-title top">제목</span>
          <span className="bar-list-writer top">글쓴이</span>
          <span className="bar-list-date top">작성일</span>
        </div>
        <div className="bar-list">
          <span className="bar-list-title">연남동 전통주 가게 다녀왔어요</span>
          <span className="bar-list-writer">김어진</span>
          <span className="bar-list-date">2022-05-10</span>
        </div>
        <hr />
        <div className="bar-list">
          <span className="bar-list-title">두루미 어쩌고 갔다옴</span>
          <span className="bar-list-writer">김경은</span>
          <span className="bar-list-date">2022-04-14</span>
        </div>
        <hr />
        <div className="bar-list">
          <span className="bar-list-title">전통주 오마카세 얌얌</span>
          <span className="bar-list-writer">고구마</span>
          <span className="bar-list-date">2022-04-24</span>
        </div>
        <hr />
      </div>

      <div className="bar-list2">
        {" "}
        <div className="bar-imgStyle-container">
          <div className="bar-somenail-container">
            <img className="bar-list-somenail" src={item}></img>

            <div className="bar-content-container">
              <p className="bar-content">
                <span className="bar-content-area">서울</span> |{" "}
                <span className="bar-content-title">
                  연남동 두루미 추천합니다 쫀맛
                </span>
              </p>
              <p className="bar-content-writer">by 김경은</p>
            </div>
          </div>
        </div>
        <div className="bar-imgStyle-container">
          <div className="bar-somenail-container">
            <img className="bar-list-somenail" src={item}></img>

            <div className="bar-content-container">
              <p className="bar-content">
                <span className="bar-content-area">서울</span> |{" "}
                <span className="bar-content-title">
                  연남동 두루미 저는 별로였읍니다. 왜 맛있다는건지,,
                </span>
              </p>
              <p className="bar-content-writer">by 김어진</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
