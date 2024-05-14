import HomeHeader from "../Header/HomeHeader";

import { Grid, Paper } from '@material-ui/core';

import classes from "./Results.module.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api.js";

import MobileStepper from '@mui/material/MobileStepper';
import { styled } from '@mui/material/styles';
import FAQsButton from '../FAQs/FAQsButton';

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
    "& .MuiMobileStepper-dot": {  // style of dots 
        borderRadius: "15px",
        width: "32px",
        height: "8px",
        margin: "0 4px",
        backgroundColor: 'transparent',
        border: `1px solid #4484FF`,
    },
    "& .MuiMobileStepper-dotActive": {  // style of active dots
        backgroundColor: "#4484FF",
    },
}));


const Results = (props) => {

    

    const [activeStep, setActiveStep] = useState(0);
    const [count, setCount] = useState(0);

    const navigate = useNavigate();

    const homeBtn = () => {
        navigate("/bookmeeting");
    };

    // const answer = {
    //     numbers: [1, 0, 2, 4, 3]
    // }
    const accessToken = localStorage.getItem('token');
    // const images = localStorage.getItem('image_paths');


    const [images, setImages] = useState([]);
    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('image_paths')) || [];
        setImages(storedImages);
    }, []);  // to get the stored image the way you slected it

    // const images = JSON.parse(localStorage.getItem('image_paths')) || [];
    // const secondcolor2 = images[0];
    // return (
    //   <img src={images[0]} alt="first color" />
    // );

    const [data, setData] = useState([]);

    useEffect(() => {
        const resNumArray = JSON.parse(localStorage.getItem('res_num'));

        // Convert the array of res_num to a comma-separated string
        const resNumString = resNumArray.join(',');

        axios.post(`${API_URL}/api/test/view?res_num=[${resNumString}]`, {
            // your post request data here
        },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => {
                console.log(response.data); // make sure the response is what you expect
                setData(response.data.data); // set the data state with the response data
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    console.log(images[0])

    const rightBtnHandler = () => {
        if (count === 1) {
            setCount(0);
            setActiveStep(0);
        }
        else {
            setCount(count + 1);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    }
    const leftBtnHandler = () => {
        if (count === 0) {
            setCount(1);
            setActiveStep(1);
        } else {
            setCount(count - 1);
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <div>
            <HomeHeader />
            <FAQsButton/>
            <Grid container className={classes.results} >

                {/* Header */}
                <Grid xs={12} xl={12} md={12} lg={12}>
                    <Grid container justify="center">
                        <Grid xs={12} xl={12} md={12} lg={12}>
                            <div className={classes.header}>
                                {count === 0 &&
                                    <h1>
                                        تحليل طريقة استقبالك و منظورك في لحظات الاضطراب</h1>
                                }

                                {count === 1 &&
                                    <h1>
                                        تحليل طريقة استقبالك و منظورك في لحظات الاتزان</h1>
                                }

                                {/* <h2>Thank you for taking the test we hope you find this results insightful</h2> */}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>


                {/* Result */}
                <Grid xs={12} xl={12} md={12} lg={12}>
                    <Grid className={classes.result}>

                        {/* first result */}
                        <Grid container>
                            <Grid justifyContent="center" xs={12} xl={12} md={12} lg={12}>
                                <Grid container>
                                    <Grid className={classes.imagesresult} xs={9} xl={6} md={6} lg={7}>
                                        {count === 0 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[4]}</p>
                                                    </div>
                                                ))[0]}
                                            </p>
                                        }
                                        {count === 1 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[9]}</p>
                                                    </div>
                                                ))[0]}
                                            </p>
                                        }
                                    </Grid>
                                    <Grid className={classes.images} xs={3} xl={4} md={4} lg={5}>
                                        <Grid container>
                                            {/* <Grid xs={6} xl={6} md={6} lg={6}>
                                                    <img src={`${images[0]}`} alt="first color" />
                                                </Grid> */}
                                            <Grid xs={3} xl={6} md={6} lg={6}>
                                                <h4>التوجه</h4>
                                            </Grid>
                                        </Grid>
                                        {/* <img src={secondcolor} className={classes.imageresult} alt="second color" /> */}
                                    </Grid>

                                    {/* <Grid className={classes.imagesresult} xs={12} xl={6} md={6} lg={6}>
                                        <p>
                                            {data.map((item, index) => (
                                                <div key={index}>
                                                    <p>{data[4]}</p>
                                                </div>
                                            ))[0]}
                                        </p>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* second result */}
                        <Grid container   >
                            <Grid xs={12} xl={12} md={12} lg={12}>
                                <Grid container >
                                    <Grid className={classes.imagesresult} xs={9} xl={6} md={6} lg={7} >
                                        {count === 0 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[0]}</p>
                                                    </div>
                                                ))[1]}
                                            </p>
                                        }
                                        {count === 1 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[5]}</p>
                                                    </div>
                                                ))[1]}
                                            </p>
                                        }
                                    </Grid>
                                    <Grid className={classes.images} xs={3} xl={4} md={4} lg={5}>
                                        <Grid container>

                                            {/* <Grid xs={6} xl={6} md={6} lg={6}>
                                                    <img src={`${images[1]}`} alt="second color" />
                                                </Grid> */}
                                            <Grid xs={3} xl={6} md={6} lg={5}>
                                                <h4>طريقه التعامل مع التوجه</h4>
                                            </Grid>
                                        </Grid>
                                        {/* <img src={secondcolor} className={classes.imageresult} alt="second color" /> */}
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>

                        {/* third result */}
                        <Grid container>
                            <Grid xs={12} xl={12} md={12} lg={12}>
                                <Grid container>
                                    <Grid className={classes.imagesresult} xs={9} xl={6} md={6} lg={7}>
                                        {count === 0 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[1]}</p>
                                                    </div>
                                                ))[3]}
                                            </p>
                                        }
                                        {count === 1 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[6]}</p>
                                                    </div>
                                                ))[3]}
                                            </p>
                                        }
                                    </Grid>
                                    <Grid className={classes.images} xs={3} xl={4} md={4} lg={5}>
                                        <Grid container>
                                            {/* <Grid xs={6} xl={6} md={6} lg={6}>
                                                    <img src={`${images[2]}`} alt="third color" />
                                                </Grid> */}
                                            <Grid xs={3} xl={6} md={6} lg={5}>
                                                <h4>الاحتياج</h4>
                                            </Grid>
                                        </Grid>
                                        {/* <img src={secondcolor} className={classes.imageresult} alt="second color" /> */}
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>

                        {/* fourth result */}
                        <Grid container>
                            <Grid xs={12} xl={12} md={12} lg={12}>
                                <Grid container>
                                    <Grid className={classes.imagesresult} xs={9} xl={6} md={6} lg={7}>
                                        {count === 0 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[3]}</p>
                                                    </div>
                                                ))[4]}
                                            </p>
                                        }
                                        {count === 1 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[8]}</p>
                                                    </div>
                                                ))[4]}
                                            </p>
                                        }
                                    </Grid>
                                    <Grid className={classes.images} xs={3} xl={4} md={4} lg={5}>
                                        <Grid container>
                                            {/* <Grid xs={6} xl={6} md={6} lg={6}>
                                                    <img src={`${images[3]}`} alt="fourth color" />
                                                </Grid> */}
                                            <Grid xs={3} xl={6} md={6} lg={5}>
                                                <h4>التوتر</h4>
                                            </Grid>
                                        </Grid>
                                        {/* <img src={secondcolor} className={classes.imageresult} alt="second color" /> */}
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>

                        {/* fifth result */}
                        <Grid container>
                            <Grid xs={12} xl={12} md={12} lg={12}>
                                <Grid container>
                                    <Grid className={classes.imagesresult} xs={9} xl={6} md={6} lg={7}>
                                        {count === 0 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[2]}</p>
                                                    </div>
                                                ))[5]}
                                            </p>
                                        }
                                        {count === 1 &&
                                            <p>
                                                {data.map((item, index) => (
                                                    <div key={index}>
                                                        <p>{data[7]}</p>
                                                    </div>
                                                ))[5]}
                                            </p>
                                        }
                                    </Grid>
                                    <Grid className={classes.images} xs={3} xl={4} md={4} lg={5}>
                                        <Grid container>
                                            {/* <Grid xs={6} xl={6} md={6} lg={6}>
                                                    <img src={`${images[4]}`} alt="fifth color" />
                                                </Grid> */}
                                            <Grid xs={3} xl={6} md={6} lg={5}>
                                                <h4>الركود</h4>
                                            </Grid>
                                        </Grid>
                                        {/* <img src={secondcolor} className={classes.imageresult} alt="second color" /> */}
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid className={classes.slider}>
                            <Grid container>
                                <Grid xs={2} md={2} xl={2} >
                                    <button className={classes.leftbtn} onClick={leftBtnHandler}>
                                        <svg width="29" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="22" cy="22" r="22" fill="#4484FF" />
                                            <path d="M16 22.5C16 22.8405 16.12 23.181 16.3596 23.4406L23.9028 31.6102C24.3826 32.1299 25.1606 32.1299 25.6403 31.6102C26.1199 31.0907 26.1199 30.2483 25.6403 29.7286L18.9657 22.5L25.64 15.2714C26.1197 14.7517 26.1197 13.9094 25.64 13.39C25.1604 12.87 24.3824 12.87 23.9026 13.39L16.3594 21.5594C16.1198 21.8192 16 22.1596 16 22.5Z" fill="white" />
                                        </svg>

                                    </button>
                                </Grid>

                                <Grid xs={8} md={8} xl={8} >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StyledMobileStepper
                                            variant="dots"
                                            steps={2}
                                            position="static"
                                            activeStep={activeStep}
                                            sx={{ maxWidth: 400, flexGrow: 1 }}
                                            className={classes.stepper}
                                            // style={{ backgroundColor: 'transparent', marginLeft: '32%' ,  marginTop:'10px'}}
                                            onStepChange={handleStepChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid xs={2} md={2} xl={2} >
                                    <button className={classes.rightbtn} onClick={rightBtnHandler}>
                                        <svg width="29" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="22" cy="22" r="22" fill="#4484FF" fill-opacity="0.9" />
                                            <path d="M29 21.5C29 21.8405 28.88 22.181 28.6404 22.4406L21.0972 30.6102C20.6174 31.1299 19.8394 31.1299 19.3597 30.6102C18.8801 30.0907 18.8801 29.2483 19.3597 28.7286L26.0343 21.5L19.36 14.2714C18.8803 13.7517 18.8803 12.9094 19.36 12.39C19.8396 11.87 20.6176 11.87 21.0974 12.39L28.6406 20.5594C28.8802 20.8192 29 21.1596 29 21.5Z" fill="white" />
                                        </svg>

                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xs={12} xl={12} md={12} lg={12} container justify="center">
                        <button className={classes.continuebtn} onClick={homeBtn} size="large">What now?</button>
                    </Grid>



                </Grid>
            </Grid>



            <hr />
        </div>
    );
}

export default Results;