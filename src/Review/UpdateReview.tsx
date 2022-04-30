import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createReview.css";
import axios from "axios";
import * as type from "./ReviewCardContainer";

interface FileInfo {
  fileObj: File | null;
  fileUrl: string;
}

const UpdateReview = () => {
  const location = useLocation().state as type.reviewUpdateProps;
  const navigate = useNavigate();

  let updateValue: type.reviewUpdateProps = {
    alcohol_id: 0,
    content: "",
    id: 0,
    image: [],
    star: 5,
    taste_1: "보통",
    taste_2: "보통",
    taste_3: "보통",
    taste_4: "보통",
    taste_5: "보통",
    tastes: {
      taste_1: "단맛",
      taste_2: "산미",
      taste_3: "담백",
      taste_4: "바디감",
      taste_5: "탄산",
    },
  };
  Object.entries(location).map(([key, value]) => {
    updateValue = value;
  });

  const selectList = ["없음", "약함", "보통", "강함"];
  const [Selected1, setSelected1] = useState(updateValue.taste_1);
  const [Selected2, setSelected2] = useState(updateValue.taste_2);
  const [Selected3, setSelected3] = useState(updateValue.taste_3);
  const [Selected4, setSelected4] = useState(updateValue.taste_4);
  const [Selected5, setSelected5] = useState(updateValue.taste_5);
  const [text, setText] = useState(updateValue.content);
  const [star, setStar] = useState(0);

  // 생성할 때 추가한 이미지 배열
  const [stringFiles, setStringFiles] = useState<string[]>(updateValue.image);
  // 삭제한 기존 이미지 배열
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);
  //이미지 미리보기 용 file 배열
  const [newFile, setNewFile] = useState<string[]>([]);
  //서버 전달 용 file 배열
  const [fileObj, setFileObj] = useState<File[]>([]);
  //미리보기로 보여준 이미지 삭제 용 file 배열
  const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newFile.length + stringFiles.length == 3)
      alert("이미지는 최대 3개까지 선택할 수 있습니다.");
    else {
      const newFiles = e.currentTarget.files;
      newFiles &&
        Array.from(newFiles).forEach((file) => {
          setFileObj([...fileObj, file]);

          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
              setNewFile([...newFile, fileReader.result]);
              setFileInfo([
                ...fileInfo,
                { fileObj: file, fileUrl: fileReader.result },
              ]);
            }
          };
        });
    }
    console.log(removedFiles);
  };

  const removeImage = (obj: FileInfo | string) => {
    if (typeof obj == "string") {
      const removeStringFile = stringFiles?.filter((d) => d !== obj);
      setStringFiles(removeStringFile);
      setRemovedFiles([...removedFiles, obj]);
    } else {
      const removedImageList1 = newFile?.filter((d) => d !== obj.fileUrl);
      setNewFile(removedImageList1);

      const removedImageList2 = fileObj?.filter((d) => d !== obj.fileObj);
      setFileObj(removedImageList2);

      const removedImageList3 = fileInfo?.filter(
        (d) => d.fileObj !== obj.fileObj
      );
      setFileInfo(removedImageList3);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    fileObj.forEach((file) => {
      formData.append("fileList", file);
    });

    formData.append(
      "requestDto",
      new Blob(
        [
          JSON.stringify({
            alcohol: {
              id: updateValue.id,
            },
            content: text,
            star: star,
            taste1: Selected1,
            taste2: Selected2,
            taste3: Selected3,
            taste4: Selected4,
            taste5: Selected5,
            imageList: removedFiles,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    if (text === "") alert("리뷰 내용을 작성해주세요");
    else if (star === 0) alert("별점을 선택해주세요");
    else {
      axios
        .put(`/review/${updateValue.id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          navigate(`/mypage`);
        })
        .catch((err) => {
          console.log("리뷰 수정 에러", err);
        });
    }
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target);
    if (e.target.name == updateValue.tastes.taste_1)
      setSelected1(e.target.value);
    else if (e.target.name == updateValue.tastes.taste_2)
      setSelected2(e.target.value);
    else if (e.target.name == updateValue.tastes.taste_3)
      setSelected3(e.target.value);
    else if (e.target.name == updateValue.tastes.taste_4)
      setSelected4(e.target.value);
    else if (e.target.name == updateValue.tastes.taste_5)
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
          <p>{updateValue.tastes.taste_1}</p>
          <select
            value={Selected1}
            onChange={onSelectChange}
            name={updateValue.tastes.taste_1}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{updateValue.tastes.taste_2}</p>
          <select
            value={Selected2}
            onChange={onSelectChange}
            name={updateValue.tastes.taste_2}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{updateValue.tastes.taste_3}</p>
          <select
            value={Selected3}
            onChange={onSelectChange}
            name={updateValue.tastes.taste_3}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{updateValue.tastes.taste_4}</p>
          <select
            value={Selected4}
            onChange={onSelectChange}
            name={updateValue.tastes.taste_4}
            className="CreateReview-selectTaste"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{updateValue.tastes.taste_5}</p>
          <select
            value={Selected5}
            onChange={onSelectChange}
            name={updateValue.tastes.taste_5}
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
          >
            {text}
          </textarea>
          <button type="submit" className="ContentForm-submit-button">
            수정완료
          </button>
        </form>
        <form encType="multipart/form-data" target="_blank">
          <input type="file" name="file" onChange={fileChangedHandler}></input>
          <div className="selectedImg-Container">
            {stringFiles[0] !== undefined &&
              stringFiles.map((obj) => (
                <div>
                  <img className="selectedImg" src={obj} alt={obj} />
                  <span onClick={() => removeImage(obj)}>x</span>
                </div>
              ))}
            {fileInfo[0] !== undefined &&
              fileInfo.map((obj) => (
                <div>
                  <img
                    className="selectedImg"
                    src={obj.fileUrl}
                    alt={obj.fileUrl}
                  />
                  <span onClick={() => removeImage(obj)}>x</span>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateReview;
