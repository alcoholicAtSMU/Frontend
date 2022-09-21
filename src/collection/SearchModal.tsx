import React, { useState, useCallback } from "react";
import axios from "axios";
import "./searchModal.css";

import * as type from "../Redux/Types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { setTotalPost } from "../Redux/Actions/changeTotalPostAction";
import { setKeyword } from "../Redux/Actions/changeKeywordAction";
import { RootState } from "../Redux/Reducers/rootReducer";

interface collectionContent {
  id: number;
  name: string;
  image: string;
}

interface searchModalProps {
  searchModal: boolean;
  setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  collectionList: collectionContent[];
  setCollectionList: React.Dispatch<React.SetStateAction<collectionContent[]>>;
  collectionIdList: number[];
  setCollectionIdList: React.Dispatch<React.SetStateAction<number[]>>;
  prevCollectionList: collectionContent[] | null;
  setPrevCollectionList: React.Dispatch<
    React.SetStateAction<collectionContent[]>
  > | null;
}

const SearchModal = ({
  searchModal,
  setSearchModal,
  collectionList,
  setCollectionList,
  collectionIdList,
  setCollectionIdList,
  prevCollectionList,
  setPrevCollectionList,
}: searchModalProps) => {
  const dispatch = useDispatch();

  const [KEAWORD, setKEAWORD] = useState<String>("");

  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKEAWORD(e.target.value);
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

  const onSearchButtonClick = () => {
    if (KEAWORD == "") {
      alert("검색어를 입력해주세요.");
    } else {
      axios({
        method: "GET",
        url: `//board/search?name=${KEAWORD}`,
      })
        .then((res) => {
          console.log(res);
          setBoardlist(res.data);
          setTotalpost(res.data.length);
          setKeyWord(KEAWORD);
        })
        .catch((err) => {
          window.alert("검색에 실패했습니다.");
        });
    }
  };

  //검색 결과 중 컬렉션에 넣은 card 선택 후 event
  const onCardClick = (
    clickedId: number,
    clickedImage: string,
    clickedName: string
  ) => {
    return (event: React.MouseEvent) => {
      // prevCollectionList가 null이 아닌 경우(컬렉션 수정)
      if (
        // 선택한 술이 prevCollectionList에 있지 않을 때 collectionList에 새로 추가
        prevCollectionList !== null &&
        !prevCollectionList.some((v) => v.id === clickedId)
      ) {
        console.log(
          prevCollectionList.includes({
            id: clickedId,
            name: clickedName,
            image: clickedImage,
          })
        );
        if (collectionList === null) {
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
      } else {
        if (collectionList === null) {
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
      }
      event.preventDefault();
    };
  };

  // 검색창 닫기 버튼 클릭
  const closeModalButtonClick = () => {
    setSearchModal(!searchModal);
    setKeyWord("");
    setBoardlist([]);
    setTotalpost(0);

    //filter를 사용하여 collectionList의 중복 제거
    const newCollectionList = collectionList.filter((v, i) => {
      return collectionList.map((val) => val.id).indexOf(v.id) == i;
    });
    setCollectionList(newCollectionList);
    //set을 사용하여 collectionIdList 중복 제거
    setCollectionIdList([...new Set(collectionIdList)]);
  };
  console.log(prevCollectionList);
  console.log(collectionList);

  return (
    <div className="CreateCollection-Search-Top-Container">
      <p className="CreateCollection-Search">
        <button
          className="Close-SearchModal-Button"
          onClick={closeModalButtonClick}
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
                  <div className="SearchModal-alcohol-name">{value.name}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
