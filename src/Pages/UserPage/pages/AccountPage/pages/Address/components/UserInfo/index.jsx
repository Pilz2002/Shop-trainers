import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import { Text } from "@/Pages/UserPage/pages/AccountPage/pages/components";

const cx = classNames.bind(styles);

function UserInfo({ fullName, address, phoneNumber }) {
  return (
    <div className={cx("wrapper")}>
      <Text label="Họ và tên">{fullName}</Text>
      <Text label="Số điện thoại">{phoneNumber}</Text>
      <Text label="Địa chỉ">{address}</Text>
    </div>
  );
}

export default UserInfo;
