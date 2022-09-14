import React, { useState } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./api/main/Main";
import Board from "./api/board/Board";
import BoardSearch from "./api/board/BoardSearch";
import Login from "./api/login/Login";
import Navigation from "./api/component/Navigation";
import MyPage from "./api/mypage/MyPage";
import Test from "./api/test/Test";
import RedirectPage from "./api/login/RedirectPage";
import BoardDetail from "./api/boardDetail/BoardDetail";
import CreateReview from "./api/review/CreateReview";
import UpdateReview from "./api/review/UpdateReview";
import CreateCollection from "./api/collection/CreateCollection";
import UpdateCollection from "./api/collection/UpdateCollection";
import Bar from "./api/bar/Bar";
import CreateBar from "./api/bar/CreateBar";
import UpdateBar from "./api/bar/UpdateBar";
import BarDetail from "./api/bar/BarDetail";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  return (
    <>
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/api/main/*" element={<Main />} />
          <Route path="/api/kakaologin/*" element={<Login />} />
          <Route
            path="/api/login"
            element={
              <RedirectPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/api/board/*" element={<Board />} />
          <Route path="/api/board/:id/*" element={<BoardDetail />} />
          <Route path="/api/boardsearch/*" element={<BoardSearch />} />
          <Route path="/api/bar/*" element={<Bar />} />
          <Route path="/api/bar/:id/*" element={<BarDetail />} />
          <Route path="/api/test/*" element={<Test />} />

          <Route path="/api/createBar/*" element={<CreateBar />} />
          <Route path="/api/updateBar/*" element={<UpdateBar />} />
          <Route path="/api/createReview/*" element={<CreateReview />} />
          <Route path="/api/updateReview/*" element={<UpdateReview />} />
          <Route
            path="/api/createCollection/*"
            element={<CreateCollection />}
          />
          <Route
            path="/api/updateCollection/*"
            element={<UpdateCollection />}
          />

          <Route path="/api/mypage/*" element={<MyPage />} />
          <Route path="/" element={<Navigate replace to="/api/main" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRouter;
