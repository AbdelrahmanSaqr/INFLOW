import classes from './FAQs.module.css';

import { Button, Grid , Backdrop } from '@mui/material';

import { useNavigate } from "react-router-dom";

const FAQs =() => {

    const navigate = useNavigate()
    const hometest = () => {
      navigate("/hometest")
    }

    return(
        <div className={classes.faqs}>
            <h1>Frequently asked questions</h1>
            <div className={classes.faqscontent}>
                <Grid container>
                    <Grid xs={12} md={4} xl={4}>
                        <h2>What is life coaching?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>

                        <h2>How does the process work?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>

                        <h2>How to know if it’s right for me?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>
                    </Grid>
                    <Grid xs={12} md={4} xl={4}>
                        <h2>How can life coaching help me?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>
                        
                        <h2>Can I try  before committing?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>
                    
                        <h2>What results can i expect</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>
                    </Grid>
                    <Grid xs={12} md={4} xl={4}>
                        <h2>What about my privacy?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>

                        <h2>Are coaches qualifed?</h2>
                        <p>First, you’ll tell us more about you in order to understand your motives and your emotions.</p>

                        <h3>Still have questions? <strong>see more</strong></h3>
                        <button onClick={hometest} >Get started</button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default FAQs;