import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function UserInfo() {
  const loginInfo = useSelector(selectUserInfo);
  const loginId = loginInfo._id;
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`).then((response) => {
      const data = response.data;
      const address = data.address.find((address) => address.isDefault === true);
      if(address) {
        setData(address);
      }
      else {
        setData(data.address[0])
      }
    });
  }, [loginId]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title")}>THÔNG TIN NGƯỜI NHẬN</div>
        <div className={cx("row")}>
          <span>Người nhận</span>
          <span>{data?.fullName}</span>
        </div>
        <div className={cx("row")}>
          <span>Số điện thoại</span>
          <span>{data?.phoneNumber}</span>
        </div>
        <div className={cx("row")}>
          <span>Địa chỉ</span>
          <span>{data?.address}</span>
        </div>
      </div>
      <Link to="/user/account/address">
        <Button
          variant="contained"
          color="error"
          style={{ marginTop: "20px", position: "absolute", right: "0" }}
        >
          Thay đổi
        </Button>
      </Link>
    </div>
  );
}

export default UserInfo;
