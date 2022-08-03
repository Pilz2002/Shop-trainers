
import { useSelector } from "react-redux";
import { selectIsLogin } from "@/Pages/LoginPage/loginPageSlice";

export const useAuth = () => {
  const isLogin = useSelector(selectIsLogin)
  return isLogin
}