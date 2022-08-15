import { useAlert } from "@/hooks";

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
import axios from "axios";
import className from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./assets/logo-mona.png";
import { ButtonTippy } from "./components";
import styles from "./HeaderTitle.module.scss";

const cx = className.bind(styles);

function HeaderTitle() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);
  const loginId = userInfo._id;
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false)

  const callApi = useCallback(() => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`).then((response) => {
      const data = response.data;
      let orders = [];
      if(data?.order) {
        orders = data.order;
        setData(orders);
      }
      else {
        setData(orders);
      }
    });
  }, [loginId]);

  const handleRemoveProduct = (index) => {
    axios.put(`https://shop-trainer-backend.herokuapp.com/user/cancel_order/${loginId}`, {index}).then((response) => {
      callApi();
      alert("Xoá thành công");
    });
  };

  const handleLogout = () => {
    alert("Đăng xuất thành công", "success");
    dispatch(logout());
  };

  const handleSetShow = () => {
    setShow(prev => !prev)
  }

  useEffect(() => {
    dispatch(getBeforeUrl(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    callApi();
  }, [callApi, show]);
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
          <ButtonTippy icon={faUserLarge} label={userInfo.userName} >
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
      <ButtonTippy icon={faCartShopping} placement="bottom-start" onShow={handleSetShow} >
        {data.length !== 0 ? (
          <div className={cx("container")}>
            {data.map((item, index) => {
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
