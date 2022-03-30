import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createReview.css";
import axios from "axios";
import * as type from "../boardDetail/Review";

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

const CreateReview = () => {
  const location = useLocation().state as type.reveiwCreateProps;
  const navigate = useNavigate();

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
  const [text, setText] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [star, setStar] = useState(0);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (files.length == 3) alert("이미지는 최대 3개까지 선택할 수 있습니다.");
    else {
      const newFiles = e.currentTarget.files;
      newFiles &&
        Array.from(newFiles).forEach((file) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
              setFiles([...files, fileReader.result]);
            }
            // const image = new Image();
            // if (typeof fileReader.result === "string") {
            //   image.src = fileReader.result;
            // }
            // //base64 이미지 용량 줄이기
            // image.onload = () => {
            //   let canvas = document.createElement(`canvas`),
            //     width = image.width,
            //     height = image.height;
            //   const ctx = canvas.getContext(`2d`);

            //   canvas.width = image.width;
            //   canvas.height = image.height;

            //   ctx?.drawImage(image, 0, 0, width, height);
            //   const dataUrl = canvas.toDataURL("image/jpeg");

            //   if (typeof fileReader.result === "string") {
            //     setFiles([...files, dataUrl]);
            //   }
            // };
          };
        });
    }
  };

  const removeImage = (img: string) => {
    const removedImageList = files?.filter((d) => d !== img);
    setFiles(removedImageList);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("fileList", file);
    });

    formData.append(
      "requestDto",
      new Blob(
        [
          JSON.stringify({
            alcohol: {
              id: reviewProps.id,
            },
            content: text,
            star: star,
            taste1: Selected1,
            taste2: Selected2,
            taste3: Selected3,
            taste4: Selected4,
            taste5: Selected5,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    for (let v of formData.values()) {
      console.log(v);
    }

    if (text === "") {
      alert("리뷰 내용을 작성해주세요");
    } else if (star === 0) {
      alert("별점을 선택해주세요");
    } else {
      axios
        .post(`/review`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          onReviewPostComplete();
        })
        .catch((err) => {
          console.log("리뷰 작성 에러", err);
        });
    }
  };

  const onReviewPostComplete = () => {
    axios({
      method: "GET",
      url: `/board/${reviewProps.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.alcoholDetail);
        const s: BoardDetailState = {
          capacity: res.data.alcoholDetail.capacity,
          content: res.data.alcoholDetail.content,
          degree: res.data.alcoholDetail.degree,
          id: res.data.alcoholDetail.id,
          image: res.data.alcoholDetail.image,
          manufacturer: res.data.alcoholDetail.manufacturer,
          name: res.data.alcoholDetail.name,
          price: res.data.alcoholDetail.price,
          reviews: res.data.alcoholDetail.reviews,
          taste_1: res.data.alcoholDetail.taste_1,
          taste_2: res.data.alcoholDetail.taste_2,
          taste_3: res.data.alcoholDetail.taste_3,
          taste_4: res.data.alcoholDetail.taste_4,
          taste_5: res.data.alcoholDetail.taste_5,
          type: res.data.alcoholDetail.type,
          zzim: res.data.zzim,
        };
        navigate(`/board/${reviewProps.id}`, {
          state: { boardDetail: s },
        });
      })
      .catch((err) => {
        console.log("상세 페이지 가져오기 에러", err);
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

  const starHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const star: string = e.target.value;
    if (star === "5") setStar(5);
    else if (star === "4") setStar(4);
    else if (star === "3") setStar(3);
    else if (star === "2") setStar(2);
    else if (star === "1") setStar(1);
  };

  return (
    <div className="CreateReview-Top-Container">
      <div className="CreateReview-TagForm-Container">
        <h1>리뷰 작성</h1>
        <div className="star-rating">
          <input
            type="radio"
            id="5-stars"
            name="rating"
            value="5"
            onChange={starHandler}
          />
          <label htmlFor="5-stars" className="star">
            &#9733;
          </label>
          <input
            type="radio"
            id="4-stars"
            name="rating"
            value="4"
            onChange={starHandler}
          />
          <label htmlFor="4-stars" className="star">
            &#9733;
          </label>
          <input
            type="radio"
            id="3-stars"
            name="rating"
            value="3"
            onChange={starHandler}
          />
          <label htmlFor="3-stars" className="star">
            &#9733;
          </label>
          <input
            type="radio"
            id="2-stars"
            name="rating"
            value="2"
            onChange={starHandler}
          />
          <label htmlFor="2-stars" className="star">
            &#9733;
          </label>
          <input
            type="radio"
            id="1-star"
            name="rating"
            value="1"
            onChange={starHandler}
          />
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
        <form encType="multipart/form-data" target="_blank">
          <input type="file" name="file" onChange={fileChangedHandler}></input>
          <div className="selectedImg-Container">
            {files[0] !== undefined &&
              files.map((img) => (
                <div>
                  <img className="selectedImg" src={img} alt={img} />
                  <span onClick={() => removeImage(img)}>x</span>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateReview;
