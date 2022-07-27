import { Button } from '@/components';
import { Product } from "@/Pages/components";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { HeaderOnly } from "../Layout";
import styles from "./ProductSales.module.scss";

const cx = classNames.bind(styles);

function ProductSales() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("https://shop-trainers-api.herokuapp.com/api/product").then((response) => {
      axios.get("https://shop-trainers-api.herokuapp.com/api/sales").then(res => {
        const arr =  response.data.filter(item => {
          return res.data.includes(item.id)
        })
        setData(arr)
      })
    })
  }, [])
  return (
    <HeaderOnly title="Sản phẩm giảm giá">
      <div className={cx('wrapper')}>
        {data.map((item, index) => {
          return (
            <div className={cx("container")} key={index}>
              <Product url={item.url} name={item.name} price={item.price} discount={item.discount} />
            </div>
          );
        })}
        <Button>Xem tất cả</Button>
      </div>
    </HeaderOnly>
  );
}

export default ProductSales;
