// import { Avatar } from "@mui/material";
// import userEvent from "@testing-library/user-event";


import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import {DownloadIcon} from '@mui/icons-material/Download';
import '../pages/Profile.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useContext } from "react";
import { UserContext } from "../userContext";
import EditCaretPositioning from '../caretPositioning';
import { ConstructionOutlined, Html } from '@mui/icons-material';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import EducationInProfile from '../components/EducationInProfile';
import { Button } from '@mui/material';
function Profile() {
  

  const {User,loading}  = useContext(UserContext);
  const [edit,setedit] = useState(false);
    const navigate = useNavigate();
// console.log(displayName,email)
const [cursor,setcursor] = useState({
    start:0,
    end:0,
})

  const [profileForm,setprofieFrom] = useState({
     name:User?.displayName,
     profession:'STUDENT | SOFTWARE ENGINEER ',
     location:'KANCHIPURAM',
      email:User?.email,
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
            instuteName:'Sri Jayendra Golden Jubilee School,Kanchipuram.',
            mark:'CGPA - 9.4',
            duration:'2016 - 2017',
            isLast:true,
        }
      ]
 
   


 });
 useEffect(()=>{

    
   setprofieFrom(pre=>({...pre,name:User?.displayName,email:User?.email}))


 },[loading])



if(!User){
   navigate('/');
}
  

  const handleChange = (e)=>{
      setprofieFrom(pre=>({...pre,[e.target.getAttribute('name')] :e.target.innerText}))
 }
 

  const handleChangesocialLink = (e)=>{
 
    const obj  = {
        [e.target.getAttribute('name')]:e.target.innerText,
    }
    console.log(obj)
      setprofieFrom(pre=>({...pre,socilLinks:{...profileForm.socilLinks,
        [e.target.getAttribute('name')]:e.target.innerText
    }}))
  }

  return (
    <>
    {!loading ?
     <div className="profile"> 
      <div className="edit" onClick={()=>setedit(pre=>!pre)}>
     <p>Edit</p>
      {edit ?<EditOutlinedIcon/>:<EditOffOutlinedIcon/>}

    <span>
        
         {edit && <p>you are in Edit Mode</p>}
        </span>
     </div>
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
                        <div className="home__container section bd-grid">
                            <div className="home__data bd-grid">
                                <img contentEditable={edit} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS4QidFaZYBUsAO_ostR0S-m5nyF3u55L4dvn09QKrcTv5gzTmx80sfa-Rz48qJrKmAF4&usqp=CAU" alt="" className="home__img"/>


                                <h1 className="home__title">
                                    <b name="name"
                                     contentEditable={edit}  
                                     onBlur={handleChange}             
                                     suppressContentEditableWarning={true}>

                                        {User?.displayName}
                                        </b></h1>
                                <h3 className="home__profession" contentEditable={edit} name="profession"  onBlur={handleChange}    suppressContentEditableWarning={true}>{profileForm.profession} </h3>
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





                                     >
                                                {profileForm.location}
                                        </p>
                                </span>
                                <span className="home__information">
                                     <EmailIcon className='bx bxs-envelope home__icon' /><p name="email" contentEditable={edit}   onBlur={handleChange}             suppressContentEditableWarning={true}> {User?.email}</p>
                                </span>
                                <span className="home__information">
                                    <PhoneAndroidIcon className='bx bx-phone home__icon'/><p name="phoneno" contentEditable={edit}  onBlur={handleChange}        suppressContentEditableWarning={true}>  8248832238</p>
                                </span>
                            </div>
                        </div>


                        {/* <!-- Theme change button --> */}
                        <DarkModeIcon className='bx bx-moon change-theme' title="Theme" id="theme-button"/>
                        {/* <i className='bx bx-moon change-theme' title="Theme" id="theme-button"></i> */}

                        <FileDownloadIcon className='bx bx-download generate-pdf' title="Generate PDF" id="resume-button"/>
                        {/* <!-- Button to generate and download the pdf. Available for desktop. --> */}

                    </section>

                    {/* <!--========== SOCIAL ==========--> */}
                    <section className="social section">
                        <h2 className="section-title">SOCIAL</h2>

                         { edit && <LinkedInIcon className='bx bxl-linkedin-square social__icon'   />}
                        <div className="social__container bd-grid">
                            <a href={profileForm.socilLinks.LinkedIn_Link} 
                             target='_blank' 
                            className="social__link"
                            name="LinkedIn_Name" 
                            contentEditable={edit}  
                            onBlur={handleChangesocialLink}   
                            suppressContentEditableWarning={true}
                            >
                         { !edit && <LinkedInIcon className='bx bxl-linkedin-square social__icon'   />}
                            
  
                      <p>  {profileForm.socilLinks.LinkedIn_Name}</p>


                            </a>
                          
                            {edit && <p  
                            name="LinkedIn_Link" 
                            contentEditable={edit}  
                            onBlur={handleChangesocialLink}          
                            suppressContentEditableWarning={true}>
                                
                             {profileForm.socilLinks.LinkedIn_Link}

                             </p>}

                            
{/* for git  hub  */}


{edit && <GitHubIcon className='bx bxl-github social__icon'/>}
     
                            <a href={profileForm.socilLinks.git_Link}  
                            target="_blank" 
                            className="social__link" 
                             name="git_Name" 
                             contentEditable={edit}  
                             suppressContentEditableWarning={true}
                             onBlur={handleChangesocialLink}>
                               {!edit && <GitHubIcon className='bx bxl-github social__icon'/>}<p>{profileForm.socilLinks.git_Name} </p>
                            </a>
                            {edit && 
                            <p  
                            name="git_Link"
                             contentEditable={edit}  
                             onBlur={handleChangesocialLink}   
                             defaultValue={profileForm.socilLinks.git_Link}     
                            
                             suppressContentEditableWarning={true}>{profileForm.socilLinks.git_Link}</p>}
                        </div>
                    </section>

                    {/* <!--========== PROFILE ==========--> */}
                    <section className="profile section" id="profile">
                        <h2 className="section-title">Profile</h2>

                        <p align="justify" name="Profile" 
                        contentEditable={edit}          
                        suppressContentEditableWarning={true} 
                        onBlur={handleChange}>An enthusiastic individual seeking a challenging position in an organization which will provide me the opportunity to improve my skills and knowledge to grow along with the organization's objective.</p>
                    </section>

                    {/* <!--========== EDUCATION ==========--> */}
                    <section className="education section" id="education">
                        <h2 className="section-title">Education</h2>

                        <div className="education__container bd-grid">
                         <EducationInProfile 
                         profileForm={profileForm} 
                         setprofieFrom={setprofieFrom} 
                         edit={edit} />
                        </div>
                      
                    </section>


                    {/* <!--========== SKILLS  ==========--> */}
                    <section className="skills section" id="skills">
                        <h2 className="section-title">Skills</h2>

                        <div className="skills__content bd-grid">
                            <ul className="skills__data">
                                <li className="skills__name">
                                    <span className="skills__circle"></span> C/C++
                                </li>
                                <li className="skills__name">
                                    <span className="skills__circle"></span> Python
                                </li>
                                <li className="skills__name">
                                    <span className="skills__circle"></span> Javascript
                                </li>
                            </ul>

                            <ul className="skills__data">
                                <li className="skills__name">
                                    <span className="skills__circle"></span> Java
                                </li>
                                <li className="skills__name">
                                    <span className="skills__circle"></span> HTML/CSS
                                </li>
                                <li className="skills__name">
                                    <span className="skills__circle"></span> DBMS
                                </li>
                            </ul>
                        </div>
                    </section>

                </div>

                <div className="resume__right">
                    {/* <!--========== EXPERIENCE ==========--> */}
                    <section className="experience section" id="experience">
                        <h2 className="section-title">Experience</h2>

                        <div className="experience__container bd-grid">
                            <div className="experience__content">
                                <div className="experience__time">
                                    <span className="experience__rounder"></span>
                                    <span className="experience__line"></span>
                                </div>

                                <div className="experience__data bd-grid">
                                    <h3 className="experience__title">Virtual Internship</h3>
                                    <span className="experience__company">FutureReadyTalent | Microsoft</span>
                                    <p className="experience__description">10/2021 - 01/2022.</p>
                                </div>
                            </div>
                            {/* <!-- <div className="experience__content">
                                <div className="experience__time">
                                    <span className="experience__rounder"></span>
                                    <span className="experience__line"></span>
                                </div>

                                <div className="experience__data bd-grid">
                                    <h3 className="experience__title">MODEL DEPLOYMENT</h3>
                                    <span className="experience__company">From 2025 to 2029 | SIM</span>
                                    <p className="experience__description">Work in this company dedicating the best responsibility in the area that corresponds, delivering the best results for the company and improving productivity.</p>
                                </div>
                            </div> --> */}
                            <div className="experience__content">
                                <div className="experience__time">
                                    <span className="experience__rounder"></span>
                                    {/* <!-- <span className="experience__line"></span>  --> */}
                                </div>

                                <div className="experience__data bd-grid">
                                    <h3 className="experience__title">Coordinated National Level Tech Fest</h3>
                                    <span className="experience__company">Coordinated National level Debugging Event . </span>
                                    <p className="experience__description">08/2022 </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!--========== CERTIFICATES ==========--> */}
                    <section className="certificate section" id="certificates">
                        <h2 className="section-title">Certificates</h2>

                        <div className="certificate__container bd-grid">
                            <div className="certificate__content">
                                <h3 className="certificate__title"> Google IT Support | Coursera - Nov 2021 <a className='section-title bx bx-link bx-tada' target="_blank" href="https://www.coursera.org/account/accomplishments/specialization/certificate/SDBBLPQYFUMZ"></a></h3>
                                <p className="certificate__description"> Learned the fundamentals of IT and the various skills required for networking, troubleshooting and customer support.</p>
                            </div>

                            <div className="certificate__content">
                                <h3 className="certificate__title">Programming in Java | Nptel - April 2022 <a className='section-title bx bx-link bx-tada' target="_blank" href="https://archive.nptel.ac.in/content/noc/NOC22/SEM1/Ecertificates/106/noc22-cs47/Course/NPTEL22CS47S4451012302045060.jpg"></a></h3>
                                <p className="certificate__description">Learned about the concepts of OOPs using Java..</p>
                            </div>

                            <div className="certificate__content">
                                <h3 className="certificate__title">Discovering Computer Networks: Open Networking Lab | The Open University - April 2021 <a className='section-title bx bx-link bx-tada' target="_blank" href="https://www.open.edu/openlearn/blocks/ocwstatement/statement.php?id=5382&user=2811858&f=1"></a></h3>
                                <p className="certificate__description">Learned about setting up, configuring and troubleshooting simulated computer networks.</p>
                            </div>

                            <div className="certificate__content">
                                <h3 className="certificate__title">Business English Certificate Preliminary | Cambridge University - May 2021 <a className='section-title bx bx-link bx-tada' target="_blank" href="https://github.com/Aravind4202/BEC_cert/blob/main/AravindhanS-BEC.pdf"></a></h3>
                                <p className="certificate__description"> BEC exam certificate to assess my reading, writing, speaking and listening skills.</p>
                            </div>
                        </div>
                    </section>
                    {/* <!--========== What i do/did ==========--> */}
                    <section className="What i do/did section" id="What_i_do/did">
                        <h2 className="section-title">College Activities</h2>
                        <div>
                            <div>
                                <ul style={{listStyleType:'disc'}}>
                                    
                                    <li className = "li_what_i_do profile__description">Conducted a Technical Event event called How You Buggin' for Drestein'21</li>
                                    <li className = "li_what_i_do profile__description">Participated in a workshop on Data analysis using Google Big Query and Ethical Hacking</li>
                                    <li className = "li_what_i_do profile__description">Developed "JARVIS X" - An AI based virtual/personal voice assistant with Security Pin for college mini-project</li>

                                </ul>
                            </div>
                        </div>
                    </section>
                    {/* <!--========== ACHIEVEMENT ==========--> */}
                    <section className="certificate section" id="certificates">
                        <h2 className="section-title">Achievements</h2>
                        <div className="certificate__container bd-grid">
                            <div className="certificate__content">
                                {/* <!-- <h3 className="certificate__title">Awards & Honours</h3> --> */}
                                 <li className = "li_what_i_do profile__description">Coordinated National Level Tech Fest Drestein'21</li>
                             </div>
                             <div className="certificate__content">
                                {/* <!-- <h3 className="certificate__title">Awards & Honours</h3> --> */}
                                 <li className = "li_what_i_do profile__description">Placement achieved in Virtusa</li>
                             </div>
                            {/* <!-- <div className="certificate__content">
                                <h3 className="certificate__title">Leadership</h3>
                                <li className = "li_what_i_do" className="profile__description">Leader of OWASP - Sathyabama Student Chapter<a className='section-title bx bx-link bx-tada' target="_blank" href="https://owasp.org/www-chapter-sathyabama-institute-of-science-and-technology/"></a></li>
                            </div> --> */}
                        </div>
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

                        <div className="languages__container">
                            <ul className="languages__content bd-grid">
                                <li className="languages__name">
                                    <span className="languages__circle"></span> English
                                </li>
                                <li className="languages__name">
                                    <span className="languages__circle"></span> Tamil
                                </li> 
                                {/* <!--<li className="languages__name">
                                    <span className="languages__circle"></span> Hindi
                                </li>--> */}
                                
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </main>

        {/* <!--========== SCROLL TOP ==========--> */}
        <a href="#" className="scrolltop" id="scroll-top">
            <i className='bx bx-up-arrow-alt scrolltop__icon' ></i>
        </a>

                              

                              

     </div>
                              :<h1>Loading...</h1>} 
                              </>

  )
}

export default Profile