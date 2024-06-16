import React from "react";
import '../../styles/form.scss';
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="form-container">
            <form>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Signup to collabordraw
                    </div>
                </div>
                <input type="text" placeholder="Enter your first name"></input>
                <input type="text" placeholder="Enter your last name"></input>
                <input type="email" placeholder="Enter your email id"></input>
                <input type="password" placeholder="Enter password"></input>
                <input type="password" placeholder="Confirm passward"></input>
                <button>Signup</button>
                <div className="message">
                    Already signed up ? Click here to <Link to={'/login'} className="hyperlink">Login</Link>.
                </div>
            </form>
        </div>
    )
}

export default Signup;