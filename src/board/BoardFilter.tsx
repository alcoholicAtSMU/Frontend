import React, { useState } from "react";
import "./boardFilter.css";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import axios from "axios";
import useGetAlcoholList from "./useGetAlcoholList";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

interface filterState {
  filterObj: {
    alcoholLevel: Array<number>;
    alcoholType: Array<string>;
    price: Array<number>;
  };
  setFilterObj: React.Dispatch<
    React.SetStateAction<{
      alcoholLevel: Array<number>;
      alcoholType: Array<string>;
      price: Array<number>;
    }>
  >;
}

const BoardFilter = ({ filterObj, setFilterObj }: filterState) => {
  const [selectedButton, setSelectedButton] = useState<String | null>(null);

  const onTypeButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const ButtonList = document.querySelectorAll(".alcoholType-button");

    // 클릭 된 버튼이 색칠 된 버튼이면 active 해제 후 state null로 변경
    if (selectedButton == button.value) {
      button.classList.remove("menu-active");
      setSelectedButton(null);
    }
    // active되어있는 버튼을 탐색하여 active 해제 후 클릭된 버튼에 active 할당 후 state 변경
    else {
      for (let i = 0; i < 5; i++) {
        if (ButtonList[i].classList.contains("menu-active"))
          ButtonList[i].classList.remove("menu-active");
      }
      button.classList.add("menu-active");
      setSelectedButton(button.value);
    }
    setFilterObj({
      alcoholLevel: filterObj.alcoholLevel,
      alcoholType: [button.value],
      price: filterObj.price,
    });
  };
  console.log(filterObj);
  const { GetAlcoholList } = useGetAlcoholList(filterObj);
  return (
    <div className="filter-container">
      <div className="filter-alcoholLevel">
        <div className="filter-header">도수</div>
        <Range
          className="range-slider"
          pushable={true}
          min={0}
          max={30}
          marks={{ 0: "0%", 10: "10%", 20: "20%", 30: "30%~" }}
          step={10}
          onChange={(value) => {
            setFilterObj({
              alcoholLevel: value,
              alcoholType: filterObj.alcoholType,
              price: filterObj.price,
            });
            console.log(filterObj);
            // GetAlcoholList(filterObj);
          }}
        />
      </div>

      <div className="filter-alcoholType">
        <div className="filter-header">주종</div>
        <div className="alcoholType-Selector">
          <button
            className="alcoholType-button menu-active"
            value="전체"
            onClick={onTypeButtonClick}
          >
            전체
          </button>
          <button
            className="alcoholType-button"
            value="탁주"
            onClick={onTypeButtonClick}
          >
            탁주
          </button>
          <button
            className="alcoholType-button"
            value="약·청주"
            onClick={onTypeButtonClick}
          >
            약·청주
          </button>
          <button
            className="alcoholType-button"
            value="과실주"
            onClick={onTypeButtonClick}
          >
            과실주
          </button>
          <button
            className="alcoholType-button"
            value="증류주"
            onClick={onTypeButtonClick}
          >
            증류주
          </button>
        </div>
      </div>

      <div className="filter-price">
        <div className="filter-header">가격</div>
        <Range
          className="range-slider"
          pushable={true}
          min={0}
          max={100000}
          marks={{
            0: "0원",
            20000: "20000원",
            50000: "50000원",
            100000: "100000원~",
          }}
          step={50000}
          onChange={(value) => {
            setFilterObj({
              alcoholLevel: filterObj.alcoholLevel,
              alcoholType: filterObj.alcoholType,
              price: value,
            });
            console.log(filterObj);
            // GetAlcoholList(filterObj);
          }}
        />
      </div>
      <button onClick={() => GetAlcoholList()}>찾기</button>
    </div>
  );
};
export default BoardFilter;
