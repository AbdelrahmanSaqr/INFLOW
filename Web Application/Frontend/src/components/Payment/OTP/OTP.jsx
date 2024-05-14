// import Headerguest from "../Header/Headerguest";
import { useState} from "react";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button  } from "react-bootstrap";
import ResponsiveAppBar from "../../Header/Header";

import lap from '../../../assets/lap.png';

import classes from './OTP.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const OTP=(props)=>{

    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const submitBtn = () => {
        navigate("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(true);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        navigate("/")
        // setErrorMessage('');
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
    
        const sanitizedValue = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 1); // Remove spaces, non-digit characters, and limit to one character
    
        setPassword(sanitizedValue);

        
    };

    return(

        
        <div >
            {success &&
                <Modal
                    className={classes.success}
                    open={open}
                    onClose={handleClose}
                >
                    <Box className={classes.successmessage}>
                        <svg width="58" height="56" viewBox="0 0 58 56" fill="none" xmlns="http://www.w3.org/2000/svg"  style={{display: "block", margin: "0 auto"}}>
                            <path d="M24.94 40.3238L45.385 20.8524L41.325 16.9857L24.94 32.5905L16.675 24.719L12.615 28.5857L24.94 40.3238ZM29 55.2381C24.9883 55.2381 21.2183 54.5126 17.69 53.0617C14.1617 51.6108 11.0925 49.6434 8.4825 47.1595C5.8725 44.6738 3.80673 41.7508 2.2852 38.3905C0.763667 35.0302 0.00193333 31.4397 0 27.619C0 23.7984 0.761734 20.2079 2.2852 16.8476C3.80867 13.4873 5.87443 10.5643 8.4825 8.07857C11.0925 5.59286 14.1617 3.62546 17.69 2.17638C21.2183 0.727302 24.9883 0.00184127 29 0C33.0117 0 36.7817 0.725461 40.31 2.17638C43.8383 3.6273 46.9075 5.5947 49.5175 8.07857C52.1275 10.5643 54.1942 13.4873 55.7177 16.8476C57.2412 20.2079 58.0019 23.7984 58 27.619C58 31.4397 57.2383 35.0302 55.7148 38.3905C54.1913 41.7508 52.1256 44.6738 49.5175 47.1595C46.9075 49.6452 43.8383 51.6135 40.31 53.0645C36.7817 54.5154 33.0117 55.2399 29 55.2381Z" fill="#2E6171"/>
                        </svg>
                        <h1>Payment Successful</h1>
                    </Box>
                </Modal>
            }

            <ResponsiveAppBar/>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" justifyContent="center" justifyItems="flex-end" >
                    <Grid item container xs={6} xl={12} md={6} justifyContent="center" justifyItems="flex-end" >


                        <div  className={classes.pincode}>

                            <img src={lap} alt="lap" />
                            
                            <p>please enter the verification code that has been sent to you. </p>

                            <div className={classes.pin}>
                                <input
                                    id="password1"
                                    className={classes.pincontent}
                                    type="text"
                                    // maxlength="1"
                                    max="9"
                                    onChange={handleInputChange}
                                    value={password}
                                />
                                <input
                                    id="password2"
                                    className={classes.pincontent}
                                    type="text"
                                    // maxlength="1"
                                    max="9"
                                    onChange={handleInputChange}
                                    value={password}
                                />
                                <input
                                    id="password3"
                                    className={classes.pincontent}
                                    type="text"
                                    // maxlength="1"
                                    max="9"
                                    onChange={handleInputChange}
                                    value={password}
                                />
                                <input
                                    id="password4"
                                    className={classes.pincontent}
                                    type="text"
                                    // maxlength="1"
                                    max="9"
                                    onChange={handleInputChange}
                                    value={password}
                                />
                            </div>
                            <button type="submit" className={classes.submitbtn}>submit</button>

                            <div>
                                <button type="submit" className={classes.resendcodebtn} >Re-send code</button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </form>
            <hr/>
            
        </div>

    );

}

export default OTP;