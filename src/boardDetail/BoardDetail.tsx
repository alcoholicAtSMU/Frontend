import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./boradDetail.css";
import axios from "axios";
import Review from "./Review";

interface Review {
  star: number;
  id: number;
  image: string;
}

interface BoardDetailState {
  capacity: number;
  content: string;
  degree: number;
  id: number;
  image: string;
  manufacturer: string;
  name: string;
  price: number;
  reviews: Array<Review>;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  type: string;
  zzim: boolean;
}

type boardDetailLocation = {
  boardDetail: BoardDetailState;
};

interface tasteType {
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}

const BoardDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as boardDetailLocation;

  const [alcoholDetail, setAlcoholDetail] = useState(state.boardDetail);

  const liked = require("../static/heartLiked.png");
  const unliked = require("../static/heartUnliked.png");
  const [tastes, setTastes] = useState<tasteType>({
    taste_1: "단맛",
    taste_2: "산미",
    taste_3: "담백",
    taste_4: "바디감",
    taste_5: "탄산",
    // 탁주로 초기화
  });

  useEffect(() => {
    if (alcoholDetail.type == "탁주") {
      setTastes({
        taste_1: "단맛",
        taste_2: "산미",
        taste_3: "담백",
        taste_4: "바디감",
        taste_5: "탄산",
      });
    } else if (alcoholDetail.type == "과실주") {
      setTastes({
        taste_1: "단맛",
        taste_2: "산미",
        taste_3: "탄닌감",
        taste_4: "바디감",
        taste_5: "탄산",
      });
    } else if (alcoholDetail.type == "증류주") {
      setTastes({
        taste_1: "고소한향",
        taste_2: "화사한향",
        taste_3: "맛의강도",
        taste_4: "바디감",
        taste_5: "매운맛",
      });
    } else if (alcoholDetail.type == "약청주") {
      setTastes({
        taste_1: "단맛",
        taste_2: "산미",
        taste_3: "씁쓸",
        taste_4: "바디감",
        taste_5: "담백",
      });
    }
  }, []);

  const onShoppingButtonClick = () => {
    window.open(
      `https://search.shopping.naver.com/search/all?catId=50006349&frm=NVSHCAT&origQuery=${alcoholDetail.name}%20${alcoholDetail.manufacturer}&pagingIndex=1&pagingSize=40&productSet=total&query=${alcoholDetail.name}%20${alcoholDetail.manufacturer}&sort=price_asc&timestamp=&viewType=list`,
      "_blank"
    );
  };

  const onClickUnlike = () => {
    if (localStorage.getItem("token") === null) {
      alert("로그인 후 이용할 수 있는 서비스 입니다.");
    } else {
      setAlcoholDetail({ ...alcoholDetail, zzim: false });
      axios({
        method: "DELETE",
        url: `/board/${alcoholDetail.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("찜하기 에러", err);
        });
    }
  };

  const onClickLike = () => {
    if (localStorage.getItem("token") === null) {
      alert("로그인 후 이용할 수 있는 서비스 입니다.");
    } else {
      setAlcoholDetail({ ...alcoholDetail, zzim: true });

      axios({
        method: "POST",
        url: `/board/${alcoholDetail.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("찜하기 에러", err);
        });
    }
  };

  return (
    <div className="BoardDetail-Top-Container">
      <div className="BoardDetail-Introduce-Container">
        <div className="BoardDetail-img-Container">
          <img src={alcoholDetail.image} />
        </div>

        <div className="BoardDetail-Introduce-content">
          <div className="BoardDetail-Introduce-Header">
            <p className="BoardDetail-name">{alcoholDetail.name}</p>
            <p className="BoardDetail-manufacturer">
              {alcoholDetail.manufacturer}
            </p>
          </div>

          <div className="BoardDetail-Introduce-Filter">
            <div className="BoardDetail-zzim">
              {console.log(alcoholDetail.zzim)}
              {alcoholDetail.zzim ? (
                <img onClick={onClickUnlike} src={liked} />
              ) : (
                <img onClick={onClickLike} src={unliked} />
              )}
            </div>
            <p className="BoardDetail-type">주종 : {alcoholDetail.type}</p>
            <p className="BoardDetail-degree">도수 : {alcoholDetail.degree}</p>
            <p className="BoardDetail-capacity">
              용량 : {alcoholDetail.capacity}
            </p>
          </div>

          <div className="BoardDetail-Introduce-Reviews">
            {/* {alcoholDetail.review} */}
            <p className="BoardDetail-reviewAverage">리뷰 평균 0</p>
            <p className="BoardDetail-reviewTotal">리뷰 0</p>
          </div>

          <p className="BoardDetail-price">가격 : {alcoholDetail.price} 원</p>
          <button onClick={onShoppingButtonClick}>바로사러가기</button>
        </div>
      </div>
      <div className="BoardDetail-Content-Container">
        <p>{alcoholDetail.content}</p>
      </div>
      <div className="BoardDetail-Review-Container">
        <Review id={alcoholDetail.id} taste={tastes} />
      </div>
    </div>
  );
};
export default BoardDetail;
