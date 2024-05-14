import { useState , useEffect} from "react";

import HomeHeader from '../../Header/HomeHeader';

import classes from './CompletePayment.module.css';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { use } from "i18next";

const CompletePayment =()=>{

    const [cardNumber, setCardNumber] = useState('');
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardNumberField, setCardNumberField] = useState('');
    const [cvv, setCVV] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [done, setDone] = useState('false');

    const navigate = useNavigate();
    const payHandle = () => {
        setSuccess(true);
        setOpen(true);
    };

    // const handleChange = (event) => {
    //     let { value } = event.target;
    //     value = value.replace(/\D/g, ''); // remove non-numeric characters

    //     const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim(); // add space every 4 digits
    //     setCardNumber(formattedValue);
    // };

    const handleClose =()=>{
        setOpen(false);
        navigate("/");
    }

    const handleInputChange = (event) => {
        const { id, value } = event.target;
    
        setFormValues(id, value);
      };
    
      const setFormValues = (id, value) => {
        switch (id) {
          case 'cardname':
            setCardName(value);
            break;
          case 'cardnumber':
            // setCardNumber(value);
            value = value.replace(/\D/g, ''); // remove non-numeric characters
            const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim(); // add space every 4 digits
            setCardNumber(formattedValue);
            break;
          case 'cvv':
            const cvvValue = value.replace(/\s/g, '').replace(/\D/g, ''); // Remove spaces and non-digit characters
            setCVV(cvvValue);
            break;
          case 'expiremonth':
            let monthValue = value.replace(/\D/g, ''); // Remove non-digit characters
            // Check if the sanitized value is a number between 1 and 12
            if (monthValue !== '') {
                const month = parseInt(monthValue);
                if (month > 12) {
                    monthValue = '12';
                } else if (month < 1) {
                    monthValue = '1';
                }
            }
            setExpireMonth(monthValue);
            break;
          case 'expireyear':
            let yearValue = value.replace(/\D/g, ''); // Remove non-digit characters
            setExpireYear(yearValue);
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
      };
    
      const isFieldEmpty = (value) => value.trim() === '';
    
      useEffect(() => {
        setIsFormComplete(
          !isFieldEmpty(cardName) &&
          !isFieldEmpty(cardNumber) &&
          !isFieldEmpty(cvv) &&
          !isFieldEmpty(expireMonth) &&
          !isFieldEmpty(expireYear)
        );
    }, [cardName, cardNumber, cvv, expireMonth, expireYear]);

    
    return(
        <div className={classes.completePayment}>
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
            <HomeHeader/>
            <Grid container justifyContent="center" style={{ marginTop: "60px" }}>
                <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                    <h1>Complete checkout</h1>
                </Grid>
                <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                    <h2>Your card information is safe with us</h2>
                </Grid>
                <form className={classes.card} >
                    <div>  
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <h3>Card holder name</h3>
                        </Grid>
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <h4>Enter your name on the card</h4>
                        </Grid>
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <input
                                id="cardname"
                                className={classes.namecontent}
                                type="name"
                                placeholder="Mostafa Gamal"
                                value={cardName}
                                onChange={handleInputChange}
                            />
                        </Grid>       
                    </div>
                    <div>
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <h3>Card number</h3>
                        </Grid>
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <h4>Enter the 16 digits on your card</h4>
                        </Grid>
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <input
                                id="cardnumber"
                                className={classes.cardnumber}
                                type="text"
                                placeholder="1234     1234     1234     1234"
                                value={cardNumber}
                                onChange={handleInputChange}
                                maxLength={19} // set max length to 19 to account for spaces
                                // value={cardNumberField}
                                // onChange={handleInputChange}
                            />
                        </Grid>
                    </div>
                    <div>
                        <Grid container>
                            <Grid item xxs={12} xs={6} s={6} md={6} lg={6} xl={6}>
                                <Grid container>
                                    <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                                        <h3>CVV number</h3>
                                    </Grid>
                                    <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                                        <h4>The 3 or 4 digits on your card</h4>
                                    </Grid>
                                    <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                                        <input
                                            id="cvv"
                                            className={classes.cvvnumber}
                                            type="text"
                                            placeholder="123"
                                            value={cvv}
                                            onChange={handleInputChange}
                                            maxLength={3}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xxs={12} xs={6} s={6} md={6} lg={6} xl={6}>
                                <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                                    <h3>Expiry date</h3>
                                </Grid>
                                <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                                    <h4>the expiration dat on your card</h4>
                                </Grid>
                                <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                                    <Grid container>
                                        <Grid item xs={4} s={4} md={4} lg={4} xl={4}>
                                            <input
                                                id="expiremonth"
                                                className={classes.expiredate}
                                                type="text"
                                                placeholder="9"
                                                value={expireMonth}
                                                onChange={handleInputChange}
                                                maxLength={2}
                                            />
                                        </Grid>
                                        <Grid item xs={1} s={1} md={1} lg={1} xl={1}>
                                            <h3>/</h3>
                                        </Grid>
                                        <Grid item xs={5} s={5} md={5} lg={5} xl={5}>
                                            <input
                                                id="expireyear"
                                                className={classes.expiredate}
                                                type="text"
                                                placeholder="25"
                                                value={expireYear}
                                                onChange={handleInputChange}
                                                maxLength={2}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </div>
                    <div>
                        <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                            <button 
                                onClick={payHandle} 
                                className={classes.paymentBtn}
                                disabled={!isFormComplete}
                            >Pay 350 EGP</button>
                        </Grid>
                    </div>
                </form>
            </Grid>

        </div>
    );
};

export default CompletePayment;

// <Header/>
//             <div style={{ justifyContent: "center" }}>
            // <Grid container  justifyContent="center">
            //     <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
            //         <h1>Complete checkout</h1>
            //     </Grid>
            //     <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
            //         <h2>Your card information is safe with us</h2>
            //     </Grid>
            //     <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
            //         <input
            //             id="name"
            //             className={classes.namecontent}
            //             type="name"
            //             placeholder="Mostafa Gamal"
            //         />
            //     </Grid>       
            // </Grid>
            // <Grid container>
                // <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                //     <h1>Card number</h1>
                // </Grid>
                // <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                //     <h2>Enter the 16 digits on your card</h2>
                // </Grid>
                // <Grid item xs={12} s={12} md={12} lg={12} xl={12}>
                //     <input
                //         type="text"
                //         placeholder="Enter card number"
                //         value={cardNumber}
                //         onChange={handleChange}
                //         maxLength={19} // set max length to 19 to account for spaces
                //     />
                // </Grid>
            // </Grid>
            // <Grid container>
            //     <Grid item xs={6} s={6} md={6} lg={6} xl={6}></Grid>
            //     <Grid item xs={6} s={6} md={6} lg={6} xl={6}></Grid>
            // </Grid>
//             </div>

