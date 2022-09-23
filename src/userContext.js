import { setUserId } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import react, { createContext,useEffect,useState } from "react";
import { db } from "./firebase.config";
import { uuidv4 } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, snapshotEqual } from "firebase/firestore";
import { setRef } from "@mui/material";



export const UserContext = createContext()

export const UserProvider  = (props)=>{
    const auth = getAuth();
    const navigate = useNavigate();
    const [User,setUser]  = useState(auth.currentUser)
    const [profilephoto,setprofilePhoto] = useState('https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?w=1380&t=st=1662702911~exp=1662703511~hmac=de171b1d54aec54bf29595b713e76ffd726ce2740d9029d0f67add2d01701fcc');
    const [loading,setLoading] = useState(true)
    const [DarkMode,setDarkMode] = useState(false)
    const [change,setChange] = useState(false)


    const [UserprofileData,setUserprofileData] = useState(
        {   

           
            photoURL:profilephoto,
            profession:'STUDENT | SOFTWARE ENGINEER ',
            location:'KANCHIPURAM',
            phoneNo :'893907****',
            socilLinks:{
                 git_Name:'your github name',
                 git_Link:'http://localhost:3000/profile',
       
       
                 LinkedIn_Name:'your linkedIn name',
                 LinkedIn_Link:'http://localhost:3000/profile',
       
               },
                 
       
             Profile:"An enthusiastic individual seeking a challenging position in an organization which will provide me the opportunity to improve my skills and knowledge to grow along with the organization's objective.",
             Education:[
               {    
                   id:1,
                   educationTitle:'B.Tech INFORMATION TECHNOLOGY',
                   instuteName:'SAVEETHA ENGINEERING COLLEGE',
                   mark:'CGPA - 8.4',
                   duration:'2019 - PRESENT',
                   isLast:false,
               },
               {    
                   id:2,
                   educationTitle:'12TH',
                   instuteName:'Sri Jayendra Golden Jubilee School,Kanchipuram.',
                   mark:'Percentage - 74%',
                   duration:'2018 - 2019',
                   isLast:false,
       
               }
               ,
               {
       
                   id:3,
                   educationTitle:'10TH',
                   instuteName:'Sri Jayendra Golden Jubilee School,Kanchipurm.',
                   mark:'CGPA - 9.4',
                   duration:'2016 - 2017',
                   isLast:true,
               }
             ],
             skills:['C++','Java','HTML','CSS'],
             Experience:[
               {
               id:uuidv4(),
               experience__title:'Virtual Internship',
               experience__company:'FutureReadyTalent | Microsoft',
               experience__description:'10/2021 - 01/2022.'
       
             },
             {
               id:uuidv4(),
               experience__title:'Coordinated National Level Tech Fest',
               experience__company:'Coordinated National level Debugging Event . ',
               experience__description:'08/2022 '
       
             }
           ],
       
           certificates:[
               {  
                   id:uuidv4(),
                   certificate__title:'Google IT Support | Coursera - Nov 2021',
                   certificate__description:'Learned the fundamentals of IT and the various skills required for networking, troubleshooting and customer support.',
                   link:'https://lh3.googleusercontent.com/REeaiWLcRwALbGrxPRgHgZey_feHsjPUYHlmTdMqZgAVSnnvza_sJkyTm861GoUnRI16lXueSCQTToGLur-_jvaZVMka4wSoRMs2eA',
               }
           ],
           CollegeActivities:[
               {
                 id:uuidv4(),
                 activity:"Conducted a Technical Event event called How You Buggin' for Drestein'21"
               },
               {
                   id:uuidv4(),
                   activity:"Participated in a workshop on Data analysis using Google Big Query and Ethical Hacking"
               }
           ],
           Achivements:[
               {
          id:uuidv4(),
          achived:"Coordinated National Level Tech Fest Drestein'21"
           },
           {
               id:uuidv4(),
               achived:"Placement achieved in Virtusa"
                }
       ],
       Languages:[
           {
               id:uuidv4(),
               lang:'tamil',
       
           },
           {
               id:uuidv4(),
               lang:'English',
               
           }
       ]
          
       
       
        }
    );
    const [pForm,setpFrom] = useState(null)

useEffect(()=>{
    // console.log('from context : ',pForm)
    onAuthStateChanged(auth,(user)=>{
    
    setLoading(true)

        const colref =collection(db,'profile');

        getDocs(colref)
        .then((snapshot)=>{
    snapshot.docs.forEach(data=>{



        
        if(user?.uid==data.data().id){
            console.log('from context : ',data.data())
            setpFrom({...data.data()})

        }
        setLoading(false)
    })
        })
        setUser(user);


        if(user?.photoURL){
            setprofilePhoto(user?.photoURL);
            
        }else{
            setprofilePhoto('https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?w=1380&t=st=1662702911~exp=1662703511~hmac=de171b1d54aec54bf29595b713e76ffd726ce2740d9029d0f67add2d01701fcc')
        }
    setUser(user)

    })


},[auth,auth?.currentUser,change])


// useEffect(()=>{
// setLoading(true)
//     onAuthStateChanged(auth,(user)=>{
//     const fetchdata = async ()=>{

//         const colref =collection(db,'profile');
//         const result = await getDocs(colref)

//          const json = await result.docs.forEach(data=>{
//                     if(data.data().id==user.uid){
//                         setpFrom(data.data())
//                         setLoading(false)

//                     }
//          })
  
//     }

//     fetchdata();
// })
// },[])

 
    return (
        <UserContext.Provider value={{User,
        setUser,
        loading,
        profilephoto,
        setprofilePhoto,
        setLoading,
        DarkMode,
        setDarkMode,
        change,
        setChange,
        UserprofileData,
        setUserprofileData,

        pForm,
        setpFrom

        }}>
{props.children}
        </UserContext.Provider>
    )
}