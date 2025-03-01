import { Navigate,Outlet } from "react-router-dom";

function PrivateRoute({isAuthenticate}) {
    return isAuthenticate ? <Outlet/>:<Navigate to="./LoginForm"/>  
}

export default PrivateRoute;