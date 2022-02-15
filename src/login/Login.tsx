import React from "react";
import "./login.css";
const Login = () => {
  const logo = require("../static/logo.png");
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("로그인 버튼을 클릭했습니다.");
  };

  return (
    <div className="Login-Top-Container">
      <div className="login-container">
        <img src={logo}></img>
        <div className="login-content">로그인을 통해</div>
        <div className="login-content">더 많은 기능을 사용할 수 있습니다.</div>
        <button className="Kakao-Login-Button" onClick={onButtonClick}>
          카카오로 로그인 하기
          <br />
          log in with kakao
        </button>
      </div>
    </div>
  );
};

export default Login;
