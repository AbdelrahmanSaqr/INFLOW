import classes from './OurCoaches.module.css';
import professtionalphtoto from '../../../../../assets/professionalphoto.jpg';
import professtionalphtoto2 from '../../../../../assets/professionalphoto2.jpg';

import React, { useState } from "react";

import { Grid } from '@mui/material';

import { useNavigate } from "react-router-dom";

const OurCoaches =() => {

    const navigate = useNavigate()
    const home = () => {
      navigate("/home")
    }

    const [count, setCount] = useState(0);

    const seemoreHandler = () => {
        if(count===0){
            setCount(1);
        }
        if(count===1){
            setCount(0);
        }   
    }

    return(
        <div className={classes.ourcoaches}>
            <Grid container>
                <Grid xs={12} md={12} xl={12}>
                    <h1>Meet our team of professional coaches</h1>
                </Grid>
                <div className={classes.content}>
                    <Grid container>
                        <Grid xs={12} md={3.5} xl={3.5}>
                            <img src={professtionalphtoto} alt="professtional phtoto"/>
                            
                        </Grid>
                        <Grid xs={12} md={8} xl={8}>
                            <Grid container>
                                <h2>Noha Ahmed</h2>
                                <p>More than 10 years in professional coaching career, It’ll be me great
                                    to help you with your problems and pass it together with a well
                                    studied advices and expertise.
                                </p>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={3.5} xl={3.5}>
                            <img src={professtionalphtoto2} alt="professtional phtoto2"/>        
                        </Grid>
                        <Grid xs={12} md={8} xl={8}>
                            <Grid container>
                                <h2>Ahmed Mostafa </h2>
                                <p>More than 10 years in professional coaching career, It’ll be me great
                                    to help you with your problems and pass it together with a well
                                    studied advices and expertise.
                                </p>
                            </Grid>
                        </Grid>


                    </Grid>
                            {/* 
                                {count === 1 && <img src={professtionalphtoto2} alt="professtional phtoto2"/>}
                                {count === 1 && 
                                <Grid container>
                                    <h2>Ahmed Mostafa </h2>
                                    <p>More than 10 years in professional coaching career, It’ll be me great
                                        to help you with your problems and pass it together with a well
                                        studied advices and expertise.
                                    </p>
                                    <button className={classes.seemore}>
                                        <Grid xs={12} md={12} xl={12}>
                                            <svg onClick={seemoreHandler} width="72" height="18" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 4.22081L24 28L47.5 4.22081L43.3287 0L24 19.5584L4.67125 0L0.5 4.22081Z" fill="white"/>
                                            </svg>
                                        </Grid>
                                        <Grid xs={12} md={12} xl={12}>
                                            <button className={classes.seemorebtn} onClick={seemoreHandler}>see more</button>
                                        </Grid>      
                                    </button> 
                                </Grid>
                            } */}
                            
                        
                    
                </div>
            </Grid>
            {/* <button className={classes.ourcoachesbtn} onClick={home} >Get started</button> */}
        </div>
    );
}

export default OurCoaches;