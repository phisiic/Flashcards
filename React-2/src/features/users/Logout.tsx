import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

export const Logout = () => {
    const navigate = useNavigate();
    const { setLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Remove the tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');

        setLoggedIn(false);

        // Navigate to the login page
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h1>Logout</h1>
        </div>
    );
};
