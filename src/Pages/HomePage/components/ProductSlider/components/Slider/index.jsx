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
  const value = useSelector(selectValue);
  useEffect(() => {
    if(value === 0) {
      axios.get("http://localhost:5000/product/new").then((response) => {
        setData(response.data)
      })
    }
    else if(value === 1) {
      axios.get("http://localhost:5000/product/best_sell").then((response) => {
        setData(response.data)
      })
    }
    else {
      axios.get("http://localhost:5000/product/popular").then((response) => {
        console.log(response.data)
        setData(response.data)
      })
    }
  }, [value])

  return (
    <div className={cx("wrapper")}>
      <SliderItem imgList={data} />
    </div>
  );
}

export default Slider;
