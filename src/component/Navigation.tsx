import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../static/navigation.css";
const Navigation = () => {
  const logo = require("../static/logo.png");
  const [keyword, setKeyword] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const searchKeyword = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(`${keyword}를 검색했습니다`);
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
        <Link to="/board">나만의 전통주 찾기</Link>
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

      {!localStorage.getItem("token") ? (
        <div className="nav-login">
          <Link to="/login" className="logIn-button">
            로그인
          </Link>{" "}
        </div>
      ) : (
        <>
          <div className="nav-user">
            <Link to="/mypage" className="nav-mypage">
              마이페이지
            </Link>
          </div>
          <button className="logOut-button">로그아웃</button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
