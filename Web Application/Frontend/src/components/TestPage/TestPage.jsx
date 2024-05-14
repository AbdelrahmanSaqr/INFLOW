import React, { useState } from 'react';
import Logo from '../../assets/Logo.jpg';
import firstcolor from '../../assets/firstcolor.jpg';
import secondcolor from '../../assets/secondcolor.PNG';
import thirdcolor from '../../assets/thirdcolor.PNG';
import forthcolor from '../../assets/forthcolor.PNG';
import lastcolor from '../../assets/lastcolor.jpg';

import { Button, Grid } from '@mui/material';
import classes from "./TestPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../api.js";
import FAQsButton from '../FAQs/FAQsButton';


const TestPage =()=> {

    const navigate = useNavigate();
    const nextpage = () => {
        navigate("/results");
    }
    const prevpage = () => {
        navigate("/test-instructions");
    }

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImagePaths, setSelectedImagePaths] = useState([]);
    // const [selectedButtons, setSelectedButtons] = useState([]);
    const [text, setText] = useState("Choose your 1st Option");
    const [isButton3Visible, setIsButton3Visible] = useState(true);
    const [isButton2Visible, setIsButton2Visible] = useState(true);
    const [isButton1Visible, setIsButton1Visible] = useState(true);
    const [isButton4Visible, setIsButton4Visible] = useState(true);
    const [isButton0Visible, setIsButton0Visible] = useState(true);


    // // Press Ctrl + Shift + J too see it on Browser Console
    console.log("selectedButtons:", selectedImages);

    const handleSubmit = async () => {
        const post = {
            code: selectedImages
        };

        try {
            const res = await axios.post(`${API_URL}/api/test`, post);
            console.log(res.data);
        } catch (e) {
            alert(e);
        }
    };

    const changeText = () => {
        if (text === "Choose your 2nd Option") {
            setText("Choose your 3rd Option");
        }
        else if (text === "Choose your 3rd Option"){
            setText("Choose your 4th Option");
        }
        else if (text === "Choose your 4th Option"){
            setText("Choose your last Option");
        }
        else{
            setText("Choose your 2nd Option");
        }
    }

    // const handleButtonClick =(imageSrc)=> {
    //     setSelectedImages(prevSelectedImages => [...prevSelectedImages, imageSrc]);
    // }
    const handleButton3Click = (imageSrc) => {
        setIsButton3Visible(false);
        changeText();
        const updatedSelectedImages = [...selectedImages, imageSrc];
        setSelectedImages(updatedSelectedImages);
        
        const updatedSelectedImagePaths = [...selectedImagePaths, secondcolor];
        setSelectedImagePaths(updatedSelectedImagePaths);
        
        localStorage.setItem('res_num', JSON.stringify(updatedSelectedImages));
        localStorage.setItem('image_paths', JSON.stringify(updatedSelectedImagePaths));
      }

    // const handleButton3Click = (imageSrc) => {
    //     setIsButton3Visible(false);
    //     changeText();
    //     setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
    // }


    const handleButton2Click = (imageSrc) => {
        setIsButton2Visible(false);
        changeText();
        const updatedSelectedImages = [...selectedImages, imageSrc];
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
        
        const updatedSelectedImagePaths = [...selectedImagePaths, lastcolor];
        setSelectedImagePaths(updatedSelectedImagePaths);
        
        localStorage.setItem('res_num', JSON.stringify(updatedSelectedImages));
        localStorage.setItem('image_paths', JSON.stringify(updatedSelectedImagePaths));
      }

    // const handleButton2Click = (imageSrc) => {
    //     setIsButton2Visible(false);
    //     changeText();
    //     setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
    // }
    const handleButton1Click = (imageSrc) => {
        setIsButton1Visible(false);
        changeText();
        const updatedSelectedImages = [...selectedImages, imageSrc];
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);

        const updatedSelectedImagePaths = [...selectedImagePaths, forthcolor];
        setSelectedImagePaths(updatedSelectedImagePaths);
        
        localStorage.setItem('res_num', JSON.stringify(updatedSelectedImages));
        localStorage.setItem('image_paths', JSON.stringify(updatedSelectedImagePaths));
      }
    // const handleButton1Click = (imageSrc) => {
    //     setIsButton1Visible(false);
    //     changeText();
    //     setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
    // }
    const handleButton4Click = (imageSrc) => {
        setIsButton4Visible(false);
        changeText();
        const updatedSelectedImages = [...selectedImages, imageSrc];
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);

        const updatedSelectedImagePaths = [...selectedImagePaths, firstcolor];
        setSelectedImagePaths(updatedSelectedImagePaths);
        
        localStorage.setItem('res_num', JSON.stringify(updatedSelectedImages));
        localStorage.setItem('image_paths', JSON.stringify(updatedSelectedImagePaths));
      }
    // const handleButton4Click = (imageSrc) => {
    //     setIsButton4Visible(false);
    //     changeText();
    //     setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
    // }

    const handleButton0Click = (imageSrc) => {
        setIsButton0Visible(false);
        changeText();
        const updatedSelectedImages = [...selectedImages, imageSrc];
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
        
        const updatedSelectedImagePaths = [...selectedImagePaths, thirdcolor];
        setSelectedImagePaths(updatedSelectedImagePaths);
        
        localStorage.setItem('res_num', JSON.stringify(updatedSelectedImages));
        localStorage.setItem('image_paths', JSON.stringify(updatedSelectedImagePaths));
      }
    // const handleButton0Click = (imageSrc) => {
    //     setIsButton0Visible(false);
    //     changeText();
    //     setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageSrc]);
    
    // Press Ctrl + Shift + J too see it on Browser Console
    // console.log("text:", text);
    // console.log("isButton3Visible:", isButton3Visible);
    // console.log("isButton2Visible:", isButton2Visible);
    // console.log("isButton1Visible:", isButton1Visible);
    // console.log("isButton4Visible:", isButton4Visible);
    // console.log("isButton0Visible:", isButton0Visible);


    return (
        <Grid container>
            <FAQsButton/>
            <Grid container justifyContent="center">
                <Grid item xs={12} xl={12} md={10} justifyContent="flex-start">
                    {/* <img src={Logo} alt='logo' className={classes.logodisplay} /> */}
                   <button className={classes.header} onClick={prevpage}> 
                        <h1 >instructions 
                            <svg width="20" height="17" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33976 0.806158C6.54784 1.01449 6.66471 1.2969 6.66471 1.59134C6.66471 1.88579 6.54784 2.16819 6.33976 2.37653L2.68199 6.03579L6.34124 9.69505C6.54355 9.9047 6.65541 10.1854 6.65274 10.4768C6.65007 10.7681 6.53309 11.0467 6.32698 11.2526C6.12087 11.4585 5.84214 11.5753 5.5508 11.5777C5.25947 11.58 4.97885 11.4679 4.76939 11.2654L0.324948 6.82097C0.116874 6.61264 0 6.33023 0 6.03579C0 5.74134 0.116874 5.45894 0.324948 5.2506L4.76939 0.806158C4.87258 0.702906 4.9951 0.620998 5.12995 0.565115C5.2648 0.509232 5.40935 0.480469 5.55532 0.480469C5.70129 0.480469 5.84583 0.509232 5.98069 0.565115C6.11554 0.620998 6.23806 0.702906 6.34124 0.806158H6.33976Z" fill="#33658A"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.03689C0 5.74221 0.117063 5.45959 0.325437 5.25122C0.533811 5.04284 0.816426 4.92578 1.11111 4.92578H13.7037C15.3736 4.92578 16.9751 5.58914 18.1559 6.76992C19.3366 7.95071 20 9.5522 20 11.2221C20 12.892 19.3366 14.4934 18.1559 15.6742C16.9751 16.855 15.3736 17.5184 13.7037 17.5184H5.55556C5.26087 17.5184 4.97825 17.4013 4.76988 17.1929C4.56151 16.9846 4.44444 16.7019 4.44444 16.4073C4.44444 16.1126 4.56151 15.83 4.76988 15.6216C4.97825 15.4132 5.26087 15.2962 5.55556 15.2962H13.7037C14.7842 15.2962 15.8205 14.8669 16.5845 14.1029C17.3485 13.3388 17.7778 12.3026 17.7778 11.2221C17.7778 10.1416 17.3485 9.10531 16.5845 8.34127C15.8205 7.57723 14.7842 7.148 13.7037 7.148H1.11111C0.816426 7.148 0.533811 7.03094 0.325437 6.82257C0.117063 6.61419 0 6.33158 0 6.03689Z" fill="#33658A"/>
                            </svg>
                        </h1>
                    </button>

                </Grid>
            </Grid>

            <div className={classes.content}>
                <Grid container justifyContent="center" >
                    <Grid xs={4} xl={4} md={3.5}>

                        <form onSubmit={handleSubmit}>

                            {/* top left button 3  . onClick={handleButton3Click}*/}
                            {isButton3Visible && (
                                <div>
                                    <button className={classes.squarebutton0} onClick={() => handleButton3Click(3)}>
                                        <img src={secondcolor} alt="second color" />
                                    </button>
                                    <Grid xs={1} xl={12} md={11}>
                                        <div className={classes.textcontainer}>{text}</div>
                                    </Grid>
                                </div>

                            )}
                            {!isButton3Visible && (
                                <button className={classes.squarebutton0}  style={{ visibility: 'hidden' }}>

                                </button>
                            )}
                        </form>
                    </Grid>

                    <Grid xs={3.5} xl={1} md={1.5} >
                        <form onSubmit={handleSubmit}>
                            
                            {/* top right  button 4  onClick={handleButton4Click} */}
                            {isButton4Visible && (
                                
                                <div>
                                    <button className={classes.squarebutton1}  onClick={() => handleButton4Click(4)}>
                                        <img src={firstcolor} alt="first color" />
                                    </button>
                                    <Grid xs={12} xl={12} md={12} justifyContent="center">
                                        <div className={classes.textcontainer} >{text}</div>
                                    </Grid>
                                </div>

                            )}
                            {!isButton4Visible && (
                                <button className={classes.squarebutton1} style={{ visibility: 'hidden' }}>

                                </button>

                            )}
                        </form>
                    </Grid>
                </Grid>


                <Grid container justifyContent="center" >
                    <Grid item xs={4} xl={1} md={1.45} justifyContent="center">
                        <form onSubmit={handleSubmit}>

                            {/* center  button 0  onClick={handleButton0Click}  */}
                            {isButton0Visible && (
                                <div>
                                    <button className={classes.squarebutton2} onClick={() => handleButton0Click(0)}>
                                        <img src={thirdcolor} alt="third color" />
                                    </button>
                                    <Grid xs={12} xl={12} md={12} justifyContent="center">
                                        <div className={classes.textcontainer}>{text}</div>
                                    </Grid>
                                </div>


                            )}

                            {!isButton0Visible && (
                                <button className={classes.squarebutton2} style={{ visibility: 'hidden' }}>

                                </button>
                            )}
                        </form>

                    </Grid>
                </Grid>

                <Grid container justifyContent="center" >
                    <Grid item xs={4} xl={4} md={3.5} >
                        <form onSubmit={handleSubmit}>

                            {/* bottom left  button 2*/}
                            {isButton2Visible && (
                                <div>
                                    <button className={classes.squarebutton3} onClick={() => handleButton2Click(2)}>
                                        <img src={lastcolor} alt="last color" />
                                    </button>
                                    <Grid xs={1} xl={12} md={12} justifyContent="center">
                                        <div className={classes.textcontainer}>{text}</div>
                                    </Grid>
                                </div>

                            )}
                            {!isButton2Visible && (
                                <button className={classes.squarebutton3} style={{ visibility: 'hidden' }}>

                                </button>
                            )}           
                        </form>
                    </Grid>

                    <Grid xs={3.5} xl={1} md={1.5} >
                        <form onSubmit={handleSubmit}>

                            {/* bottom right  button 1*/}
                            {isButton1Visible && (
                                <div>
                                    <button className={classes.squarebutton4} onClick={() => handleButton1Click(1)}>
                                        <img src={forthcolor} alt="forth color" />
                                    </button>
                                    <Grid xs={12} xl={12} md={12} justifyContent="center">
                                        <div className={classes.textcontainer}>{text}</div>
                                    </Grid>
                                </div>

                            )}
                            {!isButton1Visible && (
                                <button className={classes.squarebutton4}  style={{ visibility: 'hidden' }}>

                                </button>
                            )}                        
                        </form>
                    </Grid>
                </Grid>
            </div>

            {!isButton2Visible && !isButton3Visible && !isButton4Visible && !isButton0Visible && !isButton1Visible && nextpage()}

        </Grid>
    );

}

export default TestPage;
