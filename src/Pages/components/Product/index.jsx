import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useDispatch } from "react-redux";
import { addProduct } from "./productSlice";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Product({ url, name, price, discount, productId }) {
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    const productPrice = !!discount ? price - Math.floor(price * Number(discount / 100)) : price;
    dispatch(
      addProduct({
        url,
        name,
        price: productPrice,
        amount: 1,
      })
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("img")}><img src={url} alt="" /></div>
      <div className={cx("info")}>
        <p className={cx("name")}>{name}</p>
        <p className={cx("price")}>{`${Number(price).toLocaleString()} đ`}</p>
      </div>
      <button onClick={handleAddProduct}>
        <Link to="/cart" className={cx("link")} state={productId}>
          Xem sản phẩm
        </Link>
      </button>
      {!!discount && <div className={cx("discount")}>{`${discount}%`}</div>}
    </div>
  );
}

export default Product;
