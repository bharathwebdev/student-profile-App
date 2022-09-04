import { setUserId } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import react, { createContext,useEffect,useState } from "react";

export const UserContext = createContext()

export const UserProvider  = (props)=>{
    const auth = getAuth();
    const [User,setUser]  = useState(auth.currentUser)
    const [loading,setLoading] = useState(true)
useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
    setUser(user)
     setLoading(false)
    })

},[loading,auth])



 
    return (
        <UserContext.Provider value={{User,setUser,loading}}>
{props.children}
        </UserContext.Provider>
    )
}