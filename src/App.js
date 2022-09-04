


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

function App() {

  return (
     <>
     <Router>
     <UserProvider>


       <NavBar/>
      <Routes>

        <Route path='/' element = {<Explore/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/Sign-in' element = {<SignIn/>}/>
        <Route path='/Sign-up' element ={<SignUp/>}/>
        <Route path='/forgot-password' element ={<ForgotPassword/>}/>
        
      </Routes>


     </UserProvider>
       
     </Router>


     </>
  );
}

export default App;
