import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface loginState {
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}

const RedirectPage = ({ isLoggedIn, setIsLoggedIn }: loginState) => {
  const navigate = useNavigate();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    (async () => {
      await kakaoLogin(code, navigate);
    })();
    return () => {
      console.log("로그인 완료");
    };
  }, []);

  const kakaoLogin = (code: string | null, navigate: any) => {
    axios({
      method: "GET",
      url: `/auth/login?code=${code}`, // 서버
    })
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        const ACCESS_TOKEN = res.data.jwtToken;
        localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
        setIsLoggedIn(true);
        navigate("/main", { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("카카오 로그인에 실패하였습니다.");
        navigate("/login", { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };

  return <div>loading...</div>;
};

export default RedirectPage;
