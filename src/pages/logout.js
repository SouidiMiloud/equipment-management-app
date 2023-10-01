import React, { useEffect } from "react";


const Logout = ()=>{

    useEffect(()=>{
        localStorage.removeItem('jwt');
        window.location.href='/login';
    }, [])

    return(
        <>
        </>
    );
}
export default Logout;