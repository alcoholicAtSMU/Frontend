import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./createCollection.css";
import "./searchResult.css";
import "./searchModal.css";
import SearchModal from "./SearchModal";

import * as type from "../Redux/Types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setBoardList } from "../Redux/Actions/changeBoardListAction";
import { setTotalPost } from "../Redux/Actions/changeTotalPostAction";
import { setKeyword } from "../Redux/Actions/changeKeywordAction";
import { RootState } from "../Redux/Reducers/rootReducer";
import { stringify } from "querystring";

interface idJson {
  id: number;
}

interface collectionContent {
  id: number;
  image: string;
  name: string;
}

interface collectionUpdateProps {
  collection_id: number;
  title: string;
  description: string;
  collectionContents: Array<collectionContent>;
}

const UpdateCollection = () => {
  const location = useLocation().state as collectionUpdateProps;
  const navigate = useNavigate();

  let updateValue: collectionUpdateProps = {
    collection_id: 0,
    title: "",
    description: "",
    collectionContents: [{ id: 0, name: "", image: "" }],
  };
  Object.entries(location).map(([key, value]) => {
    updateValue = value;
  });

  const dispatch = useDispatch();

  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(updateValue.title);
  const [description, setDescription] = useState<string>(
    updateValue.description
  );

  const [prevCollectionList, setPrevCollectionList] = useState<
    Array<collectionContent>
  >(updateValue.collectionContents);

  const [collectionList, setCollectionList] = useState<
    Array<collectionContent>
  >([]);

  const [collectionIdList, setCollectionIdList] = useState<Array<number>>([]);

  console.log(prevCollectionList);
  console.log(collectionIdList);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
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

  useEffect(() => {
    // navigation bar에서 검색 기록이 있을 수 있으므로 초기화
    setKeyWord("");
    setBoardlist([]);
    setTotalpost(0);
  }, []);

  //컬렉션 생성 중 취소 버튼을  클릭하는 경우
  const onUndoClick = () => {
    if (
      window.confirm(
        "취소하시면 컬렉션 목록이 사라집니다.\n 컬렉션 만들기를 취소하시겠습니까?"
      )
    )
      navigate(`/mypage`);
  };

  //목록에서 x를 누른 술 삭제
  const onDeleteButtonClicked = (obj: collectionContent) => {
    return (event: React.MouseEvent) => {
      axios({
        method: "DELETE",
        url: `/collectioncontent/${updateValue.collection_id}?alcohol_id=${obj.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        // data: {
        //   alcohol_id: obj.id.toString(),
        // },
      });

      const newprevCollectionList = prevCollectionList?.filter(
        (d) => d.id !== obj.id
      );
      setPrevCollectionList(newprevCollectionList);

      const newCollectionList = collectionList?.filter((d) => d.id !== obj.id);
      setCollectionList(newCollectionList);

      const newCollectionIdList = collectionIdList?.filter((d) => d !== obj.id);
      setCollectionIdList(newCollectionIdList);

      event.preventDefault();
    };
  };

  const ObjIdArr: Array<idJson> = [];
  const onSubmitClick = () => {
    console.log("제목 : " + title + "  내용 : " + description);

    for (let i = 0; i < collectionIdList.length; i++) {
      ObjIdArr.push({ id: collectionIdList[i] });
    }
    console.log(ObjIdArr);

    if (title == "") alert("제목을 입력해주세요");
    else if (prevCollectionList.length < 1)
      alert("최소 1개의 술을 선택해주세요");
    else {
      //컬렉션 자체 put
      axios({
        method: "PUT",
        url: `/collectioninfo/${updateValue.collection_id}`,
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
          //컬렉션 내용물 POST
          axios({
            method: "POST",
            url: `/collectioncontent/${updateValue.collection_id}`,
            data: {
              alcoholList: ObjIdArr,
            },
          })
            .then((res) => {
              console.log(res);
              window.alert("컬렉션 수정 완료:)");
              navigate(`/mypage`);
            })
            .catch((err) => {
              console.log("컬렉션 내용 수정 에러", err);
              window.alert("컬렉션 내용 수정에 실패했습니다.");
            });
        })
        .catch((err) => {
          console.log("컬렉션 수정 에러", err);
          window.alert("컬렉션 수정에 실패했습니다.");
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
          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
            collectionList={collectionList}
            setCollectionList={setCollectionList}
            collectionIdList={collectionIdList}
            setCollectionIdList={setCollectionIdList}
            prevCollectionList={prevCollectionList}
            setPrevCollectionList={setPrevCollectionList}
          />
        )}
        <p className="CreateCollection-Top-Header">컬렉션 추가하기</p>
        <div className="CreateCollection-input">
          <p>
            제목{"  "}
            <input
              className="CreateCollection-inputTitle"
              onChange={handleTitleChange}
              defaultValue={title}
            ></input>
          </p>
          <p>
            설명{"  "}
            <input
              className="CreateCollection-inputDescription"
              onChange={handleDescriptionChange}
              defaultValue={description}
            ></input>
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
        {[...prevCollectionList, ...collectionList].map((value, i: number) => (
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

export default UpdateCollection;
