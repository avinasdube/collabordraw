import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
    const [loading, setLoading] = useState(true);
    const currentUsrDetails = useSelector(state => state.auth.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        const checkauthentication = async () => {
            if (authentication && !currentUsrDetails) {
                navigate('/login');
            } else if (!authentication && currentUsrDetails) {
                navigate('/');
            }
            setLoading(false);
        }
        checkauthentication();
    }, [authentication, currentUsrDetails, navigate]);

    return loading ? <>"Loading"</> : <>{children}</>
}

export default Protected;