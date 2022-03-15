import { useMemo } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./reviewSlick.css";

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
  className?: string;
}

function ReviewSlick({
  children,
  autoplay = false,
  speed = 500,
  loop = true,
  className,
}: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      //   dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    [autoplay, loop, speed]
  );
  return (
    <div className="Review-Slider-Container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default ReviewSlick;
