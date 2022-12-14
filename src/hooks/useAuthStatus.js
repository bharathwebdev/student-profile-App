import { useEffect,useState } from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
export const useAuthStatus = ()=>{
    const [loggedIn,setLoggedIn] = useState(false);
    const [checkingStatus,setCheckingStatus] = useState(true);
    const auth = getAuth()
    useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
    if(user){

        setLoggedIn(true)
    }
    setCheckingStatus(false)
})
    })

    return {loggedIn,checkingStatus}

}