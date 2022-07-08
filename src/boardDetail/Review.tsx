import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./review.css";
import axios from "axios";
import ReviewCardContainer from "../review/ReviewCardContainer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { NonceProvider } from "react-select";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface ReviewProps {
  alcohol_id: number;
  content: string;
  id: number;
  image: Array<string>;
  modified_date: string;
  star: number;
  taste1: string;
  taste2: string;
  taste3: string;
  taste4: string;
  taste5: string;
  user_id: number;
  nickname: string;
  tastes: tasteType;
}

interface ReviewHeaderProps {
  top_taste1: string;
  top_taste2: string;
  top_taste3: string;
  top_taste4: string;
  top_taste5: string;
  top_taste1_percent: number;
  top_taste2_percent: number;
  top_taste3_percent: number;
  top_taste4_percent: number;
  top_taste5_percent: number;
  total_star: number;
}

export interface tasteType {
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}

export interface reviewCreateProps {
  id: number;
  taste: tasteType;
}

const Review = ({ id, taste }: reviewCreateProps) => {
  const navigate = useNavigate();
  const graphInfo: reviewCreateProps = {
    taste: {
      taste_1: taste.taste_1,
      taste_2: taste.taste_2,
      taste_3: taste.taste_3,
      taste_4: taste.taste_4,
      taste_5: taste.taste_5,
    },
    id: id,
  };

  const [reviewHeaderProps, setReviewHeaderProps] = useState<ReviewHeaderProps>(
    {
      top_taste1: "보통",
      top_taste2: "보통",
      top_taste3: "보통",
      top_taste4: "보통",
      top_taste5: "보통",
      top_taste1_percent: 0,
      top_taste2_percent: 0,
      top_taste3_percent: 0,
      top_taste4_percent: 0,
      top_taste5_percent: 0,
      total_star: 0,
    }
  );

  const [reviewList, setReviewList] = useState<Array<ReviewProps>>([
    {
      alcohol_id: 0,
      content: "none",
      id: 0,
      image: ["none"],
      modified_date: "none",
      star: 0,
      taste1: "none",
      taste2: "none",
      taste3: "none",
      taste4: "none",
      taste5: "none",
      user_id: 0,
      nickname: "none",
      tastes: graphInfo.taste,
    },
  ]);

  const reviewChartlabels = [
    graphInfo.taste.taste_1,
    graphInfo.taste.taste_2,
    graphInfo.taste.taste_3,
    graphInfo.taste.taste_4,
    graphInfo.taste.taste_5,
  ];

  const reviewChartdatas = {
    labels: reviewChartlabels,
    datasets: [
      {
        axis: "y",
        data: [
          reviewHeaderProps.top_taste1_percent,
          reviewHeaderProps.top_taste2_percent,
          reviewHeaderProps.top_taste3_percent,
          reviewHeaderProps.top_taste4_percent,
          reviewHeaderProps.top_taste5_percent,
        ],
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
      },
    ],
  };

  console.log();
  useEffect(() => {
    axios({
      method: "GET",
      url: `/review/alcohol/${graphInfo.id}`,
    })
      .then((res) => {
        console.log(res);
        setReviewHeaderProps({
          top_taste1: res.data.top_taste1,
          top_taste2: res.data.top_taste2,
          top_taste3: res.data.top_taste3,
          top_taste4: res.data.top_taste4,
          top_taste5: res.data.top_taste5,
          top_taste1_percent: res.data.top_taste1_percent,
          top_taste2_percent: res.data.top_taste2_percent,
          top_taste3_percent: res.data.top_taste3_percent,
          top_taste4_percent: res.data.top_taste4_percent,
          top_taste5_percent: res.data.top_taste5_percent,
          total_star: res.data.total_star,
        });
        const REVIEWLIST: Array<ReviewProps> = res.data.reviewResponseDtoList;

        if (res.data.reviewResponseDtoList.length > 0)
          setReviewList(REVIEWLIST);
      })
      .catch((err) => {
        console.log("리뷰리스트 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="Review-Top-Container">
      <div className="Review-Header">
        <div className="Review-info">
          <p>
            평균 평점 <p>⭐ {reviewHeaderProps.total_star}</p>
          </p>
        </div>
        <div className="Review-graph-container">
          <div className="Review-graph">
            <Bar
              data={reviewChartdatas}
              width={50}
              height={20}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                indexAxis: "y",
              }}
            />{" "}
            <p className="graphInfo-head">
              <p>{reviewHeaderProps.top_taste1}</p>
              <p>{reviewHeaderProps.top_taste2}</p>
              <p>{reviewHeaderProps.top_taste3}</p>
              <p>{reviewHeaderProps.top_taste4}</p>
              <p>{reviewHeaderProps.top_taste5}</p>
            </p>
          </div>
        </div>
        <div className="Review-button-container">
          <button
            className="Review-button"
            onClick={() => {
              if (localStorage.getItem("token")) {
                navigate(`/createReview`, {
                  state: { reviewstate: graphInfo },
                });
              } else {
                alert("로그인 후 리뷰를 작성할 수 있습니다.");
              }
            }}
          >
            리뷰작성하기
          </button>
        </div>
      </div>

      {reviewList[0].alcohol_id === 0 && reviewList[0].user_id === 0 ? (
        <p className="noReview">리뷰없음</p>
      ) : (
        <div className="Review-List-Conatainer">
          {reviewList.map((value, i: number) => (
            <ReviewCardContainer
              alcohol_id={value.alcohol_id}
              content={value.content}
              id={value.id}
              image={value.image}
              modified_date={value.modified_date}
              star={value.star}
              taste_1={value.taste1}
              taste_2={value.taste2}
              taste_3={value.taste3}
              taste_4={value.taste4}
              taste_5={value.taste5}
              user_id={value.user_id}
              nickname={value.nickname}
              component="review"
              tastes={graphInfo.taste}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Review;
