import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import axios from "axios";

interface userState {
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}
const Navigation = ({ isLoggedIn, setIsLoggedIn }: userState) => {
  const logo = require("../static/logo.png");
  const [keyword, setKeyword] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const searchKeyword = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(`${keyword}를 검색했습니다`);
  };

  const onLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("로그아웃 버튼을 클릭했습니다.");
    axios(
      {
        method: "get",
        url: `/auth/logout`, // 서버
        //   headers: { "X-Requested-With": "XMLHttpRequest" }, // 요청 헤더 설정
        // params: { api_key: "1234", langualge: "en" }, // ?파라미터를 전달
        // responseType: 'json', // default

        // maxContentLength: 2000, // http 응답 내용의 max 사이즈
        // validateStatus: function (status) { return status >= 200 && status < 300; // default
      } // HTTP응답 상태 코드에 대해 promise의 반환 값이 resolve 또는 reject 할지 지정
    ).then(function (response) {
      // response Action
    });

    setIsLoggedIn(false);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/main">
          <img src={logo} />
        </Link>
      </div>

      <div className="nav-board">
        <Link to="/board">전통주 둘러보기</Link>
      </div>

      <div className="nav-test">
        <Link to="/test">나만의 전통주 찾기</Link>
      </div>

      <div className="search-container">
        <form>
          <input
            className="inputAlcohol"
            placeholder="검색어를 입력하세요"
            onChange={handleChange}
          />
          <button
            className="search-button"
            type="submit"
            onSubmit={searchKeyword}
          >
            🔎
          </button>
        </form>
      </div>

      {!isLoggedIn ? (
        // {!localStorage.getItem("token") ? (
        <div className="nav-login">
          <Link to="/login" className="logIn-button">
            로그인
          </Link>
        </div>
      ) : (
        <>
          <div className="nav-user">
            <Link to="/mypage" className="nav-mypage">
              마이페이지
            </Link>
          </div>
          <button className="logOut-button" onClick={onLogoutClick}>
            로그아웃
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
