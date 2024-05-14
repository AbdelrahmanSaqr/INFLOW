import React, { useEffect, useState } from 'react';

import Header from "../Header/Header";
import HomeHeader from '../Header/HomeHeader'
import Headerguesthome from '../Header/Headerguesthome';
import classes from "./coach.module.css";

import { Box, FormControl, Grid, MenuItem, Paper, Select, TextField } from '@mui/material';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { format, getDay } from 'date-fns';
import ChatBotIcon from '../ChatBot/ChatBot';
import { API_URL } from "../../api.js";
import FAQsButton from '../FAQs/FAQsButton';



// useEffect(() => {  // to get the array that have the day and time every are doctor available in 
//     const doctorID = JSON.parse(localStorage.getItem('doctor_id'));
//     // to get the doctor id to use it in the request
//     axios.post(`${API_URL}/api/appointment/show?doctor_id=${doctorID}&date=2023-4-29`, null, {
//         headers: { 'Authorization': `Bearer ${accessToken}` }
//     })
//     .then(response => {
//         console.log("this is data.id" , doctorID)
//         console.log("this is array of data" , response.data);
//         setAvailable(response.data.data);
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }, []);


const Coach = (props) => {



    // const today = new Date();
    // const currentDay = format(today, 'EEEE'); // 'EEEE' represents the full day name (e.g., 'Monday')

    // console.log('Today is:', currentDay);



    const accessToken = localStorage.getItem('token');  // get the accessToken to use it

    const [data, setData] = useState([]);   // to get Doctor ID 
    const [selectedDoctorId, setSelectedDoctorId] = useState(null); // state variable to store the doctor ID
    const [startDate, setStartDate] = useState(new Date()); // start date function this for Book now button to know which day is today
    const [open, setOpen] = React.useState(false);  // function open ms2ol 3n modal
    const [available, setAvailable] = useState([]);  // available array ( time doctor available in , date , time and so on )
    const [days2, setDays2] = useState([]);    // days inside available array
    const [selectedDayTimes, setSelectedDayTimes] = useState([]);  // when you select specific day it store all times that are available in this day 
    const [activeButton, setActiveButton] = useState('');  //when you select a day it make it active
    const [activeTimeButton, setActiveTimeButton] = useState(null);  //when you select a time it make it active


    useEffect(() => {
        axios.get(`${API_URL}/api/doctors`, { // call API to get the data of doctor
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            // store data f variable in data that why we use setData and slice(1) to make me begain with
            // index 1 not 0 because 0 for Admin
            .then(response => {
                setData(response.data.data.slice(1));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
    
        const today = formatDate(new Date());
        const nextWeek = formatDate(getNextWeekDate());
    
        if (selectedDoctorId) {
          axios
            .get(
              `${API_URL}/api/appointment/show?doctor_id=${selectedDoctorId}&start_date=${today}&end_date=${nextWeek}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then(response => {
              console.log('Doctor ID:', selectedDoctorId);
              console.log('Data array:', response.data);
              setAvailable(response.data.data);
            })
            .catch(error => {
              console.log('Error:', error);
            });
        }
    }, [selectedDoctorId]);
    
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getNextWeekDate = () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        return nextWeek;
    };
    

    useEffect(() => {
        axios.post(`${API_URL}/api/appointment/store?app_id=${localStorage.getItem('appointmentId')}&date=${localStorage.getItem('selectedDay')}`, null, { // call API to get the data of doctor
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            // store data f variable in data that why we use setData and slice(1) to make me begain with
            // index 1 not 0 because 0 for Admin
            .then(response => {
                // Handle the success response
                console.log('Appointment booked successfully lololololololololy:', response.data.data);
                // Store the appointment ID in local storage

                // Perform any necessary actions after successful booking
            })
            .catch(error => {
                // Handle the error
                console.log('Appointment booking error:', error);
                // Perform any necessary actions for error handling
            });
    }, []);



    useEffect(() => {
        console.log('Second useEffect triggered');
        console.log('Available data:', available);
        if (available) {
          const currentDate = new Date();
          const currentDay = currentDate.getDay(); // Get the current day (0-6, where 0 is Sunday)
          console.log('Current day:', currentDay);
      
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
          const uniqueDays = [...new Set(available.map(item => item.day))]
            .filter(day => {
              const dayIndex = daysOfWeek.findIndex(weekDay => weekDay === day);
              return dayIndex >= currentDay; // Include days starting from the current day
            });
      
          setDays2(uniqueDays);
          console.log('days2:', uniqueDays); 
        }
    }, [available]);
    // The available data is an array of objects,each of which has a day property (day the doctor is available)
    // [...new Set(available.map(item => item.day))]: available.map(item => item.day) extracts an array of day values 
    // from each item in the available array. This creates an array of all the days available in the data.
    // [...new Set(array)] creates a new array containing only unique values from the original array. 
    // This helps remove any duplicate days that may exist in the available data.
    // .filter(day => { ... }): This is a filter operation applied to the uniqueDays array.
    // Inside the filter function, day represents each individual day from the uniqueDays array.
    // const dayIndex = daysOfWeek.findIndex(weekDay => weekDay === day) finds the index of the day in the daysOfWeek array.
    // return dayIndex >= currentDay filters the days based on the condition that they should 
    // have an index greater than or equal to the currentDay. 
    // This ensures that only days starting from the current day are included in the uniqueDays array.
      

    const handlePrevWeek = () => {
    const today = new Date();
    const prevWeek = new Date(startDate);
    prevWeek.setDate(prevWeek.getDate() - 7);

    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of the current week

    if (prevWeek >= currentWeekStart) {
        setStartDate(prevWeek);
    } else {
        setStartDate(currentWeekStart);
    }
    };// prev week button to make you go back 7 days(week) when you click on it

    const handleNextWeek = () => {
        const nextWeek = new Date(startDate);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setStartDate(nextWeek);
    };  // next week button to make you go 7 days(week) when you click on it


    const days = [];
    for (let i = 0; i <= 6; i += 6) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dayOfWeek = new Intl.DateTimeFormat("en-US", {
            weekday: "short"
        }).format(date);
        const monthDay = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric"
        }).format(date);
        days.push(`${dayOfWeek} ${monthDay}`);
    };  // el ayam htt7sb azay  bel format bt3ha

    const handleClose = () => {
        setOpen(false);
        setSelectedDayTimes([]);
    }

    const handlePaymentButtonClick = () => {
        if (activeButton && activeTimeButton) {
            // Get the selected day, time, and date
            const selectedDay = activeButton;
            const selectedTime = activeTimeButton;
            const selectedDate = '2023-4-29'; // Replace with your selected date logic

            // Find the appointment object with the matching day and time
            const selectedAppointment = available.find(item => item.day === selectedDay && item.from === selectedTime);

            if (selectedAppointment) {
                const appointmentId = selectedAppointment.id;

                // Perform any necessary actions before proceeding to payment, such as validating the appointment or checking for availability

                // Store the appointment ID in local storage
                localStorage.setItem('appointmentId', appointmentId);

                // Proceed to the payment or navigate to the payment page
                // Replace the following line with your payment logic or navigation code
                console.log('Proceed to payment or navigate to payment page');
            }
        } else {
            // Handle the case where no day or time is selected
            console.log('Please select a day and time');
        }

        navigate("/payment")
    };

    const handleClick2 = (day) => {
        // Define an array of weekdays
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Get the current day of the week
        const currentDayIndex = new Date().getDay();

        // Find the index of the selected day
        const selectedDayIndex = weekdays.indexOf(day);

        // Compute the difference in days
        let difference = selectedDayIndex - currentDayIndex;
        if (difference < 0) {
            difference += 7; // To handle negative differences, add 7
        }

        // Create a new Date object with the adjusted difference
        const selectedDate = new Date();
        selectedDate.setDate(selectedDate.getDate() + difference);

        // Get the year, month, and day components
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const date = selectedDate.getDate().toString().padStart(2, '0');

        // Format the result as "year-month-day"
        const formattedDay = `${year}-${month}-${date}`;

        localStorage.setItem('selectedDay', formattedDay);

        // Continue with the rest of the code
        const times = available.filter(item => item.day === day).map(item => item.from);
        console.log("Times for", day, "are", times);
        setSelectedDayTimes(times);
        setActiveButton(day);
    };



    const rate = ["High to Low", "Low to High"];
    const [value, setValue] = React.useState(rate[0]);
    const handleChange = (event) => {
        setValue(event.target.value);
        // used in dorting from High to Low
    };

    const getButtonClass = (buttonName) => {
        let classesArray = [classes.daysbtn];
        if (activeButton === buttonName) {
            classesArray.push(classes.clicked);
        }
        return classesArray.join(' ');
    };  // here to change the style of css when the day button is clicked

    const handleClickTime = (time) => {
        setActiveTimeButton(time);
    };  // here to change the style of css when the time button is clicked




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '750px',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: '4%',
        borderRadius: '20px',
        border: 'solid 2px white'
      };
      

    const navigate = useNavigate();
    const paymentBtn = () => {
        navigate("/payment")
    };



    const handleAppointmentBooking = (day, time, selectedDate) => {
        // Find the appointment object with the matching day and time
        const selectedAppointment = available.find(item => item.day === day && item.from === time);

        if (selectedAppointment) {
            const appointmentId = selectedAppointment.id;
            const formattedDays = localStorage.getItem("selectedDay")

            // Perform the appointment booking by making a POST request to the API
            const url = `${API_URL}/api/appointment/store?appointment_id=${appointmentId}&date=${formattedDays}`;

            axios.post(url, null, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })
                .then(response => {
                    // Handle the success response
                    console.log('Appointment booked successfully:', response.data);
                    // Store the appointment ID in local storage
                    localStorage.setItem('appointmentId', appointmentId);
                    // Perform any necessary actions after successful booking
                })
                .catch(error => {
                    // Handle the error
                    console.log('Appointment booking error:', error);
                    // Perform any necessary actions for error handling
                });

            setActiveTimeButton(time);
        }
    };

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);


    return (
        <Grid>

            {/* <Header /> */}
            {accessToken ? <HomeHeader /> : <Headerguesthome />}
            <ChatBotIcon />
            <FAQsButton/>

            {/* first thing of page (the photo and sentences inside ) */}
            <Grid container justifyContent="center" justifyItems="center">
                <Grid item xs={12} xl={12} lg={12} md={12} justifyContent="center" justifyItems="center">
                    <Box className={classes.upperpage}>
                        <h1>Emotional healing made simple</h1>
                        <p>Book your professional coach available online and offline for you.</p>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" justifyItems="center" style={{ marginTop: "5%" }}>

                {/* Search and Sort by */}
                <Grid
                    component="form"
                    className={classes.searchAndSort}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800, justifyContent: 'center' }}
                >
                    {/* Search */}
                    <Grid container>
                        <Grid 
                            item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{ 
                                marginTop: "10px" ,
                                display: 'flex',
                                alignItems: 'center',
                                position:'relative',
                                left:'5%',
                                justifyContent: 'center' ,
                                // marginLeft: "100px", 
                                marginBottom: "10px",
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12} sm={2.7} md={1.8} lg={1.8} xl={2}>
                                    <p style={{ marginTop: "10px" }}>Search by name:</p>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={7} xl={4}>
                                    <TextField
                                        InputProps={{
                                            style: {
                                                borderColor:'black',
                                                marginTop:'5px',
                                                borderRadius:'9px',
                                                height:'45px',
                                                width:'250px',
                                            },
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                marginTop:'2px',
                                                fontSize: '13px', 
                                                fontWeight: '400',
                                                font:'Inter , sans-serif',
                                                color:'rgba(111, 111, 111, 1)',
                                            },
                                          }}
                                        // style={{borderRadius:'15px', border: '1px solid red'}}
                                        id="filled-search"
                                        variant="outlined"
                                        label="Healer Name"
                                        type="search"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Choaches */}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 5, sm: 2, md: 3 , lg:5}} style={{width:'90%', marginTop: "30px",marginBottom: "30px" }} justifyContent="center">
                    {data.map((data) => (
                        <Grid key={data.id} item xs={8} s={8} md={3.7} lg={3.6} justifyContent="center">
                            <Box className={classes.coaches}>
                                <Grid variant="outlined">
                                    <Grid container 
                                        direction="column" 
                                        justifyContent="space-between" 
                                        style={{marginLeft:'30px' , height: "100%"}}
                                    >

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container style={{ marginTop:'20px'}}>
                                                {/* <Grid item > */}
                                                    <Grid item xs={12} sm={3.2} md={4.7} lg={3.7} xl={3.7} >
                                                        <img src={`${API_URL}/${data?.img}`} alt="avatar" style={{ width: 85, height: 94, backgroundSize: 'cover', borderRadius: '50%', marginRight: "20px" }} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7} style={{position:'relative', top:'10px' ,left:'0%'}}>
                                                        <h5 style={{ margin: 0 }}>{data?.name}</h5>
                                                        <h6  style={{position:'relative',left:'0px'}}>Life coach</h6>
                                                        <p style={{position:'relative',top:'-3px'}}>
                                                            <Grid container>
                                                                <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                                    <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                                    </svg>
                                                                    <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                                    </svg>
                                                                    <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                                    </svg>
                                                                    <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                                    </svg>
                                                                    <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                                    </svg>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                                                    (450)
                                                                </Grid>
                                                            </Grid>
                                                        </p>
                                                    </Grid>
                                                {/* </Grid> */}
                                            </Grid>
                                        </Grid>

                                        

                                        {/* Bio of Life Coaches */}
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                                            style={{ height: "10%" }}
                                        >
                                            <p>" {data?.bio} "</p>
                                        </Grid>

                                        {/* Price */}
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                            <div className={classes.pricing}>
                                                {/* Emotional coaching<br />
                                                Relationship therapy<br />
                                                GNM Practitioner<br />
                                                Luscher Test practitioner<br />
                                                iheart, iflow, PEAT practitioner */}
                                                <p>
                                                    <svg width="22" height="10" style={{marginRight:'7px', marginTop:'-5px'}} viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M29.8667 0.5H2.13333C1.56754 0.5 1.02492 0.72242 0.624839 1.11833C0.224761 1.51424 0 2.05121 0 2.61111V17.3889C0 17.9488 0.224761 18.4858 0.624839 18.8817C1.02492 19.2776 1.56754 19.5 2.13333 19.5H29.8667C30.4325 19.5 30.9751 19.2776 31.3752 18.8817C31.7752 18.4858 32 17.9488 32 17.3889V2.61111C32 2.05121 31.7752 1.51424 31.3752 1.11833C30.9751 0.72242 30.4325 0.5 29.8667 0.5ZM10 17.3889L2.13333 10.5806V9.41944L10 2.61111H22L29.8667 9.41944V10.5806L22 17.3889H10ZM29.8667 6.62222L25.24 2.61111H29.8667V6.62222ZM6.76 2.61111L2.13333 6.62222V2.61111H6.76ZM2.13333 13.3778L6.76 17.3889H2.13333V13.3778ZM29.8667 17.3889H25.24L29.8667 13.3778V17.3889ZM16 4.72222C14.9452 4.72222 13.914 5.03176 13.037 5.61169C12.1599 6.19162 11.4763 7.01589 11.0726 7.98028C10.669 8.94467 10.5634 10.0059 10.7691 11.0296C10.9749 12.0534 11.4829 12.9938 12.2288 13.732C12.9746 14.4701 13.925 14.9727 14.9595 15.1764C15.9941 15.38 17.0664 15.2755 18.041 14.876C19.0155 14.4766 19.8485 13.8001 20.4345 12.9322C21.0205 12.0642 21.3333 11.0438 21.3333 10C21.3333 8.60025 20.7714 7.25782 19.7712 6.26805C18.771 5.27827 17.4145 4.72222 16 4.72222ZM16 13.1667C15.3671 13.1667 14.7484 12.9809 14.2222 12.633C13.6959 12.285 13.2858 11.7905 13.0436 11.2118C12.8014 10.6332 12.738 9.99649 12.8615 9.38221C12.985 8.76794 13.2897 8.20369 13.7373 7.76083C14.1848 7.31796 14.755 7.01637 15.3757 6.89418C15.9965 6.77199 16.6399 6.8347 17.2246 7.07438C17.8093 7.31406 18.3091 7.71994 18.6607 8.24069C19.0123 8.76145 19.2 9.37369 19.2 10C19.1965 10.8388 18.8582 11.6422 18.2589 12.2353C17.6595 12.8284 16.8476 13.1632 16 13.1667Z" fill="#4484FF"/>
                                                    </svg>
                                                    Fees: <span style={{ fontWeight: 'bold' }}>10</span>$ per 60mins<br />
                                                    <svg width="13" height="18" style={{marginRight:'10px' , marginTop:'-5px'}} viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.5 14C12.2906 14 12.9677 13.7256 13.5312 13.1768C14.0947 12.628 14.376 11.9691 14.375 11.2C14.375 10.43 14.0932 9.7706 13.5297 9.2218C12.9662 8.673 12.2897 8.39907 11.5 8.4C10.7094 8.4 10.0323 8.6744 9.46881 9.2232C8.90531 9.772 8.62404 10.4309 8.625 11.2C8.625 11.97 8.90675 12.6294 9.47025 13.1782C10.0338 13.727 10.7103 14.0009 11.5 14ZM11.5 24.29C14.4229 21.6767 16.5911 19.3023 18.0047 17.1668C19.4182 15.0313 20.125 13.1357 20.125 11.48C20.125 8.93667 19.2922 6.8544 17.6266 5.2332C15.961 3.612 13.9188 2.80093 11.5 2.8C9.08021 2.8 7.03752 3.61107 5.37194 5.2332C3.70635 6.85533 2.87404 8.9376 2.875 11.48C2.875 13.1367 3.58177 15.0327 4.99531 17.1682C6.40885 19.3037 8.57708 21.6776 11.5 24.29ZM11.5 28C7.64271 24.8033 4.76196 21.8344 2.85775 19.0932C0.953542 16.352 0.000958333 13.8143 0 11.48C0 7.98 1.15623 5.19167 3.46869 3.115C5.78115 1.03833 8.45825 0 11.5 0C14.5427 0 17.2203 1.03833 19.5327 3.115C21.8452 5.19167 23.001 7.98 23 11.48C23 13.8133 22.0474 16.3511 20.1422 19.0932C18.2371 21.8353 15.3563 24.8043 11.5 28Z" fill="#4484FF"/>
                                                    </svg>
                                                    Location:<span style={{ fontWeight: 'bold' }}> Cairo/Egypt</span>
                                                </p>
                                            </div>

                                        </Grid>     

                                        {/* View Profile and Book Now Buttons */}
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.cardBtn} >
                                            <Grid container>
                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                    <button className={classes.viewProfileBtn} >
                                                        View Profile
                                                    </button>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                    <button className={classes.booknowBtn} onClick={() => {
                                                        localStorage.setItem('doctor_id', data.id);
                                                        setSelectedDoctorId(data.id); // store the doctor id in selectedDoctorId 
                                                        setOpen(true);
                                                    }}>Book Now</button>
                                                </Grid>
                                            </Grid> 


                                            {/* the Booking information ( Date and Time ) */}
                                            <Modal
                                                className={classes.booking}
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Grid item justifyContent="space-between" alignItems="center" style={{ display: "flex", marginBottom: "15px" }}>
                                                        {/* selectDate */}
                                                        <Typography id="modal-modal-description" variant="h6" style={{ width: "200px" }}>
                                                            Select date:
                                                        </Typography>
                                                        {/* between arrow that tells you from day 1 to 7 ( a Week )*/}
                                                        <Grid container alignItems="center">
                                                            <Grid item marginLeft={15}>
                                                                <IconButton onClick={handlePrevWeek}>
                                                                    <ChevronLeftIcon />
                                                                </IconButton>
                                                            </Grid>

                                                            <Grid item xs>
                                                                <Grid container spacing={0} justifyContent="center">
                                                                    {days.map((day, index) => (
                                                                        <Grid item key={day}>
                                                                            <Typography>
                                                                                {index === 0 ? days[index] + ' - ' + days[index + 1] : ''}
                                                                            </Typography>
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                            </Grid>

                                                            <Grid item>
                                                                <IconButton onClick={handleNextWeek}>
                                                                    <ChevronRightIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>


                                                    </Grid>

                                                    {/* days to select */}
                                                    {days2.map(day => (
                                                        <button key={day} className={getButtonClass(day)} onClick={() => handleClick2(day)}>
                                                            {day}
                                                        </button>
                                                    ))}

                                                    {/* time to select */}
                                                    <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }} style={{ marginBottom: "15px" }}>
                                                        Select time:
                                                    </Typography>

                                                    <Grid item style={{ display: "flex" }}>
                                                        {selectedDayTimes.length > 0 && (


                                                            <div>
                                                                {selectedDayTimes.map(time => (
                                                                    <button
                                                                        key={time}
                                                                        className={`${classes.timebtn} ${activeTimeButton === time ? classes.clicked : ''}`}
                                                                        onClick={() => handleClickTime(time)}
                                                                    >
                                                                        {time}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <button className={classes.payment} onClick={handlePaymentButtonClick} disabled={!activeButton || !activeTimeButton}>
                                                            Go to payment
                                                        </button>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    ))}
                </Grid >
            </Grid >

            <Grid container justifyContent="center" justifyItems="center">
                <Grid item xs={12} s={12} md={10.2} l={12} xl={12} justifyContent="center" justifyItems="center">
                    <Box
                        sx={{
                            marginTop: "100px",
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginBottom: "50px"
                        }}
                    >
                        <h5 style={{ marginTop: "13px", marginRight: "13px" }}> Didn't Find ur Match? </h5>
                        <Link to="/contactus">
                            <button className={classes.contactusBtn} size="large">
                                Contact Us
                            </button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Grid >
    );
};

export default Coach;


                                        {/* image and Name of Life Coaches */}
                                        {/* <Grid item style={{ height: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <div style={{ display: 'flex', alignItems: 'center', borderRadius: "2px", height: "100%", width: "100%", justifyContent: "center" }}>
                                                <Grid container style={{ position:'relative' , top:'20%'}}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{position:'relative', left:'14%'}}>
                                                        <img src={`${API_URL}/${data?.img}`} alt="avatar" style={{ width: 80, height: 84, objectFit: 'fill', borderRadius: '50%', marginRight: "20px" }} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7} style={{position:'relative', top:'10px' ,left:'-2%'}}>
                                                        <h5 style={{ margin: 0 }}>{data?.name}</h5>
                                                        <h6  style={{position:'relative',left:'-20px'}}>Life coach</h6>
                                                        <p style={{position:'relative',top:'-13px'}}>
                                                            <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                            </svg>
                                                            <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                            </svg>
                                                            <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                            </svg>
                                                            <svg width="14" height="12" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                            </svg>
                                                            <svg width="14" height="12" viewBox="0 0 20 18" style={{marginRight:'20px'}} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.53125 0.898438L6.59581 6.54141L0 7.43061L4.78372 11.8082L3.66037 17.9984L9.53125 15.0914L15.4021 17.9984L14.2788 11.8082L19.0625 7.43061L12.4667 6.54141L9.53125 0.898438Z" fill="#FCC153"/>
                                                            </svg>

                                                            (450)

                                                        </p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid> */}
{/* Sort by  */}
                        {/* <Grid 
                            item xs={12} sm={12} md={5} lg={5} xl={5}
                            className={classes.sort}
                            style={{ 
                                marginTop: "10px" ,
                                display: 'flex', 
                                alignItems: 'center', 
                                marginBottom: "10px" ,
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
                                    <p style={{ marginTop: "10px" }}>Sort by:</p>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <FormControl 
                                        style={{ 
                                            // width: "200px" , 
                                            width:'250px',
                                        }}
                                    >
                                        <Select 
                                            value={value} onChange={handleChange}
                                            style={{
                                                borderRadius: '9px',
                                                height:'45px',
                                                borderColor:'rgba(52, 52, 52, 1)',
                                                marginTop:'4px',
                                            }}
                                        >
                                            {rate.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid> */}