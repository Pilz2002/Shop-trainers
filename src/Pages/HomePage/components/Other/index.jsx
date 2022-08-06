import { Product } from "@/Pages/components";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { HeaderOnly } from "../Layout";
import styles from "./Other.module.scss";

const cx = classNames.bind(styles);

function Other() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://shop-trainer-backend.herokuapp.com/product/other").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <HeaderOnly title="Sản phẩm khác">
      <div className={cx("wrapper")}>
        {data.map((item, index) => {
          return (
            <div className={cx("container")} key={index}>
              <Product
                url={item.thumbnail}
                name={item.name}
                price={item.price}
                discount={item.discount}
                productId={item._id}
              />
            </div>
          );
        })}
      </div>
    </HeaderOnly>
  );
}

export default Other;
