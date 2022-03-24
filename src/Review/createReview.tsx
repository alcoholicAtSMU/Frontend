import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createReview.css";
import axios from "axios";
import * as type from "../boardDetail/Review";

const CreateReview = () => {
  const location = useLocation().state as type.reveiwCreateProps;

  let tastevalue: type.reveiwCreateProps = {
    id: 0,
    taste: {
      taste_1: "없음",
      taste_2: "없음",
      taste_3: "없음",
      taste_4: "없음",
      taste_5: "없음",
    },
  };
  Object.entries(location).map(([key, value]) => {
    tastevalue = value;
  });

  const [reviewProps, setReviewProps] = useState<type.reveiwCreateProps>({
    id: tastevalue.id,
    taste: {
      taste_1: tastevalue.taste.taste_1,
      taste_2: tastevalue.taste.taste_2,
      taste_3: tastevalue.taste.taste_3,
      taste_4: tastevalue.taste.taste_4,
      taste_5: tastevalue.taste.taste_5,
    },
  });

  const selectList = ["없음", "약함", "보통", "강함"];
  const [Selected1, setSelected1] = useState("보통");
  const [Selected2, setSelected2] = useState("보통");
  const [Selected3, setSelected3] = useState("보통");
  const [Selected4, setSelected4] = useState("보통");
  const [Selected5, setSelected5] = useState("보통");
  const [text, setText] = useState("  ");
  const [files, setFiles] = useState<Array<string>>([]);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (files === null) setFiles([e.target.value]);
    else files.push(e.target.value);
    console.log(files);
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (files === []) formData.append("fileList", "[]");
    else {
      files.forEach(
        (files) => formData.append("fileList", files)
        // formData.append("fileList", JSON.stringify(files))
      );
    }

    const json = JSON.stringify(
      JSON.stringify({
        alcohol: {
          id: reviewProps.id,
        },
        content: text,
        star: 5,
        taste_1: Selected1,
        taste_2: Selected2,
        taste_3: Selected3,
        taste_4: Selected4,
        taste_5: Selected5,
      })
    );
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("requestDto", blob);

    var values = formData.values();
    console.log(values.next());
    console.log(values.next());

    axios
      .post(`/review`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("리뷰 작성 에러", err);
      });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target);
    if (e.target.name == reviewProps.taste.taste_1)
      setSelected1(e.target.value);
    else if (e.target.name == reviewProps.taste.taste_2)
      setSelected2(e.target.value);
    else if (e.target.name == reviewProps.taste.taste_3)
      setSelected3(e.target.value);
    else if (e.target.name == reviewProps.taste.taste_4)
      setSelected4(e.target.value);
    else if (e.target.name == reviewProps.taste.taste_5)
      setSelected5(e.target.value);
  };

  return (
    <div className="CreateReview-Top-Container">
      <div className="CreateReview-TagForm-Container">
        <h1>리뷰 작성</h1>
        <div className="star-rating">
          <input type="radio" id="5-stars" name="rating" value="5" />
          <label htmlFor="5-stars" className="star">
            &#9733;
          </label>
          <input type="radio" id="4-stars" name="rating" value="4" />
          <label htmlFor="4-stars" className="star">
            &#9733;
          </label>
          <input type="radio" id="3-stars" name="rating" value="3" />
          <label htmlFor="3-stars" className="star">
            &#9733;
          </label>
          <input type="radio" id="2-stars" name="rating" value="2" />
          <label htmlFor="2-stars" className="star">
            &#9733;
          </label>
          <input type="radio" id="1-star" name="rating" value="1" />
          <label htmlFor="1-star" className="star">
            &#9733;
          </label>
        </div>

        <div className="CreateReview-TagForm">
          <p>{reviewProps.taste.taste_1}</p>
          <select
            value={Selected1}
            onChange={onSelectChange}
            name={reviewProps.taste.taste_1}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{reviewProps.taste.taste_2}</p>
          <select
            value={Selected2}
            onChange={onSelectChange}
            name={reviewProps.taste.taste_2}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{reviewProps.taste.taste_3}</p>
          <select
            value={Selected3}
            onChange={onSelectChange}
            name={reviewProps.taste.taste_3}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{reviewProps.taste.taste_4}</p>
          <select
            value={Selected4}
            onChange={onSelectChange}
            name={reviewProps.taste.taste_4}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{reviewProps.taste.taste_5}</p>
          <select
            value={Selected5}
            onChange={onSelectChange}
            name={reviewProps.taste.taste_5}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="CreateReview-ContentForm-Container">
        <p>리뷰 내용</p>
        <form onSubmit={onSubmit} action="/review" method="post">
          <textarea
            onChange={onTextChange}
            className="ContentForm-textarea"
            maxLength={374}
          ></textarea>
          <button type="submit" className="ContentForm-submit-button">
            완료
          </button>
        </form>
        <form encType="multipary/form-data" target="_blank">
          <input
            type="file"
            id="file"
            name="file"
            onChange={fileChangedHandler}
            multiple
          ></input>
        </form>
      </div>
    </div>
  );
};
export default CreateReview;
