import React from "react";
import '../../styles/form.scss';
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="form-container">
            <form test-id="form">
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Login to collabordraw
                    </div>
                </div>
                <input type="email" placeholder="Enter your email id"></input>
                <input type="password" placeholder="Enter password"></input>
                <button>Login</button>
                <div className="message">
                    Not signed up yet ? Click here to <Link to={'/signup'} className="hyperlink">Signup</Link>.
                </div>
            </form>
        </div>
    )
}

export default Login;