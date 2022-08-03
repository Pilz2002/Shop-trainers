import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";


const Protected = () => {
  const isLogin = useAuth();
  if(!isLogin) {
    alert("Vui lòng đăng nhập")
  }
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default Protected;
