import Headerguest from "../Header/Headerguest";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useReducer, useRef } from "react";
import FAQsButton from '../FAQs/FAQsButton';


import key from '../../assets/key.png';

import classes from './PasswordAssistance.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const PasswordAssistance =(props)=>{

    const [formIsValid, setFormIsValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });

    const emailInputRef = useRef();

    const { isValid: emailIsValid } = emailState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(emailIsValid);
        }, 500);

        return () => {

            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
        setEmail(event.target.value);
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const navigate = useNavigate()
    const sendcodeBtn = () => {
        navigate("/Link-Reset")
        
    }

    const backBtn = () => {
        navigate("/signin")
    }



    return(

        
        <div >

            <Headerguest/>
            <FAQsButton/>
            <Grid container direction="column" justifyContent="flex-start" justifyItems="flex-end" >
                    <Grid item container xs={12} xl={12} md={12} justifyContent="center" justifyItems="flex-end" >


            <div  className={classes.forgetpassword}>

                <img src={key} alt="key" />

                <h2>Forget Password ?</h2>

                <div className={classes.content}>
                    <div className={classes.email}>
                        <h4>E-mail or Phone number</h4>
                        <input
                            ref={emailInputRef}
                            id="email"
                            isValid={emailIsValid}
                            onBlur={validateEmailHandler}
                            className={classes.emailcontent}
                            type="email"
                            placeholder="example@gmail.com"
                            onChange={emailChangeHandler}
                            value={email}
                        />

                        {/* error handler */}
                        {
                            emailError &&
                            <div className={classes.error}>
                                You’ve entered a wrong phone number or e-mail please try again
                            </div>
                        }
                    </div>
                    <button onClick={sendcodeBtn} type="submit" className={classes.sendcodebtn} disabled={!formIsValid}>Send code</button>

                    <div>
                        <button onClick={backBtn} type="submit" className={classes.resendcodebtn}>Back to login</button>
                    </div>
                </div>
            </div>
            </Grid>
            </Grid>

            <hr/>
            
        </div>

    );

}

export default PasswordAssistance;