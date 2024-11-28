import {Routes , Route } from 'react-router-dom'
import UserSignup from './usercomponents/UserSignup'
import UserLogin from './usercomponents/UserLogin'
import Home from './usercomponents/Home'
import Profile from './usercomponents/Profile'
import Adminlogin from './admincomponents/Adminlogin'
import Adminpanel from './admincomponents/Adminpanel'
import Editeuser from './admincomponents/Editeuser'
import Adduser from './admincomponents/Adduser'

function App() {


  return (
    <>
    <Routes>
      <Route  path="/" element={<UserSignup/>}  />
      <Route  path="/signup" element={<UserSignup/>}  />
      <Route  path="/login" element={<UserLogin/>}  />
      <Route  path="/home" element={<Home/>}  />
      <Route  path="/profile" element={<Profile/>}  />
      <Route  path="/adminlogin" element={<Adminlogin/>}  />
      <Route  path="/adminpanel" element={<Adminpanel/>}  />
      <Route  path="/edituser/:id" element={<Editeuser/>}  />
      <Route  path="/adduser" element={<Adduser/>}  />

    </Routes>
    
     
    </>
  )
}

export default App
