import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./myCollection.css";
import { valueTernary } from "react-select/dist/declarations/src/utils";

interface collectionProps {
  id: number;
  title: string;
  description: string;
}

interface collectionContent {
  alcoholId: number;
  image: string;
  name: string;
}

const MyCollection = () => {
  const navigate = useNavigate();

  const [collectionInfoList, setCollectionInfoList] = useState<
    Array<collectionProps>
  >([]);

  const [collectionContentInfo, setCollectionContentInfo] =
    useState<collectionProps>();
  const [collectionContentList, setCollectionContentList] = useState<
    Array<collectionContent>
  >([]);

  const ContentList: Array<collectionContent> = [];

  const [detailModal, setDetailModal] = useState<boolean>(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/collectioninfo/user`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        setCollectionInfoList(res.data);
      })
      .catch((err) => {
        console.log("내 컬렉션 리스트 가져오기 에러", err);
      });
  }, []);

  const onCardClick = (id: number) => {
    return (e: React.MouseEvent) => {
      axios({
        method: "GET",
        url: `/collectioncontent/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          setDetailModal(true);
          setCollectionContentInfo(res.data[0].collection);

          for (let i = 0; i < res.data.length; i++) {
            if (i == 0) {
              setCollectionContentList([
                {
                  alcoholId: res.data[i].alcohol.id,
                  name: res.data[i].alcohol.name,
                  image: res.data[i].alcohol.image,
                },
              ]);
            } else {
              setCollectionContentList([
                ...collectionContentList,
                {
                  alcoholId: res.data[i].alcohol.id,
                  name: res.data[i].alcohol.name,
                  image: res.data[i].alcohol.image,
                },
              ]);
            }
          }
        })
        .catch((err) => {
          console.log("내 컬렉션 리스트 상세 페이지 가져오기 에러", err);
        });
    };
  };

  const clearLists = () => {
    setDetailModal(false);
    setCollectionContentList([]);
    setCollectionContentInfo(undefined);
  };

  const onDeleteButtonClick = (id: number) => {
    return (e: React.MouseEvent) => {
      if (
        window.confirm(
          "삭제 시 컬렉션을 복구할 수 없습니다.정말로 컬렉션을 삭제하시겠습니까?"
        )
      ) {
        axios({
          method: "DELETE",
          url: `/collectioncontent/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            console.log(res);
            alert("컬렉션 삭제 완료");
            window.location.replace("/mypage");
          })
          .catch((err) => {
            console.log("컬렉션 삭제 에러", err);
          });
      }
    };
  };

  return (
    <div className="MyCollection-Top-Container">
      <button
        className="add-Collection-Button"
        onClick={() => {
          navigate(`/createCollection`);
        }}
      >
        +
      </button>
      {detailModal ? (
        <div className="detailModal-top-container">
          <button onClick={clearLists}>전체목록보기</button>
          <div className="detailModal-container">
            <div className="detailModal-header">
              <p className="detailModal-title">
                {collectionContentInfo?.title}
              </p>
              <p className="detailModal-content">
                {collectionContentInfo?.description}
              </p>
            </div>

            <div className="collectionContent-conatiner">
              {collectionContentList?.map((value) => (
                <div className="detailModal-cardContainer">
                  <img src={value.image}></img>
                  <p className="detailModal-name">{value.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : collectionInfoList.length == 0 ? (
        <p className="no-collection">컬렉션이 없습니다.</p>
      ) : (
        <div className="MyCollection-List-Container">
          {collectionInfoList.map((value) => (
            <div
              className="MyCollection-List-cardContainer"
              onClick={onCardClick(value.id)}
            >
              <button onClick={onDeleteButtonClick(value.id)}>x</button>
              <p className="MyCollection-title">{value.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollection;
