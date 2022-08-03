import classNames from "classnames/bind";
import styles from "./ButtonTippy.module.scss";
import Tippy from "@tippyjs/react/headless";
import { Popper } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function ButtonTippy({ children, icon, placement="bottom", label, onShow = () => {} }) {
  return (
    <div className={cx("wrapper")}>
      <Tippy
        render={(attrs) => <Popper>{children}</Popper>}
        placement={placement}
        interactive
        onShow={onShow}
      >
        <div className={cx("container")}>
          <button>
            <FontAwesomeIcon icon={icon} fontSize="20px" className={cx("icon")} />
            <span>{label}</span>
          </button>
        </div>
      </Tippy>
    </div>
  );
}

export default ButtonTippy;
