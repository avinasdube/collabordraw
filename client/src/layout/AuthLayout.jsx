import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { getuser } from "../api/api";
import { useSelector } from "react-redux";

const Protection = ({ children, authentication = true }) => {
    const currentUser = useSelector(state => state.auth.currentUser);

    const navigate = useNavigate();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (authentication && !currentUser) {
            navigate('/login')
        } else if (!authentication && currentUser) {
            navigate('/');
        }
        setloading(false);
    }, [authentication, currentUser, navigate]);

    return loading ? <LoadingScreen /> : <>{children}</>
}

export default Protection;