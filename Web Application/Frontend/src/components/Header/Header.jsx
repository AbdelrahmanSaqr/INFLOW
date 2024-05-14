import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import classes from "./Header.module.css";

import { ProgressBar} from "react-bootstrap";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useState, useEffect } from 'react';


const Home =()=> {
  
  const [isCoach, setIsCoach] = useState(false);
  useEffect(() => {
    setIsCoach(window.location.pathname === '/coach');
  }, []);
  const [isArticle, setIsArticle] = useState(false);
  useEffect(() => {
    setIsArticle(window.location.pathname === '/articles');
  }, []);
  const [isContactus, setIsContactus] = useState(false);
  useEffect(() => {
    setIsContactus(window.location.pathname === '/contactus');
  }, []);

  // anchorElNav and anchorElUser are used to handle opening/closing of nav and user menus
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showButton, setShowButton] = useState(true);

  const navigate = useNavigate();
  const testBtn = () => {
    navigate("/test-information")
  };
  const homeBtn = () => {
    navigate("/")
  };
  const coachBtn = () => {
    navigate("/coach")
  };
  const articlesBtn = () => {
    navigate("/articles")
  };
  const logoutBtn = () => {
    navigate("/signin")
  };
  const signupBtn = () => {
    navigate("/signup")
  };

  const contactBtn = () => {
    navigate("/contactus")
  };

  // to diappear the take test button
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("http://localhost:3000/test-information")) {
      setShowButton(false);
    }
  }, []);
  

  // Handlers for opening/closing of nav menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handlers for opening/closing of user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Pages and settings arrays are used for displaying menu items
  const pages = [ 
    <span className={classes.navbarbtns} onClick={homeBtn}>
      <span>Home</span>
    </span>,
    <span className={isCoach ? classes.activeNavbarBtn : classes.navbarbtns} onClick={coachBtn}>
      <span>Find coach</span>
      {isCoach && (
        <ProgressBar variant="custom" now={100} style={{ height: "4px", borderRadius: "20px" }} />
      )}
    </span>,
    <span>
      <span className={isArticle ? classes.activeNavbarBtn : classes.navbarbtns} onClick={articlesBtn} ><span>Our articles</span></span>
      {isArticle && (
        <ProgressBar variant="custom" now={100} style={{ height: "4px", borderRadius: "20px" }} />
      )}
    </span>,
    <span className={isContactus ? classes.activeNavbarBtn : classes.navbarbtns} onClick={contactBtn}>
      <span>Contact us</span>
      {isContactus && (
        <ProgressBar variant="custom" now={100} style={{ height: "4px", borderRadius: "20px" }} />
      )}
    </span>,
    <div className={classes.rightnav}>
      {    showButton && <button className={classes.tasketestbtn} onClick={testBtn}>Take a test</button> }
    </div>,
  ];
  const pagesdropdown = [  <span onClick={homeBtn}>Home</span>,<span onClick={coachBtn}>Find coach</span>, <span onClick={articlesBtn}>Our articles</span>,<span onClick={contactBtn}>Contact us</span>, <span onClick={logoutBtn}>Login</span> , <span onClick={signupBtn}>Create Account</span>];
  const settings = [<span onClick={logoutBtn}>Logout</span>];

  return (
    <div className={classes.header} >
      {/*  Main AppBar component */}
      <AppBar position="static" style={{ background: 'white' }}>
        <Container maxWidth="xl" >
          <Toolbar >

            {/* // Logo for desktop view */}
            <button className={classes.logo} onClick={homeBtn}>
              <Typography
                onClick={homeBtn}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {/* <svg viewBox="0 0 85 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.2079 82.5749C39.2477 82.5749 36.2886 81.9704 33.5487 80.763L20.4463 74.993C15.7127 72.9061 10.6869 71.5793 5.54989 71.0603L1.24735 70.6247C0.905453 70.5902 0.588411 70.4282 0.357872 70.1701C0.127334 69.9121 -0.00022456 69.5763 2.96773e-07 69.2283V55.5553C2.96773e-07 55.252 0.0973704 54.9564 0.277302 54.714C0.599029 54.2783 8.31074 44.0721 20.0905 46.7276C26.7157 48.2191 32.0502 51.0102 35.3585 53.0893C37.7603 54.5985 40.5756 55.3956 43.5003 55.3956H56.6027C58.8611 55.3956 60.846 56.606 61.956 58.4218L73.2408 45.2513C75.4286 42.2916 79.0079 40.4791 82.7551 40.4791H83.5981C83.8283 40.479 84.0549 40.5371 84.2574 40.6481C84.4598 40.7591 84.6317 40.9196 84.7575 41.1149C84.8833 41.3103 84.9591 41.5343 84.9781 41.7668C84.997 41.9993 84.9585 42.233 84.866 42.4466L74.66 65.9444C72.4286 71.0835 67.8848 74.9655 62.507 76.3277L60.7113 76.7821L50.2659 81.015C47.6953 82.0561 44.9511 82.5749 42.2079 82.5749ZM2.77018 67.9587L5.82578 68.2684C11.2487 68.8168 16.5543 70.2175 21.5517 72.4203L34.6532 78.1904C39.2602 80.2197 44.5732 80.299 49.2383 78.4086L59.7692 74.1414C59.8279 74.118 59.8873 74.0986 59.9482 74.0834L61.8349 73.605C66.389 72.4516 70.2359 69.1652 72.1243 64.8143L81.4333 43.382C79.0497 43.7375 76.8565 45.0388 75.3953 47.012L62.8944 61.6073C62.896 61.6619 62.8968 61.7158 62.8968 61.7711C62.8968 65.2864 60.0735 68.1465 56.6035 68.1465H38.3229C35.9506 68.1459 33.5938 68.5332 31.3434 69.2936L30.8347 67.985L30.4044 66.6517L30.4748 66.6285C33.0054 65.774 35.6555 65.339 38.3229 65.34H56.6035C58.5456 65.34 60.1273 63.7385 60.1273 61.7704C60.1273 59.8024 58.5464 58.2005 56.6037 58.2005H43.5013C40.0597 58.2005 36.7396 57.2572 33.8996 55.4729C30.7744 53.5085 25.7363 50.8731 19.4915 49.4661C10.5705 47.4614 4.15142 54.3971 2.77099 56.0516V67.9587H2.77018ZM54.5409 40.1622C52.4109 40.1622 50.0227 39.496 47.3935 38.1642C47.0748 38.0017 46.8297 37.7216 46.7089 37.3816C46.6017 37.0775 44.1271 29.8664 48.0599 24.5337C50.9181 20.6573 56.2921 18.9112 64.0418 19.3489C64.3832 19.368 64.7056 19.5145 64.9467 19.7603C65.1877 20.0061 65.3303 20.3337 65.3469 20.6797C65.3745 21.2368 65.9459 34.3866 59.327 38.7646C57.9196 39.6966 56.3207 40.1622 54.5409 40.1622ZM49.1597 35.9125C52.7975 37.6407 55.7059 37.8103 57.8135 36.416C61.7383 33.819 62.5869 26.1101 62.6076 22.0981C56.5353 21.9481 52.4014 23.3344 50.2785 26.2122C47.7523 29.6391 48.7342 34.3527 49.1597 35.9125ZM33.3614 21.7802C30.9059 21.7802 28.073 21.2473 25.6008 19.413C21.4074 16.3001 19.4803 10.3734 19.8718 1.7985C19.8878 1.45231 20.0296 1.12432 20.2699 0.877701C20.5103 0.631084 20.8322 0.483279 21.1737 0.462749C21.7728 0.428225 35.9519 -0.338293 40.723 6.91692C42.9449 10.2939 42.7627 14.7171 40.1834 20.0657C40.0268 20.3907 39.7522 20.6418 39.4171 20.7664C39.231 20.8363 36.6311 21.7804 33.3616 21.7804L33.3614 21.7802ZM22.5976 3.22345C22.4779 10.0917 24.0366 14.7732 27.2373 17.1492C31.0692 19.9933 36.3014 18.7844 37.9464 18.2988C39.8284 14.1614 39.9877 10.8582 38.4188 8.47256C35.5028 4.03826 26.951 3.17125 22.5976 3.22345Z" fill="#1D4D25"/>
                  <path d="M44.1771 57.7083C43.9893 57.7085 43.8033 57.6699 43.6306 57.595C43.4579 57.5201 43.3021 57.4104 43.1726 57.2725C43.0431 57.1346 42.9427 56.9715 42.8774 56.793C42.8121 56.6146 42.7833 56.4245 42.7928 56.2344C42.8689 54.6632 43.0059 53.0956 43.2034 51.5353C43.7795 41.6069 43.4823 18.4866 29.0527 12.0902C28.7162 11.941 28.4519 11.6626 28.318 11.316C28.1841 10.9695 28.1915 10.5833 28.3387 10.2423C28.6446 9.53355 29.4631 9.21009 30.1627 9.51999C38.666 13.2889 44.0157 22.672 45.6296 36.6549C45.7746 37.9079 45.8831 39.1433 45.9641 40.3466C49.7643 30.6181 55.5782 27.1809 55.9244 26.9843C56.5902 26.6029 57.4349 26.8454 57.8104 27.5188C58.1836 28.1932 57.9491 29.0465 57.2858 29.4271C57.1393 29.5138 48.2241 34.9339 45.9862 51.6483C45.8158 54.5078 45.5703 56.3308 45.5472 56.4977C45.5014 56.833 45.3375 57.1401 45.0857 57.3626C44.8339 57.585 44.5112 57.708 44.1771 57.7083Z" fill="#1D4D25"/>
                </svg> */}
                
                <svg width="83" height="41" viewBox="0 0 83 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5752 74.7708C16.4887 72.714 9.63946 67.5211 5.86821 58.148C-0.569668 42.1544 7.39873 27.5376 8.55297 25.4929C9.58985 23.7179 14.3847 15.9576 24.4559 12.9099C33.7588 10.0981 41.4659 13.1519 43.507 14.04C43.507 14.04 61.157 22.4161 55.6229 42.0104C55.2527 43.236 52.9381 50.4688 45.3387 54.2183C36.9554 58.3525 29.0402 54.8438 28.0166 54.3695C23.511 52.2788 21.1008 48.827 20.2031 47.3521C20.1414 47.2517 20.0325 47.0702 19.8994 46.8367C18.992 45.2311 16.9279 40.9917 17.5558 35.5749C17.7131 34.2138 18.2443 30.1147 21.4444 26.3398C22.0058 25.6768 26.9229 20.0786 34.682 20.3943C36.2875 20.4585 39.8603 20.8541 43.2819 23.3852C48.8305 27.488 49.4234 33.8303 49.4887 34.6845C49.5806 35.8847 49.773 38.901 48.1433 42.1568C47.7731 42.8973 44.8645 48.4906 38.8948 49.2952C38.0552 49.4077 34.0322 49.9498 31.0365 47.2202C30.4691 46.7036 28.6591 45.0013 28.4679 42.2366C28.2259 38.6396 30.924 36.2912 31.2422 36.0238C29.6161 38.1665 29.2556 40.9408 30.3118 43.2276C31.8048 46.4592 35.3474 47.0182 35.8773 47.0932C40.8379 47.7889 44.3248 42.9094 44.7386 42.3105C47.1282 38.8526 46.7955 35.097 46.6466 33.9307C46.6466 33.9307 44.4035 21.6647 31.5398 23.3102C30.2949 23.5147 25.9477 24.3846 22.8685 28.2478C18.8758 33.2616 20.2152 39.3486 20.5201 40.7473C21.7155 46.2208 25.3827 49.4053 26.6446 50.4071C27.2253 50.8076 34.4073 55.5879 42.4798 52.3587C48.6648 49.8844 51.1112 44.4145 51.583 43.2977C51.583 43.2977 59.3796 26.1523 41.1222 17.3272C41.1222 17.3272 26.3046 11.4943 16.1342 25.4045C14.7353 27.6157 13.7009 30.0373 13.0707 32.5768C10.9631 41.0969 14.2334 48.4265 15.5389 51.2685C16.8824 54.1866 18.6368 56.8973 20.7488 59.318C22.0289 61.0581 22.813 63.1129 23.0173 65.2634C23.4759 70.4975 20.1595 74.1514 19.5752 74.7708Z" fill="#1371B5"/>
                  <path d="M32.5454 34.9883C32.5454 34.9883 29.1807 28.7065 38.4908 26.2383C38.4908 26.2383 40.5102 35.4371 32.5454 34.9883Z" fill="#58ADD8"/>
                  <path d="M25.1406 31.5165C25.1406 31.5165 30.6372 30.5377 30.7497 35.0095C30.7497 35.0095 27.2882 38.2581 25.1406 31.5165Z" fill="#58ADD8"/>
                  <path d="M38.1519 41.941C38.1519 41.941 38.1519 35.3216 32.5428 36.5557C32.5428 36.5557 31.126 42.264 38.1519 41.941Z" fill="#58ADD8"/>
                  <path d="M47.693 80.5302C47.693 80.5302 61.9407 77.8381 68.11 68.8631C68.11 68.8631 77.5339 58.7665 77.5339 44.9688C77.5339 44.9688 78.2066 32.5165 68.7839 20.2869C68.7839 20.2869 60.1453 10.3028 47.693 7.94589C47.693 7.94589 37.9823 6.26292 31.957 8.50607C31.957 8.50607 42.4215 5.59021 51.8441 12.6572C51.8441 12.6572 62.9498 19.6384 61.1604 35.7796C61.1604 35.7796 62.0569 37.1964 63.8524 39.1673C63.8524 39.1673 67.1058 42.6034 67.666 44.6228C67.666 44.6228 67.666 45.5205 64.6412 47.4273C64.6412 47.4273 64.4162 49.783 64.9776 51.1284L65.9879 52.475C65.9879 52.475 65.0901 53.4853 64.0798 53.7091C64.0798 53.7091 65.3139 54.0455 65.3139 55.0557C65.3139 55.0557 62.9583 57.7478 63.2946 61.5614C63.2946 61.5614 64.4162 65.825 58.8083 66.6103C58.8083 66.6103 48.9355 65.0374 46.9162 70.0875C46.9078 70.0972 43.7669 77.6131 47.693 80.5302Z" fill="#58ADD8"/>
                  <path d="M2.37024 56.0789C1.32226 52.2314 0.809683 48.2578 0.846973 44.2703C0.967963 31.23 7.04771 21.6573 10.1112 17.4892C10.1112 17.4892 23.46 0.885767 45.4475 3.91535C45.4475 3.91535 61.377 3.69031 74.0531 21.3028C77.6472 26.5692 79.9539 32.6062 80.7874 38.9274C81.2512 43.2542 81.0373 47.6269 80.1534 51.8879C78.1281 61.6009 73.0985 68.2215 70.2395 71.4483C70.2395 71.4483 81.4577 62.316 82.9156 43.9412C82.9156 43.9412 84.5986 27.9222 72.9315 14.5721C72.9315 14.5721 63.1725 1.78351 45.56 0.213063C41.8178 -0.169265 32.9771 -0.563692 23.2858 4.08474C16.7378 7.24195 11.1254 12.0508 7.00173 18.0373C5.00105 21.0332 3.39708 24.2757 2.22989 27.6838C-1.98056 40.0115 0.774379 51.1196 2.37024 56.0789Z" fill="#0A75B8"/>
                </svg>
                <h5>INFLOW</h5>

              </Typography>
            </button>

            {/* // Hamburger menu for mobile view */}
            <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              {/* // Nav menu for mobile view */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pagesdropdown.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography  textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>

            </Box>

            {/* // logo for mobile view */}
            
            <Typography
              onClick={homeBtn}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            > <button className={classes.logo}  onClick={homeBtn}>
                <svg width="83" height="41" viewBox="0 0 83 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5752 74.7708C16.4887 72.714 9.63946 67.5211 5.86821 58.148C-0.569668 42.1544 7.39873 27.5376 8.55297 25.4929C9.58985 23.7179 14.3847 15.9576 24.4559 12.9099C33.7588 10.0981 41.4659 13.1519 43.507 14.04C43.507 14.04 61.157 22.4161 55.6229 42.0104C55.2527 43.236 52.9381 50.4688 45.3387 54.2183C36.9554 58.3525 29.0402 54.8438 28.0166 54.3695C23.511 52.2788 21.1008 48.827 20.2031 47.3521C20.1414 47.2517 20.0325 47.0702 19.8994 46.8367C18.992 45.2311 16.9279 40.9917 17.5558 35.5749C17.7131 34.2138 18.2443 30.1147 21.4444 26.3398C22.0058 25.6768 26.9229 20.0786 34.682 20.3943C36.2875 20.4585 39.8603 20.8541 43.2819 23.3852C48.8305 27.488 49.4234 33.8303 49.4887 34.6845C49.5806 35.8847 49.773 38.901 48.1433 42.1568C47.7731 42.8973 44.8645 48.4906 38.8948 49.2952C38.0552 49.4077 34.0322 49.9498 31.0365 47.2202C30.4691 46.7036 28.6591 45.0013 28.4679 42.2366C28.2259 38.6396 30.924 36.2912 31.2422 36.0238C29.6161 38.1665 29.2556 40.9408 30.3118 43.2276C31.8048 46.4592 35.3474 47.0182 35.8773 47.0932C40.8379 47.7889 44.3248 42.9094 44.7386 42.3105C47.1282 38.8526 46.7955 35.097 46.6466 33.9307C46.6466 33.9307 44.4035 21.6647 31.5398 23.3102C30.2949 23.5147 25.9477 24.3846 22.8685 28.2478C18.8758 33.2616 20.2152 39.3486 20.5201 40.7473C21.7155 46.2208 25.3827 49.4053 26.6446 50.4071C27.2253 50.8076 34.4073 55.5879 42.4798 52.3587C48.6648 49.8844 51.1112 44.4145 51.583 43.2977C51.583 43.2977 59.3796 26.1523 41.1222 17.3272C41.1222 17.3272 26.3046 11.4943 16.1342 25.4045C14.7353 27.6157 13.7009 30.0373 13.0707 32.5768C10.9631 41.0969 14.2334 48.4265 15.5389 51.2685C16.8824 54.1866 18.6368 56.8973 20.7488 59.318C22.0289 61.0581 22.813 63.1129 23.0173 65.2634C23.4759 70.4975 20.1595 74.1514 19.5752 74.7708Z" fill="#1371B5"/>
                  <path d="M32.5454 34.9883C32.5454 34.9883 29.1807 28.7065 38.4908 26.2383C38.4908 26.2383 40.5102 35.4371 32.5454 34.9883Z" fill="#58ADD8"/>
                  <path d="M25.1406 31.5165C25.1406 31.5165 30.6372 30.5377 30.7497 35.0095C30.7497 35.0095 27.2882 38.2581 25.1406 31.5165Z" fill="#58ADD8"/>
                  <path d="M38.1519 41.941C38.1519 41.941 38.1519 35.3216 32.5428 36.5557C32.5428 36.5557 31.126 42.264 38.1519 41.941Z" fill="#58ADD8"/>
                  <path d="M47.693 80.5302C47.693 80.5302 61.9407 77.8381 68.11 68.8631C68.11 68.8631 77.5339 58.7665 77.5339 44.9688C77.5339 44.9688 78.2066 32.5165 68.7839 20.2869C68.7839 20.2869 60.1453 10.3028 47.693 7.94589C47.693 7.94589 37.9823 6.26292 31.957 8.50607C31.957 8.50607 42.4215 5.59021 51.8441 12.6572C51.8441 12.6572 62.9498 19.6384 61.1604 35.7796C61.1604 35.7796 62.0569 37.1964 63.8524 39.1673C63.8524 39.1673 67.1058 42.6034 67.666 44.6228C67.666 44.6228 67.666 45.5205 64.6412 47.4273C64.6412 47.4273 64.4162 49.783 64.9776 51.1284L65.9879 52.475C65.9879 52.475 65.0901 53.4853 64.0798 53.7091C64.0798 53.7091 65.3139 54.0455 65.3139 55.0557C65.3139 55.0557 62.9583 57.7478 63.2946 61.5614C63.2946 61.5614 64.4162 65.825 58.8083 66.6103C58.8083 66.6103 48.9355 65.0374 46.9162 70.0875C46.9078 70.0972 43.7669 77.6131 47.693 80.5302Z" fill="#58ADD8"/>
                  <path d="M2.37024 56.0789C1.32226 52.2314 0.809683 48.2578 0.846973 44.2703C0.967963 31.23 7.04771 21.6573 10.1112 17.4892C10.1112 17.4892 23.46 0.885767 45.4475 3.91535C45.4475 3.91535 61.377 3.69031 74.0531 21.3028C77.6472 26.5692 79.9539 32.6062 80.7874 38.9274C81.2512 43.2542 81.0373 47.6269 80.1534 51.8879C78.1281 61.6009 73.0985 68.2215 70.2395 71.4483C70.2395 71.4483 81.4577 62.316 82.9156 43.9412C82.9156 43.9412 84.5986 27.9222 72.9315 14.5721C72.9315 14.5721 63.1725 1.78351 45.56 0.213063C41.8178 -0.169265 32.9771 -0.563692 23.2858 4.08474C16.7378 7.24195 11.1254 12.0508 7.00173 18.0373C5.00105 21.0332 3.39708 24.2757 2.22989 27.6838C-1.98056 40.0115 0.774379 51.1196 2.37024 56.0789Z" fill="#0A75B8"/>
                </svg>
                <h5>INFLOW</h5> 
              </button>
            </Typography>
            

            {/* // Nav menu for web view */}
            <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#464646', display: 'block' }}
                  className={classes.navbarbtns}
                >
                  {page}
                </button>
              ))}
            </Box>

            {/* // profile avatar for web view */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Mostafa" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              {/* // profile avatar dropdown for web view */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>


          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Home;
// npm install @mui/icons-material