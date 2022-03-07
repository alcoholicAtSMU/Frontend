import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import { KAKAO_AUTH_URL } from "./Kauth";
import axios from "axios";

interface loginState {
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}

const Login = ({ isLoggedIn, setIsLoggedIn }: loginState) => {
  const logo = require("../static/logo.png");

  return (
    <div className="Login-Top-Container">
      <div className="login-container">
        <img src={logo}></img>
        <div className="login-content">로그인을 통해</div>
        <div className="login-content">더 많은 기능을 사용할 수 있습니다.</div>

        <div className="Kakao-Login-Button">
          <a href={KAKAO_AUTH_URL}>카카오로 로그인 하기</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
