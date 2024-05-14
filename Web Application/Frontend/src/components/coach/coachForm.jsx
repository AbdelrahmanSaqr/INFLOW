import React, { useState , useEffect} from "react";

import { Form, ProgressBar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Grid ,Radio ,RadioGroup ,FormControlLabel ,FormControl ,FormLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from "../Header/Header";

import classes from './coachForm.module.css';

const coachForm= (props) => {
    

     function useEffect(){
        useEffect(() => {
            // ...
          }, []);
        }
    const [issue, setIssue] = useState("");
    const [gender, setGender] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [haveChildern, setHaveChildern] = React.useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    const handleIssue = (event) => {
        setIssue(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleHaveChildernChange = (event) => {
        setHaveChildern(event.target.value);
    };

    const validateForm = () => {
        if (gender && status && selectedDate && haveChildern) {
          setFormIsValid(true);
        } else {
          setFormIsValid(false);
        }
      };
      
     
    // This code uses the useEffect hook to call the validateForm function 
    // whenever any of the fields change. The validateForm function checks if all the fields have a value, 
    // and sets the formIsValid state accordingly.

    console.log("Gender:", gender);
    console.log("Status:", status);
    console.log("Date:", selectedDate);
    console.log("Childern:", haveChildern);
    console.log("Issue:", issue);

    // const renderDivs = () => {
    //     // create an array of divs based on the selected nav item
    //     const divs = [];
    //     for (let i = 0; i < selectedNavItem; i++) {
    //         divs.push(
    //             <div key={i}>
    //                 <Grid container>
    //                     <Grid  xs={6} xl={12} md={12} >
    //                         <div className={classes.ageofeachchildern}>
    //                             <Grid container>
    //                                 <Grid  xs={6} xl={6} md={6}>
    //                                     <h3>{i+1}:</h3>
    //                                 </Grid>
    //                                 <Grid  xs={6} xl={6} md={6}>
    //                                     <NavDropdown
    //                                         className={classes.ageofchildern}
    //                                         title={<span>{ageOfChildren}</span>}
    //                                         size="sm"
    //                                     > 
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(1)}>1</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(3)}>3</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(5)}>5</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(7)}>7</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(9)}>9</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(10)}>10</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(11)}>11</NavDropdown.Item>
    //                                         <NavDropdown.Item onClick={() => handleAgeChange(12)}>12</NavDropdown.Item>
    //                                     </NavDropdown>
    //                                 </Grid> 
    //                             </Grid>
    //                         </div>
    //                     </Grid>
    //                 </Grid>
    //             </div>
    //         );
    //     }
    //     return divs;
    // };

    
    
    /* <input type="text" />
    <label >Do you have any body issues?</label> */

    return (

        <div>

            <Header />

            {/* header of information form*/}
            <Grid container direction="row" justifyContent="center" justifyItems="flex-start" >
                <Grid item container xs={9.6} xl={12} md={12} justifyContent="flex-start" justifyItems="flex-start">
                    <div className={classes.formheader} >
                        <h2>Fill this form for accurate test results. <small><a href="https://privacyinternational.org/basic-page/618/how-we-use-and-protect-your-data" target="_blank">How we’ll use your data?</a></small> </h2>
                        <h4 class="pb-3">It’s quick and easy.</h4>
                        {/* <ProgressBar variant="rgb(195, 136, 146) color" className={classes.progressbar}  now={60} /> */}
                    </div>
                </Grid>
            </Grid>

            {/* Basics form (first form) */}
            <div className={classes.formcontent}>

                 {/* form header */}
                <Grid container direction="row" justifyContent="flex-start" justifyItems="flex-start">
                    <Grid item container xs={12} xl={12} md={2} justifyContent="flex-start" justifyItems="flex-start">
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" justifyItems="flex-start">
                    <Grid item container xs={12} xl={12} md={0.6} justifyContent="flex-start" justifyItems="flex-start">
                        <h2 style={{ marginTop: 0 }}>Basics</h2>
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" justifyItems="flex-start">
                    <Grid item container xs={12} xl={6} md={2.2} justifyContent="flex-start" justifyItems="flex-start">
                        <p className={classes.basicpara}>We need your gender and birthdate to define your actions based on them</p>
                    </Grid>
                </Grid>

                {/* form first 2 inputs */}
                <div className={classes.information}>
                    <Grid container justifyContent="flex-start">
                        <Grid item container justifyContent="flex start" justifyItems="flex-end">
                            <Grid item xs={12} md={5} >
                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        <h4>Are you ( Gender ) :</h4>
                                    </Grid>
                                    <Grid item xs={12} md={12} >
                                        {/* <div className={classes.genderbtn}> */}
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={gender}
                                                onChange={handleGenderChange}
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                            >
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            </RadioGroup>
                                        </FormControl>
                                        {/* </div> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7} >
                                <div className={classes.yourstatus}>
                                    <Grid container>
                                        <Grid item xs={12} md={12}>
                                            <h4>Your status :</h4>
                                        </Grid>
                                        <Grid item xs={12} md={12} >
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={status}
                                                    onChange={handleStatusChange}
                                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                                >
                                                    <FormControlLabel value="Single" control={<Radio />} label="Single" />
                                                    <FormControlLabel value="Married" control={<Radio />} label="Married" />
                                                    <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
                                                </RadioGroup>
                                            </FormControl>
                                            {/* <div className={classes.yourstatusbtn}>
                                                <button>Single</button>
                                                <button>Married</button>
                                                <button>Divorced</button>
                                            </div> */}
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid container justifyContent="flex-start">
                        <Grid item container justifyContent="flex-start" justifyItems="flex-end">
                            <Grid item xs={12} md={5} >
                                <div className={classes.genderbtn}>

                                    <button>Male</button>
                                    <button>Female</button>

                                </div>
                            </Grid>

                            <Grid item xs={12} md={7} >
                                <div className={classes.yourstatusbtn}>
                                    <button>Single</button>
                                    <button>Married</button>
                                    <button>Divorced</button>
                                </div>
                            </Grid>


                        </Grid>
                    </Grid> */}
                </div>


                {/* form second 2 inputs */}
                <div className={classes.information}>
                    <Grid container justifyContent="flex-start">
                        <Grid item container justifyContent="flex-start" justifyItems="flex-end">

                            <Grid item xs={12} md={5} >
                                <div className={classes.birthday}>

                                    <h4>Birthday</h4>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker 
                                            label="Select Date"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            // renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                    {/* <div className={classes.birthdaybtn}>
                                        <NavDropdown
                                            className={classes.dayofbirth}
                                            title={<span>Day</span>}
                                            size="sm"
                                        >
                                            <NavDropdown.Item >1</NavDropdown.Item>
                                            <NavDropdown.Item >25</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown
                                            className={classes.monthofbirth}
                                            title={<span>Month</span>}
                                            size="sm"
                                        >
                                            <NavDropdown.Item >1</NavDropdown.Item>
                                            <NavDropdown.Item >10</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown
                                            className={classes.yearofbirth}
                                            title={<span>Year</span>}
                                            size="sm"
                                        >
                                            <NavDropdown.Item >2022</NavDropdown.Item>
                                            <NavDropdown.Item >2001</NavDropdown.Item>
                                        </NavDropdown>

                                    </div> */}


                                </div>
                            </Grid>
                            <Grid item xs={12} md={7} >

                                <div className={classes.birthday}>
                                    <h4>Do you have childern?</h4>

                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={haveChildern}
                                            onChange={handleHaveChildernChange}
                                            sx={{ display: 'flex', flexDirection: 'row' }}
                                        >
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                    {/* <div className={classes.childernbtn}>
                                        <button >Yes</button>
                                        <button >No</button>
                                    </div> */}
                                </div>


                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            </div>

            {/* Physical and mental status form (third form) */}
            <div className={classes.formcontent}>

                {/* third part of information */}
                <h2>Physical and mental status</h2>
                <p className={classes.physicalpara}>to define the problem that influence your life in order to solve it.</p>
                
                <div className={classes.inputform}>

                    <Form >
                        <Form.Group>
                            <Form.Label className={classes.formlabel}>Do you have any body issues?</Form.Label>
                            <Form.Control className={classes.textarea} as="textarea" rows={5} />
                        </Form.Group>
                    </Form>

                </div>


                <div className={classes.issues}>
                    <h4>What is your most headache problem?</h4>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="controlled-radio-buttons-group"
                            value={issue}
                            onChange={handleIssue}
                        >
                            <FormControlLabel value="Father issues" control={<Radio />} label="Father issues" />
                            <FormControlLabel value="Mother issues" control={<Radio />} label="Mother issues" />
                            <FormControlLabel value="No issues" control={<Radio />} label="No issues" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    {/* <NavDropdown
                        className={classes.issuesitems}
                        title={<span>{issue}</span>}
                        size="sm"
                        
                    >
                        <NavDropdown.Item onClick={() => handleIssue("Father issues")}>Father issues</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleIssue("Mother issues")}>Mother issues</NavDropdown.Item>
                    </NavDropdown> */}
                </div>

                <br />
                <Grid container justifyContent="flex-start">
                    <Grid item xs={9} xl={12} md={8}container justifyContent="center" justifyItems="flex-end">
                        <button
                            type="submit"
                            className={classes.testinstructionsbtn}
                           
                            disabled={!formIsValid}
                        > Test instructions </button>
                    </Grid>
                </Grid> 

            </div>

            <hr />


        </div>


    );
};

export default coachForm;