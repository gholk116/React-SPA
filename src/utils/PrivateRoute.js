import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    let auth = localStorage.getItem("token")!==null&&localStorage.getItem("token")!=="Bearer undefined"; 
    return (
        auth ? <Outlet/> : <Navigate to='/login' replace={true}/>
    )
}
export default PrivateRoutes;