import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./boradDetail.css";
import axios from "axios";
import Review from "./Review";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { NonceProvider } from "react-select";
import { skipPartiallyEmittedExpressions } from "typescript";
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
interface BoardDetailState {
  capacity: number;
  content: string;
  degree: number;
  id: number;
  image: string;
  manufacturer: string;
  name: string;
  price: number;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  type: string;
  zzim: boolean;
  visit: visitProps;
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

interface visitProps {
  a_id: number;
  female: number;
  fiftys: number;
  fourtys: number;
  male: number;
  thirtys: number;
  twentys: number;
}
const BoardDetail = () => {
  const location = useLocation();
  const state = location.state as boardDetailLocation;

  const [alcoholDetail, setAlcoholDetail] = useState(state.boardDetail);
  console.log(alcoholDetail);

  const liked = require("../static/heartLiked.png");
  const unliked = require("../static/heartUnliked.png");
  const [tastes, setTastes] = useState<tasteType>({
    // 탁주로 초기화
    taste_1: "단맛",
    taste_2: "산미",
    taste_3: "담백",
    taste_4: "바디감",
    taste_5: "탄산",
  });
  const [reviewLen, setReviewLen] = useState(0);
  const [reviewAverage, setReviewAverage] = useState(0);

  const logChartlabels1 = ["여성", "남성"];
  const logChartlabels2 = ["20대", "30대", "40대", "50대이상"];

  const logChartdatas1 = {
    labels: logChartlabels1,
    datasets: [
      {
        labels: logChartlabels1,
        borderWidth: 2,
        fill: true,
        data: [alcoholDetail.visit.female, alcoholDetail.visit.male],
        backgroundColor: [
          "rgba(200, 140, 170, 0.6)",
          "rgba(154, 139, 176, 0.6)",
        ],
      },
    ],
  };
  const logChartdatas2 = {
    labels: logChartlabels2,
    borderWidth: 2,
    fill: true,
    datasets: [
      {
        data: [
          alcoholDetail.visit.twentys,
          alcoholDetail.visit.thirtys,
          alcoholDetail.visit.fourtys,
          alcoholDetail.visit.fiftys,
        ],
        backgroundColor: [
          "rgba(246, 198, 40, 0.6)",
          "rgba(205, 140, 64, 0.6)",
          "rgba(205, 200, 90, 0.6)",
          "rgba(100, 74, 133, 0.6)",
        ],
      },
    ],
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `/review/alcohol/${alcoholDetail.id}`,
    })
      .then((res) => {
        console.log(res);
        if (res.data.reviewResponseDtoList.length > 0)
          setReviewLen(res.data.reviewResponseDtoList.length);
        setReviewAverage(res.data.total_star);
      })
      .catch((err) => {
        console.log("리뷰리스트 가져오기 에러", err);
      });

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
            <p className="BoardDetail-reviewAverage">
              리뷰 평균 ⭐{reviewAverage}
            </p>
            <p className="BoardDetail-reviewTotal">리뷰 개수 {reviewLen}</p>
          </div>

          <p className="BoardDetail-price">가격 : {alcoholDetail.price} 원</p>
          <button onClick={onShoppingButtonClick}>바로사러가기</button>
        </div>
      </div>
      <div className="BoardDetail-Content-Container">
        <p className="BoardDetail-Content">{alcoholDetail.content}</p>
      </div>

      <div className="BoardDetail-graph-container">
        <div className="BoardDetail-graph1">
          <Doughnut data={logChartdatas1} />
        </div>
        <div className="BoardDetail-graph2">
          <Doughnut data={logChartdatas2} />
        </div>
      </div>

      <div className="BoardDetail-Review-Container">
        <Review id={alcoholDetail.id} taste={tastes} />
      </div>
    </div>
  );
};
export default BoardDetail;
