import React from 'react';
import HomeHeader from "../Header/HomeHeader";
import { useNavigate } from "react-router-dom";
import classes from "./Testinformation.module.css";
import {  Grid ,TextField ,FormControlLabel ,Checkbox ,FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import back from "../../assets/Vector.png";
import { useState , useEffect } from "react";
import MobileStepper from '@mui/material/MobileStepper';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FAQsButton from '../FAQs/FAQsButton';

import axios from 'axios'
import { API_URL } from '../../api.js';

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  "& .MuiMobileStepper-dot": {  // style of dots 
      borderRadius: "15px",
      width: "62px",
      height: "8px",
      margin: "0 4px",
      backgroundColor: 'rgba(206, 206, 206, 1)',
      border: `1px solid ${theme.palette.common.white}`,
  },
  "& .MuiMobileStepper-dotActive": {  // style of active dots
      backgroundColor: "rgba(68, 132, 255, 0.6)",
  },
}));


const TestInstructions = (props) => {
  const [count, setCount] = useState(0);
  const [arrow , setArrow] = useState(false);
  const [age, setAge] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButton2Disabled, setIsButton2Disabled] = useState(true);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [problem, setProblem] = useState([]);

  const [gender, setGender] = useState('');
  // const [selectedAge, setSelectedAge] = useState('');
  const [status, setStatus] = useState('');
  const [therapy, setTherapy] = useState('');

  const accessToken = localStorage.getItem('token');  // get the accessToken to use it

  const handleInputChange = (event) => {
    const inputAge = event.target.value;
    setAge(inputAge);

    // Check if input is a number
    const isNumber = /^\d+$/.test(inputAge);
    const isInRange = parseInt(inputAge) >= 5 && parseInt(inputAge) <= 100;
    setIsButtonDisabled(!isNumber || !isInRange);
  };

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedCheckbox(checked ? name : null);
  //   setIsButtonDisabled2(!checked);
  // };

  const GenderBtnHandler = (selectedGender) => {
    setCount(count + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setGender(selectedGender);
    console.log(selectedGender);
  }

  const AgeBtnHandler = () => {
    setCount(count + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(age);
  }

  const StatusBtnHandler = (selectedStatus) => {
    setCount(count + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStatus(selectedStatus);
    console.log(selectedStatus);
  }

  const TherapyBtnHandler = (selectedTherapy) => {
    setCount(count + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setTherapy(selectedTherapy);
    console.log(selectedTherapy);
  }

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (!problem.includes(value)) {
        setProblem((prevProblem) => [...prevProblem, value]);
      }
    } else {
      setProblem((prevProblem) => prevProblem.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    setIsButton2Disabled(problem.length === 0);
    console.log(JSON.stringify(problem));
  }, [problem]);

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  const element = document.querySelector('.header');
  if (element) {
    element.classList.add('my-class');
  }


  const navigate = useNavigate();

  const arrowBtn = () => {
    if (count === 0) {
      navigate("/hometest");
    }
    else {
      setCount(count - 1);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  // Handler function for the "Start Test" button
  // const testinstructionBtn = () => {
  //   navigate("/test-instructions");
  // };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // const isButton2Disabled = problem.length === 0;

  const onSubmit = async (e) => {
    e.preventDefault()
    const post = {
        gender: gender,
        age: age,
        status: status,
        therapy: therapy,
        problem: problem,
    }
    try {
        // var res = await axios.post('http://127.0.0.1:8000/api/auth/register', post)
        var res = await axios.post(`${API_URL}/api/questions` , post ,{
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        // alert(res.data['status']);
        // console.log(res.data);
        navigate('/test-instructions')
        // const data = res.data
        // alert(res.data['message'])
    }
    catch (e) {
      alert("Error")
    }

    // console.log(res.data);
  }

  return (
    <div>

      <HomeHeader/>
      <FAQsButton/>

      {/* Header */}
      <Grid container>
        <Grid xs={12} xl={12} md={12} justifyContent="center">
          <div style={{ marginTop: "60px" ,display: 'flex', justifyContent: 'center' }}>
            <StyledMobileStepper
                variant="dots"
                steps={5}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 400, flexGrow: 1 }}
                className={classes.stepper}
                style={{ backgroundColor: 'transparent' , marginLeft: "30px" ,marginTop: "40px"  }}
                onStepChange={handleStepChange}
            />
          </div>
          <div style={{ marginBottom: "-10px" }} className={classes.contentheader}>
            <h2 style={{ textAlign: "center" }}>Help us know more about you </h2>
            {/* <p>Test consist of 5 colors cubes, From the offered colors,{" "}
                <strong>select the one you like most</strong>,then repeat thisuntil all colors finished.</p> */}
          </div>
        </Grid>
        <Grid xs={12} xl={12} md={12} justifyContent="center">
          <div style={{ marginBottom: "-10px", marginTop: "10px" }} className={classes.contentheader}>
            <p style={{ textAlign: "center" }}>Let's walk through the proccess of finding best coach for you! We'll <br /> start off with some basic questions </p>
            {/* <p>Test consist of 5 colors cubes, From the offered colors,{" "}
                <strong>select the one you like most</strong>,then repeat thisuntil all colors finished.</p> */}
          </div>
        </Grid>
      </Grid>
      

      {/* question container */}
      <div className={classes.content}>
        <div className={classes.contentquestions}>
          <Grid container>
            <Grid xs={3} xl={2} md={2} lg={2} style={{ textAlign: "left" }}>
              <div style={{ marginBottom: "-10px" }} >       
                <button className={classes.logodisplay} style={{width:"0px" , padding:"0 1px"}}  onClick={arrowBtn}>
                  <img src={back} alt='back' />
                </button>
              </div>
            </Grid>
            <Grid xs={8} xl={10} md={10} lg={10}>
              <div style={{ marginBottom: "-10px" }}>
                {count === 0 && <h4 style={{ textAlign: "left" }}> What's Your Gender?</h4>}
                {count === 1 && <h4 style={{ textAlign: "left" }}> How old are you?</h4>}
                {count === 2 && <h4 style={{ textAlign: "left" }}> What's Your relationship status?</h4>}
                {count === 3 && <h4 style={{ textAlign: "left" }}> Did you take therapy before?</h4>}
                {count === 4 && <h4 style={{ textAlign: "left" }}> What is  your problem?</h4>}
                {/* {count === 5 && <h4 style={{ textAlign: "left" }}> How to do prefer to communicate with your therapist?</h4>} */}
                {/* {count === 5 && <h4 style={{ textAlign: "left" }}> which is your prefer language?</h4>}  */}
              </div>
            </Grid>
          </Grid>
        </div>



        {/* page lower content */}
        <form onSubmit={onSubmit}>
          <div className={classes.pagecontent}>
            {count === 0 && 
              <Grid container direction="row" justifyContent="center">
                <Grid item xs={12} md={10} >
                  <button className={classes.genderbtn} onClick={() => GenderBtnHandler('Man')} size="large"><h5>Man</h5></button>
                </Grid>
                <Grid item xs={12} md={10} >
                  <button style={{ marginBottom: "15%" }} className={classes.genderbtn} onClick={GenderBtnHandler} size="large"><h5>Woman</h5></button>
                </Grid>
              </Grid>
            }
            {count === 1 && 
              <Grid container direction="row" justifyContent="center">
                <Grid item xs={10} md={10} >
                  <TextField 
                    style={{ marginBottom: "10%" }} 
                    id="outlined-basic" 
                    label="Your Age" 
                    variant="outlined" 
                    value={age}
                    onChange={handleInputChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                  <button className={classes.submitBtn} onClick={AgeBtnHandler} disabled={isButtonDisabled}>Confirm</button>
                </Grid>
              </Grid>
            }
            {count === 2 && 
              <Grid container direction="row" justifyContent="center">
                <Grid item xs={12} md={10} >
                  <button className={classes.genderbtn} onClick={() => StatusBtnHandler('Single')} size="large"><h5>Single</h5></button>
                </Grid>
                <Grid item xs={12} md={10} >
                  <button className={classes.genderbtn} onClick={() => StatusBtnHandler('Married')} size="large"><h5>Married</h5></button>
                </Grid>
                <Grid item xs={12} md={10} >
                  <button className={classes.genderbtn} onClick={() => StatusBtnHandler('Divorced')} size="large"><h5>Divorced</h5></button>
                </Grid>
              </Grid>
            }
            {count === 3 && 
              <Grid container direction="row" justifyContent="center">
                <Grid item xs={12} md={10} >
                  <button className={classes.genderbtn} onClick={() => TherapyBtnHandler('Yes')} size="large"><h5>Yes</h5></button>
                </Grid>
                <Grid item xs={12} md={10} >
                  <button style={{ marginBottom: "15%" }} className={classes.genderbtn} onClick={() => TherapyBtnHandler('No')} size="large"><h5>No</h5></button>
                </Grid>
              </Grid>
            }
            {count === 4 && 
              <Grid container direction="row" justifyContent="center">
                <Grid item xs={10} md={10} >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckboxChange} value="Parents" />}
                      label="With Parents"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckboxChange} value="Marriage" />}
                      label="With Marriage"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckboxChange} value="Children" />}
                      label="With Children"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckboxChange} value="Others" />}
                      label="Others"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={10} >
                  <button 
                    style={{ marginBottom: "10%",marginTop: "3%" }} 
                    className={`${classes.countrybtn} ${isButtonDisabled ? 'disabled' : ''}`}
                    // onClick={BtnHandler} 
                    disabled={isButton2Disabled} 
                    size="large"
                  >
                    <h5>Confirm</h5>
                  </button>
                </Grid>
              </Grid>
            }

            {/* language */}
          </div>
        </form>
      </div>
      {/* <iframe src="http://localhost:8501/" width="-50%" height="400px"></iframe> */}
      {/* Divider */}
      <hr />
    </div>
  );
};

export default TestInstructions;


{/* <Grid item xs={10} md={10} >
                  <FormControl style={{ marginBottom: "5%" , width:"100%" }}>
                    <InputLabel id="text-label">Select your country</InputLabel>
                    <Select
                      labelId="Country-label"
                      id="country-select"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <MenuItem value="Egypt">Egypt</MenuItem>
                      <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                      <MenuItem value="Iraq">Iraq</MenuItem>
                      <MenuItem value="Emirates">Emirates</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}