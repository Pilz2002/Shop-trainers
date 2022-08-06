import { useAlert } from "@/hooks";
import {
  decreaseAmount,
  increaseAmount,
  selectProduct
} from "@/Pages/components/Product/productSlice";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import axios from "axios";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MainContent.module.scss";

const cx = classNames.bind(styles);

function MainContent() {
  const loginInfo = useSelector(selectUserInfo);
  const loginId = loginInfo._id;
  const alert = useAlert();
  const dispatch = useDispatch();
  const productInfo = useSelector(selectProduct);
  const { url, name, price, amount } = productInfo;
  const handleAddProduct = () => {
    axios
        .put(`https://shop-trainer-backend.herokuapp.com/user/order/${loginId}`, {url, name, price, amount})
        .then((response) => {
          alert("Thêm sản phẩm thành công, bạn có thể xem thông tin sản phẩm tại giỏ hàng");
        });
  };
  const handleDecreaseAmount = () => {
    dispatch(decreaseAmount());
  };
  const handleIncreaseAmount = () => {
    dispatch(increaseAmount());
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("img-product")}>
        <img src={url} alt="" />
      </div>
      <div className={cx("info-product")}>
        <h2 className={cx("name-product")}>{name}</h2>
        <p className={cx("price-product")}>{price && price.toLocaleString()}đ</p>
        <div className={cx("button-ground")}>
          <div className={cx("amount-product")}>
            <button onClick={handleDecreaseAmount}>-</button>
            <p>{amount}</p>
            <button onClick={handleIncreaseAmount}>+</button>
          </div>
          <button onClick={handleAddProduct} className={cx("add-product")}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
