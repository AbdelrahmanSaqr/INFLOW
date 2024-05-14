import Headerguest from "../Header/Headerguest";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button  } from "react-bootstrap";
import ResponsiveAppBar from "../Header/Header";

import lap from '../../assets/lap.png';

import classes from './LinkReset.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FAQsButton from '../FAQs/FAQsButton';

const LinkReset =(props)=>{

    const navigate = useNavigate()
    const submitBtn = () => {
        navigate("/")
    }



    return(

        
        <div >

            <ResponsiveAppBar/>
            <FAQsButton/>
            <Grid container direction="column" justifyContent="center" justifyItems="flex-end" >
                    <Grid item container xs={6} xl={12} md={6} justifyContent="center" justifyItems="flex-end" >


            <div  className={classes.pincode}>

                <img src={lap} alt="lap" />
                
                <p>please enter the verification code that has been sent to you. </p>

                <div className={classes.pin}>
                    <input
                        id="password"
                        className={classes.pincontent}
                        type="number"
                        maxlength="1"
                    />
                    <input
                        id="password"
                        className={classes.pincontent}
                        type="number"
                        maxlength="1"
                    />
                    <input
                        id="password"
                        className={classes.pincontent}
                        type="number"
                        maxlength="1"
                    />
                    <input
                        id="password"
                        className={classes.pincontent}
                        type="number"
                        maxlength="1"
                    />
                </div>
                <button onClick={submitBtn} type="submit" className={classes.submitbtn}>submit</button>

                <div>
                    <button type="submit" className={classes.resendcodebtn} >Re-send code</button>
                </div>
            </div>
            </Grid>
            </Grid>
            <hr/>
            
        </div>

    );

}

export default LinkReset;