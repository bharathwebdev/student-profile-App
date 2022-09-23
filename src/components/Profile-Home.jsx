import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { async, uuidv4 } from '@firebase/util';
import { updateProfile } from 'firebase/auth';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import '../pages/Profile.css'
import CircularColor from './loading';
import { CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { Co2Sharp } from '@mui/icons-material';

function ProfileHome({handleChange,edit}) {
    const {User,loading,profilephoto,setprofilePhoto,setLoading,DarkMode,setChange,pForm}  = useContext(UserContext);
    const [Progress,setProgress] = useState(0);
    const [imgload,setimgload] = useState(false);
    const imgupload  = (e)=>{
        const  image  = e.target.files[0];

       
        const uploadProfileImg =async(e)=>{
           
            return new Promise((resolve,reject)=>{
               const storage = getStorage();
               const fileName = `${User.uid}-${image.name}-${uuidv4()}`
               const storageRef = ref(storage,'images/'+User.uid+'/profile/'+fileName)
       
               const uploadTask = uploadBytesResumable(storageRef, image);
               uploadTask.on('state_changed', 
            (snapshot) => {
              setimgload(true);

           // Observe state change events such as progress, pause, and resume
           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log('Upload is ' + progress + '% done');
           setProgress(progress)
           switch (snapshot.state) {
             case 'paused':
               console.log('Upload is paused');
               break;
             case 'running':
               console.log('Upload is running');

               break;
           }
         }, 
         (error) => {
          reject(error)
         }, 
         () => {
           // Handle successful uploads on complete
           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const auth = getAuth()
                resolve(downloadURL);
  
                updateProfile(auth.currentUser,{
                    photoURL:downloadURL,
                }).then((down)=>{
                     setChange(pre=>!pre)
                     setimgload(false);
                     console.log("this" ,down)
                }).catch((error)=>{
                        toast.error('Oops something went wrong')
                })
              
           });
         }
       );
               
            })
        }
        
        const imgUrl = new Promise(()=>{
    
            uploadProfileImg(image)
        }
            ).catch(error=>{
                console.log(error)
            })
            

    }
// console.log("photo",profilephoto==true)
// console.log(User)
  return (
    <>
     
    <div className="home__container section bd-grid">
    <div className="home__data bd-grid">
        <div className="profile_img_edit_section">
          <div className='img_div_profile'>
       <img src={(profilephoto ? profilephoto : 'https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?w=1380&t=st=1662702911~exp=1662703511~hmac=de171b1d54aec54bf29595b713e76ffd726ce2740d9029d0f67add2d01701fcc')} alt="profile pic" className="home__img" placeholder='profile image'/>

          </div>
     {(imgload)&&<div className='imgload'> <CircularColor   /></div>}
       {edit && <label  htmlFor='profilePhoto' >
   <AddPhotoAlternateIcon sx={{ fontSize: 40,background:'white',padding:'5px',borderRadius:'50%',cursor:'pointer' }} className='Profile_Edit_icon'/>
        </label> }

        </div> 
        {edit &&
        <div> 
            <input  className='profilePhoto' onChange={(e)=>imgupload(e)}  id='profilePhoto' name='profilePhoto' type='file'  /> 
        </div> }


        <h1 className="home__title">
            <b name="name"
             contentEditable={edit}  

             onBlur={handleChange}             
             suppressContentEditableWarning={true}
             dangerouslySetInnerHTML={{__html:pForm.name}}
             >
                </b>
                </h1>
        <h3 className="home__profession" 
        contentEditable={edit} 
        name="profession" 
         onBlur={handleChange} 


        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{__html:pForm.profession}}
        >
 </h3>
        <div>
           { !edit && <a download="" href="assets/pdf/" className="home__button-movil" >Download</a>}
        </div>


        
    </div>

    <div className="home__address bd-grid">
        <span className="home__information">
            <LocationOnOutlinedIcon  className='bx bx-map home__icon'/>
            <p name="location" 

            contentEditable={edit}  

            onBlur={handleChange}     
             suppressContentEditableWarning={true}



             dangerouslySetInnerHTML={{__html:pForm.location}}

             >
                </p>
        </span>
        <span className="home__information">
             <EmailIcon className='bx bxs-envelope home__icon' />
             <p style={{color:DarkMode && 'white'}}
              name="email" 
              contentEditable={edit}   
              onInput={handleChange}
              onBlur={handleChange}            
               suppressContentEditableWarning={true}
               dangerouslySetInnerHTML={{__html:pForm.email}}
               > 
               </p>
        </span>
        <span className="home__information">
            <PhoneAndroidIcon className='bx bx-phone home__icon'/>
            <p style={{color:DarkMode && 'white'}}
             name="phoneNo"
              contentEditable={edit}  
              onBlur={handleChange}     
              suppressContentEditableWarning={true}
              dangerouslySetInnerHTML={{__html:pForm.phoneNo}}
              >
               </p>
        </span>
    </div>
</div>

</>
  )
}

export default ProfileHome;