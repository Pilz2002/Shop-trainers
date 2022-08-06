import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header({ value, onChange }) {
  return (
    <div className={cx("wrapper")}>
      <Tabs value={value} onChange={onChange} centered variant="fullWidth">
        <Tab label="Tất cả" />
        <Tab label="Chờ xác nhận" />
        <Tab label="Chờ lấy hàng" />
        <Tab label="Đang giao" />
        <Tab label="Đã giao" />
      </Tabs>
    </div>
  );
}

export default Header;
