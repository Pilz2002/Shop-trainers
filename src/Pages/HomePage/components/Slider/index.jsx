import classNames from "classnames/bind";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { slide1, slide2, slide3 } from "./assets/images/Slider";

import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider() {
  const data = [slide1, slide2, slide3];
  return (
    <div className={cx("wrapper")}>
      <Swiper
        spaceBetween={30}
        loop
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect={"fade"}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
