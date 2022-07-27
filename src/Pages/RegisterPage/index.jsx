import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components";


function RegisterPage() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    userName: "",
    password: "",
    repassword: "",
  });
  const handleInputRegister = (e) => {
    setRegisterInfo((prev) => {
      return { ...prev, [e.target.getAttribute("name")]: e.target.value };
    });
  };
  const handleSubmit = () => {
    const { password, repassword, email, userName } = registerInfo;
    if (password === repassword) {
      axios.post("http://localhost:5000/auth/register", { password, email, userName })
      .then(response => {
        if(response.data.message) {
          alert(response.data.message);
        }
        else {
          return axios.post("http://localhost:5000/user/create", {email, userName, loginId: response.data._id})
        }
      })
      .then(response => {
        if(response) {
          navigate("/login", { replace: true })
        }
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      alert("Vui lòng nhập đúng mật khẩu");
    }
  };
  const inputFields = [
    {
      label: "Địa chỉ email",
      placeholder: "Nhập địa chỉ email",
      value: registerInfo.email,
      name: "email",
      type: "email",
      onChange: handleInputRegister,
    },
    {
      label: "Tên người dùng",
      placeholder: "Nhập địa tên người dùng",
      value: registerInfo.userName,
      name: "userName",
      type: "text",
      onChange: handleInputRegister,
    },
    {
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
      value: registerInfo.password,
      name: "password",
      type: "password",
      onChange: handleInputRegister,
    },
    {
      label: "Nhập lại mật khẩu",
      placeholder: "Nhập lại mật khẩu",
      value: registerInfo.repassword,
      name: "repassword",
      type: "password",
      onChange: handleInputRegister,
    },
  ];

  return <Modal title="Đăng ký" inputFields={inputFields} onSubmit={handleSubmit} />;
}

export default RegisterPage;
