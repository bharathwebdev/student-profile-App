
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Link from '@mui/material/Link';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../userContext';
import { toast } from 'react-toastify';
import { LineStyle } from '@mui/icons-material';

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

export default function SignIn() {

const navigate = useNavigate();
const {setLoading,loading} = useContext(UserContext);
const [starterrro,setstarterror] = useState(false);
const [showPassword,setshowPassword] = useState(false);
const [SigninData,setSigninData] = useState({
  email:'',
  password:'',
})

const {email,password} = SigninData;
useEffect(()=>{
   const auth = getAuth()
   if(auth.currentUser){
    navigate('/')
   }
},[])
const err = "Firebase: Error (auth/invalid-email)"

  const handleSubmit = async(event) => {
  
    event.preventDefault();
    setLoading(true);
    
    try{
        
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
     if(userCredential.user){
      //  setuser(userCredential.user)
      navigate('/')
      toast.success('successfully logged in')
      setLoading(false)
     }
    }catch(error){
  setLoading(false);
  const err = JSON.stringify(error.message);
  console.log(err)
  const a = err.split(' ')
  console.log(a)

  const b = a[a.length-1].split('/')
  console.log(b)
  const c = b[b.length-1].split(')')
  console.log(c)
  console.log(c[0])
  toast.error(c[0])
//  console.log(error)

    }
  };
  const handleChange = (e)=>{
      setstarterror(true);
      setSigninData(pre=>({...pre,
        [e.target.name] : e.target.value
      }))
}

  console.log(SigninData)

  return (<>
  
    <ThemeProvider  theme={theme}>
      <Container sx={{
        zIndex:'1'
      }} component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
              error={!email && starterrro  ? true : false}
              helperText={(!email&& starterrro)&& 'Enter mail id'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text':'password'}
              id="password"
              value={password}
              error={!password && starterrro ? true : false}
              helperText={(!password&&starterrro) && 'Enter password' }
              autoComplete="current-password"
              onChange={handleChange}
            />
            <div className="eye" 
            onClick={()=>setshowPassword(pre=>!pre)}>
          <p className='showPassword'>Show password</p>
          {showPassword ? <RemoveRedEyeIcon/>:<VisibilityOffIcon/> }

            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <div className='Oauth'>
<h5>OR</h5>
<h1>G</h1>
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
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