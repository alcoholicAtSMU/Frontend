import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./main/Main";
import Board from "./board/Board";
import BoardSearch from "./board/BoardSearch";
import Login from "./login/Login";
import Navigation from "./component/Navigation";
import MyPage from "./mypage/MyPage";
import Test from "./test/Test";
import RedirectPage from "./login/RedirectPage";
import BoardDetail from "./boardDetail/BoardDetail";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  //중첩 라우팅
  // -mypage의 찜하기, myReview에서 board-detail로

  return (
    <>
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/main/*" element={<Main />} />
          <Route path="/board/*" element={<Board />} />
          <Route path="/board/:id/*" element={<BoardDetail />} />
          <Route path="/boardsearch/*" element={<BoardSearch />} />
          <Route
            path="/login/*"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/auth/login"
            element={
              <RedirectPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/test/*" element={<Test />} />
          <Route path="/" element={<Navigate replace to="/main" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRouter;
