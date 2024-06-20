import React, { useState } from "react";
import '../../styles/form.scss';
import Logo from "../../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../api/api";

const Signup = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cnfpassword: ""
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
            const response = await signin(inputs);
            console.log(response)
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Signup to collabordraw
                    </div>
                </div>
                <input type="text" placeholder="Enter your first name" name="firstName" onChange={handleChange}></input>
                <input type="text" placeholder="Enter your last name" name="lastName" onChange={handleChange}></input>
                <input type="email" placeholder="Enter your email id" name="email" onChange={handleChange}></input>
                <input type="password" placeholder="Enter password" name="password" onChange={handleChange}></input>
                <input type="password" placeholder="Confirm passward" name="cnfpassword" onChange={handleChange}></input>
                <button type="submit">Signup</button>
                <div className="message">
                    Already signed up ? Click here to <Link to={'/login'} className="hyperlink">Login</Link>.
                </div>
            </form>
        </div>
    )
}

export default Signup;