import { useEffect } from "react";
import { checkAuthenticated, load_user } from '../actions/auth';
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Navbarhome } from "../containers/Home/Navbarhome";
const Layout = ({children }) => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navBarHome  = location.pathname === "/";

    useEffect(() => {
        dispatch(checkAuthenticated());
        dispatch(load_user());
    }, []);

    
    return (
        <div>
            {!navBarHome && <Navbar/>}
            {children}
        </div>
    );
};

export default Layout;