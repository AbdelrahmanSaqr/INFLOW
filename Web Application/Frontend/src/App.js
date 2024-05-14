// import { useContext , useState} from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import {BrowserRouter as Router, Route , Routes} from "react-router-dom";

import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import NewHome from "./components/Home/NewHome/NewHome";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home/Home";
import Headerguest from "./components/Header/Headerguest";
import Footer from "./components/Footer/Footer";
import Hometest from "./components/Home/Hometest/Hometest";
import AccountVerfication from "./components/AccountVerfication/AccountVerfication";
import LinkReset from "./components/LinkReset/LinkReset";
import PasswordAssistance from "./components/PasswordAssistance/PasswordAssistance";
// import InformationForm from "./components/InformationForm/InformationForm";
import TestInstructions from "./components/TestInstructions/TestInstructions";
import Results from "./components/Results/Results";
import BookMeeting from "./components/BookMeeting/BookMeeting";
import Coach from "./components/coach/coach";
import Testinformation from "./components/Testinformation/Testinformation";
import TestPage from "./components/TestPage/TestPage";
import Articles from "./components/Articles/Articles";
import ArticlePage from "./components/Articles/ArticlePage/ArticlePage";
import AuthContext from './store/auth-context';
import ContactForm from "./components/Contactus/ContactForm";
import Payment from "./components/Payment/Payment";
import CompletePayment from "./components/Payment/CompletePayment/CompletePayment";
import OTP from "./components/Payment/OTP/OTP";
import FAQsPage from "./components/FAQs/FAQsPage";


import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './styles.module.css';


export default function App() {
  
  // const ctx = useContext(AuthContext);  // to know if the page is logged in or not

  //{!ctx.isLoggedIn && <Signin />} -> here you ckecked the context if you are not logged in 
  //then signin page will appear in tha website if not and you are logged in then home page will appear in the website



  const registerRouter = createBrowserRouter([
      {
        path: '/',
        element: <div><Headerguest/> <div><hr/></div> <Signin /> </div>,
    
      },
  ]);

  const homeRouter = createBrowserRouter([
    {
      path: '/home', element: <Hometest/>,
    },
  ]);


  // <div>
  //       {!ctx.isLoggedIn && <div> <Header/> <div><hr/></div> <Signin /> </div>}
  //       {ctx.isLoggedIn && <Home />}
  //       <div className={classes.line}><hr/></div>
  //       <Footer/>
  //   </div>

  // <div>
  //     {!ctx.isLoggedIn && <RouterProvider  router={registerRouter}  />}
  //     {ctx.isLoggedIn &&  <RouterProvider  router={homeRouter}  />}
  //     <div className={classes.line}><hr/></div>
  //     <Footer/>
  // </div>

  // {!ctx.isLoggedIn &&   <div> <Headerguest /> <div><hr/></div> <Signin /> </div>}
  // {ctx.isLoggedIn &&  <Hometest />}
  // <div className={classes.line}><hr/></div>
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <NewHome /> } />
          {/* <Route path="/home" element={<Home /> } /> */}
          <Route path="/signup" element={ <div><Signup />  <Footer /> </div> } />
          <Route path="/signin" element={ <div> <Headerguest />  <Signin /> <Footer /></div> } />
          <Route path="/hometest" element={ <div><Hometest />  <Footer /> </div> } />
          <Route path="/account-verfication" element={ <div><AccountVerfication />  <Footer /> </div> } />
          <Route path="/Link-Reset" element={ <div><LinkReset />  <Footer /> </div> } />
          <Route path="/password-assistance" element={ <div><PasswordAssistance />  <Footer /> </div> } />
          {/* <Route path="/information-form" element={ <div><InformationForm />  <Footer /> </div> } /> */}
          <Route path="/test-instructions" element={ <div><TestInstructions /> </div>} />
          <Route path="/articles" element={ <div><Articles />  <Footer /></div>} />
          <Route path="/articlepage" element={ <div><ArticlePage />  <Footer /></div>} />
          <Route path="/test-information" element={ <div><Testinformation /> <Footer /> </div>} />
          <Route path="/testpage" element={ <div><TestPage />  </div>} />
          <Route path="/results" element={ <div><Results />  <Footer /></div>} />
          <Route path="/bookmeeting" element={ <div><BookMeeting />  <Footer /></div>} />
          <Route path="/contactus" element={ <div><ContactForm />  <Footer /></div>} />
          <Route path="/coach" element={ <div><Coach />  <Footer /></div>} />
          <Route path="/payment" element={ <div><Payment />  <Footer /></div>} />
          <Route path="/completepayment" element={ <div><CompletePayment />  <Footer /></div>} />
          <Route path="/otp" element={ <div><OTP />  <Footer /></div>} />
          {/* <Route path="*" element={ <NewHome/> } /> */}
          <Route path="/FAQs" element={ <FAQsPage/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
    
}
