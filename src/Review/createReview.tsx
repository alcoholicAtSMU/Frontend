import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createReview.css";
import axios from "axios";
import TagSelector from "./TagSelector";

interface ReviewForm {
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  input: string;
  image: Array<string> | null;
}

export interface reveiwCreateProps {
  id: number;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
}

export interface tag {
  tagList: Array<string>;
}

export interface tagState {
  setTagState: React.Dispatch<React.SetStateAction<string[]>>;
}

//props : review 객체
const CreateReview = () => {
  const location = useLocation();
  const state = location.state as reveiwCreateProps;

  const [reviewProps, setReviewProps] = useState<reveiwCreateProps>({
    id: state.id,
    taste_1: state.taste_1,
    taste_2: state.taste_2,
    taste_3: state.taste_3,
    taste_4: state.taste_4,
    taste_5: state.taste_5,
  });

  const [tag, setTag] = useState<Array<string>>([
    "보통",
    "보통",
    "보통",
    "보통",
    "보통",
  ]);
  const [form, setForm] = useState<ReviewForm>({
    taste_1: "보통",
    taste_2: "보통",
    taste_3: "보통",
    taste_4: "보통",
    taste_5: "보통",
    input: "내용없음",
    image: null,
  });
  const [input, setInput] = useState<String>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/review`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("리뷰 작성 에러", err);
      });
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  const tagRef = useRef({});

  return (
    <div className="CreateReview-Top-Container">
      <div className="CreateReview-TagForm-Container">
        <h1>리뷰 작성</h1>
        <TagSelector
          reviewProps={reviewProps}
          tagRef={tagRef}
          tag={tag}
          setTagState={setTag}
        />
      </div>
      <div className="CreateReview-ContentForm-Container">
        <p>리뷰 내용</p>
        <form onSubmit={onSubmit}>
          <input
            className="ContentForm-input"
            onChange={onChangeInput}
            // maxLength={374}
            // max={10}
            type="text"
          ></input>
          <div className="button-Container">
            <button className="ContentForm-image-button"> 사진 선택</button>
            <button type="submit" className="ContentForm-submit-button">
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateReview;
