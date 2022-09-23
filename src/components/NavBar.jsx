
import React from 'react'
import { Link } from 'react-router-dom';

import '../components/NavBar.css';
import { UserContext } from '../userContext';
import { useContext } from 'react';

import { DarkMode } from '@mui/icons-material';

import CircularColor from './loading';
import CustomizedSwitches from './Darkmode';

import LoggIn from './LoggIn';
import Spinner from './Spinner';

function NavBar() {
  const {loading,User} = useContext(UserContext)


  return ( 

    <>
    {loading ?  <Spinner/>: 
      <nav>
        <p className='logo'>𝓈𝓉𝓊𝒹𝑒𝓃𝓉 𝓅𝓇𝑜𝒻𝒾𝓁𝑒𝓇</p>
        <CustomizedSwitches/>
       {(!User) ?  <div className='Sign_up_in_links'>
        <Link className='Link ' to='/Sign-in'>Sign In</Link>
        <Link className='Link ' to='/Sign-up'>Sign Up</Link>
        </div> :  <>
           
         {User &&<LoggIn/>}
        </>
         
        } 
      </nav>
}
</>
  )
}

export default NavBar