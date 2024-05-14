import HomeHeader from "../Header/HomeHeader";
import Headerguest from '../Header/Headerguest';
import Footer from "../Footer/Footer";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import { useState, useEffect } from 'react';

import classes from './FAQsPage.module.css';
import FAQsButton from "./FAQsButton";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQsPage =()=>{

    const accessToken = localStorage.getItem('token');

    const [expanded, setExpanded] = useState([]);

    const navigate = useNavigate()
    const contactusBtn = () => {
        navigate("/contactus")
    }

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const toggleExpanded = (index) => { 
            setExpanded((prevExpanded) => { 
            const newExpanded = [...prevExpanded];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
        // index parameter,represents the index of the box that needs to be expanded or collapsed
        //We pass a function to setExpanded that receives the previous state value prevExpanded. 
        //This function is used to calculate the new state value based on the previous state.
        //We create a new array newExpanded by spreading the previous state array prevExpanded. 
        //This ensures that we don't directly mutate the previous state array.
        //We access the index position in the newExpanded array and toggle its value. 
        //If the value was true, it becomes false, and vice versa. 
        //This step allows us to expand or collapse the specific box at the given index.
    };

    const boxData = [
        {
          header: 'How can Inflow help me',
          content: 'How can Inflow help me Inflow is a place where you can find information about life coaching services, the coach background and approach, and often, tools and resources to help you achieve your goals.',
        },
        {
          header: 'How to know if it’s right for me?',
          content: 'How to know if it’s right for me? Inflow is an online platform where you can find information about life coaching services, the coach s background and approach, and often, tools and resources to help you achieve your goals.',
        },
        {
          header: 'What is the Luscher color test?',
          content: 'What is the Luscher color test? The Luscher color test is a psychological assessment tool that uses color preferences to reveal information about a person emotions, personality, and behavior.',
        },
        {
            header: 'What is the Luscher color test used for?',
            content: 'What is the Luscher color test used for? The Luscher color test is often used to gain insight into a person emotional state, personality traits, and underlying motivations. It can be used as a tool for personal development and self-awareness.',
        },
        {
            header: 'How accurate is the Luscher color test?',
            content: 'How accurate is the Luscher color test? The Luscher color test has been shown to have a high degree of accuracy in revealing aspects of a person personality and emotional state. However, it should be used as one tool among many in the coaching process.',
        },
        {
            header: 'Are coaches qualified?',
            content: 'First, you’ll tell us more about you in order to understand your motives and your emotions.',
        },
        {
            header: 'What about my privacy?',
            content: 'What about my privacy? Inflow ethical, we take privacy very seriously to strict professional standards ethics that require me to maintain the confidentiality of all client information',
        },
        {
            header: 'How much will the process cost me?',
            content: 'How much wil the process cost me? You can check our bundles from ',
        },
        {
            header: 'How many sessions do i have to attend?',
            content: 'How many sessions do i have to attend? I depends on your case and coach’s opinion it can be different from user to a another',
        },
        {
            header: 'How differ life coaching from therapy?',
            content: 'Content 10',
        },
        {
            header: 'How do I choose a life coach?',
            content: 'How do I choose my life coach? We’ll be suggesting from our coaches the one that suits your needs.',
        },
        {
            header: 'What type of issues does coach solve?',
            content: 'What types of issues does coach solve ? life coaches can help individuals with a wide range of personal and professional issues, including but not limited to goal-setting, career development, relationship challenges, stress management.',
        },
        {
            header: 'Do I need specific goal in mind?',
            content: 'Do I need specific goal in mind? No, you do not necessarily need to have a specific goal in mind when starting life coaching.',
        },
        {
            header: 'How can I get the most of life coaching?',
            content: 'how can you get most of life coaching? To get the most out of life coaching, it is important to approach the coaching relationship with an open mind, a willingness to learn and grow, and a commitment to taking action on the insights.',
        },
        {
            header: 'Can life coaching be done remotely?',
            content: 'Can life coach be done remotely? Yes Inflow provides a safe online communication between coach and users .',
        },
    ];

      
    return(    
        <div> 
            {accessToken ? <HomeHeader /> : <Headerguest />}
            {/* <FAQsButton/> */}
            <div className={classes.FAQs}>
                <h1>Frequently asked questions</h1>
                <Grid container spacing={2}>
                    {boxData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                            <Box
                                sx={{
                                    border: '0.1px solid',
                                    borderColor: 'black',
                                    p: 0.9,
                                    borderRadius: '4px',
                                    maxHeight: expanded[index] ? '100px' : '150px',
                                    transition: 'max-height 2s ease',
                                    overflow: 'hidden',
                                    marginBottom: '80px',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'transform 2s ease',
                                        height: '15%',
                                        // width: '90%',
                                    }}
                                    onClick={() => toggleExpanded(index)}
                                >
                                    <Typography className={classes.header}>{item.header}</Typography>
                                    <ExpandMoreIcon sx={{color:'rgba(68, 132, 255, 1)', transform: expanded[index] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                </Box>
                                {expanded[index] && (
                                    <Box sx={{ mt: 4 }}>
                                        <Typography variant="body1">{item.content}</Typography>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </div>
                
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
                <Grid container className={classes.contactus}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <h3 style={{ textAlign: "center" }}>It’s okay if it's still not clear, feel free to <button onClick={contactusBtn}>Contact Us</button></h3>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    );

}

export default FAQsPage;