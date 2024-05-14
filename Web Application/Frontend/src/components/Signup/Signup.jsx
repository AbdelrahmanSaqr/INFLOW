// import { useState , useEffect , useReducer , useContext , useRef } from "react";
// import { Container ,NavDropdown  } from "react-bootstrap";
// import AuthContext from '../../store/auth-context';

import { useNavigate } from "react-router-dom";
import Headerguest from '../Header/Headerguest';
import { Divider, Grid, Typography } from "@mui/material";

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import mind from '../../assets/mind.jpg';

import classes from './Signup.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { API_URL } from '../../api.js';


const userReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return {
        value: action.val,
        isValid: /^[a-zA-Z]+$/.test(action.val)
      };
    }
    if (action.type === 'INPUT_BLUR') {
      return {
        value: state.value,
        isValid: /^[a-zA-Z]+$/.test(state.value)
      };
    }
    return { value: '', isValid: false };
  };
  
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


const Signup = (props) => {
    useEffect(() => {
        // Remove access token from local storage when component mounts
        localStorage.removeItem('token');
        localStorage.removeItem('doctor_id');
        localStorage.removeItem('res_num');
        localStorage.removeItem('DoctorId');
        localStorage.removeItem('postId');
        localStorage.removeItem('image_paths');

      }, []);

    const navigate = useNavigate()
    const signinBtn = () => {
        navigate("/signin")
    }

    // const [formIsValid, setFormIsValid] = useState(false);

    const [userState, dispatchUser] = useReducer(userReducer, {
        value: '',
        isValid: null,
    });
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });



    // const authCtx = useContext(AuthContext);

    // const emailInputRef = useRef();
    // const passwordInputRef = useRef();

    // useEffect(() => {
    //     console.log('EFFECT RUNNING');

    //     return () => {
    //         console.log('EFFECT CLEANUP');
    //     };
    // }, []);

    const { isValid: userIsValid } = userState;
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;


    // const navigate = useNavigate(); 
    // const routeChange = () =>{ 
    //    navigate("/signup")
    // }



    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(userIsValid && emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [userIsValid, emailIsValid, passwordIsValid]);

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const userChangeHandler = (event) => {
        const inputValue = event.target.value.replace(/[^a-zA-Z]/g, '');
        dispatchUser({ type: 'USER_INPUT', val: inputValue });
        createUser(inputValue);
    };
    const emailChangeHandler = (event) => {
        const enteredValue = event.target.value;
        const modifiedValue = enteredValue.replace(/\s/g, '');
      
        if (/^[a-zA-Z0-9._~!$&'()*+,;=:-@]+$/u.test(modifiedValue) || modifiedValue === '') {
          dispatchEmail({ type: 'USER_INPUT', val: modifiedValue });
          createEmail(modifiedValue);
        } else if (enteredValue.length === 1) {
          dispatchEmail({ type: 'USER_INPUT', val: '' });
          createEmail('');
        }
      };
      
      

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
        createPassword(event.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validateUserHandler = () => {
        dispatchUser({ type: 'INPUT_BLUR' });
    };
    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     navigate("/account-verfication")



    //     // if (formIsValid) {
    //     //     authCtx.onLogin(emailState.value, passwordState.value);
    //     //     navigate("/")

    //     // } else if (!emailIsValid) {
    //     //     emailInputRef.current.focus();
    //     // } else {
    //     //     passwordInputRef.current.focus();
    //     // }
    // };


    const [formIsValid, setFormIsValid] = useState(false);
    const [name, createUser] = useState('')
    const [email, createEmail] = useState('')
    const [password, createPassword] = useState('')
    const [orignal_city, createOrignalCity] = useState('orignal')
    const [current_city, createCurrentCity] = useState('current')
    // const [phone_num, createphonenum] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const post = {
            name: name,
            email: email,
            password: password,
            orignal_city: orignal_city,
            current_city: current_city,
            type: 'patient',
            // phone_num: phone_num
        }
        try {
            // var res = await axios.post('http://127.0.0.1:8000/api/auth/register', post)
            var res = await axios.post(`${API_URL}/api/auth/register` , post)
            alert(res.data['message'])
            navigate('/signin')
            //const data = res.data
            // alert(res.data['message'])
        }
        catch (e) {


            alert("The Email has been already Taken :')")

            // localStorage.setItem('token', JSON.stringify("Malksh d3wa"));

            // // get the variable from local storage
            // const myVariable = JSON.parse(localStorage.getItem('type'));
            // console.log(myVariable)

            // // alert(res['message'])
            // alert(res.data['message'])



        }

        console.log(res.data)



        // axios.post('http://127.0.0.1:8000/api/auth/register', post )
        // .then((response) => {
        // //console.log(response.data.token);
        // return response.data.token;
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    return (

        <div>

            <Headerguest />

            <div className={classes.signup}>

                <div className="row no-gutters " >

                    {/* left side of signup // sign up forms */}
                    <div className="col no-gutters col-sm-12 col-lg-6" >
                        <Grid container direction="row" justifyContent="flex-start" justifyItems="flex-start">

                            <Grid item container xs={12} xl={12} md={12} sm={15} lg={12} justifyContent="flex-start" justifyItems="center">

                                <div className={classes.leftpage}>
                                    <Grid container className={classes.xsgrid}  >
                                        <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                            <Grid item xs={10} xl={3.5} md={11.3} sm={10} lg={12} justifyContent="flex-start" justifyItems="center">

                                                <div className={classes.createaccount}>
                                                    <h5>Create Account</h5>
                                                </div>
                                                <Grid item xs={10} xl={12} md={11.3} sm={12} lg={12} justifyContent="flex-start" justifyItems="center">
                                                    <div className={classes.haveaccount}>
                                                        <small>Already have an account ?<button onClick={signinBtn}>Login</button></small>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                            <Grid item container xs={7} sm={11} xl={12} md={11.5} justifyContent="flex-start" justifyItems="center">

                                                <form onSubmit={onSubmit} >

                                                    {/* name */}
                                                    <div className={classes.name}>
                                                        <h4>Enter your name</h4>
                                                        <input
                                                            id="name"
                                                            className={classes.namecontent}
                                                            type="text"
                                                            placeholder="Name"
                                                            // onChange={(event) => {
                                                            //     createUser(event.target.value)
                                                            // }}
                                                            onChange={userChangeHandler}
                                                            // onBlur={validateUserHandler}
                                                            value={name}
                                                        />
                                                    </div>

                                                    {/* email */}
                                                    <div className={classes.email}>
                                                        <h4>E-mail</h4>
                                                        <input
                                                            id="email"
                                                            className={classes.emailcontent}
                                                            type="email"
                                                            placeholder="Email"
                                                            // pattern="[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|live\.com)$"
                                                            onChange={emailChangeHandler}
                                                            onBlur={validateEmailHandler}
                                                            value={email}
                                                            required
                                                        />

                                                    </div>



                                                    {/* city */}
                                                    <div className={classes.city} >
                                                        <Grid container>
                                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                <div className={classes.originalcity} >
                                                                    <h4>Original city</h4>
                                                                    <select placeholder="Cairo"
                                                                        value={orignal_city}
                                                                        onChange={(event) => {
                                                                            createOrignalCity(event.target.value)
                                                                        }}
                                                                    >
                                                                        <option value="Cairo">Cairo</option>
                                                                        <option value="Alex">Alex</option>
                                                                        <option value="Giza">Giza</option>
                                                                        <option value="Port Said">Port Said</option>
                                                                        <option value="Suez">Suez</option>
                                                                        <option value="Luxor">Luxor</option>
                                                                        <option value="al-Mansura">al-Mansura</option>
                                                                        <option value="Tanta">Tanta</option>
                                                                        <option value="Asyut">Asyut</option>
                                                                        <option value="Ismailia">Ismailia</option>
                                                                        <option value="Fayyum">Fayyum</option>
                                                                        <option value="Sharqia">Sharqia</option>
                                                                        <option value="Aswan">Aswan</option>
                                                                        <option value="Damietta">Damietta</option>
                                                                    </select>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                <div className={classes.cityofresidence} >
                                                                    <h4>City of residence</h4>
                                                                    <select placeholder="Cairo"
                                                                        value={current_city}
                                                                        onChange={(event) => {
                                                                            createCurrentCity(event.target.value)
                                                                        }}

                                                                    >
                                                                        <option value="Cairo">Cairo</option>
                                                                        <option value="Alex">Alex</option>
                                                                        <option value="Giza">Giza</option>
                                                                        <option value="Port Said">Port Said</option>
                                                                        <option value="Suez">Suez</option>
                                                                        <option value="Luxor">Luxor</option>
                                                                        <option value="al-Mansura">al-Mansura</option>
                                                                        <option value="Tanta">Tanta</option>
                                                                        <option value="Asyut">Asyut</option>
                                                                        <option value="Ismailia">Ismailia</option>
                                                                        <option value="Fayyum">Fayyum</option>
                                                                        <option value="Sharqia">Sharqia</option>
                                                                        <option value="Aswan">Aswan</option>
                                                                        <option value="Damietta">Damietta</option>
                                                                    </select>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>

                                                    {/* password */}
                                                    <div className={classes.password}>
                                                        <h4>Password</h4>
                                                        <TextField
                                                            id="password"
                                                            className={classes.passwordcontent}
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={password}
                                                            onChange={passwordChangeHandler}
                                                            onBlur={validatePasswordHandler}
                                                            label=""
                                                            variant="outlined"
                                                            // fullWidth
                                                            required
                                                            // style={{ width: '77%' }}
                                                            InputProps={{
                                                                style: {
                                                                    height: '47px',
                                                                    border: '0px'
                                                                },
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                <IconButton onClick={toggleShowPassword} edge="end">
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                            }}
                                                        />
                                                    </div>

                                                    <div className={classes.termsandconditions}  >
                                                        <small>By continue you agree to the  Terms of conditions</small>
                                                    </div>
                                                    <button type="submit" className={classes.signupbtn} disabled={!formIsValid}>Agree and join</button>
                                                </form>
                                            </Grid>
                                        </Grid>



                                        {/* agreement of condition */}
                                        {/* <div className={classes.termsandconditions} >
                                        <small>By continue you agree to the <button> terms of conditions</button></small>
                                    </div> */}


                                        {/* login with google account */}
                                        <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                            <Grid item container justifyContent="flex-start" justifyItems="center">
                                                {/* <div >
                                                <p className={classes.signupwith} >or continue with</p>
                                            </div> */}

                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    {/* <Divider component="div" role="presentation" style={{ width: "325px" }}>
                                        or continue with
                                    </Divider>
                                    <Grid container direction="row" justifyContent="flex-start" justifyItems="center">
                                        <Grid item xs={12} sm={2} xl={10} md={12} lg={8} container justifyContent="center" justifyItems="center">
                                            <button className={classes.googlebtn} onClick={() => window.open('https://accounts.google.com/InteractiveLogin/signinchooser?service=mail&ifkv=AQMjQ7Q5TaQ-XPLQZEn8b4YYQBZBEh7FZ_DiTA0I2UQnOOTXS2LnBiejmpMyQZuQVHvfOsUhCB7q&flowName=GlifWebSignIn&flowEntry=ServiceLogin', '_blank')}>
                                                <span>Gmail</span>
                                            </button>
                                        </Grid>
                                    </Grid> */}





                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    {/* right side of page // welcome to our community and the photo */}

                    <div className="col no-gutters col-sm-12 col-lg-6" >
                        <Grid container direction="row" justifyContent="flex-start" justifyItems="center" >
                            <Grid item container xs={10} xl={12} md={10} justifyContent="flex-start" justifyItems="center"
                                style={{marginBottom:'200px'}}
                            >

                                <div className={classes.rightpage} >
                                    <div className={classes.box1}>
                                        <h2>Welcome to our Community</h2>
                                        <p>Every problem has a solution; it may sometimes just need another perspective.</p>
                                    </div>

                                    <div className={classes.box2}>
                                        <img src={mind} alt="mind" />
                                    </div>

                                </div>
                            </Grid>
                        </Grid>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Signup;