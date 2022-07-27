import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModalMui from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { animated, useSpring } from "@react-spring/web";
import classNames from "classnames/bind";
import { forwardRef } from "react";
import styles from "./Modal.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  padding: "30px",
};

function Modal({ open, onClose = () => {}, onFinish = () => {}, modalData = {} }) {
  const [fullName, setFullName] = useState(modalData.fullName);
  const [phoneNumber, setPhoneNumber] = useState(modalData.phoneNumber);
  const [address, setAddress] = useState(modalData.address || "");
  const [isDefault, setIsDefault] = useState(modalData.isDefault || false);
  const handleInputFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleInputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleInputAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <ModalMui
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className={cx("modal")}>
              <h3 className={cx("title")}>Địa chỉ mới</h3>
              <div className={cx("container")}>
                <TextField
                  className={cx("userName")}
                  label="Họ và tên"
                  variant="outlined"
                  value={fullName}
                  onChange={handleInputFullName}
                />
                <TextField
                  className={cx("phoneNumber")}
                  label="Số điện thoại"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={handleInputPhoneNumber}
                />
              </div>
              <TextField
                className={cx("address")}
                label="Địa chỉ"
                variant="outlined"
                value={address}
                onChange={handleInputAddress}
                required
              />
              <div className={cx("checkbox")}>
                <label>Đặt địa chỉ mặc định</label>
                <input
                  type="checkbox"
                  onChange={() => setIsDefault((prev) => !prev)}
                  checked={isDefault}
                />
              </div>
              <div className={cx("btn-ground")}>
                <Button className={cx("back-btn")} variant="text" color="error" onClick={onClose}>
                  Trở lại
                </Button>
                <Button
                  className={cx("finish-btn")}
                  variant="contained"
                  color="info"
                  onClick={
                    modalData.onChange
                      ? () => modalData.onChange({ fullName, phoneNumber, address, isDefault, index: modalData.index })
                      : () => onFinish({ fullName, phoneNumber, address, isDefault })
                  }
                >
                  Hoàn thành
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </ModalMui>
    </div>
  );
}

export default Modal;
