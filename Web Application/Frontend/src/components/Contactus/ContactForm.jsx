import React, { useState , useEffect } from 'react';
import axios from 'axios';
import contactus from '../../assets/contactus.jpg'
import HomeHeader from "../Header/HomeHeader";
import Headerguest from '../Header/Headerguest';
import classes from './ContactForm.module.css';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ChatBotIcon from '../ChatBot/ChatBot';
import TextField from '@mui/material/TextField';
import FAQsButton from '../FAQs/FAQsButton';

const ContactForm = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [result, setResult] = useState(null);

    const sendEmail = event => {
        event.preventDefault();
        axios.post('/send', { ...state })
        .then(response => {
            setResult(response.data);
            setState({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        })
        .catch(() => {
            setResult({
                success: false,
                message: 'Something went wrong. Try again later'
            });
        });
        setSuccess(true);
        setOpen(true);
    };

    const onInputChange = event => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value
        });
    };
    const accessToken = localStorage.getItem('token');

    const navigate = useNavigate();
    const completePaymentBtn = () => {
        navigate("/completepayment")
    };
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
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
    // const navigate = useNavigate();
    const contactusBtn = () => {
        navigate("/")
    };

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);


    return (

        <div>

            <ChatBotIcon/>
              
            {/* {success &&
                <Modal
                    className={classes.success}
                    open={open}
                    onClose={handleClose}
                >
                    <Box className={classes.successmessage}>
                        <svg width="58" height="56" viewBox="0 0 58 56" fill="none" xmlns="http://www.w3.org/2000/svg"  style={{display: "block", margin: "0 auto"}}>
                            <path d="M24.94 40.3238L45.385 20.8524L41.325 16.9857L24.94 32.5905L16.675 24.719L12.615 28.5857L24.94 40.3238ZM29 55.2381C24.9883 55.2381 21.2183 54.5126 17.69 53.0617C14.1617 51.6108 11.0925 49.6434 8.4825 47.1595C5.8725 44.6738 3.80673 41.7508 2.2852 38.3905C0.763667 35.0302 0.00193333 31.4397 0 27.619C0 23.7984 0.761734 20.2079 2.2852 16.8476C3.80867 13.4873 5.87443 10.5643 8.4825 8.07857C11.0925 5.59286 14.1617 3.62546 17.69 2.17638C21.2183 0.727302 24.9883 0.00184127 29 0C33.0117 0 36.7817 0.725461 40.31 2.17638C43.8383 3.6273 46.9075 5.5947 49.5175 8.07857C52.1275 10.5643 54.1942 13.4873 55.7177 16.8476C57.2412 20.2079 58.0019 23.7984 58 27.619C58 31.4397 57.2383 35.0302 55.7148 38.3905C54.1913 41.7508 52.1256 44.6738 49.5175 47.1595C46.9075 49.6452 43.8383 51.6135 40.31 53.0645C36.7817 54.5154 33.0117 55.2399 29 55.2381Z" fill="#2E6171"/>
                        </svg>
                        <h1>Meassage has been send.<br/>We will contact you as soon as possible</h1>
                    </Box>
                </Modal>
            } */}

            {accessToken ? <HomeHeader /> : <Headerguest />}
            <FAQsButton/>
            <form className={classes.contactus}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <div className={classes.leftcontactus}>
                            <h5>Your feedback matters</h5>
                            <p>contact us and let us know how we're doing.</p>
                            <img src={contactus} alt="contact us"/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={classes.midcontactus}>
                            <h2>Contact Us</h2>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '80%',marginTop: '20px',marginBottom:'40px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                <TextField id="standard-basic" label="Full Name" variant="standard" />
                                <TextField id="standard-basic" label="E-mail" variant="standard" />
                                <TextField id="standard-basic" label="Message" variant="standard" />
                            </Box>
                            <button onClick={contactusBtn}>Contact Us</button>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <div className={classes.rightcontactus}>
                            <h2>Contact</h2>
                            <p>Infloww2023@gmail.com</p>

                            <h3>Based in</h3>
                            <p>Fifth settlement,<br/>street 45</p>
                        </div>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
};

export default ContactForm;