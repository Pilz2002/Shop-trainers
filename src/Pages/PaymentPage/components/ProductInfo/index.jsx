import { useAlert } from "@/hooks";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./ProductInfo.module.scss";

const cx = classNames.bind(styles);

function ProductInfo() {
  const navigate = useNavigate();
  const alert = useAlert();
  const loginInfo = useSelector(selectUserInfo);
  const loginId = loginInfo._id;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState(0);
  const [address, setAddress] = useState({});
  const handleChangeMethod = (e, value) => {
    setPaymentMethod(value);
  };

  const handleSubmit = () => {
    if(address) {
      const products = data.map((item) => {
        return { name: item.name, price: item.price, amount: item.amount, status: 0, url: item.url };
      });
      axios
        .put(`https://shop-trainer-backend.herokuapp.com/order/add_order/${loginId}`, {
          paymentMethod,
          address,
          products,
        })
        .then((response) => {
          axios
            .put(`https://shop-trainer-backend.herokuapp.com/user/cancel_all_order/${loginId}`)
            .then((response) => {
              alert("Đặt mua thành công");
            });
          navigate("/user/order");
        });
    }
    else {
      alert("Vui lòng nhập địa chỉ để thanh toán đơn hàng", "warning")
      setTimeout(() => {
        navigate("/user/account/address")
      }, 1000)
    }
  };
  useEffect(() => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`).then((response) => {
      const data = response.data;
      let orders = [];
      if (data.order) {
        orders = data.order;
      }
      const total = orders.reduce((total, curr) => {
        return total + curr.price * curr.amount;
      }, 0);
      const address = data.address.find((address) => address.isDefault === true);
      setAddress(address);
      setTotal(total);
      setData(orders);
    });
  }, [loginId]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>ĐƠN HÀNG CỦA BẠN</div>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <span className={cx("product-title")}>SẢN PHẨM</span>
          <span className={cx("total-title")}>TỔNG</span>
        </div>
        {data.map((item, index) => {
          const { name, amount, price } = item;
          return (
            <div className={cx("row")} key={index}>
              <span>
                {name} x {amount}
              </span>
              <span>{Number(price).toLocaleString()} đ</span>
            </div>
          );
        })}

        <div className={cx("row")}>
          <span>Tổng</span>
          <span>{Number(total).toLocaleString()} đ</span>
        </div>
      </div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Hình thức thanh toán</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={0}
          name="radio-buttons-group"
          value={paymentMethod}
          onChange={handleChangeMethod}
        >
          <FormControlLabel value={0} control={<Radio />} label="Thanh toán khi nhận hàng" />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Thanh toán bằng tài khoản ngân hàng"
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="error"
        style={{ marginTop: "20px", position: "absolute", right: 0 }}
        onClick={handleSubmit}
      >
        Xác nhận
      </Button>
    </div>
  );
}

export default ProductInfo;
