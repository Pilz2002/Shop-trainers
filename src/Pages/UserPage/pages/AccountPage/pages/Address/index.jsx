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
          alert("Th??m ?????a ch??? th??nh c??ng");
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
          alert("C???p nh???p th??nh c??ng");
          handleCloseModal();
        })
        .catch((err) => {
          alert("C???p nh???p th???t b???i", "error");
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
      <Header title="?????a Ch??? C???a T??i" btnTitle="Th??m ?????a ch??? m???i" onClick={handleOpenModal} />
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
                    S???a
                  </button>
                  <button className={cx("delete")} onClick={() => handleDelAddress(index)}>
                    Xo??
                  </button>
                </div>
                <button
                  className={cx("default")}
                  onClick={() => handleSetDefault(index)}
                  style={userInfo.isDefault ? { cursor: "default" } : {}}
                >
                  {userInfo.isDefault ? "M???c ?????nh" : "Thi???t l???p m???c ?????nh"}
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
