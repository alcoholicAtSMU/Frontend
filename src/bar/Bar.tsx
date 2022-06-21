import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./bar.css";
import BarDetail from "./BarDetail";

interface barProps {
  content: string;
  id: number;
  image: Array<string>;
  location: string;
  location_detail: string;
  modified_date: string;
  nickname: string;
  title: string;
}
interface BarDetailState {
  id: number;
}
const Bar = () => {
  const navigate = useNavigate();

  const areaList = [
    "서울",
    "경기",
    "충청남도/세종",
    "충청북도",
    "전라남도",
    "전라북도",
    "경상남도",
    "경상북도",
    "강원",
    "제주",
    "인천광역시",
    "부산광역시",
    "울산광역시",
    "광주광역시",
    "대구광역시",
    "대전광역시",
  ];
  const [SelectedArea, setSelectedArea] = useState("서울");
  const [barList, setBarList] = useState<Array<barProps>>([]);
  const [keyword, setKeaword] = useState<String>("");

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
        console.log(res.data);
        const newBarList: Array<barProps> = res.data.content;
        if (res.data.content.length > 0) setBarList(newBarList);
        console.log(barList);
      })
      .catch((err) => {
        console.log("내 컬렉션 리스트 가져오기 에러", err);
      });
  }, []);

  const handleSearchWithTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeaword(e.target.value);
  };

  const onSearchButtonClick = () => {
    if (keyword == "") {
      axios({
        method: "GET",
        url: `/bar/search?location=${SelectedArea}`,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.empty) alert("검색 결과가 없습니다.");
          else {
            const newBarList: Array<barProps> = res.data.content;
            if (res.data.content.length > 0) setBarList(newBarList);
          }
        })
        .catch((err) => {
          window.alert("검색에 실패했습니다.");
        });
    } else {
      axios({
        method: "GET",
        url: `/bar/search?contents=${keyword}&location=${SelectedArea}`,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.empty) alert("검색 결과가 없습니다.");
          else {
            const newBarList: Array<barProps> = res.data.content;
            if (res.data.content.length > 0) setBarList(newBarList);
          }
        })
        .catch((err) => {
          window.alert("검색에 실패했습니다.");
        });
    }
  };

  return (
    <div className="bar-container">
      <Routes>
        <Route path="/:a_id" element={<BarDetail />} />
      </Routes>
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
        </div>
        <span className="bar-createButton-container">
          <button
            className="bar-createButton"
            onClick={() => {
              navigate(`/createBar`);
            }}
          >
            주점리뷰쓰기
          </button>
        </span>
      </div>

      <div className="bar-list">
        {barList.map((item) => (
          <div
            className="bar-somenail-container"
            onClick={() => {
              const barIdState: BarDetailState = { id: item.id };
              navigate(`/bar/${item.id}`, {
                state: { newBarDetailId: barIdState },
              });
            }}
          >
            <img className="bar-list-somenail" src={item.image[0]}></img>
            <div className="bar-content-container">
              <p className="bar-content">
                <span className="bar-content-area">{item.location}</span> |{" "}
                <span className="bar-content-title">{item.title}</span>
              </p>
              <p className="bar-content-writer">by {item.nickname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bar;
