import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://shop-trainers-api.herokuapp.com/api/banner").then((response) => {
      setData(response.data);
    });
  }, []);
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
              <img src={item.url} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
