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
import CreateReview from "./review/CreateReview";
import UpdateReview from "./review/UpdateReview";
import CreateCollection from "./collection/CreateCollection";
import UpdateCollection from "./collection/UpdateCollection";
import Bar from "./bar/Bar";

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
          <Route path="/login/*" element={<Login />} />
          <Route
            path="/auth/login"
            element={
              <RedirectPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/createReview/*" element={<CreateReview />} />
          <Route path="/updateReview/*" element={<UpdateReview />} />

          <Route path="/createCollection/*" element={<CreateCollection />} />
          <Route path="/updateCollection/*" element={<UpdateCollection />} />

          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/test/*" element={<Test />} />
          <Route path="/bar/*" element={<Bar />} />
          <Route path="/" element={<Navigate replace to="/main" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRouter;
