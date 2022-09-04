import React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {getAuth,createUserWithEmailAndPassword,updateProfile}from'firebase/auth'
import { getDoc,doc,serverTimestamp, setDoc  } from 'firebase/firestore';
import { UserContext } from '../userContext';
import { useContext } from 'react';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        student profiler
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignUp() {

  const {User} = useContext(UserContext)
 const navigate  = useNavigate();
  const [showPassword,setshowPassword] = useState(false);
  const [SignUpData,setSignUpData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
  })
  const {email,password,firstName,lastName} = SignUpData;
  SignUpData.fullName = firstName+lastName;
  const handleSubmit =async(event) => {
    event.preventDefault();
try{
 
  const auth  = getAuth();
  const userCredential  = await createUserWithEmailAndPassword(auth,email,password);

  const user = userCredential.user;

  updateProfile(auth.currentUser,{
    displayName:SignUpData.fullName,
  })

  // setuser(user);
  const formDataCopy = {...SignUpData};
  delete formDataCopy.password;
  formDataCopy.timestamp = serverTimestamp();
  await setDoc(doc(db,'users',user.uid),formDataCopy);
 navigate('/');

}catch(err){
  console.log(err)
}

  };

  const handleChange = (e)=>{

    setSignUpData(pre=>({...pre,
      [e.target.name] : e.target.value
    }))
}
console.log(SignUpData)
  return (
    <>
    
    <ThemeProvider theme={theme}>

      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  error={!firstName && true }
                  helperText={(!firstName)&& 'Enter First Name'}
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={!lastName && true }
                  helperText={(!lastName) && 'Enter Last Name'}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!email  ? true : false}
              helperText={!email && 'Enter mail id'}
              onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  error={!password ? true : false}
              helperText={(!password)&& 'Enter password'}
              onChange={handleChange}
                />
              </Grid>
              <div className="eye" 
            onClick={()=>setshowPassword(pre=>!pre)}>
          <p className='showPassword SignUpShow_pass'>Show password</p>
          {showPassword ? <RemoveRedEyeIcon/>:<VisibilityOffIcon/> }

            </div>
    
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}