import { useAlert } from "@/hooks";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { MainLayout } from "@/Pages/UserPage/pages/layout";
import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components";
import styles from "./Address.module.scss";
import { Modal, UserInfo } from "./components";

const cx = classNames.bind(styles);

function Address() {
  const alert = useAlert();
  // get loginId
  const userInfo = useSelector(selectUserInfo);
  const loginId = userInfo._id;

  // local state
  const [data, setData] = useState([]);
  const [isOpenModal, setsIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const callApi = useCallback(() => {
    axios
      .get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`)
      .then((response) => {
        const { address, fullName, phoneNumber } = response.data;
        if (fullName) {
          setFullName(fullName);
        }
        if (phoneNumber) {
          setPhoneNumber(phoneNumber);
        }
        setData(address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginId]);
  const handleSetDefault = (index) => {
    setData((prev) => {
      const arr = prev.map((item) => {
        return { ...item, isDefault: false };
      });
      arr[index].isDefault = true;
      axios
        .put(`https://shop-trainer-backend.herokuapp.com/user/update/${loginId}`, { address: arr })
        .then(() => callApi());
      return arr;
    });
  };
  const handleOpenModal = () => {
    setModalData({ phoneNumber, fullName });
    setsIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setsIsOpenModal(false);
  };
  const handleFinishModal = (newData) => {
    setData((prev) => {
      const { isDefault } = newData;
      let arr = [];
      if (isDefault) {
        arr = prev.map((item) => {
          return { ...item, isDefault: false };
        });
        arr = [...arr, newData];
      } else {
        arr = [...prev, newData];
      }
      axios
        .put(`https://shop-trainer-backend.herokuapp.com/user/update/${loginId}`, { address: arr })
        .then((response) => {
          handleCloseModal();
          alert("Thêm địa chỉ thành công");
        });
      return arr;
    });
  };
  const handleSaveFixInfo = (newData) => {
    const { index, fullName, phoneNumber, isDefault, address } = newData;
    const data = { fullName, phoneNumber, isDefault, address };
    setData((prev) => {
      prev.splice(index, 1, data);
      let arr = [];
      if (isDefault) {
        arr = prev.map((item) => {
          return { ...item, isDefault: false };
        });
        arr[index].isDefault = isDefault;
      } else {
        arr = [...prev];
      }
      axios
        .put(`https://shop-trainer-backend.herokuapp.com/user/update/${loginId}`, { address: arr })
        .then(() => {
          callApi();
          alert("Cập nhập thành công");
          handleCloseModal();
        })
        .catch((err) => {
          alert("Cập nhập thất bại", "error");
        });
      return arr;
    });
  };
  const handleFixInfo = (data) => {
    setModalData(data);
    setsIsOpenModal(true);
  };
  const handleDelAddress = (index) => {
    setData((prev) => {
      const arr = prev.filter((item, i) => i !== index);

      axios.put(`https://shop-trainer-backend.herokuapp.com/user/update/${loginId}`, { address: arr }).then(() => {
        callApi();
      });
      return arr;
    });
  };
  useEffect(() => {
    callApi();
  }, [callApi]);
  useEffect(() => {
    setModalData({ fullName, phoneNumber });
  }, [fullName, phoneNumber]);
  return (
    <MainLayout>
      <Header title="Địa Chỉ Của Tôi" btnTitle="Thêm địa chỉ mới" onClick={handleOpenModal} />
      <div className={cx("wrapper")}>
        {isOpenModal && (
          <Modal
            open={isOpenModal}
            onClose={handleCloseModal}
            onFinish={handleFinishModal}
            modalData={modalData}
          />
        )}
        {data.map((userInfo, index) => {
          const { fullName, address, phoneNumber } = userInfo;
          return (
            <div className={cx("container")} key={index}>
              <div className={cx("info")}>
                <UserInfo fullName={fullName} address={address} phoneNumber={phoneNumber} />
              </div>
              <div className={cx("setting")}>
                <div className={cx("action")}>
                  <button
                    className={cx("fix")}
                    onClick={() =>
                      handleFixInfo({
                        index,
                        fullName,
                        phoneNumber,
                        address,
                        isDefault: userInfo.isDefault,
                        onChange: handleSaveFixInfo,
                      })
                    }
                  >
                    Sửa
                  </button>
                  <button className={cx("delete")} onClick={() => handleDelAddress(index)}>
                    Xoá
                  </button>
                </div>
                <button
                  className={cx("default")}
                  onClick={() => handleSetDefault(index)}
                  style={userInfo.isDefault ? { cursor: "default" } : {}}
                >
                  {userInfo.isDefault ? "Mặc định" : "Thiết lập mặc định"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}

export default Address;
