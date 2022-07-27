import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectValue } from "../Menu/MenuSlice";
import { SliderItem } from "./components";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://shop-trainers-api.herokuapp.com/api/product").then((response) => {
      axios.get("https://shop-trainers-api.herokuapp.com/api/men").then(res => {
        
        setData(() => {
          return []
        })
      })
    })
  }, [])

  const value = useSelector(selectValue);
  return (
    <div className={cx("wrapper")}>
      {data.length !== 0 && <SliderItem imgList={data[value]} />}
    </div>
  );
}

export default Slider;
