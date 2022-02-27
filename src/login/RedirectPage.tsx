import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();

  // 인가코드
  //   let code = new URL(window.location.href).searchParams.get("code");

  axios({
    method: "GET",
    url: `/auth/login`, // 서버
  })
    .then((res) => {
      console.log(res); // 토큰이 넘어올 것임
      //   const ACCESS_TOKEN = res.data.accessToken;
      //   localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
      navigate("/main", { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    })
    .catch((err) => {
      console.log("소셜로그인 에러", err);
      window.alert("카카오 로그인에 실패하였습니다.");
      navigate("/login", { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
    });

  return <></>;
};

export default RedirectPage;
