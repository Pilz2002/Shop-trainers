import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";
import { Avatar, Button, Rating } from "@mui/material";
import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserReview } from "./components";
import styles from "./Review.module.scss";

const cx = classNames.bind(styles);

function Review({ productId }) {
  const loginInfo = useSelector(selectUserInfo);
  const loginId = loginInfo._id;
  const [value, setValue] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [comment, setComment] = useState([]);

  const callApi = useCallback(() => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/comment/get_comment/${productId}`).then((response) => {
      setComment(() => {
        const data = response.data;
        if(data?.comments) {
          return data.comments;
        }
        return []
      });
    });
  }, [productId]);
  const handleSubmitFeelBack = () => {
    axios
      .put(`https://shop-trainer-backend.herokuapp.com/comment/post/${productId}`, {
        comment: feedback,
        rate: value,
        userId: userInfo._id,
        userName: userInfo.userName,
      })
      .then((response) => {
        callApi();
        setFeedback("");
        setValue(0);
      });
  };
  const handleInputFeelBack = (e) => {
    setFeedback(e.target.value);
  };
  useEffect(() => {
    axios.get(`https://shop-trainer-backend.herokuapp.com/user/me/${loginId}`).then((response) => {
      setUserInfo(response.data);
    });
  }, [loginId]);
  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>Đánh giá sản phẩm</h3>
      <div className={cx("feelback-input")}>
        <h3 className={cx("feelback-title")}>Nhập đánh giá</h3>
        <Rating
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={cx("rating")}
        />
        <div className={cx("container")}>
          <Avatar>{String(userInfo.userName)[0].toUpperCase()}</Avatar>
          <input placeholder="Nhập đánh giá" onChange={handleInputFeelBack} value={feedback} />
          <Button variant="contained" onClick={handleSubmitFeelBack}>
            Gửi
          </Button>
        </div>
      </div>
      <div className={cx("users-review")}>
        <h3 className={cx("feelback-title")}>Đánh giá</h3>
        {comment.map((item, index) => {
          const { rate, comment, userName } = item;
          return <UserReview rating={rate} key={index} feedback={comment} userName={userName} />;
        })}
      </div>
    </div>
  );
}

export default Review;
