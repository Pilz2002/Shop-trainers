import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import React from "react"
import { MainContent, Review } from "./components";
import { useLocation } from "react-router-dom";


const cx = classNames.bind(styles);

function Cart() {
  const location = useLocation()
  return (
    <div className={cx("wrapper")}>
      <MainContent />
      <Review productId={location.state} />
    </div>
  );
}

export default Cart;
