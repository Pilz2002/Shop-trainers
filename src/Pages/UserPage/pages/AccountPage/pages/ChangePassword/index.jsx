import classNames from "classnames/bind";
import { MainLayout } from "../../../layout";
import { Button, Header, Input } from "../components";
import styles from "./ChangePassword.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import axios from "axios";
import { useAlert } from "@/hooks";

const cx = classNames.bind(styles);

function ChangePassword() {
  const alert = useAlert()
  // get loginId
  const userInfo = useSelector(selectUserInfo);
  const loginId = userInfo._id;

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleInputRePassword = (e) => {
    setRePassword(e.target.value);
  };
  const handleInputNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/auth/me/${loginId}`).then((response) => {
      if(password === response.data.password) {
        if(newPassword === rePassword) {
          axios.put(`https://shop-trainer-backend.herokuapp.com/auth/update/${loginId}`, { password: newPassword }).then((response) => {
            setNewPassword("")
            setPassword("")
            setRePassword("")
            alert("Thành đổi mật khẩu thành công")
          });
        }
        else {
          alert("Mật khẩu không trùng khớp", "error")
        }
      }
      else {
        alert("Mật khẩu hiện tại không chính xác", "error")
      }
    })

    
  }

  return (
    <div className={cx("wrapper")}>
      <MainLayout>
        <Header
          title="Đổi Mật Khẩu"
          description="Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác"
        />
        <Input
          label="Mật Khẩu Hiện Tại"
          type="password"
          value={password}
          onChange={handleInputPassword}
        />
        <Input
          label="Mật Khẩu Mới"
          type="password"
          value={newPassword}
          onChange={handleInputNewPassword}
        />
        <Input
          label="Xác Nhận Mật Khẩu"
          type="password"
          value={rePassword}
          onChange={handleInputRePassword}
        />
        <Button style={{ marginLeft: "25%" }} onClick={handleSubmit}>Xác nhận</Button>
      </MainLayout>
    </div>
  );
}

export default ChangePassword;
