import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as type from "../Redux/Types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { setTotalPost } from "../Redux/Actions/changeTotalPostAction";
import { setCurrentPage } from "../Redux/Actions/changeCurrentPageAction";
import { setKeyword } from "../Redux/Actions/changeKeywordAction";
import { RootState } from "../Redux/Reducers/rootReducer";

interface loginState {
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}

const Navigation = ({ isLoggedIn, setIsLoggedIn }: loginState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logo = require("../static/logo.png");
  const [KEAWORD, setKEAWORD] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKEAWORD(e.target.value);
  };

  const setCurrentpage = useCallback(
    (currentPage: number) => dispatch(setCurrentPage(currentPage)),
    [dispatch]
  );
  const setBoardlist = useCallback(
    (boardItemList: type.boardItem[]) => dispatch(setBoardList(boardItemList)),
    [dispatch]
  );
  const setTotalpost = useCallback(
    (TotalPosts: number) => dispatch(setTotalPost(TotalPosts)),
    [dispatch]
  );
  const setKeyWord = useCallback(
    (keyword: String) => dispatch(setKeyword(keyword)),
    [dispatch]
  );

  const onSearchButtonClick = () => {
    if (KEAWORD == "") {
      alert("검색어를 입력해주세요.");
    } else {
      axios({
        method: "GET",
        url: `/board/search?name=${KEAWORD}`,
      })
        .then((res) => {
          console.log(res);
          setCurrentpage(1);
          setBoardlist(res.data);
          setTotalpost(res.data.length);
          setKeyWord(KEAWORD);
          navigate("/boardsearch");
          const inputElement = document.getElementsByClassName(
            "inputAlcohol"
          ) as HTMLCollectionOf<HTMLInputElement>;
          inputElement[0].value = "";
        })
        .catch((err) => {
          console.log("검색 에러", err);
          window.alert("검색에 실패했습니다.");
          navigate("/board");
        });
      setKEAWORD("");
    }
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
        localStorage.removeItem("expiration");
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
      <div className="nav-bar">
        <Link to="/bar">전통주점</Link>
      </div>
      <div className="search-container">
        <input className="inputAlcohol" onChange={handleChange} />
        <button
          className="search-button"
          type="button"
          onClick={onSearchButtonClick}
        >
          🔎
        </button>
      </div>
      {!localStorage.getItem("token") ? (
        <div className="nav-login">
          <Link to="/kakaologin" className="logIn-button">
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
          <button className="logout-button" onClick={onLogoutClick}>
            로그아웃
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
