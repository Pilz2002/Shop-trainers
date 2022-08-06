import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components";
import { login } from "./loginPageSlice";
import { useAlert } from "@/hooks";
import axios from "axios";

function LoginPage() {
  const alert = useAlert();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleInputUserInfo = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.getAttribute("name")]: e.target.value };
    });
  };
  const handleSubmit = () => {
    const { email, password } = userInfo;
    axios.post("https://shop-trainer-backend.herokuapp.com/auth/login",{ email, password })
    .then((response) => {
      if (response.data.message) {
        alert(response.data.message, "error");
      } else {
        dispatch(login(response.data))
        alert("Đăng nhập thành công", "success");

        navigate("/", { replace: true });
      }
    });
  };
  const inputFields = [
    {
      label: "Địa chỉ email",
      placeholder: "Nhập địa chỉ email",
      value: userInfo.email,
      onChange: handleInputUserInfo,
      name: "email",
      type: "email",
    },
    {
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
      value: userInfo.password,
      onChange: handleInputUserInfo,
      name: "password",
      type: "password",
    },
  ];
  return <Modal title="Đăng nhập" inputFields={inputFields} onSubmit={handleSubmit} />;
}

export default LoginPage;
