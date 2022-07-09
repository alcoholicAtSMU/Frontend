import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./updateBar.css";

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

interface FileInfo {
  fileObj: File | null;
  fileUrl: string;
}
const UpdateBar = () => {
  const location = useLocation().state as myBarProps;
  const navigate = useNavigate();

  let updateValue: myBarProps = {
    id: 0,
    location: "",
    location_detail: "",
    modified_date: "",
    nickname: "",
    title: "",
    content: "",
    image: [],
  };
  Object.entries(location).map(([key, value]) => {
    updateValue = value;
    console.log(updateValue);
  });

  const [text, setText] = useState(updateValue.content);
  const [title, setTitle] = useState(updateValue.title);

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
  const [selectedLocation, setSelectedLocation] = useState(
    updateValue.location
  );
  const [locationDetail, setLocationDetail] = useState(
    updateValue.location_detail
  );

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
    setSelectedLocation(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    fileObj.forEach((file) => {
      formData.append("fileList", file);
    });

    formData.append(
      "barUpdateDto",
      new Blob(
        [
          JSON.stringify({
            title: title,
            content: text,
            location: selectedLocation,
            locationDetail: locationDetail,
            deleteImgList: removedFiles,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    if (title == "") alert("제목을 입력해주세요");
    else if (text == "") alert("내용을 입력해주세요");
    else if (newFile.length + stringFiles.length == 0)
      alert("사진을 1개 이상 선택해주세요");
    else {
      for (let values of formData.values()) {
        console.log(values); // 이미지 객체의 정보
      }
      axios
        .put(`/bar/${updateValue.id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res);
          onBarPostComplete(updateValue.id);
        })
        .catch((err) => {
          console.log("주점 수정 에러", err);
        });
    }
  };
  const onBarPostComplete = (barId: number) => {
    navigate(`/bar/${barId}`);
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newFile.length + stringFiles.length == 10)
      alert("이미지는 최대 10개까지 선택할 수 있습니다.");
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
          defaultValue={updateValue.location_detail}
        ></input>
      </div>

      <div className="CreateBar-ContentForm-Container">
        <div className="CreateBar-title-container">
          <p className="CreateBar-title">제목</p>
          <input
            onChange={onTitleChange}
            className="CreateBar-title-input"
            maxLength={100}
            defaultValue={updateValue.title}
          ></input>
        </div>

        <p className="CreateBar-content">내용</p>
        <form onSubmit={onSubmit} action="/bar" method="post">
          <textarea
            onChange={onTextChange}
            className="CreateBar-content-textarea"
            maxLength={500}
          >
            {updateValue.content}
          </textarea>
          <button type="submit" className="CreateBar-submit-button">
            완료
          </button>
        </form>

        <form encType="multipart/form-data" target="_blank">
          <input type="file" name="file" onChange={fileChangedHandler}></input>
          <div className="CreateBar-selectedImg-Container">
            {stringFiles[0] !== undefined &&
              stringFiles.map((obj) => (
                <div>
                  <img className="CreateBar-selectedImg" src={obj} alt={obj} />
                  <button
                    className="delete-img-button"
                    onClick={() => removeImage(obj)}
                  >
                    x
                  </button>{" "}
                </div>
              ))}
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

export default UpdateBar;
