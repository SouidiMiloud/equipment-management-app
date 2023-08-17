import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (({children})=>{
    return (localStorage.getItem('jwt') ? children : <Navigate to="/login"/>);
})

export default PrivateRoute;