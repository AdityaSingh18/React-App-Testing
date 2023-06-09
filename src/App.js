import React from "react";

import {
  Routes,
  redirect,
  Router,
  Route,
  createRoutesFromChildren,
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Component/Pages/Login";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HeaderSite from "./Component/UI/HeaderSite";
import Profile from "./Component/Pages/Profile";
import Error from "./Component/Pages/Error";
import UpdateProfile from "./Component/Pages/UpdateProfile";
import VerifyEmail from "./Component/Pages/VerifyEmail";
import ForgotPassword from "./Component/Pages/ForgotPassword";
import ExpenseTracker from "./Component/Pages/ExpenseTracker"
import './App.css';
import { useSelector } from "react-redux";


function App() {

  const isTheme = useSelector((state)=>state.premium.theme)
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
   if(!isTheme){
    document.body.className='dark-theme'
    
   }
   else{
    document.body.className='light-theme'
   }
  return (
   
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HeaderSite />}>
          <Route index element={<Login/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/expensetracker" element={<ExpenseTracker />} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="updateprofile" element={<UpdateProfile/>}/>
          <Route path="verifyemail" element={<VerifyEmail/>}/>
          <Route path="forgotpassword" element={<ForgotPassword/>}/>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
     
    </BrowserRouter>

  );
}
export default App;
