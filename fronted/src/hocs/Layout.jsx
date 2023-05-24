import { useEffect } from "react";
import { checkAuthenticated, load_user } from '../actions/auth';
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Navbarhome } from "../containers/Home/Navbarhome";
import OtroNavbarPerfil from "../containers/Perfil/OtroNavbarPerfil";

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navBarHome = location.pathname === "/";
    const navBarPerfil = location.pathname.includes("/profile");

    useEffect(() => {
        dispatch(checkAuthenticated());
        dispatch(load_user());
    }, []);


    return (
        <div>
            {!navBarHome && !navBarPerfil ? <Navbar /> : null}
            
            {children}
        </div>
    );
};

export default Layout;