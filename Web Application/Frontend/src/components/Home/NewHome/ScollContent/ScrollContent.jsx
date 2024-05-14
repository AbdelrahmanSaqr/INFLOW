import { useState, useEffect } from 'react';

import classes from './ScrollContent.module.css';
import photo1 from '../../../../assets/photo1.png';
import photo2 from '../../../../assets/photo2.jpg';
import photo3 from '../../../../assets/photo3.png';
import Footer from '../../../Footer/Footer'
import HowItWorks from '../NewHomeContent/HowItWorks/HowItWorks';
import UserReviews from '../NewHomeContent/UserReviews/UserReviews';
import QuestionVedio from '../NewHomeContent/QuestionVedio/QuestionVedio';
// import photo4 from '../../../../assets/photo4.png';

import { Grid, Paper, Box, Pagination, Link, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../../../api.js"
import ChatBotIcon from "../../../ChatBot/ChatBot"


const ScrollContent = () => {

    const [isWhatInflowScrolled, setIsWhatInflowScrolled] = useState(false);
    const [isWhyInflowContentScrolled, setIsWhyInflowContentScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 1000) {
                setIsWhatInflowScrolled(true);
            } else {
                setIsWhatInflowScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const handleScroll2 = () => {
            if (window.pageYOffset > 2800) {
                setIsWhyInflowContentScrolled(true);
            } else {
                setIsWhyInflowContentScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll2);

        return () => {
            window.removeEventListener('scroll', handleScroll2);
        };
    }, []);
    const aboutInflowcontentClasses = `${classes.aboutInflowcontent} ${isWhatInflowScrolled ? classes.aboutInflowcontentscrolled : ''}`;
    const aboutWhyInflowContentClasses = `${classes.whyInflowContent} ${isWhyInflowContentScrolled ? classes.whyInflowContentscrolled : ''}`;
    const aboutWhyInflowContent2Classes = `${classes.whyInflowContent2} ${isWhyInflowContentScrolled ? classes.whyInflowContent2scrolled : ''}`;
    const aboutWhyInflowContent3Classes = `${classes.whyInflowContent3} ${isWhyInflowContentScrolled ? classes.whyInflowContent3scrolled : ''}`;

    const navigate = useNavigate()
    const home = () => {
        navigate("/home")
    }
    const hometest = () => {
        navigate("/hometest")
    }

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/articals`)
            .then(response => {
                setPost(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const indexOfLastPost = currentPage * postsPerPage; // indexOfLastPost is a variable that represents the index 
    //of the last post to be displayed on the current page. 
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // indexOfFirstPost is a variable that represents the index 
    //of the first post to be displayed on the current page
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost); //currentPosts is an array that contains only the posts to be displayed on the current page. 
    //It is created by using the slice method to extract the posts between the indexOfFirstPost and indexOfLastPost indexes from the posts array.

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (

        <div>
            <ChatBotIcon />
            <div className={classes.ScrollContent}>

                {/* articles */}
                <Grid container className={classes.contentArticle}>
                    {/* <Grid item xs={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                    <Grid item xs={12} xl={12} >
                        <h1>INFLOW</h1>
                        <p>Heal your emotions to be inflow. ​</p>

                        {/* articles */}
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: "30px" }}>
                            {currentPosts.map((post) => (
                                <Grid key={post.id} item xs={12} s={12} md={3.7} lg={3.7}>
                                    <Box>
                                        <a href={"/articlepage"} onClick={() => {
                                            localStorage.setItem('postId', post.id);
                                        }}>

                                            <Paper variant="outlined" square className={classes.articlebox} style={{ overflow: "hidden", position: "relative", height: "200px", backgroundImage: `url(${API_URL}/${post?.img})`, backgroundSize: "cover" }}>
                                                {/* {post.title}
                                            {post.body} */}
                                                <Grid style={{
                                                    paddingLeft: "10px",
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    backgroundColor: "rgba(0,0,0,0.7)",
                                                    color: "white",
                                                    // padding: "5px",
                                                }}>
                                                    <h4 style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post?.title}</h4>
                                                    <p style={{ overflow: "hidden", textOverflow: "ellipsis", color: "white" }}>By : {post?.doctor}</p>
                                                </Grid>
                                            </Paper>
                                        </a>
                                    </Box>
                                    {/* // sx={{
                                //     display: 'flex',
                                //     '& > :not(style)': {
                                //     m: 1,
                                //     width: 358,
                                //     height: 128,
                                //     },
                                // }} */}
                                </Grid>
                            ))}
                        </Grid>

                        {/* articles switcher */}
                        <Grid container justifyContent="center" >
                            <Grid item xs={12} s={12} md={5.1} lg={6.5} xl={5.1}>
                                <Box sx={{ marginTop: "25px" }} >
                                    <Pagination
                                        count={Math.ceil(post.length / postsPerPage)}
                                        variant="outlined" shape="rounded"
                                        onChange={handlePageChange}
                                        sx={{
                                            '& button': {
                                                margin: '0 8px', // adjust the margin value as needed
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            {/* The count prop is set to Math.ceil(posts.length / postsPerPage)
                                calculates the number of pages needed to display all the posts in the array. 
                                The Math.ceil() function is used to ensure that the number of 
                                pages is rounded up to the nearest integer. 
                            */}
                        </Grid>
                        {/* link to go to articles page ( for more articles ) */}
                        <Grid container >
                            <Grid item xs={12} s={12} md={10.2} lg={11} xl={12}>
                                <Box
                                    sx={{
                                        marginTop: "20px",
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Link href="/articles" color="inherit" underline="always">
                                        See more
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <HowItWorks />

                {/* about Inflow */}
                <Grid container className={classes.aboutInflow}>
                    <Grid item xs={12} xl={12}>
                        <h1>What does Inflow provide?</h1>
                    </Grid>
                    <Grid container className={aboutInflowcontentClasses}>

                        {/* first one  */}
                        <Grid item xs={12} xl={12}>
                            <Grid container>
                                <Grid item xs={12} s={12} md={4.3} l={4.3} xl={4.3}>
                                    <h2>We coach adults to help them manage their life in a productive way</h2>
                                    <p>
                                        receive guidance, support, and motivation for personal or professional development.
                                        Inflow can help individuals identify their goals, overcome obstacles,
                                        and create a plan for achieving success in their desired areas of life.
                                    </p>
                                    <button onClick={hometest} className={classes.aboutInflowcontentBtn} size="large">
                                        Adults services
                                    </button>
                                </Grid>
                                <Grid className={classes.aboutInflowcontentImage} item xs={12} s={12} md={7.7} l={7.7} xl={7.7}>
                                    <img src={photo1} alt="Adults photo" />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* second one  */}
                        <Grid item xs={12} xl={12}>
                            <Grid container className={classes.aboutInflowcontent2}>
                                <Grid item xs={12} s={12} md={6} l={7.7} xl={4.7}>
                                        <img src={photo3} alt="Adults photo" />
                                    </Grid>
                                <Grid item xs={12} s={12} md={6} l={4.3} xl={7.3}>
                                    <h2>We coach couples for a stable, happy marriage.</h2>
                                    <p>
                                        Strengthen your relationship and deepen your connection with our couple life coaching.
                                        Together, we can help you build a foundation of trust, intimacy that last a lifetime.
                                    </p>
                                    
                                    <button onClick={hometest} className={classes.aboutInflowcontentBtn} size="large">
                                        Couples services
                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* third one  */}
                        <Grid item xs={12} xl={12}>
                            <Grid container>
                                <Grid item xs={12} s={12} md={4.3} l={4.3} xl={4.3}>
                                    <h2>We coach teens to manage their emotions, anger.</h2>
                                    <p>
                                        Unlock your full potential and navigate the challenges of adolescence with our teen life coaching.
                                        Our experienced coaches will help you develop the skills you need to success in school, relationships.
                                    </p>
                                    <button onClick={hometest} className={classes.aboutInflowcontentBtn} size="large"
                                    >
                                        Teens services
                                    </button>
                                </Grid>
                                <Grid className={classes.aboutInflowcontentImage} item xs={12} s={12} md={7.7} l={7.7} xl={7.7}>
                                    <img src={photo2} alt="Adults photo" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <UserReviews />
            <div className={classes.ScrollContent}>
                {/* why Inflow  */}
                <Grid container className={classes.whyInflow}>
                    <Grid item xs={12} xl={12}>
                        <h1>Why Inflow?</h1>
                    </Grid>
                    <div >
                        <Grid container>
                            <Grid xs={12} md={4} xl={4} className={aboutWhyInflowContentClasses}>
                                <h2>Clarity</h2>
                                <p>We’ll provide a safe space where you’ll be able to rediscover your love, your strengths as a couple and restore trust</p>

                                <h2>Feedback</h2>
                                <p>Inflow offers you a  valuable feedback on your progress and help you identify areas where you can improve.</p>

                                <h2>Self-awareness</h2>
                                <p>Inflow will  help you develop greater self-awareness, helping you understand your strengths, weaknesses, and areas for growth.</p>
                            </Grid>
                            <Grid xs={12} md={4} xl={4} className={aboutWhyInflowContent2Classes}>
                                <h2>Support</h2>
                                <p>Inflow will provide you a supportive environment where you can share your challenges, fears, and concerns without judgment.</p>

                                <h2>Life transformation</h2>
                                <p>Inflow will help you transform your life by providing you with the guidance, support, and tools you need to achieve your goals and live the life you desire.</p>

                                <h2>Flexibility</h2>
                                <p>Inflow will offer you flexible coaching options, including online sessions, which can accommodate your busy schedule.</p>
                            </Grid>
                            <Grid xs={12} md={4} xl={4} className={aboutWhyInflowContent3Classes}>
                                <h2>Motivation</h2>
                                <p>Inflow will help you stay motivated and inspired to take action towards your goals, even when you feel discouraged.</p>

                                <h2>Time-saving</h2>
                                <p>Inflow will help you save time by providing you with effective strategies and tools to overcome obstacles and achieve your goals.</p>

                                <h2>Expertise</h2>
                                <p>Inflow is run by experienced and well trained professionals who can offer guidance and support based on their expertise.</p>

                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                {/* <iframe title='Chatbot' src="http://localhost:8501/" width="-50%" height="400px"></iframe>  */}
                {/* <Grid container>
                    <QuestionVedio />
                </Grid> */}


            </div>

            <Grid className={classes.getStart} style={{ justifyContent: "center", alignItems: "center", height: "30vh", position: "relative" }}>
                <Grid container>
                    <Grid item sm={12} md={12} lg={12}>
                        <div style={{ textAlign: "center" }}>
                            <h1>We’re here to help you get happier</h1>
                            <p>Your coach is ready to start with you right now. So what are you waiting for?</p>
                            <button onClick={hometest} className={classes.getStartBtn}>Get started</button>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={12} lg={12} >
                        <div >
                            <Footer />
                        </div>
                    </Grid>
                </Grid>


            </Grid>
        </div>
    );
}

export default ScrollContent;