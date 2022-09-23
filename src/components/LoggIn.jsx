import React from 'react'
import {Menu }from '@mui/material';
import {Tooltip} from '@mui/material';
import {IconButton} from '@mui/material';
import {Box} from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import '../components/NavBar.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreIcon from '@mui/icons-material/Explore';

import '../components/NavBar.css';
import { toast } from 'react-toastify';


function LoggIn() {
    const {User,loading,profilephoto,setprofilePhoto,setLoading}  = useContext(UserContext);

  const navigate = useNavigate()
  const auth  = getAuth(); 
  const location = useLocation();
  

  const [anchorElUser, setAnchorElUser] = React.useState(null);
useEffect(()=>{

  onAuthStateChanged(auth,(user)=>{
  
    // console.log("onauthxchange",user?.photoURL);

    setLoading(true)
     if(user?.photoURL){
        setprofilePhoto(user.photoURL)
     }else {
        setprofilePhoto('https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?w=1380&t=st=1662702911~exp=1662703511~hmac=de171b1d54aec54bf29595b713e76ffd726ce2740d9029d0f67add2d01701fcc')
     }
     setLoading(false)
    })

},[User,auth])
    
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);


  };
  const pathMatchrouter  = (router) =>{

   if(router === location.pathname){
    return true;
   }
   return false;
  }
  let styleobj ={

    backgroundColor: 'primary.dark',
    color:'white'
   
  }
  const LogoutHandle = ()=>{
    signOut(auth) 
    toast.success('successfully Logged out')


  }
  return (

    <Box sx={{ flexGrow: 0 }}>
    <Tooltip  title="Open settings">
      <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
        <Avatar className='avatar'   alt={User.displayName} src={profilephoto}  size="lg" />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={anchorElUser ? true : false}
      onClose={handleCloseUserMenu}
    >
 <div className='menu' onClick={handleCloseUserMenu}>

        <Box sx={pathMatchrouter('/') ? styleobj:{ '&:hover': {
      backgroundColor: 'primary.main',
      opacity: [0.9, 0.8, 0.7],
    }}} className='link'  onClick={()=>navigate('/')} >Explore</Box> 
        <Box sx={pathMatchrouter('/profile') ? styleobj:{ '&:hover': {
      backgroundColor: 'primary.main',
      opacity: [0.9, 0.8, 0.7],
    }}} className='link'onClick={()=>navigate('/profile')}  >profile</Box>
<div className='logout' onClick={LogoutHandle}>
        <p >Logout</p>
        <LogoutIcon/>

</div>


        </div>


    </Menu>
  
  </Box>
  )
}

export default LoggIn