import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "./myBar.css";

import { useNavigate } from "react-router-dom";

interface myBarProps {
  id: number;
  location: string;
  location_detail: string;
  modified_date: string;
  nickname: string;
  title: string;
  content: string;
  image: Array<string>;
}
interface BarDetailState {
  id: number;
}

const MyBar = () => {
  const navigate = useNavigate();
  const [userBarObj, setUserBarObj] = useState<Array<myBarProps>>([]);

  const [barUpdateProps, setBarUpdateProps] = useState<myBarProps>();

  useEffect(() => {
    axios({
      method: "GET",
      url: `/mypage/bar`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        setUserBarObj(res.data.content);
      })
      .catch((err) => {
        console.log("유저 주점 게시글 가져오기 에러", err);
      });
  }, []);

  const onDeleteButtonClicked = (id: number) => {
    return (event: React.MouseEvent) => {
      axios({
        method: "DELETE",
        url: `/bar/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          window.alert("주점 삭제 완료:)");
          window.location.replace("/mypage");
        })
        .catch((err) => {
          console.log("주점 리뷰 삭제 에러", err);
        });
    };
  };
  return (
    <div className="MyReview-Top-Container">
      <div className="myBar-header">
        <p className="myBar-header-order">번호</p>
        <p className="myBar-header-title">제목</p>
        <p className="myBar-header-location">위치</p>
        <p className="myBar-header-date">수정일</p>
      </div>
      {userBarObj.map((value, i: number) => (
        <div className="myBar-CardContainer">
          <p className="myBar-Card-order">{i + 1}</p>
          <p
            className="myBar-Card-title"
            onClick={() => {
              const barIdState: BarDetailState = { id: value.id };
              navigate(`/bar/${value.id}`, {
                state: { newBarDetailId: barIdState },
              });
            }}
          >
            {value.title}
          </p>
          <p className="myBar-Card-location">
            {value.location} {value.location_detail}
          </p>
          <p className="myBar-Card-date">{value.modified_date}</p>
          <p className="myBar-Card-buttons">
            <p
              className="myBar-Card-update"
              onClick={() => {
                navigate(`//updateBar`, {
                  state: { updateBarState: userBarObj[i] },
                });
              }}
            >
              수정
            </p>
            <p
              className="myBar-Card-delete"
              onClick={onDeleteButtonClicked(value.id)}
            >
              삭제
            </p>
          </p>
        </div>
      ))}
    </div>
  );
};
export default MyBar;
