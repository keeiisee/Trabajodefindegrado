import { useEffect } from "react";
import { checkAuthenticated, load_user } from '../actions/auth';
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navBarHome = location.pathname === "/";
    
    const activate = location.pathname.includes("/activate");
    const ResetPassword = location.pathname.includes("/password/reset/confirm");
    useEffect(() => {
      dispatch(checkAuthenticated());
      dispatch(load_user());
    }, []);
  
    return (
      <div className="main-container bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 min-h-screen flex flex-col">
        {!navBarHome && !activate && !ResetPassword ? <Navbar /> : null}
        {children}
      </div>
    );
  };
  
export default Layout;