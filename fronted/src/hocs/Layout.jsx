import { useEffect } from "react";
import { checkAuthenticated, load_user } from '../actions/auth';
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navBarHome = location.pathname === "/";
    const navBarPerfil = location.pathname.includes("/profile");
    const activate = location.pathname.includes("/activate");
    console.log(activate)
    useEffect(() => {
      dispatch(checkAuthenticated());
      dispatch(load_user());
    }, []);
  
    return (
      <div>
        {!navBarHome && !navBarPerfil && !activate ? <Navbar /> : null}
        {children}
      </div>
    );
  };
  
export default Layout;