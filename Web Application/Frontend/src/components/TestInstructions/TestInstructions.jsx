//import { Form, ProgressBar, NavDropdown } from "react-bootstrap";
import React from 'react';
import Header from "../Header/Header";
import correct from "../../assets/correct.png";
import incorrect from "../../assets/incorrect.png";
import { useNavigate } from "react-router-dom";
import classes from "./TestInstructions.module.css";
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/Logo.jpg';
import FAQsButton from '../FAQs/FAQsButton';

// Header section
//       <Paper sx={{ backgroundColor: '#4484FF' }}>
//         <Grid container>
//           <Grid item xs={12} md={12} xl={12} >
//             <div className={classes.header}>

//               <Typography
//                 height={200}
//                 variant="h1"
//                 noWrap
//                 color="FFFFF"
//                 sx={{
//                   fontSize: '5rem',
//                   '@media (max-width: 600px)': {
//                     fontSize: '1.7rem',
//                   },
                  
//                   '@media (min-width: 601px) and (max-width: 750px)': {
//                     fontSize: '2rem',
//                   },
//                   '@media (min-width: 750px) and (max-width: 960px)': {
//                     fontSize: '3rem',
//                   },
//                   '@media (min-width: 960px) and (max-width: 1200px)': {
//                     fontSize: '4rem',
//                   },
//                 }}

//               >
//                 First, color diagnostic test
//               </Typography>
//             </div>
//           </Grid>
//         </Grid>
//       </Paper>

      // {/* page lower content */}
      // <div className={classes.pagecontent}>

      //   {/* Test instructions section */}
      //   <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
      //     <Grid item container  xs={6.79} xl={12} lg={4} sm={5} md={4} justifyContent="center" alignItems="center" >
      //       <div className={classes.testinstructiontext}>
      //       <Item><h4><strong>Test instructions: </strong></h4></Item>
            
      //       </div>

      //     </Grid>

      //     <Grid item xs={12} xl={12} lg={8.2} sm={10.3} md={8.3} container justifyContent="center" alignItems="center">
      //       <div className={classes.testinstructionpara}>
      //         <Item><p>
      //           Test consist of 5 colors cubes, From the offered colors,{" "}
      //           <strong>select the one you like most</strong>,<br />then repeat this
      //           until all colors finished.
      //         </p>
      //         </Item>

      //       </div>

      //     </Grid>
      //     <Grid item xs={12} md={5}>
      //       {/* <div className={classes.imagecontainer}> */}
      //       <Item><img src={correct} className={classes.correctimg} /></Item>
      //       <p className={classes.correctpara}>
      //         <strong>Be</strong> quick choose the first one come to mind
      //       </p>
      //     </Grid>
      //     <Grid item xs={12} md={7}>
      //       <Item><img src={incorrect} className={classes.incorrectimg} /></Item>
      //       <p className={classes.correctpara}>
      //         <strong>Don’t</strong> imagine the color on any physical objects (car,
      //         t-shirt)
      //       </p>
      //     </Grid>
      //   </Grid>

      //   {/* Tick images section */}
      //   {/* <Grid container direction="row" justifyContent="center"> */}

      //   {/* </div> */}
      //   {/* </Grid> */}


      //   {/* Tick instructions section */}


      //   {/* Start Test button */}

      //   <Grid container direction="row" justifyContent="center" >
      //     <Grid item xs={0}>
      //       {/* <button
      //         type="submit"
      //         // className={classes.testinstructionbtn}
      //         onClick={testinstructionBtn}
      //       >
      //         Start Test
      //       </button> */}
      //       <button className={classes.startbtn} onClick={testinstructionBtn} size="large">Start Test</button>
      //     </Grid>
      //   </Grid>
      // </div>



const TestInstructions = (props) => {
  


  const element = document.querySelector('.header');
  if (element) {
    element.classList.add('my-class');
  }


  const navigate = useNavigate();

  const homeBtn = () => {
    navigate("/");
  };

  // Handler function for the "Start Test" button
  const testinstructionBtn = () => {
    navigate("/TestPage");
  };
  const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <FAQsButton/>
      {/* <Grid container justifyContent="center">
        <Grid item xs={12} xl={12} md={10} justifyContent="flex-start">
          <button className={classes.logodisplay} onClick={homeBtn}>
            <img src={Logo} alt='logo' />
          </button>
        </Grid>
      </Grid> */}

      <div className={classes.content}>
        
          <Grid container>
            <Grid xs={12} xl={12} md={12} justifyContent="center">
              <div className={classes.contentheader}>
                <h4>Instructions:</h4>
                <p>Test consist of 5 colors cubes, From the offered colors,{" "}
                <strong>select the one you like most</strong>,then repeat this until all colors finished.</p>
              </div>
            </Grid>
          </Grid>
        
        {/* page lower content */}
        <div className={classes.pagecontent}>

            <Grid item xs={12} md={12}>
              {/* <div className={classes.imagecontainer}> */}
              <Item><img src={correct} className={classes.correctimg} /></Item>
              <p className={classes.correctpara}>
                <strong>Rank</strong> the five Colors from the best Color to worst one
              </p>
            </Grid>
            <Grid item xs={12} md={12}>
              <Item><img src={incorrect} className={classes.incorrectimg} /></Item>
              <p className={classes.correctpara}>
                <strong>Don’t</strong> imagine the color on any physical objects (car,
                t-shirt)
              </p>
            </Grid>

          {/* Tick images section */}
          {/* <Grid container direction="row" justifyContent="center"> */}

          {/* </div> */}
          {/* </Grid> */}


          {/* Tick instructions section */}


          {/* Start Test button */}

          <Grid container direction="row" justifyContent="center" >
            <Grid item xs={0}>
              {/* <button
                type="submit"
                // className={classes.testinstructionbtn}
                onClick={testinstructionBtn}
              >
                Start Test
              </button> */}
              <button className={classes.startbtn} onClick={testinstructionBtn} size="large">Start Test</button>
            </Grid>
          </Grid>

          
        </div>
        

      </div>
      {/* <iframe src="http://localhost:8501/" width="-50%" height="400px"></iframe> */}
      {/* Divider */}
      <hr />
    </div>
  );
};

export default TestInstructions;
