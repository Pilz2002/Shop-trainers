import classNames from "classnames/bind";
import styles from './ProductDisplay.module.scss'
import { ProductDisplayItem } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles)

function ProductDisplay() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://shop-trainers-api.herokuapp.com/api/title").then((response) => {
      setData(response.data)
    });
  }, []);
  return ( 
    <div className={cx('wrapper')}>
      {data.map((item, index) => {
        const { titleUrl, productUrl } = item
        return <ProductDisplayItem key={index} titleURL={titleUrl} productURL={productUrl} />
      })}
    </div>
  );
}

export default ProductDisplay;