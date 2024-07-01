import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const Protected = ({ children, authentication = true }) => {
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        const checkauthentication = async () => {

            if (authentication && !currentUser) {
                setLoading(true);
                navigate('/login');
            } else if (!authentication && currentUser) {
                navigate('/');
            }
            setLoading(false);
        }
        checkauthentication();
    }, [authentication, currentUser, navigate]);

    return loading ? <LoadingScreen /> : <>{children}</>
}

export default Protected;