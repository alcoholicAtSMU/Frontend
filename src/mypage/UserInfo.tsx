import React, { useState, useEffect } from "react";
import "./userInfo.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userProps {
  name: string;
  email: string;
  sex: string;
  age_range: string;
  nickname: string | null;
  capacity: string | null;
}

const UserInfo = () => {
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState("none");
  const [editedNickname, setEditedNickname] = useState(false);
  const [newCapacity, setNewCapacity] = useState<string>("");
  const [editedCapacity, setEditedCapacity] = useState(false);

  const [userState, setUserState] = useState<userProps>({
    name: "none",
    email: "none",
    sex: "female",
    age_range: "20-29",
    nickname: null,
    capacity: null,
  });

  useEffect(() => {
    console.log("useEffect");
    axios({
      method: "GET",
      url: `/myInfo`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        setUserState({
          name: res.data.name,
          email: res.data.email,
          sex: res.data.sex,
          age_range: res.data.age_range,
          nickname: res.data.nickname,
          capacity: res.data.capacitiy,
        });
        setNewNickname(res.data.nickname);
      })
      .catch((err) => {
        console.log("유저 정보 가져오기 에러", err);
      });
  }, []);

  const onWithdrawalButtonClick = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      axios({
        method: "PUT",
        url: `/auth/delete`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("token");
          navigate(`/login`);
          window.alert("탈퇴되었습니다.");
        })
        .catch((err) => {
          console.log("탈퇴 처리 에러", err);
        });
    } else {
      window.alert("탈퇴가 취소되었습니다.");
    }
  };

  const onChangeNickNameEditInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNickname(e.target.value);
  };
  const onNickNameEditButtonClick = () => {
    setEditedNickname(true);
  };

  const onChangeCapacityEditInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCapacity(e.target.value);
  };
  const onCapacityEditButtonClick = () => {
    setEditedCapacity(true);
  };

  const onClickCapacitySubmitButton = () => {
    console.log(typeof parseFloat(newCapacity));
    axios({
      url: "/myInfo",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        nickname: userState.nickname,
        capacitiy: parseFloat(newCapacity),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("리뷰 작성 에러", err);
      });
    setEditedCapacity(false);
    setUserState({ ...userState, capacity: newCapacity });
  };

  const onClickNickNameSubmitButton = () => {
    console.log(newNickname);
    axios({
      url: "/myInfo",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        nickname: newNickname,
        capacitiy: userState.capacity,
      },
    })
      .then((res) => {
        console.log(res.data.nickname);
      })
      .catch((err) => {
        console.log("리뷰 작성 에러", err);
      });
    setEditedNickname(false);
    setUserState({ ...userState, nickname: newNickname });
  };

  return (
    <div className="UserInfo-Top-Container">
      <h2>회원정보</h2>
      <div className="UserInfo-Content-Container">
        <p className="UserInfo-List-header">
          <span>이름 :</span> <p>{userState.name}</p>
        </p>
        <p className="UserInfo-List-header">
          <span>성별 :</span>
          <p>{userState.sex == "female" ? "여성" : "남성"}</p>
        </p>
        <p className="UserInfo-List-header">
          <span>email :</span> <p>{userState.email}</p>
        </p>

        {editedNickname ? (
          <p className="UserInfo-List-header">
            <input
              type="text"
              className="UserInfo-nickname-input"
              value={newNickname}
              onChange={onChangeNickNameEditInput}
            />
            <button
              type="button"
              className="UserInfo-nickname-input-button"
              onClick={onClickNickNameSubmitButton}
            >
              수정완료
            </button>
          </p>
        ) : (
          <p className="UserInfo-List-header">
            <span>닉네임 :</span> <p>{userState.nickname}</p>
          </p>
        )}

        {editedCapacity ? (
          <p className="UserInfo-List-header">
            <input
              className="UserInfo-capacity-input"
              value={newCapacity}
              onChange={onChangeCapacityEditInput}
              min="0.1"
            />
            <button
              type="button"
              className="UserInfo-capacity-input-button"
              onClick={onClickCapacitySubmitButton}
            >
              수정완료
            </button>
          </p>
        ) : (
          <p className="UserInfo-List-header">
            <span>주량 :</span> <p>{userState.capacity}</p>
          </p>
        )}
      </div>

      <div className="UserInfo-button-Container">
        {editedNickname ? (
          <></>
        ) : (
          <button
            className="UserInfo-editButton"
            onClick={onNickNameEditButtonClick}
          >
            닉네임수정
          </button>
        )}
        <button
          className="UserInfo-editButton"
          onClick={onCapacityEditButtonClick}
        >
          주량수정
        </button>
        <button
          className="UserInfo-withdrawalButton"
          onClick={onWithdrawalButtonClick}
        >
          탈퇴
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
