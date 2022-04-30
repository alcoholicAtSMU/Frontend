import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createCollection.css";

const CreateCollection = () => {
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [KEAWORD, setKEAWORD] = useState<String>("");
  const [title, setTitle] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKEAWORD(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // console.log(title);
  };
  const onSearchButtonClick = () => {
    // axios({
    //   method: "GET",
    //   url: `/board/search?name=${KEAWORD}`,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     setCurrentpage(1);
    //     setBoardlist(res.data.content);
    //     setTotalpost(res.data.totalElements);
    //     setKeyWord(KEAWORD);
    //     navigate("/boardsearch");
    //   })
    //   .catch((err) => {
    //     console.log("검색 에러", err);
    //     window.alert("검색에 실패했습니다.");
    //   });
  };

  return (
    <div className="CreateCollection-Container">
      <button className="Create-Undo-Button">취소</button>

      <div className="CreateCollection-Top-Container">
        {searchModal && (
          <div className="CreateCollection-Search-Top-Container">
            <p className="CreateCollection-Search">
              <button
                className="Close-SearchModal-Button"
                onClick={() => {
                  setSearchModal(!searchModal);
                }}
              >
                x
              </button>
              <div className="SearchModal-input-container">
                <input
                  className="SearchModal-inputAlcohol"
                  placeholder="검색어를 입력하세요"
                  onChange={handleChange}
                />
                <button
                  className="SearchModal-search-button"
                  type="button"
                  onClick={onSearchButtonClick}
                >
                  검색
                </button>
              </div>
            </p>
            <div className="SearchModal-Result-container"></div>
          </div>
        )}
        <p className="CreateCollection-Top-Header">컬렉션 추가하기</p>
        <div className="CreateCollection-title">
          <span>제목 : </span>
          <input
            className="CreateCollection-inputTitle"
            placeholder="컬렉션 제목을 입력해주세요"
            onChange={handleTitleChange}
          />
        </div>
        <input
          className="CreateCollection-moveToSearchModal"
          placeholder="검색하여 우리술 추가"
          onClick={() => {
            setSearchModal(!searchModal);
          }}
        ></input>
      </div>
      <div className="CreateCollection-Bottom-Container">
        선택한 주류 보여주는 부분
      </div>
      <button className="add-Collection-Button" onClick={() => {}}>
        완료
      </button>
    </div>
  );
};

export default CreateCollection;
