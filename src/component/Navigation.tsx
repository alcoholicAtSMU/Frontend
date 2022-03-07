import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface loginState {
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}
const Navigation = ({ isLoggedIn, setIsLoggedIn }: loginState) => {
  const navigate = useNavigate();

  const logo = require("../static/logo.png");
  const [keyword, setKeyword] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const onSearchButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    axios({
      method: "GET",
      url: `/board/search?name=${keyword}`, // 서버
    })
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
      })
      .catch((err) => {
        console.log("검색 에러", err);
        window.alert("검색에 실패했습니다.");
      });
    console.log(`${keyword}를 검색했습니다`);
  };

  const onLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios({
      method: "get",
      url: `/auth/logout`, // 서버
    })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        window.alert("로그아웃 되었습니다.");
        navigate("/main", { replace: true });
      })
      .catch((err) => {
        console.log("로그아웃 에러", err);
        window.alert("로그아웃에 실패했습니다.");
        navigate("/main", { replace: true });
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
            onSubmit={onSearchButtonClick}
          >
            🔎
          </button>
        </form>
      </div>

      {!localStorage.getItem("token") ? (
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
