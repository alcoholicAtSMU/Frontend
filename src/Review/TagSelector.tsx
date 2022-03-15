import React, { useMemo, useState, useImperativeHandle } from "react";
import Select from "react-select";
import * as type from "./createReview";

interface tagSelectorProps {
  reviewProps: type.reveiwCreateProps;
  tagRef: React.MutableRefObject<{}>;
  tag: Array<string>;
  setTagState: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagSelector = ({
  reviewProps,
  tagRef,
  tag,
  setTagState,
}: tagSelectorProps) => {
  const customStyles = useMemo(
    () => ({
      //   option: (provided, state) => ({
      //     ...provided,
      //     opacity: 0.8,
      //     padding: 10,
      //   }),
      //   control: (provided) => ({
      //     ...provided,
      //     width: 310,
      //   }),
      //   menuList: (base) => ({
      //     ...base,
      //     maxHeight: "120px",
      //   }),
    }),
    []
  );
  function Change() {
    setTagState([
      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedOption4,
      selectedOption5,
    ]);

    console.log(tag);
  }

  useImperativeHandle(tagRef, () => ({
    // 부모에서 사용하고 싶었던 함수
    Change,
  }));

  const [selectedOption1, setSelectedOption1] = useState<string>("보통");
  const [selectedOption2, setSelectedOption2] = useState<string>("보통");
  const [selectedOption3, setSelectedOption3] = useState<string>("보통");
  const [selectedOption4, setSelectedOption4] = useState<string>("보통");
  const [selectedOption5, setSelectedOption5] = useState<string>("보통");

  const option1 = [
    { value: "없음", label: "없음" },
    { value: "약함", label: "약함" },
    { value: "보통", label: "보통" },
    { value: "강함", label: "강함" },
  ];
  const option2 = [
    { value: "없음", label: "없음" },
    { value: "약함", label: "약함" },
    { value: "보통", label: "보통" },
    { value: "강함", label: "강함" },
  ];
  const option3 = [
    { value: "없음", label: "없음" },
    { value: "약함", label: "약함" },
    { value: "보통", label: "보통" },
    { value: "강함", label: "강함" },
  ];
  const option4 = [
    { value: "없음", label: "없음" },
    { value: "약함", label: "약함" },
    { value: "보통", label: "보통" },
    { value: "강함", label: "강함" },
  ];
  const option5 = [
    { value: "없음", label: "없음" },
    { value: "약함", label: "약함" },
    { value: "보통", label: "보통" },
    { value: "강함", label: "강함" },
  ];
  return (
    <div className="tagSelector-Top-container">
      <div className="tagSelector-container">
        <span>{reviewProps.taste_1}</span>
        <Select
          options={option1}
          styles={customStyles}
          defaultValue={option1[0]}
          //   value={selectedOption1}
          //   onChange={(o) => setSelectedOption1(o.value)}
        />
      </div>
      <div className="tagSelector-container">
        <span>{reviewProps.taste_2}</span>
        <Select options={option2} styles={customStyles} />
      </div>
      <div className="tagSelector-container">
        <span>{reviewProps.taste_3}</span>
        <Select options={option3} styles={customStyles} />
      </div>
      <div className="tagSelector-container">
        <span>{reviewProps.taste_4}</span>
        <Select options={option4} styles={customStyles} />
      </div>
      <div className="tagSelector-container">
        <span>{reviewProps.taste_5}</span>
        <Select options={option5} styles={customStyles} />
      </div>
    </div>
  );
};

export default TagSelector;
