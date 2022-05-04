import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createCollection.css";
import "./searchResult.css";
import "./searchModal.css";

import * as type from "../Redux/Types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { setTotalPost } from "../Redux/Actions/changeTotalPostAction";
import { setKeyword } from "../Redux/Actions/changeKeywordAction";
import { RootState } from "../Redux/Reducers/rootReducer";

interface searchResultProps {
  id: number;
  name: string;
  image: string;
}

const CreateCollection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [KEAWORD, setKEAWORD] = useState<String>("");
  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");

  const [collectionList, setCollectionList] = useState<
    Array<searchResultProps>
  >([
    {
      id: 0,
      name: "0",
      image: "0",
    },
  ]);

  const [collectionIdList, setCollectionIdList] = useState<Array<number>>([]);

  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKEAWORD(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    console.log(description);
  };

  //useCallback을 통해 리덕스 스토어에서 사용할 함수 불러오기
  const setBoardlist = useCallback(
    (boardItemList: type.boardItem[]) => dispatch(setBoardList(boardItemList)),
    [dispatch]
  );
  const setTotalpost = useCallback(
    (TotalPosts: number) => dispatch(setTotalPost(TotalPosts)),
    [dispatch]
  );
  const setKeyWord = useCallback(
    (keyword: String) => dispatch(setKeyword(keyword)),
    [dispatch]
  );

  //useSelector를 통해 boardList에 리덕스 스토어에 저장된 값 불러오기
  const boardList = useSelector(
    (state: RootState) => state.handleBoardList.boardlist,
    shallowEqual
  );
  const currentPosts = boardList;

  const totalPosts = useSelector(
    (state: RootState) => state.handleTotalPosts.totalposts
  );

  const keyword = useSelector(
    (state: RootState) => state.handleKeyword.keyword
  );

  useEffect(() => {
    //검색 기록이 있을 수 있으므로 초기화
    setKeyWord("");
    setBoardlist([]);
    setTotalpost(0);
  }, []);

  const onSearchButtonClick = () => {
    axios({
      method: "GET",
      url: `/board/search?name=${KEAWORD}`,
    })
      .then((res) => {
        console.log(res);
        setBoardlist(res.data.content);
        setTotalpost(res.data.totalElements);
        setKeyWord(KEAWORD);
      })
      .catch((err) => {
        console.log("검색 에러", err);
        window.alert("검색에 실패했습니다.");
      });
  };

  //컬렉션 생성 중 취소 버튼을  클릭하는 경우
  const onUndoClick = () => {
    if (
      window.confirm(
        "취소를 선택하시면 컬렉션 목록이 사라집니다.\n 컬렉션 만들기를 취소하시겠습니까?"
      )
    )
      navigate(`/mypage`);
  };

  //검색 결과 중 컬렉션에 넣은 card 선택 후 event
  const onCardClick = (
    clickedId: number,
    clickedImage: string,
    clickedName: string
  ) => {
    return (event: React.MouseEvent) => {
      if (collectionList[0].name === "0") {
        setCollectionList([
          { id: clickedId, name: clickedName, image: clickedImage },
        ]);
        setCollectionIdList([clickedId]);
      } else {
        setCollectionList([
          ...collectionList,
          { id: clickedId, name: clickedName, image: clickedImage },
        ]);
        setCollectionIdList([...collectionIdList, clickedId]);
      }
      event.preventDefault();
    };
  };

  const onDeleteButtonClicked = (obj: searchResultProps) => {
    return (event: React.MouseEvent) => {
      const newObj = collectionList?.filter((d) => d.id !== obj.id);
      setCollectionList(newObj);
      event.preventDefault();
    };
  };

  const onSubmitClick = () => {
    console.log(title);
    console.log(description);
    console.log(collectionList);
    console.log(collectionIdList);

    if (title == "") alert("제목을 입력해주세요");
    // else if (collectionList.length < 3) alert("최소 3개의 술을 선택해주세요");
    else {
      let collectionId: number;
      //컬렉션 자체 post
      axios({
        method: "POST",
        url: `/collectioninfo`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          title: title,
          description: description,
        },
      })
        .then((res) => {
          console.log(res);
          collectionId = res.data;
          //컬렉션 내용물 post
          axios({
            method: "POST",
            url: `/collectioncontent`,
            data: {
              collectionId: collectionId,
              collectionIdList: collectionIdList,
            },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log("컬렉션 내용 에러", err);
              window.alert("컬렉션 내용 생성에 실패했습니다.");
            });
        })
        .catch((err) => {
          console.log("컬렉션 생성 에러", err);
          window.alert("컬렉션 생성에 실패했습니다.");
        });
    }
  };
  return (
    <div className="CreateCollection-Container">
      <button className="Create-Undo-Button" onClick={onUndoClick}>
        취소
      </button>

      <div className="CreateCollection-Top-Container">
        {searchModal && (
          <div className="CreateCollection-Search-Top-Container">
            <p className="CreateCollection-Search">
              <button
                className="Close-SearchModal-Button"
                onClick={() => {
                  setSearchModal(!searchModal);
                  setKeyWord("");
                  setBoardlist([]);
                  setTotalpost(0);
                }}
              >
                x
              </button>
              <div className="SearchModal-input-container">
                <input
                  className="SearchModal-inputAlcohol"
                  placeholder="검색어를 입력하세요"
                  onChange={handleSearchKeywordChange}
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
            <div className="SearchModal-Result-container">
              {totalPosts == 0 ? (
                <p className="SearchModal-BoardSearch-header">
                  검색 결과가 없습니다.
                </p>
              ) : (
                <>
                  <p className="SearchModal-BoardSearch-header">
                    {totalPosts}개의 {keyword} 검색 결과가 있습니다.
                  </p>
                  <div className="SearchModal-BoardSearch-Container">
                    {currentPosts.map((value, i: number) => (
                      <div
                        className="SearchModal-card-Container"
                        onClick={onCardClick(value.id, value.image, value.name)}
                      >
                        <div className="SearchModal-card-imgContainer">
                          <img
                            className="SearchModal-alcohol-image"
                            src={value.image}
                          ></img>
                        </div>
                        <div className="SearchModal-alcohol-name">
                          {value.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <p className="CreateCollection-Top-Header">컬렉션 추가하기</p>
        <div className="CreateCollection-input">
          <p>
            제목 :{" "}
            <input
              className="CreateCollection-inputTitle"
              placeholder="컬렉션 제목을 입력해주세요"
              onChange={handleTitleChange}
            />
          </p>
          <p>
            설명 :{" "}
            <input
              className="CreateCollection-inputDescription"
              placeholder="컬렉션 설명을 입력해주세요"
              onChange={handleDescriptionChange}
            />
          </p>
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
        {collectionList[0].name !== "0" &&
          collectionList.map((value, i: number) => (
            <div className="selected-card-Container">
              <button
                className="selected-delete-image"
                onClick={onDeleteButtonClicked(value)}
              >
                x
              </button>
              <div className="selected-card-imgContainer">
                <img className="selected-alcohol-image" src={value.image}></img>
              </div>
              <div className="selected-alcohol-name">{value.name}</div>
            </div>
          ))}
      </div>
      <button className="add-Collection-Button" onClick={onSubmitClick}>
        완료
      </button>
    </div>
  );
};

export default CreateCollection;
