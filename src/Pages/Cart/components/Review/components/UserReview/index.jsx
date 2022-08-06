import classNames from "classnames/bind";
import styles from "./UserReview.module.scss";
import { Avatar, Rating } from "@mui/material";

const cx = classNames.bind(styles);

function UserReview({ rating, userName, feedback }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("user")}>
        <div className={cx("avatar")}>
          <Avatar>{userName[0].toUpperCase()}</Avatar>
        </div>
        <div className={cx("container")}>
          <div className={cx("user-name")}>{userName}</div>
          <div className={cx("user-rating")}>
            <Rating value={rating} className={cx("rating")} readOnly />
          </div>
        </div>
      </div>
      <div className={cx('feedback')}>
        {feedback}
      </div>
    </div>
  );
}

export default UserReview;
