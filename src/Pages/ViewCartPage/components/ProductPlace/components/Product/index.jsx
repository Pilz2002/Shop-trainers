
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product({ url, name, price, amount, onClick = () => {} }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("product")}>
        <button onClick={onClick}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className={cx("container")}>
          <img src={url} alt="" />
          <h5 className={cx("name")}>{name}</h5>
        </div>
      </div>
      <p className={cx("price")}>{price.toLocaleString()}đ</p>
      <p className={cx("amount")}>{amount.toLocaleString()}</p>
      <p className={cx("total")}>{(price * amount).toLocaleString()}đ</p>
    </div>
  );
}

export default Product;
