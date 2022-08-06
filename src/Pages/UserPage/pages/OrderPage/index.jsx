import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import { Header, Search, Product } from "./components";
import { MainLayout } from "../layout";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { useAlert } from "@/hooks";

const cx = classNames.bind(styles);

function OrderPage() {
  const alert = useAlert();
  const loginInfo = useSelector(selectUserInfo);
  const loginId = loginInfo._id;
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([])
  const [status, setStatus] = useState(0)
  const callApi = useCallback(() => {
    axios
      .get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`)
      .then((response) => {
        const data = response.data;
        return axios.get(`https://shop-trainer-backend.herokuapp.com/order/get_order/${data._id}`);
      })
      .then((response) => {
        setData(response.data);
        setOriginalData(response.data)
      });
  }, [loginId]);
  const handleDel = (index) => {
    axios.put(`https://shop-trainer-backend.herokuapp.com/order/cancel_order/${loginId}`, { index }).then((response) => {
      callApi();
      if (response.data.message) {
        alert(response.data.message, "error");
      } else {
        alert("Xoá thành công");
      }
    });
  };
  const handleChangeFilterStatus = (e, value) => {
    setStatus(value)
    setData(prev => {
      if(value === 0) {
        return originalData
      }
      return originalData.filter(item => item.status === value - 1)
    })
  }
  useEffect(() => {
    callApi();
  }, [callApi]);
  return (
    <MainLayout>
      <div className={cx("wrapper")}>
        <Header value={status} onChange={handleChangeFilterStatus} />
        <Search />
        {data.map((item, index) => {
          return (
            <Product
              key={index}
              name={item.name}
              price={item.price}
              amount={item.amount}
              status={item.status}
              url={item.url}
              onClick={() => handleDel(index)}
            />
          );
        })}
      </div>
    </MainLayout>
  );
}

export default OrderPage;
