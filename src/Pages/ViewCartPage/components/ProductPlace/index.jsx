import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Product } from "./components";
import styles from "./ProductPlace.module.scss";
import { useAlert } from "@/hooks";
import axios from "axios";

const cx = classNames.bind(styles);

function ProductPlace() {
  const alert = useAlert()
  const loginInfo = useSelector(selectUserInfo)
  const loginId = loginInfo._id
  const [data, setData] = useState([])
  const [total, setTotal] = useState(() => {
    return data.reduce((total, currValue) => {
      return total + currValue.price * currValue.amount;
    }, 0);
  });
  const callApi = useCallback(() => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`).then((response) => {
      const data = response.data
      setData(data?.order)
    })
  }, [loginId])

  const handleCancelProduct = (index) => {
    axios.put(`https://shop-trainer-backend.herokuapp.com/user/cancel_order/${loginId}`, {index}).then((response) => {
      callApi();
      alert("Xoá thành công");
    });
  }

  useEffect(() => {
    const total = data.reduce(
      (total, currValue) => total + currValue.price * currValue.amount,
      0
    );
    setTotal(total);
  }, [data]);
  useEffect(() => {
    callApi()
  }, [callApi])
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h4>Sản phẩm</h4>
        <h4>Giá</h4>
        <h4>Số lượng</h4>
        <h4>Tổng</h4>
      </div>
      <div className={cx("container")}>
        {data.map((item, index) => {
          const { url, price, amount, name } = item;
          return (
            <Product
              key={index}
              url={url}
              price={price}
              amount={amount}
              name={name}
              onClick={() => handleCancelProduct(index)}
            />
          );
        })}
      </div>
      <div className={cx("total")}>
        <p>
          TỔNG: <span>{total.toLocaleString()}đ</span>
        </p>
        <div className={cx("discount-code")}>
          <TextField label={"Mã giảm giá"} placeholder="Nhập mã giảm giá" multiline />
        </div>
      </div>
      <div className={cx("button-ground")}>
        <Link to="/">
          <Button variant="outlined" color="error" className={cx("button")}>
            <FontAwesomeIcon icon={faArrowLeft} color="danger" />
            <span>TIẾP TỤC MUA SẢN PHẨM</span>
          </Button>
        </Link>
        <Link to="/payment">
          <Button variant="contained" color="error">
            THANH TOÁN
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductPlace;
