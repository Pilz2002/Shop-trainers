import { removeProduct, selectListProduct } from "@/Pages/Cart/cartSlice";
import { logout, selectIsLogin, selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { getBeforeUrl } from "@/Pages/pagesSlice";
import {
  faCartShopping,
  faMagnifyingGlass,
  faUserLarge,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import className from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./assets/logo-mona.png";
import { ButtonTippy } from "./components";
import styles from "./HeaderTitle.module.scss";

const cx = className.bind(styles);

function HeaderTitle() {
  const dispatch = useDispatch();
  const listProduct = useSelector(selectListProduct);
  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    dispatch(getBeforeUrl(window.location.pathname));

  }, [dispatch]);

  const handleRemoveProduct = (index) => {
    dispatch(removeProduct(index));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={cx("header-title")}>
      <div className={cx("logo")}>
        <img src={logo} alt="logo" />
      </div>
      <div className={cx("search")}>
        <input placeholder="Nhập tên sản phẩm" />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className={cx("login-resgister")}>
        {isLogin ? (
          <ButtonTippy icon={faUserLarge} label={userInfo.userName}>
            <div className={cx("user")}>
              <Link to="/user/order" className="user-item">
                <Button className={cx("button")}>Đơn hàng</Button>
              </Link>
              <Link to="/user/account/profile" className="user-item" style={{ color: "#000" }}>
                <Button className={cx("button")}>Thông tin tài khoản</Button>
              </Link>
              <Link to="/user/account/address" className="user-item">
                <Button className={cx("button")}>Địa chỉ</Button>
              </Link>
              <Link to="/" className="user-item">
                <Button className={cx("button")} onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </Link>
            </div>
          </ButtonTippy>
        ) : (
          <>
            <button>
              <Link to="/register" className={cx("link")}>
                Đăng ký
              </Link>
            </button>
            <span></span>
            <button>
              <Link to="/login" className={cx("link")}>
                Đăng nhập
              </Link>
            </button>
          </>
        )}
      </div>
      <ButtonTippy icon={faCartShopping} placement="bottom-start">
        {listProduct.length !== 0 ? (
          <div className={cx("container")}>
            {listProduct.map((item, index) => {
              return (
                <div className={cx("item")} key={index}>
                  <div className={cx("img-product")}>
                    <img src={item.url} alt="" />
                  </div>
                  <div className={cx("product-info")}>
                    <p className={cx("product-name")}>{item.name}</p>
                    <p className={cx("product-amount")}>Số lượng: {item.amount}</p>
                    <p className={cx("product-price")}>Đơn giá: {item.price.toLocaleString()}</p>
                  </div>

                  <FontAwesomeIcon
                    icon={faXmark}
                    className={cx("remove-button")}
                    onClick={() => handleRemoveProduct(index)}
                  />
                </div>
              );
            })}
            <div className={cx("button-ground")}>
              <Link to="/view_cart">
                <Button variant="contained" className={cx("button")}>
                  Xem giỏ hàng
                </Button>
              </Link>
              <Link to="/payment">
                <Button variant="contained" className={cx("button")}>
                  Thanh toán
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <p>Không có sản phẩm</p>
        )}
      </ButtonTippy>
    </div>
  );
}

export default HeaderTitle;
