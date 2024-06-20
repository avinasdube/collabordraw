import React, { useState } from "react";
import '../../styles/form.scss';
import Logo from "../../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import { useDispatch } from "react-redux";
import { userLogin } from "../../reducers/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(inputs);
            dispatch(userLogin(response.data.user))
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form-container">
            <form test-id="form" onSubmit={handleSubmit}>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Login to collabordraw
                    </div>
                </div>
                <input type="email" placeholder="Enter your email id" name="email" onChange={handleChange}></input>
                <input type="password" placeholder="Enter password" name="password" onChange={handleChange}></input>
                <button type="submit">Login</button>
                <div className="message">
                    Not signed up yet ? Click here to <Link to={'/signup'} className="hyperlink">Signup</Link>.
                </div>
            </form>
        </div>
    )
}

export default Login;