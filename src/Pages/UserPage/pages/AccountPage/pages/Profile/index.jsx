import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { MainLayout } from "@/Pages/UserPage/pages/layout";
import axios from "axios";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Header, Input, Text } from "../components";
import { useAlert } from "@/hooks";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
  const alert = useAlert()
  const userInfo = useSelector(selectUserInfo);
  const loginId = userInfo._id;
  const [userName, setUserName] = useState("");
  const [genderValue, setGenderValue] = useState(0);
  const [birdDate, setBirdDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const handleSelectGender = (index) => {
    setGenderValue(index);
  };

  const handleChangeBirdDate = (e) => {
    setBirdDate(e.target.value);
  };
  const handleInputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleInputFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleClickSave = () => {
    axios.put(`https://shop-trainer-backend.herokuapp.com/user/update/${loginId}`, {
      gender: genderValue,
      birdDate,
      phoneNumber,
      fullName
    }).then(response => {
      alert("Cập nhập thành công")
    }).catch(err => {
      alert("Cập nhập thất bại", "error")

    });
  };
  useEffect(() => {
    axios
    .get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`)
    .then((response) => {
      const { userName, birdDate, phoneNumber, gender, email, fullName } = response.data;
      if (birdDate) {
        setBirdDate(birdDate);
      }
      if (gender) {
        setGenderValue(gender);
      }
      if (phoneNumber) {
        setPhoneNumber(phoneNumber);
      }
      if(fullName) {
        setFullName(fullName)
      }
      setUserName(userName);
      setEmail(email);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [loginId])
  return (
    <MainLayout>
      <Header title="Hồ Sơ Của Tôi" description="Quản lý thông tin hồ sơ để bảo mật tài khoản" />
      <div className={cx("container")}>
        <Text label="Tên Đăng Nhập">{userName}</Text>
        <Input label="Họ và tên" value={fullName} onChange={handleInputFullName} />
        <Input label="Số điện thoại" value={phoneNumber} onChange={handleInputPhoneNumber} />
        <Text label="email">{email}</Text>
        <Input
          label="Giới tính"
          type="radio"
          values={["Nam", "Nữ", "Khác"]}
          defaultValue={+genderValue}
          value={+genderValue}
          onChange={handleSelectGender}
        />
        <Input label="Ngày sinh" type="date" value={birdDate} onChange={handleChangeBirdDate} />
        <Button style={{ marginLeft: "25%" }} onClick={handleClickSave}>
          Lưu
        </Button>
      </div>
    </MainLayout>
  );
}

export default Profile;
