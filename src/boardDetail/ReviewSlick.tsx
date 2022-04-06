import { useMemo } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./reviewSlick.css";

interface sliderProps {
  children: React.ReactNode /** 슬라이더 아이템 요소 */;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  speed?: number /** 슬라이더 속도 */;
  loop?: boolean /** 반복 여부 */;
  className?: string;
  lazyLoad?: boolean;
}

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
interface PreArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function NextArrow({ onClick }: NextArrowProps) {
  return (
    <div className="next-arrow" onClick={onClick}>
      &gt;
    </div>
  );
}

function PreArrow({ onClick }: PreArrowProps) {
  return (
    <div className="pre-arrow" onClick={onClick}>
      &lt;
    </div>
  );
}

function ReviewSlick({
  children,
  autoplay = true,
  speed = 500,
  loop = true,
  lazyLoad = true,
}: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PreArrow />,
    }),
    [autoplay, loop, speed, lazyLoad]
  );
  return (
    <div className="Review-Slider-Container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default ReviewSlick;
