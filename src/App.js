


import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import Explore from './pages/Explore';
import ForgotPassword from './pages/Forgotpassword';
import NavBar from './components/NavBar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { UserProvider } from './userContext';
import { useContext } from 'react';
import { UserContext } from './userContext';
import PrivateRoutes from './components/privateRoutes';
import UserCertificate from './pages/UserCertificate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
     <Router>
     <UserProvider>
        <NavBar/>



      <Routes>

        <Route path='/' element = {<Explore/>}/>
        {/* <Route path='/' element={<PrivateRoutes/>}>
          <Route path='/' element={<NavBar/>}/>
        </Route> */}
        <Route path='/profile' element = {<PrivateRoutes/>}>
        <Route path='/profile' element ={<Profile/>}/>
        <Route path='/profile/certificates' element={<UserCertificate/>}/>


        </Route>
        <Route path='/Sign-in' element = {<SignIn/>}/>
        <Route path='/Sign-up' element ={<SignUp/>}/>
        <Route path='/forgot-password' element ={<ForgotPassword/>}/>
        


      </Routes>
      <ToastContainer/>



     </UserProvider>

 
     </Router>


     </>
  );
}

export default App;
