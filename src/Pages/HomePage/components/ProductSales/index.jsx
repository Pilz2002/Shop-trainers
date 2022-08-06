import { Product } from "@/Pages/components";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { HeaderOnly } from "../Layout";
import styles from "./ProductSales.module.scss";

const cx = classNames.bind(styles);

function ProductSales() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://shop-trainer-backend.herokuapp.com/product/discount").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <HeaderOnly title="Sản phẩm giảm giá">
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

export default ProductSales;
