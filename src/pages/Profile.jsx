
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import '../pages/Profile.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box } from '@mui/system';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useContext } from "react";
import { UserContext } from "../userContext";
import ProfileLanguages from '../components/profileLanguages';
import '../components/skills.css'
import EducationInProfile from '../components/EducationInProfile';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import CircularColor from '../components/loading';
import Skills from '../components/skills';
import ProfileHome from '../components/Profile-Home';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import ClgActivityes from '../components/clgActivityes';
import Experience from '../components/Experience';
import uniqid from 'uniqid'
import Certificates from '../components/Certificates';
import { uuidv4 } from '@firebase/util';
import Achivements from '../components/Achivements';
import { db } from '../firebase.config';
import { InfinitySpin } from 'react-loader-spinner';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
function Profile() {
  

  const {User,
    loading,
    profilephoto,
    setprofilePhoto,
    setLoading,
    DarkMode,
    setUserprofileData,
    UserprofileData,
    setpFrom,
    pForm,
    setChange,
    change

}  = useContext(UserContext);

  const [edit,setedit] = useState();
    const navigate = useNavigate();
    const auth = getAuth();

   useEffect(()=>{
    if(!User){
        navigate('/')
      }
   },[User])
 
   useEffect(()=>{
    console.log("this  is loading",loading)
   },[loading])


//   const [profileForm,setprofieFrom] = useState(pForm)


useEffect(()=>{
    
     if(edit===false){
        const colref =doc(db,'profile',pForm.id)
        // console.log(colref)
        updateDoc(colref,pForm)
        
        toast.success('Profile Updated')
        setChange(pre=>!pre)

     }
},[edit])


 useEffect(()=>{
    // if(!User){
    //     navigate('/Sign-in');
    //  }
// setprofieFrom(pForm)
onAuthStateChanged(auth,(user)=>{
  
   setLoading(true)

//    setprofieFrom(pForm)
     if(user?.photoURL){
        setprofilePhoto(user.photoURL)
     }else {
        setprofilePhoto('https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?w=1380&t=st=1662702911~exp=1662703511~hmac=de171b1d54aec54bf29595b713e76ffd726ce2740d9029d0f67add2d01701fcc')
     }
      setLoading(false)
})



 },[User,pForm])

// console.log(profileForm)

     


  

  const handleChange = (e)=>{
      setpFrom(pre=>({...pre,[e.target.getAttribute('name')] :e.target.innerText}))
 }
 

  const handleChangesocialLink = (e)=>{
 
    const obj  = {
        [e.target.getAttribute('name')]:e.target.innerText,
    }
    console.log(obj)
      setpFrom(pre=>({...pre,socilLinks:{...pForm.socilLinks,
        [e.target.getAttribute('name')]:e.target.innerText
    }}))
  }

  
/*==================== DARK LIGHT THEME ====================*/
// if(User){

//     const themeButton = document.getElementById('theme-button')
    
//     const darkTheme = 'dark-theme'
//     const iconTheme = 'bx-sun'

//      if(DarkMode){
//         document.body.classList.add(darkTheme)
//     }else {
//         document.body.classList.remove(darkTheme)
//     }

    

// }
// console.log(document.body)
let color={
    color:'white'
}
console.log()
  return (
    <>
      {(pForm===null || loading)?  <Spinner/>:
     <div className="profile profile_whole_container"> 

      {/* <div className="edit" onClick={()=>setedit(pre=>!pre)}>
     <p>Edit</p>
      {edit ?<EditOutlinedIcon/>:<EditOffOutlinedIcon/>}

    <span>
        
         {edit && <p>you are in Edit Mode</p>}
        </span>

     </div> */}

       {/* <header className="l-header" id="header">
            <nav className="nav bd-container">
                <p className="nav__logo">Aravindhan S</p>

                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">
                                <i className='bx bx-home nav__icon'></i>Home
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#profile" className="nav__link">
                                <i className='bx bx-user nav__icon'></i>Profile
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#education" className="nav__link">
                                <i className='bx bx-book nav__icon'></i>Education
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#skills" className="nav__link">
                                <i className='bx bx-receipt nav__icon'></i>Skills
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#experience" className="nav__link">
                                <i className='bx bx-briefcase-alt nav__icon'></i>Experience
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#certificates" className="nav__link">
                                <i className='bx bx-award nav__icon'></i>Certificates
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#What_i_do/did" className="nav__link">
                                <i className='bx bxs-data nav__icon'></i>College Activities
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="nav__toggle" id="nav-toggle">
                    <i className='bx bx-grid-alt' ></i>
                </div>
            </nav>
        </header> */}

        <main suppressContentEditableWarning={true} className="l-main bd-container">
            {/* <!-- All elements within this div, is generated in PDF --> */}
            <div className="resume" id="area-cv">
                <div className="resume__left">
                    {/* <!--========== HOME ==========--> */}
                    <section className="home" id="home">

                         <ProfileHome handleChange={handleChange} 
                         handleChangesocialLink={handleChangesocialLink}
                          edit={edit} 
                          pForm={pForm}
                          />


                        {/* <!-- Theme change button --> */}
                        {/* <DarkModeIcon className={`bx bx-moon change-theme ${DarkMode && 'bx-sun' } `} title="Theme" id="theme-button"/> */}
                        {/* <i className='bx bx-moon change-theme' title="Theme" id="theme-button"></i> */}
                        <div onClick={()=>setedit(pre=>!pre)} className='edit'  >
                        {!edit ? <EditOffOutlinedIcon sx={{fontSize:'1.4rem'}} /> :
                         <EditTwoToneIcon  sx={{fontSize:'1.4rem'}}  /> 
                        }
                        </div>
                        <div className='download_btn_small'>
                        <FileDownloadOutlinedIcon className='bx bx-download generate-pdf' title="Generate PDF" id="resume-button"/>
                        </div>
                
                        {/* <i class='bx bx-download generate-pdf' title="Generate PDF" id="resume-button"></i> */}

                        {/* <!-- Button to generate and download the pdf. Available for desktop. --> */}

                    </section>

                    {/* <!--========== SOCIAL ==========--> */}
                    <section className="social section">
                        <h2 className="section-title">SOCIAL</h2>


                         { edit && <LinkedInIcon className='bx bxl-linkedin-square social__icon'   />}
                        <div className="social__container bd-grid">
                            
                            { !edit && <LinkedInIcon className='bx bxl-linkedin-square social__icon'   />}
                            <a href={pForm.socilLinks.LinkedIn_Link} 
                             target='_blank' 
                            className="social__link"
                            name="LinkedIn_Name" 
                            contentEditable={edit}  
                            onBlur={handleChangesocialLink}   
                            suppressContentEditableWarning={true}
                            dangerouslySetInnerHTML={{__html:pForm.socilLinks.LinkedIn_Name}}

                            >
                            
  
                    {/* <p dangerouslySetInnerHTML={{__html:profileForm.socilLinks.LinkedIn_Name}}></p> */}


                            </a>
                          


                            {edit && <p  
                            name="LinkedIn_Link" 
                            contentEditable={edit}  
                            onBlur={handleChangesocialLink}          
                            suppressContentEditableWarning={true}
                              dangerouslySetInnerHTML={{__html:pForm.socilLinks.LinkedIn_Link}}   >


                             </p>}

                            
{/* for git  hub  */}



     
 <GitHubIcon className='bx bxl-github social__icon'/>
                            <a href={pForm.socilLinks.git_Link}  
                            target="_blank" 
                            className="social__link" 
                             name="git_Name" 
                             contentEditable={edit}  
                             suppressContentEditableWarning={true}
                             onBlur={handleChangesocialLink}
                             dangerouslySetInnerHTML={{__html:pForm.socilLinks.git_Name}}
                             >
                            
                            </a>
                            {edit && 
                            <p  
                            name="git_Link"
                             contentEditable={edit}  
                             onBlur={handleChangesocialLink}   
                             defaultValue={pForm.socilLinks.git_Link}     
                            
                             suppressContentEditableWarning={true}
                            dangerouslySetInnerHTML={{__html:pForm.socilLinks.git_Link}}
                             >
                            </p>}
                        </div>
                    </section>

                    {/* <!--========== PROFILE ==========--> */}
                    <section className="profile section" id="profile">
                        <h2 className="section-title">Profile</h2>

                        <p align="justify" name="Profile" 
                        contentEditable={edit}          
                        suppressContentEditableWarning={true} 
                        onBlur={handleChange}
                        dangerouslySetInnerHTML={{__html:pForm.Profile}}
                        >
                            
                            
</p>
                    </section>

                    {/* <!--========== EDUCATION ==========--> */}
                    <section className="education section" id="education">
                        <h2 className="section-title">Education</h2>

                        <div className="education__container bd-grid">
                         <EducationInProfile 

                         
                         edit={edit} />
                        </div>
                      
                    </section>


                    {/* <!--========== SKILLS  ==========--> */}
                    <section className="skills section" id="skills">
                        <h2 className="section-title">Skills</h2>
                                    <Skills profileForm={ pForm} setprofieFrom={setpFrom}  edit={edit} />
                        
                    </section>

                </div>

                <div className="resume__right">
                    {/* <!--========== EXPERIENCE ==========--> */}
                    <section className="experience section" id="experience">
                        <h2 className="section-title">Experience</h2>
                                <Experience    profileForm={pForm} setprofieFrom={setpFrom} edit={edit}/>
                      
                    </section>

                    {/* <!--========== CERTIFICATES ==========--> */}
                    <section className="certificate section" id="certificates">
                        <h2 className="section-title">Certificates</h2>
                                    <Certificates profileForm={pForm} 
                                    setprofieFrom={setpFrom} 
                                    edit={edit}
                                    
                                    />
                        

                    </section>
                    {/* <!--========== What i do/did ==========--> */}
                    <section className="What i do/did section" id="What_i_do/did">
                        <h2 className="section-title">College Activities</h2>
                                <ClgActivityes profileForm={pForm} setprofieFrom={setpFrom}edit={edit}/>
                    </section>
                    {/* <!--========== ACHIEVEMENT ==========--> */}
                    <section className="certificate section" id="certificates">
                        <h2 className="section-title">Achievements</h2>
                                    <Achivements profileForm={pForm} setprofieFrom={setpFrom}edit={edit}/>
                    </section>
                    {/* <!--========== INTERESTS ==========--> */}
                    <section className="interests section">
                        <h2 className="section-title">Interests</h2>

                        <div className="interests__container bd-grid">
                            <div className="interests__content">
                                <i className='bx bx-cricket-ball interests__icon' ></i>
                                <span className="interests__name">Sports</span>
                            </div>
                            <div className="interests__content">
                                <i className='bx bx-music interests__icon' ></i>
                                <span className="interests__name">Music</span>
                            </div>
                            <div className="interests__content">
                                <i className='bx bx-code interests__icon' ></i>
                                <span className="interests__name">Coding</span>
                            </div>
                            <div className="interests__content">
                                <i className='bx bx-joystick interests__icon' ></i>
                                <span className="interests__name">Gaming</span>
                            </div>
                            <div className="interests__content">
                                <i className='bx bxs-plane-alt interests__icon' ></i>
                                <span className="interests__name">Travel</span>
                            </div>
                            <div className="interests__content">
                                <i className='bx bx-dumbbell interests__icon' ></i>
                                <span className="interests__name">Gym</span>
                            </div>
                        </div>
                    </section>

                    {/* <!--========== LANGUAGES ========== --> */}
                    <section className="languages section">
                        <h2 className="section-title">Languages</h2>

                       
                           <ProfileLanguages profileForm={pForm} setprofieFrom={setpFrom}edit={edit}/>
                    
                    </section>
                </div>
            </div>
        </main>

        {/* <!--========== SCROLL TOP ==========--> */}
        <a href="#" className="scrolltop" id="scroll-top">
            <i className='bx bx-up-arrow-alt scrolltop__icon' ></i>
        </a>

                              

                              

     </div>}

                              
                              </>

  )
}

export default Profile