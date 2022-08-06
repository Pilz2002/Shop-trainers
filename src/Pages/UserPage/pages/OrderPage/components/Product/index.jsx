import { Button } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product({ name, price, amount, status = 0, url, onClick }) {
  let statusText = "";
  if (status === 0) {
    statusText = "Chờ xác nhận";
  } else if (status === 1) {
    statusText = "Chờ lấy hàng";
  } else if (status === 2) {
    statusText = "Đang giao";
  } else {
    statusText = "Đã giao";
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h4 className={cx("status")}>
          <span>Trạng thái: </span>
          {statusText}
        </h4>
      </div>
      <div className={cx("product")}>
        <div className={cx("img")}>
          <img src={url} alt="" />
        </div>
        <div className={cx("info")}>
          <p className={cx("name")}>{name}</p>
          <p className={cx("amount")}>Số lượng: {amount}</p>
          <h5 className={cx("price")}>
            <span>Giá: </span>
            {Number(price*amount).toLocaleString()} đ
          </h5>
          <div className={cx("cancel-btn")}>
            <Button variant="contained" color="error" onClick={onClick}>
              Huỷ đơn hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
