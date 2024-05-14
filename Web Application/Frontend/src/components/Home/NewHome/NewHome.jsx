import React, { useState } from "react";
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Headerguesthome from "../../Header/Headerguesthome";
import HomeHeader from '../../Header/HomeHeader';
// import HowItWorks from "./NewHomeContent/HowItWorks/HowItWorks";
// import OurVisionMission from "./NewHomeContent/OurVisionMission/OurVisionMission";
// import OurCoaches from "./NewHomeContent/OurCoaches/OurChoaches";
// import UserReviews from "./NewHomeContent/UserReviews/UserReviews";
// import FAQs from "./NewHomeContent/FAQs/FAQs";
import FAQsButton from "../../FAQs/FAQsButton";
import ScrollContent from "./ScollContent/ScrollContent";
import { useRef } from 'react';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { styled } from '@mui/material/styles';

import { Grid } from '@mui/material';

import classes from './NewHome.module.css';

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
    const [showContent, setShowContent] = useState(false);
    const [removecontent, setremoveContent] = useState(false);
    const [count, setCount] = useState(0);
    const targetRef = useRef(null);

    const [activeStep, setActiveStep] = React.useState(0);

    const navigate = useNavigate();
    const hometestBtn = () => {
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

    const handleClick = () => {
        if (targetSection) {
            window.scrollTo({ top: 660, behavior: 'smooth' });
        } // to scroll to the top of the target smoothly when handleClick is clicked
    };

    

    // const handleButtonClick = () => {
    //     navigate("/home")
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
            setShowContent(false);
            setremoveContent(false);
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
            <FAQsButton/>
                <Grid>
                    <Grid container style={{ height: '80vh', padding: '0 9%' }} justify="center" alignItems="center">
                        {!showContent && (
                                <div>
                                    <Grid container >
                                        <Grid item xl={12} xs={12} md={12} style={{ textAlign: 'center' }}>
                                            <div className={classes.faqs}>
                                                <h1 style={{ textAlign: 'left' }}><b>Inflow </b>  provides diagnostic tests and healing services , that clear blockages to be inflow within yourself ,relationships, &your business.​</h1>
                                                <div style={{ display: 'flex', justifyContent: 'left', marginTop: "2%" }}>
                                                    <button onClick={hometestBtn}>Get started</button>
                                                    {/* <button style={{ backgroundColor: 'white', color: '#4484FF', marginLeft: "15px" }} onClick={handleButtonClick}>Learn More</button> */}
                                                </div>
                                            </div>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={12} xl={12} style={{  justifyContent: 'center' }}>
                                            <div className={classes.downarrow} onClick={handleClick}>
                                                {/* <img style={{ marginBottom: '30px' }} src={downArrow} alt="down arrow" /> */}
                                                <svg width="48" height="45" viewBox="0 0 75 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 6.67745L37.5 44.2969L75 6.67745L68.3437 0L37.5 30.942L6.65625 0L0 6.67745Z" fill="white"/>
                                                </svg>

                                            </div>
                                        </Grid>
                                    
                                    </Grid>
                                    
                                    
                                </div>
                            )
                        }

                        
                    </Grid>
                </Grid>
            </div>

            { !removecontent && 
                <div id="target-section">
                    <ScrollContent/>
                </div>
            }

            
        </div>
        

    );
}

export default NewHome;