import React, { useState, useEffect } from "react";
import axios from "axios";
import Slick from "./MyLikedSlick";
import "./myLiked.css";
import { Navigate } from "react-router";

interface BoardLikedState {
  id: number;
  image: string;
  name: string | null;
}

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

const MyLiked = () => {
  const [likedList, setLikedList] = useState<Array<BoardLikedState>>([
    { id: 0, image: "none", name: null },
  ]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/myZzim`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        console.log(likedList);

        const LIKEDARRAY: Array<BoardLikedState> = res.data;
        // let newLikedList: Array<BoardLikedState> = [];

        // for (let i = 0; i < LIKEDARRAY.length; i++) {
        //   newLikedList.push({
        //     ...newLikedList,
        //     id: LIKEDARRAY[i].id,
        //     image: LIKEDARRAY[i].image,
        //     name: LIKEDARRAY[i].name,
        //   });
        // }
        setLikedList(LIKEDARRAY);
        console.log("likedList");

        console.log(likedList);
      })
      .catch((err) => {
        console.log("찜리스트 가져오기 에러", err);
      });
  }, []);

  const onClickImage = () => {
    // const id : number = e.arguments
    // axios({
    //   method: "GET",
    //   url: `/board/${id}`,
    // })
    //   .then((res) => {
    //     console.log(res.data.alcoholDetail);
    //     const s: BoardDetailState = {
    //       capacity: res.data.alcoholDetail.capacity,
    //       content: res.data.alcoholDetail.content,
    //       degree: res.data.alcoholDetail.degree,
    //       id: res.data.alcoholDetail.id,
    //       image: res.data.alcoholDetail.image,
    //       manufacturer: res.data.alcoholDetail.manufacturer,
    //       name: res.data.alcoholDetail.name,
    //       price: res.data.alcoholDetail.price,
    //       reviews: res.data.alcoholDetail.reviews,
    //       taste_1: res.data.alcoholDetail.taste_1,
    //       taste_2: res.data.alcoholDetail.taste_2,
    //       taste_3: res.data.alcoholDetail.taste_3,
    //       taste_4: res.data.alcoholDetail.taste_4,
    //       taste_5: res.data.alcoholDetail.taste_5,
    //       type: res.data.alcoholDetail.type,
    //       zzim: res.data.alcoholDetail.zzim,
    //     };
    //     navigate(`/board/${id}`, {
    //       state: { boardDetail: s },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("상세 페이지 가져오기 에러", err);
    //   });
  };
  return (
    <div className="MyLiked-Top-Container">
      {likedList[0].name === null ? (
        <div className="MyLiked-Container">
          <p>찜한 술이 없습니다</p>
        </div>
      ) : (
        <div className="MyLiked-Container">
          <Slick>
            {likedList.map((item) => (
              <div
                className="MyLiked-SliderItem"
                key={item.id}
                onClick={onClickImage}
              >
                <img src={item.image} />
              </div>
            ))}
          </Slick>
        </div>
      )}
    </div>
  );
};

export default MyLiked;
