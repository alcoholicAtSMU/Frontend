import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewCardContainer from "../Review/ReviewCardContainer";
import "./myReview.css";
interface tasteType {
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}
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
}
const MyReview = () => {
  const [tastes, setTastes] = useState<tasteType>({
    taste_1: "단맛",
    taste_2: "산미",
    taste_3: "담백",
    taste_4: "바디감",
    taste_5: "탄산",
    // 탁주로 초기화
  });

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
    },
  ]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/review/user`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);

        if (res.data.type === "탁주") {
          setTastes({
            taste_1: "단맛",
            taste_2: "산미",
            taste_3: "담백",
            taste_4: "바디감",
            taste_5: "탄산",
          });
        } else if (res.data.type === "과실주") {
          setTastes({
            taste_1: "단맛",
            taste_2: "산미",
            taste_3: "탄닌감",
            taste_4: "바디감",
            taste_5: "탄산",
          });
        } else if (res.data.type === "증류주") {
          setTastes({
            taste_1: "고소한향",
            taste_2: "화사한향",
            taste_3: "맛의강도",
            taste_4: "바디감",
            taste_5: "매운맛",
          });
        } else if (res.data.type === "약청주") {
          setTastes({
            taste_1: "단맛",
            taste_2: "산미",
            taste_3: "씁쓸",
            taste_4: "바디감",
            taste_5: "담백",
          });
        }

        const REVIEWLIST: Array<ReviewProps> = res.data;

        if (res.data.length > 0) setReviewList(REVIEWLIST);
      })
      .catch((err) => {
        console.log("내 리뷰 리스트 가져오기 에러", err);
      });
  }, []);
  return (
    <div className="MyReview-Top-Container">
      <p className="MyReview-header">나의 리뷰</p>
      <div>
        {reviewList[0].alcohol_id === 0 && reviewList[0].user_id === 0 ? (
          <p className="noReview">리뷰없음</p>
        ) : (
          <div className="MyReview-List-Conatainer">
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
                component="myreview"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyReview;
