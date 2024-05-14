import Headerguest from "../Header/Headerguest";

import { useNavigate } from "react-router-dom";

import { Button  } from "react-bootstrap";

import classes from './AccountVerfication.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FAQsButton from '../FAQs/FAQsButton';

const AccountVerfication =(props)=>{

    const navigate = useNavigate()
    const continueBtn = () => {
        navigate("/Link-Reset")
    }



    return(

        
        <div >

            <Headerguest/>
            <FAQsButton/>
            <div  className={classes.verfication}>
                <h2>Account Verfication</h2>
                <p>Enter your e-mail or your phone number </p>

                <div className={classes.email}>
                    <h4>e-mail or phone number</h4>
                    <input
                        id="email"
                        className={classes.emailcontent}
                        type="email"
                    />
                </div>
                <button onClick={continueBtn} type="submit" className={classes.continuebtn}>Continue</button>

                <div>
                    <button type="submit" className={classes.resendcodebtn} >Re-send code</button>
                </div>
            </div>
            <hr/>
            
        </div>

    );

}

export default AccountVerfication;