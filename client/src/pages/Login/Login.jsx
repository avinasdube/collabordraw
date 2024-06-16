import React from "react";
import '../../styles/form.scss';
import Logo from "../../components/Logo/Logo";

const Login = () => {
    return (
        <div className="form-container">
            <form>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Login to collabordraw
                    </div>
                </div>
                <input type="email" placeholder="Enter your email id"></input>
                <input type="password" placeholder="Enter password"></input>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;