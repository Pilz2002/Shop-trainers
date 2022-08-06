import classNames from "classnames/bind";
import styles from "./SliderItem.module.scss";
import { Product } from "@/Pages/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/bundle";

const cx = classNames.bind(styles);

function SliderItem({ imgList }) {
  return (
    <div className={cx("wrapper")}>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        autoplay
        navigation={false}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {imgList.map((item, index) => {
          return (
            <SwiperSlide key={item._id}>
              <Product
                url={item.thumbnail}
                name={item.name}
                price={item.price}
                discount={item.discount}
                productId={item._id}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SliderItem;
