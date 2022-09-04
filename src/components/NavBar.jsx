import { Tune } from '@mui/icons-material';
import { getAuth } from 'firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../components/NavBar.css';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { useEffect } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Menu }from '@mui/material';
import {Tooltip} from '@mui/material';
import {IconButton} from '@mui/material';
import {Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Typography} from '@mui/material';
import { signOut } from 'firebase/auth';

import LogoutIcon from '@mui/icons-material/Logout';
function NavBar() {
  const {User,loading}  = useContext(UserContext);

  // console.log("user",User) 
  const navigate = useNavigate()
  const auth  = getAuth();
  // const flag = true;
  // const [User,setUser] = useState(null)

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);


  };

  return ( 

    <>
     {
      loading ? 'loading...' :
      <nav>
        <p className='logo'>𝓈𝓉𝓊𝒹𝑒𝓃𝓉 𝓅𝓇𝑜𝒻𝒾𝓁𝑒𝓇</p>
       {(!User) ?  <div className='Sign_up_in_links'>
        <Link className='Link ' to='/Sign-in'>Sign In</Link>
        <Link className='Link ' to='/Sign-up'>Sign Up</Link>
        </div> :  <>


        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={User.displayName} src="/static/images/avatar/2.jpg" />
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

                <Link className='link' to='/' >Explore</Link> 
                <Link className='link' to="/profile" >profile</Link>
<div className='logout' onClick={()=>signOut(auth)}>
                <p >Logout</p>
                <LogoutIcon/>

</div>


                </div>


            </Menu>
          
          </Box>
        </>
        
        }
      </nav>
}</>
  )
}

export default NavBar