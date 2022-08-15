import { Popper } from "@/components";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import className from "classnames/bind";
import { MenuItem } from "./components";
import styles from "./HeaderMenu.module.scss";

const cx = className.bind(styles);

function HeaderMenu() {
  return (
    <div className={cx("headerMenu")}>
      <MenuItem path="/">Trang chủ</MenuItem>
      <MenuItem path="/introduce">Giới thiệu</MenuItem>

      <Tippy
        render={(attrs) => (
          <Popper>
            <div className={cx("container")}>
              <h4>Classic</h4>
              <h4>Sunbaked</h4>
              <h4>Chuck 07s</h4>
              <h4>One star</h4>
              <h4>PSY-kicks</h4>
            </div>
          </Popper>
        )}
        placement="bottom-start"
        interactive
      >
        <div style={{ height: "100%" }}>
          <MenuItem path="/men">
            <p>Nam</p> <FontAwesomeIcon icon={faAngleDown} />
          </MenuItem>
        </div>
      </Tippy>

      <Tippy
        render={(attrs) => (
          <Popper>
            <div className={cx("container")}>
              <h4>Classic</h4>
              <h4>Sunbaked</h4>
              <h4>Chuck 07s</h4>
              <h4>One star</h4>
              <h4>PSY-kicks</h4>
            </div>
          </Popper>
        )}
        placement="bottom-start"
        interactive
      >
        <div style={{ height: "100%" }}>
          <MenuItem path="/women">
            <p>Nữ</p> <FontAwesomeIcon icon={faAngleDown} />
          </MenuItem>
        </div>
      </Tippy>

      <MenuItem path="/children">Trẻ em</MenuItem>
      <MenuItem path="/other">Phụ kiện khác</MenuItem>
      <MenuItem path="/news">Tin tức</MenuItem>
      <MenuItem path="/contact">Liên hệ</MenuItem>
    </div>
  );
}

export default HeaderMenu;
