import React, { useState, useEffect } from "react";
import axios from "axios";
import Slick from "./MyLikedSlick";
import "./myLiked.css";

interface BoardLikedState {
  id: number;
  image: string;
  name: string;
}

const MyLiked = () => {
  const [likedList, setLikedList] = useState<Array<BoardLikedState>>([
    { id: 0, image: "none", name: "none" },
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
  return (
    <div className="MyLiked-Top-Container">
      <div className="MyLiked-Container">
        <Slick>
          {likedList.map((item, index) => (
            <div className="MyLiked-SliderItem" key={index}>
              {console.log(item)}
              <img src={item.image} alt={item.name} />
            </div>
          ))}
        </Slick>
      </div>
    </div>
  );
};

export default MyLiked;
