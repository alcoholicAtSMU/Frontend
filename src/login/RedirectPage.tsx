import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./redirectPage.css";

interface loginState {
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}

const RedirectPage = ({ isLoggedIn, setIsLoggedIn }: loginState) => {
  const navigate = useNavigate();
  const [newMember, setNewMember] = useState(false);
  const [nickname, setNickname] = useState("닉네임없음");
  const [capacity, setCapacity] = useState("0");
  const [modalState, setModalState] = useState(false);

  const onChangeNickNameEditInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickname(e.target.value);
  };
  const onChangeCapacityEditInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCapacity(e.target.value);
  };
  const onClickSubmitButton = () => {
    setNewMemberInfo();
  };

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    (async () => {
      await kakaoLogin(code, navigate);
    })();
    return () => {
      console.log("로그인 완료");
    };
  }, []);

  const setNewMemberInfo = () => {
    const formData = new FormData();

    formData.append(
      "userUpdateDto",
      new Blob(
        [
          JSON.stringify({
            nickname: nickname,
            capacity: parseFloat(capacity),
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    axios
      .put(`/auth/rename`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setModalState(false);
        navigate("/main", { replace: true }); // 로그인 완료 후 "/main"로 화면 전환
      })
      .catch((err) => {
        console.log("신규 회원 데이터 받아오기 에러", err);
      });
  };

  const kakaoLogin = (code: string | null, navigate: any) => {
    axios({
      method: "GET",
      url: `/auth/login?code=${code}`,
    })
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.jwtToken;
        localStorage.setItem("token", ACCESS_TOKEN);

        setIsLoggedIn(true);
        setNewMember(res.data.isNewMember);

        if (res.data.isNewMember) setModalState(true);
        else navigate("/main", { replace: true }); // 로그인 완료 후 "/main"로 화면 전환
      })
      .catch((err) => {
        console.log("소셜 로그인 에러", err);
        navigate("/login", { replace: true }); // 로그인 실패 시 "/login"으로 화면 전환
      });
  };

  return (
    <div>
      {modalState ? (
        <div className="newMember-modal-container">
          <div>
            <p className="newMember-modal-header">신규 가입을 축하드립니다!</p>
            <p className="newMember-modal-content">
              회원 님의 닉네임과 주량을 입력해주세요:)
            </p>
            <input
              type="text"
              className="newMember-nickname-input"
              value={nickname}
              onChange={onChangeNickNameEditInput}
            />
            <input
              className="newMember-capacity-input"
              value={capacity}
              onChange={onChangeCapacityEditInput}
              min="0.1"
            />
            <button
              type="button"
              className="newMember-submit-button"
              onClick={onClickSubmitButton}
            >
              수정완료
            </button>
          </div>
        </div>
      ) : (
        <div className="wait-login">loading...</div>
      )}
    </div>
  );
};

export default RedirectPage;
