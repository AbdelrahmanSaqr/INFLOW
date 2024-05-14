import { useState, useEffect, useReducer, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import laptop from "../../assets/laptop.png"
import classes from "./Signin.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Grid } from "@mui/material";
import { API_URL } from '../../api.js';


const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
};

const Signin = (props) => {

    const [token, setToken] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formIsValid, setFormIsValid] = useState(false);
    // const [emailError, setEmailError] = useState(false);
    const [error, setError] = useState(false);
    // const [passwordError, setPasswordError] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    function handleLogin() {
        // Call the API to get the token
        // ...
        // After receiving the token from the API, set it in the state
        setToken();
    }

    useEffect(() => {
        console.log('EFFECT RUNNING');

        return () => {
            console.log('EFFECT CLEANUP');
        };
    }, []);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {

            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const Item = styled(Box)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate()
    const signUpBtn = () => {
        navigate("/signup")
    }

    const forgetpasswordBtn = () => {
        navigate("/password-assistance")
    }
    
    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    
    const onSubmit = async (e) => {
        e.preventDefault()
        if (formIsValid) {
            // setPasswordError(false);
            // setEmailError(false);
            const post = {
                email: email,
                password: password
            }
            try {
                // var res = await axios.post('http://127.0.0.1:8000/api/auth/login', post)
                var res = await axios.post(`${API_URL}/api/auth/login`, post);
            }
            catch (e) {
                // alert("Username or Password are incorrect")
                // if (!emailIsValid) {
                //     emailInputRef.current.focus();
                //     setEmailError(true);
                //     setPasswordError(false);
        
                // } else {
                //     passwordInputRef.current.focus();
                //     setPasswordError(true);
                //     setEmailError(false);
                // }
                // setErrorMessage(e.response.data.message);
                setError(true);
                setOpen(!open);
            }
            console.log(res.data)
            if (res.status === 200) {
                localStorage.setItem('token', res.data.access_token);
                navigate("/");
              
                // Function to clear local storage
                function clearLocalStorage() {
                  localStorage.clear();
                }
              
                // Function to set timeout for clearing local storage
                function setClearTimeout() {
                  setTimeout(clearLocalStorage, 60 * 60 * 1000); // 1 hour in milliseconds
                }
              
                // Call the setClearTimeout function after successful login
                setClearTimeout();
              }
            else {

                alert("Username or Password are incorrect")
            }
        } 
        // else if (!emailIsValid) {
        //     emailInputRef.current.focus();
        //     setEmailError(true);
        //     setPasswordError(false);

        // } else {
        //     passwordInputRef.current.focus();
        //     setPasswordError(true);
        //     setEmailError(false);
        // }
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        // setErrorMessage('');
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        // Remove access token from local storage when component mounts
        localStorage.removeItem('token');
        localStorage.removeItem('doctor_id');
        localStorage.removeItem('res_num');
        localStorage.removeItem('DoctorId');
        localStorage.removeItem('postId');
        localStorage.removeItem('image_paths');
        localStorage.removeItem('selectedDay');
        localStorage.removeItem('appointmentId');

      }, []);


    return (

        <Grid container>

            <div className={classes.signin}>
                <Grid container>
                    <div className="row no-gutters " >
                        {/* error handler */}
                        {
                            error &&
                            <Modal
                                className={classes.error}
                                open={open}
                                onClose={handleClose}
                            >
                                <Box className={classes.errormessage}>
                                    <h1>Username or Password are incorrect</h1>
                                </Box>
                            </Modal>
                        }

                        <Grid xs={12} s={12} xl={8} lg={7} md={8} className={classes.forms}>

                                {/* login form */}
                                <Grid container style={{width:'50%'}}>
                                    <Grid item container xs={12} sm={12} l={12} xl={12} md={10} justifyContent="flex-start" justifyItems="center">

                                        <div className={classes.leftpage}>
                                            <Grid container direction="row" justifyContent="flex-start" justifyItems="flex-start">
                                                <Grid item container xs={0.1} xl={8} lg={12} sm={8} md={2} justifyContent="flex-start" justifyItems="center">
                                                    <div className={classes.login}>
                                                        <h5><strong>Login</strong></h5>
                                                    </div>
                                                </Grid>
                                            </Grid>


                                            {/* input forms in login */}
                                            <form onSubmit={onSubmit} >


                                                {/* email input */}
                                                <Grid container direction="row" justifyContent="flex-start" justifyItems="flex-start">
                                                    <Grid item container xs={12} xl={12} md={8.8} justifyContent="flex-start" justifyItems="center">
                                                        <div className={classes.email} onChange={emailChangeHandler}>
                                                            <h4>E-mail or phone number</h4>
                                                            <input
                                                                ref={emailInputRef}
                                                                id="email"
                                                                isValid={emailIsValid}
                                                                onBlur={validateEmailHandler}
                                                                className={classes.emailcontent}
                                                                type="email"
                                                                placeholder="     example@gmail.com"
                                                                onChange={(event) => {
                                                                    setEmail(event.target.value)
                                                                }}
                                                                value={email}
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>

                                                {/* password input */}
                                                <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                                    <Grid item container xs={12} xl={12} md={8.8} justifyContent="flex-start" justifyItems="center">
                                                        <div className={classes.password} onChange={passwordChangeHandler}>
                                                            <h4>Password</h4>
                                                            <input
                                                                ref={passwordInputRef}
                                                                id="password"
                                                                isValid={passwordIsValid}
                                                                onBlur={validatePasswordHandler}
                                                                className={classes.passwordcontent}
                                                                type="password"
                                                                onChange={(event) => {
                                                                    setPassword(event.target.value)
                                                                }}
                                                                value={password}
                                                            />

                                                            {/* error handler */}
                                                            {/* {
                                                                error &&
                                                                <div className={classes.error}>
                                                                    You’ve entered a wrong password please try again
                                                                </div>
                                                            } */}

                                                        </div>
                                                    </Grid>
                                                </Grid>


                                                {/* remember me and forget password */}
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="flex-start"
                                                    justifyItems="center"
                                                    style={{
                                                        left: window.innerWidth <= 460 ? '-10%' : 'auto',
                                                        transition: 'left 0.3s ease', // Add a transition for smooth animation if desired
                                                    }}
                                                >
                                                    <Grid item container xs={12} xl={12} md={12}>

                                                        <div className={classes.remembermeforgetpassword}>
                                                            <div className="row mb-4">

                                                                <Grid container>
                                                                    <Grid item xs={12} sm={7.5} md={7.5} lg={7.5} xl={6}>
                                                                        <div className="col justify-content-center">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                                                                <label className="form-check-label" for="form1Example3"> Remember me </label>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={10} sm={4.5} md={4.5} lg={4.5} xl={6}
                                                                    >
                                                                        <div >
                                                                            <p
                                                                                className={classes.forgetpasswordbtn}
                                                                                onClick={forgetpasswordBtn}
                                                                            >
                                                                                Forgot password?
                                                                            </p>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>   
                                                            </div>
                                                            <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                                            <Grid item container xs={12} xl={12} lg={12} md={12} sm={12} justifyContent="flex-start" justifyItems="center">
                                                                {/* login btn */}
                                                                <button type="submit" onClick={handleLogin} className={classes.loginbtn} disabled={!formIsValid}>Login</button>
                                                            </Grid>
                                                        </Grid>
                                                        </div>
                                                        
                                                    </Grid>
                                                </Grid>


                                            </form>


                                            {/* create account text */}
                                            <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                                <Grid item container xs={12} xl={12} lg={12} md={12} sm={12}  justifyContent="flex-start" justifyItems="center">
                                                    <div className={classes.createaccount}>
                                                        <p>
                                                            <button
                                                                className={classes.createonebtn}
                                                                onClick={signUpBtn}
                                                            >Create account</button>If you don't have an account
                                                        </p>
                                                    </div>

                                                </Grid>
                                            </Grid>

                                        </div>
                                    </Grid>
                                </Grid>
                        </Grid>

                        <Grid xs={12} xl={4} lg={4} sm={12} md={4}>
                            <div className={classes.rightpage} >
                                <Grid container>
                                    <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                        <h1>Welcome back!</h1>
                                    </Grid>
                                    <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                        <small>Your journey to know yourself<span>.</span></small>
                                    </Grid>
                                    <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                        <img src={laptop} alt="laptop" />
                                    </Grid>
                                </Grid>  
                            </div>
                        </Grid>
                    </div>
                </Grid>

            </div>
        </Grid>

    );
}

export default Signin;