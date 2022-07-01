import { Modal } from "../components";
import { useState } from 'react';   

function LogginPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const handleInputUserInfo = (e) => {
    setUserInfo(prev => {
      return {...prev, [e.target.getAttribute('name')]: e.target.value}
    })
  }
  const handleSubmit = () => {

  }
  const inputFields = [
    {
      label: "Địa chỉ email",
      placeholder: "Nhập địa chỉ email",
      value: userInfo.email,
      onChange: handleInputUserInfo,
      name: "email"
    },
    {
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
      value: userInfo.password,
      onChange: handleInputUserInfo,
      name: "password",
    }
  ]
  return ( 
    <Modal title="Đăng nhập" inputFields={inputFields} onClickSubmit={handleSubmit} />
  );
}

export default LogginPage;