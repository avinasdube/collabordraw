import React from "react";
import Logo from "../Logo/Logo";
import './Navbar.scss';

import crntusr from "../../assets/icons/na'vi.png";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-right">
                <div className="currentUser">
                    <img src={crntusr} alt=''></img>
                </div>
            </div>
        </div>
    )
}

export default Navbar;