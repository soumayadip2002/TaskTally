import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
const PrivateRoute = () => {
  const { user } = useUser();
  return (
    user ? <Outlet /> : <Navigate to='/login' />
  );
};

export default PrivateRoute;
