import { Navigate,Outlet } from "react-router-dom";
import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStatus } from "../hooks/useAuthStatus";

const  PrivateRoutes=()=> {
 const {loggedIn,checkingStatus} = useAuthStatus()

if(checkingStatus){
  return <h3>Loading...</h3>
}

  return loggedIn ?  <Outlet/> : <Navigate to='/Sign-in' />
}

export default PrivateRoutes