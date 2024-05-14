import {useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import classes from './QuestionVedio.module.css';

import { Grid, Paper, Box, Pagination, Link, Button } from '@mui/material';
import desktop from '../../../../../assets/desktop.png'

const QuestionVedio =()=>{

    // const navigate = useNavigate()
    // const continueBtn = () => {
    //     navigate("/Link-Reset")
    // }
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.pageYOffset > 3500) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const aboutInflowcontentClasses = `${classes.questionvediosvg} ${isScrolled ? classes.questionvedioscrolled : ''}`;


    return(
        <div className={classes.questionvedio}>
            <Grid container >
                <Grid item xs={12} s={12} md={9} lg={9}>
                    <h1>Still have questions?</h1>
                    <h1>No one will explain it better than our coach.</h1>
                    <p>
                        Our goal in Inflow is to make it clear as possible to have a clear idea <br/>
                        of our process and what you can expect from us here’s a video from <br/>
                        coach Eman that will explain to you if you still have questions. <br/>
                    </p>
                    <svg className={aboutInflowcontentClasses} width="112" height="110" viewBox="0 0 212 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M211.834 190.436C207.772 177.939 201.524 166.065 196.212 154.193C195.587 152.63 193.087 152.63 192.15 153.568C186.839 159.192 180.903 164.816 177.465 171.689H177.153C139.035 174.501 102.168 142.007 75.9227 118.262C45.6161 91.08 18.1215 57.9615 7.18609 18.2817C6.56122 13.2827 5.93634 7.97125 5.93634 2.65979C5.93634 0.160278 2.49951 0.160278 2.18707 2.65979V5.47174C0.937317 5.47174 0 6.40906 0 7.97125C0.312439 11.4081 1.24976 14.8449 1.87463 18.2817C4.37414 102.953 88.7327 184.499 171.217 189.811C168.405 194.81 165.906 200.121 162.781 205.12C161.218 207.307 163.718 209.494 165.906 209.181C181.527 206.995 195.587 199.496 209.959 193.872C211.209 193.56 212.458 192.31 211.834 190.436ZM169.967 202.933C171.842 198.871 173.091 194.81 175.278 190.748C175.904 189.185 174.966 187.936 174.028 187.624C174.028 186.686 173.404 186.061 172.466 185.749C97.7934 173.251 37.1802 122.324 14.6846 53.2744C29.3693 80.4566 51.8649 104.202 74.048 124.198C90.2948 138.883 107.479 152.005 126.225 162.94C140.91 171.376 159.344 179.187 176.216 173.876C175.278 176.376 179.027 177.626 180.277 175.751C184.339 170.439 188.401 165.44 192.775 160.754C197.148 170.439 201.836 180.125 205.272 190.123C193.712 194.497 182.152 200.121 169.967 202.933Z" fill="#4484FF"/>
                    </svg>

                </Grid>
                <Grid item xs={12} s={12} md={3} lg={3}>
                    {/* <img src={desktop} alt="desktop" /> */}
                    <div className={classes.desktop} style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={desktop} alt="desktop" />
                        {/* <svg style={{ position: 'absolute', top: 0, left: 20 }} width="100%" height="100%" viewBox="0 0 100 100" viewBox="0 0 143 169" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M143 84.5C143.005 86.7069 142.439 88.8776 141.357 90.801C140.275 92.7244 138.714 94.3351 136.825 95.4763L19.76 167.087C17.7863 168.295 15.5258 168.955 13.2119 168.998C10.898 169.041 8.61457 168.465 6.5975 167.33C4.59964 166.213 2.93537 164.584 1.77583 162.611C0.616293 160.638 0.00333822 158.391 0 156.102V12.8978C0.00333822 10.609 0.616293 8.36236 1.77583 6.38895C2.93537 4.41555 4.59964 2.78659 6.5975 1.6696C8.61457 0.534987 10.898 -0.0406192 13.2119 0.00222896C15.5258 0.0450771 17.7863 0.704827 19.76 1.91334L136.825 73.5236C138.714 74.6649 140.275 76.2756 141.357 78.199C142.439 80.1224 143.005 82.2931 143 84.5Z" fill="black"/>
                        </svg> */}
                        <div className={classes.youtubeVideo}>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/dL57xby9P6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        
                    </div>
                </Grid>
            </Grid>
        </div>

    );

}

export default QuestionVedio;