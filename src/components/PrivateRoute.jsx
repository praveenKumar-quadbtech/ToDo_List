import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { isLogged } = useSelector((state) => state.auth); 
    return isLogged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
