import { Avatar as AvatarMui } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import classNames from "classnames/bind";
import styles from './Avatar.module.scss';
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/Pages/LoginPage/loginPageSlice";

const cx = classNames.bind(styles)  

function Avatar() {
  const userInfo = useSelector(selectUserInfo)
  const { userName } = userInfo
  return ( 
    <div className={cx('wrapper')}>
      <AvatarMui sx={{ bgcolor: deepOrange[500] }} className={cx('avatar')}>{userName[0].toUpperCase()}</AvatarMui>
      <h4>{userName}</h4>
    </div>
  );
}

export default Avatar;