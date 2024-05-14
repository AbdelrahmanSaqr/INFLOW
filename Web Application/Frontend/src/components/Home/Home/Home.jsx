import React, { useState } from "react";
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Headerguesthome from "../../Header/Headerguesthome";
import HomeHeader from '../../Header/HomeHeader';
// import Introduction from "./NewHomeContent/Introduction/Introduction";
import HowItWorks from "../HomeContent/HowItWorks/HowItWorks";
import OurVisionMission from "../HomeContent/OurVisionMission/OurVisionMission";
import OurCoaches from "../HomeContent/OurCoaches/OurChoaches";
import UserReviews from "../HomeContent/UserReviews/UserReviews";
import FAQs from "../HomeContent/FAQs/FAQs";
// import downArrow from '../../../assets/downarrow.png';
// import { Link } from 'react-router-dom';
import { useRef } from 'react';
// import { Button } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { styled } from '@mui/material/styles';


import { Grid } from '@mui/material';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

import classes from './Home.module.css';

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
    "& .MuiMobileStepper-dot": {  // style of dots 
        borderRadius: "0",
        width: "32px",
        height: "8px",
        margin: "0 4px",
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.common.white}`,
    },
    "& .MuiMobileStepper-dotActive": {  // style of active dots
        backgroundColor: "white",
    },
  }));


const NewHome = () => {

    const [targetSection, setTargetSection] = useState(null);
    // const [showContent, setShowContent] = useState(false);
    // const [removecontent, setremoveContent] = useState(false);
    const [count, setCount] = useState(0);
    const targetRef = useRef(null);

    const [activeStep, setActiveStep] = React.useState(0);

    const navigate = useNavigate();
    const homeBtn = () => {
        navigate("/hometest")
    };

    useEffect(() => {
        const section = document.getElementById('target-section');
        setTargetSection(section);
    }, []); //find and store a reference to a DOM element with the ID of target-section. 
    //It then sets the reference to the targetSection state variable using the setTargetSection function.

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
    

    // const handleButtonClick = () => {
    //     setShowContent(true);
    //     setremoveContent(true);
    // }
    

    const rightBtnHandler = () => {
        if (count === 4) {
            setCount(0);
            setActiveStep((prevActiveStep) => {
                const isLastDot = prevActiveStep === 4; // replace 5 with the index of the last dot
                return isLastDot ? 0 : prevActiveStep + 1;
                // we assume that the last dot has an index of 5. 
                // If your steps prop is a different value, you'll need to adjust this accordingly.
            });
        }
        else {
            setCount(count + 1);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        
    }

    
    const leftBtnHandler = () => {
        if (count === 0) {
            navigate("/")
        }
        else {
            setCount(count - 1);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    

    const accessToken = localStorage.getItem('token');
    

    return (
        <div>
            <div className={classes.home}>
                {accessToken ? <HomeHeader /> : <Headerguesthome />}
                {/* <Grid container style={{ height: '80vh', padding: '0 9%' }} justify="center" alignItems="center">
                    {!showContent && (
                            <div>
                                <Grid container >
                                    <Grid item xl={12} xs={12} md={12} style={{ textAlign: 'center' }}>
                                        <div className={classes.faqs}>
                                            <h1 style={{ textAlign: 'left' }}>For a happy family <b>Inflow </b> provides affordable online coaching for couples, individuals starts from 7 years</h1>
                                            <div style={{ display: 'flex', justifyContent: 'left', marginTop: "2%" }}>
                                                <button onClick={homeBtn}>Get started</button>
                                                <button style={{ backgroundColor: 'white', color: '#4484FF', marginLeft: "15px" }} onClick={handleButtonClick}>Learn More</button>
                                            </div>
                                        </div>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={12} xl={12} style={{  justifyContent: 'center' }}>
                                        <div className={classes.downarrow} onClick={handleClick}> */}
                                            {/* <img style={{ marginBottom: '30px' }} src={downArrow} alt="down arrow" /> */}
                                            {/* <svg width="48" height="45" viewBox="0 0 75 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 6.67745L37.5 44.2969L75 6.67745L68.3437 0L37.5 30.942L6.65625 0L0 6.67745Z" fill="white"/>
                                            </svg>

                                        </div>
                                    </Grid>
                                
                                </Grid>
                                
                                
                            </div>
                        )
                    }

                    
                </Grid> */}

                {/* <Grid container style={{ height: '30vh' }}>
                    <Grid item xs={12} xl={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <h1>INFLOW</h1>
                    </Grid>
                </Grid> */}
                
                <Grid container>
                    <Grid xs={12} md={8} xl={8}>
                        <div className={classes.homecontent}>
                            {/* {count === 0 && <Introduction />} */}
                            {count === 0 && <HowItWorks />}
                            {count === 1 && <OurVisionMission />}
                            {count === 2 && <OurCoaches />}
                            {count === 3 && <UserReviews />}
                            {count === 4 && <FAQs />}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <StyledMobileStepper
                                    variant="dots"
                                    steps={5}
                                    position="static"
                                    activeStep={activeStep}
                                    sx={{ maxWidth: 400, flexGrow: 1 }}
                                    className={classes.stepper}
                                    style={{ backgroundColor: 'transparent', marginLeft: '150px' }}
                                    onStepChange={handleStepChange}
                                />
                            </div>
                        </div>
                        <Grid xs={12} md={2} xl={2} >
                            <button className={classes.rightbtn} onClick={rightBtnHandler}>
                                <svg width="20" height="34" viewBox="0 0 29 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.98322 0.000538946C3.34202 -0.0115083 2.71298 0.178679 2.18314 0.544785C1.6533 0.910891 1.24887 1.43481 1.0258 2.04405C0.802725 2.65329 0.772051 3.31771 0.938021 3.94539C1.10399 4.57306 1.4584 5.13295 1.95219 5.54757L20.8501 21.9403L1.94052 38.333C1.59506 38.5882 1.30555 38.9132 1.09027 39.2874C0.874984 39.6617 0.738599 40.0771 0.689719 40.5074C0.640839 40.9377 0.680526 41.3737 0.806275 41.7877C0.932024 42.2017 1.1411 42.5848 1.42032 42.9128C1.69954 43.2408 2.04283 43.5067 2.42853 43.6935C2.81423 43.8803 3.23396 43.9841 3.66124 43.9983C4.08852 44.0125 4.51407 43.9368 4.91102 43.776C5.30798 43.6152 5.66773 43.3727 5.96756 43.064L27.5852 24.3413C27.9252 24.047 28.1981 23.6816 28.3853 23.2702C28.5725 22.8587 28.6694 22.4111 28.6694 21.958C28.6694 21.505 28.5725 21.0574 28.3853 20.6459C28.1981 20.2345 27.9252 19.8691 27.5852 19.5748L5.96756 0.792971C5.41975 0.298804 4.71647 0.0179532 3.98322 0.000538946Z" fill="white" />
                                </svg>
                            </button>
                        </Grid>
                        <Grid xs={12} md={2} xl={2} >
                            <button className={classes.leftbtn} onClick={leftBtnHandler}>
                                <svg width="20" height="34" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.6862 0.000538946C25.3274 -0.0115083 25.9565 0.178679 26.4863 0.544785C27.0161 0.910891 27.4206 1.43481 27.6436 2.04405C27.8667 2.65329 27.8974 3.31771 27.7314 3.94539C27.5654 4.57306 27.211 5.13295 26.7172 5.54757L7.81932 21.9403L26.7289 38.333C27.0744 38.5882 27.3639 38.9132 27.5792 39.2874C27.7944 39.6617 27.9308 40.0771 27.9797 40.5074C28.0286 40.9377 27.9889 41.3737 27.8632 41.7877C27.7374 42.2017 27.5283 42.5848 27.2491 42.9128C26.9699 43.2408 26.6266 43.5067 26.2409 43.6935C25.8552 43.8803 25.4355 43.9841 25.0082 43.9983C24.5809 44.0125 24.1554 43.9368 23.7584 43.776C23.3615 43.6152 23.0017 43.3727 22.7019 43.064L1.08424 24.3413C0.744265 24.047 0.471287 23.6816 0.284109 23.2702C0.0969315 22.8587 0 22.4111 0 21.958C0 21.505 0.0969315 21.0574 0.284109 20.6459C0.471287 20.2345 0.744265 19.8691 1.08424 19.5748L22.7019 0.792971C23.2497 0.298804 23.953 0.0179532 24.6862 0.000538946Z" fill="white" />
                                </svg>
                            </button>
                        </Grid>
                    </Grid>
                        
                </Grid>
            </div>
            
        </div>
        

    );
}

export default NewHome;