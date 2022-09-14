import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./api/createBar.css";

interface FileInfo {
  fileObj: File | null;
  fileUrl: string;
}
const CreateBar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const areaList = [
    "서울",
    "경기",
    "충청남도/세종",
    "충청북도",
    "전라남도",
    "전라북도",
    "경상남도",
    "경상북도",
    "강원",
    "제주",
    "인천광역시",
    "부산광역시",
    "울산광역시",
    "광주광역시",
    "대구광역시",
    "대전광역시",
  ];
  const [selectedLocation, setSelectedLocation] = useState("서울");
  const [locationDetail, setLocationDetail] = useState("");

  //이미지 미리보기 용 file 배열
  const [files, setFiles] = useState<string[]>([]);
  //서버 전달 용 file 배열
  const [fileObj, setFileObj] = useState<File[]>([]);
  //미리보기로 보여준 이미지 삭제 용 file 배열
  const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);

  const onLocationDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationDetail(e.target.value);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target);
    setSelectedLocation(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    fileObj.forEach((file) => {
      formData.append("fileList", file);
    });

    formData.append(
      "barSaveDto",
      new Blob(
        [
          JSON.stringify({
            title: title,
            content: text,
            location: selectedLocation,
            location_detail: locationDetail,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    if (title == "") alert("제목을 입력해주세요");
    else if (text == "") alert("내용을 입력해주세요");
    else if (fileObj.length == 0) alert("사진을 1개 이상 선택해주세요");
    else {
      for (let values of formData.values()) {
        console.log(values); // 이미지 객체의 정보
      }
      axios
        .post(`/bar`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res);

          onBarPostComplete(res.data.bar_id);
        })
        .catch((err) => {
          console.log("주점 post 에러", err);
        });
    }
  };
  const onBarPostComplete = (barId: number) => {
    navigate(`/bar/${barId}`);
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (files.length == 10) alert("이미지는 최대 10개까지 선택할 수 있습니다.");
    else {
      const newFiles = e.currentTarget.files;
      newFiles &&
        Array.from(newFiles).forEach((file) => {
          setFileObj([...fileObj, file]);

          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
              setFiles([...files, fileReader.result]);
              setFileInfo([
                ...fileInfo,
                { fileObj: file, fileUrl: fileReader.result },
              ]);
            }
          };
        });
    }
  };
  const removeImage = (obj: FileInfo) => {
    const removedImageList1 = files?.filter((d) => d !== obj.fileUrl);
    setFiles(removedImageList1);

    const removedImageList2 = fileObj?.filter((d) => d !== obj.fileObj);
    setFileObj(removedImageList2);

    const removedImageList3 = fileInfo?.filter(
      (d) => d.fileObj !== obj.fileObj
    );
    setFileInfo(removedImageList3);
  };

  return (
    <div className="CreateBar-top-container">
      <div className="CreateBar-header">
        <p>주점 리뷰 작성</p>
      </div>

      <div className="CreateBar-LocationFrom">
        <p className="CreateBar-location">지역</p>
        <select
          value={selectedLocation}
          onChange={onSelectChange}
          name="지역"
          className="CreateBar-selectArea"
        >
          {areaList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <p className="CreateBar-locationDetail">세부 지역</p>
        <input
          onChange={onLocationDetailChange}
          className="CreateBar-locationDetail-input"
          maxLength={100}
          placeholder="ex.서대문구 홍은동"
        ></input>
      </div>

      <div className="CreateBar-ContentForm-Container">
        <div className="CreateBar-title-container">
          <p className="CreateBar-title">제목</p>
          <input
            onChange={onTitleChange}
            className="CreateBar-title-input"
            maxLength={100}
          ></input>
        </div>

        <p className="CreateBar-content">내용</p>
        <form onSubmit={onSubmit} action="/bar" method="post">
          <textarea
            onChange={onTextChange}
            className="CreateBar-content-textarea"
            maxLength={500}
          ></textarea>
          <button type="submit" className="CreateBar-submit-button">
            완료
          </button>
        </form>

        <form encType="multipart/form-data" target="_blank">
          <input type="file" name="file" onChange={fileChangedHandler}></input>
          <div className="CreateBar-selectedImg-Container">
            {fileInfo[0] !== undefined &&
              fileInfo.map((obj) => (
                <div className="form-container">
                  <img
                    className="CreateBar-selectedImg"
                    src={obj.fileUrl}
                    alt={obj.fileUrl}
                  />
                  <button
                    className="delete-img-button"
                    onClick={() => removeImage(obj)}
                  >
                    x
                  </button>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBar;
