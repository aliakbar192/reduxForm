import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const userData = useSelector((state) => state.userdata);
    const hasUserData = userData && userData.email && userData.firstName;

    return hasUserData ? <Outlet /> : <Navigate to="/signUp" />;
};

export default PrivateRoutes;
