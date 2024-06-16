import React from "react";
import Logo from "../Logo/Logo";
import './Navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-right">
                Nav right
            </div>
        </div>
    )
}

export default Navbar;