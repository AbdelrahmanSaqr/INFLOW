//import { Form, ProgressBar, NavDropdown } from "react-bootstrap";
import React, { useRef, useState, useEffect } from 'react';
import HomeHeader from "../../Header/HomeHeader";
import Headerguest from "../../Header/Headerguest"
// import { useNavigate } from "react-router-dom";
import classes from "./ArticlePage.module.css";
import { Button, Grid, Link, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@material-ui/core';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import axios from 'axios';
import { API_URL } from "../../../api.js"
import ChatBotIcon from '../../ChatBot/ChatBot';
import FAQsButton from '../../FAQs/FAQsButton';


const ArticlePage = (props) => {

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




    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState([
        // { id: 1, name: 'Item 1' },
        // { id: 2, name: 'Item 2' },
        // { id: 3, name: 'Item 3' },
        // { id: 4, name: 'Another item' },
    ]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);





    const postId = localStorage.getItem("postId");

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    // const post = [
    //     { id: 1, title: 'Nature: being in the nature will help you deal with your emotions and feelings', body: 'Think about the last time you were busted for being on your phone while you were supposed to be doing something objectively more important. The shame comes in hot, followed quickly by resentment. You didn’t mean to be on your phone, after all! You were just checking the time! It wasn’t your fault that seconds later you were surreptitiously watching a video of baby ducks seeing water for the first time. Curse those baby ducks! Our phones are portals to wonder and knowledge.But as we spend more time with these magic portals in our back pockets—and follow along with the research on this topic—we learn about how this convenience gets in the way of many IRL activities. Few understand this better than Nir Eyal, who has explored the issue from every angle, first in Hooked: How to Build Habit-Forming Products and most recently in Indistractable: How to Control Your Attention and Choose Your Life. Here, he focuses on how to approach your phone with the right amount of skepticism, balance, and control. Read on as he debunks some of the more extreme ills of technology while illuminating some of the more depressing ones. You’ll also find plans for monitoring and working through your own habits—no flip phone required. Here, he focuses on how to approach your phone with the right amount of skepticism, balance, and control. Read on as he debunks some of the more extreme ills of technology while illuminating some of the more depressing ones. You’ll also find plans for monitoring and working through your own habits—no flip phone required. Here, he focuses on how to approach your phone with the right amount of skepticism, balance, and control. Read on as he debunks some of the more extreme ills of technology while illuminating some of the more depressing ones. You’ll also find plans for monitoring and working through your own habits—no flip phone required. ', description: "Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways", doctor: "Eman Elshami", img: "https://media.licdn.com/dms/image/C5612AQGjlYG0_YNTSg/article-cover_image-shrink_600_2000/0/1606260135101?e=2147483647&v=beta&t=x_Odso98CsaygBrlVYKZ0-bUFIvw5VVVA4ywYRPJ1Bw" },
    //     { id: 2, title: 'post 2', body: 'post 2post 1post 1post 1', description: "This is A Description of ur Article 2", doctor: "Eman Elshami2", img: "https://qph.cf2.quoracdn.net/main-qimg-0430adea251d6b2a447332a19203180c-pjlq" },
    //     { id: 3, title: 'post 3', body: 'post 3post 1post 1post 1', description: "This is A Description of ur Article 3", doctor: "Eman Elshami3", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 4, title: 'post 4', body: 'post 4post 1post 1post 1', description: "This is A Description of ur Article 4", doctor: "Eman Elshami4", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 5, title: 'jndcnjdncjdncjdncjdnjdnjndcjdncjdncjdndjncdjcndjcdnjdncjdnccdnj  jdcnjdncjdncd', body: 'post 5post 1post 1post 1', description: "This is A Description of ur Article 5", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 6, title: 'post 6', body: 'post 6post 1post 1post 1', description: "This is A Description of ur Article 6", doctor: "Eman Elshami6", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 7, title: 'Life Coach Articleee', body: 'post 1post 1post 1post 1', description: "This is A Description of ur Article 7", doctor: "E3man Elshami", img: "https://media.licdn.com/dms/image/C5612AQGjlYG0_YNTSg/article-cover_image-shrink_600_2000/0/1606260135101?e=2147483647&v=beta&t=x_Odso98CsaygBrlVYKZ0-bUFIvw5VVVA4ywYRPJ1Bw" },
    //     { id: 8, title: 'post 8', body: 'post 2post 1post 1post 1', description: "This is A Description of ur Article 8", doctor: "Eman Elshami", img: "https://qph.cf2.quoracdn.net/main-qimg-0430adea251d6b2a447332a19203180c-pjlq" },
    //     { id: 9, title: '123456789123456789123456789012345', body: 'post 3post 1post 1post 1', description: "This is A Description of ur Article 9", doctor: "Eman Elshami", img: "https://media.licdn.com/dms/image/C5612AQGjlYG0_YNTSg/article-cover_image-shrink_600_2000/0/1606260135101?e=2147483647&v=beta&t=x_Odso98CsaygBrlVYKZ0-bUFIvw5VVVA4ywYRPJ1Bw" },
    //     { id: 10, title: 'post 10', body: 'post 4post 1post 1post 1', description: "This is A Description of ur Article 10", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 11, title: 'post 11', body: 'post 5post 1post 1post 1', description: "This is A Description of ur Article 11", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 12, title: 'post 12', body: 'post 6post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 13, title: 'post 13', body: 'post 133post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 14, title: 'post 13', body: 'post 133post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 15, title: 'post 13', body: 'post 133post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 16, title: 'post 13', body: 'post 133post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 17, title: 'post 13', body: 'post 133post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" },
    //     { id: 18, title: 'post 13', body: 'post 133post 1post 1post 1', description: "This is A Description of ur Article 12", doctor: "Eman Elshami", img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/private-coaching-life-coach-trainer-spiritual-design-template-bbf1a232f7da450e8b84674471cc8826_screen.jpg?ts=1611492802" }

    // ];



    // // Get the image from local storage if it exists
    // const img = localStorage.getItem(`post_${postId}_img`);

    // // Use the image from local storage if it exists, otherwise use the image from the post object
    // const backgroundImage = `url(${img || post.img})`;



    const inputRef = useRef(null);
    const handleSearch = () => {
        const inputElement = inputRef.current;
        if (!inputElement) {
            alert('Could not find search input.');
            return;
        }
        const searchText = inputElement.value;
        if (!searchText || searchText.trim() === '') {
            alert('Not Found');
            return;
        }
        const isMatchFound = window.find(searchText, false, false, true, false, false, false);
        if (!isMatchFound) {
            alert(`No matches found for "${searchText}"`);
        }
    }

    const shuffledPosts = [...post].sort(() => 0.5 - Math.random());
    const currentPosts = shuffledPosts.slice(0, 3);

    // const parallax = useParallax({
    //     speed: -10,
    //   });

    // const shuffledPosts = post.sort(() => 0.5 - Math.random());
    // const currentPosts = shuffledPosts.slice(0, 3);


    const accessToken = localStorage.getItem('token');
    
    
  
  
    return (
        
       
        <Grid>
            <ChatBotIcon/>
            {accessToken ? <HomeHeader /> : <Headerguest />}
            <FAQsButton/>

            <ParallaxProvider>

                <Parallax speed={-28}>
                    <Grid container justifyContent="flex-start" justifyItems="center" style={{ marginTop: "130px" }} >
                        <Grid item xs={12} xl={12} lg={12} justifyContent="flex-start" justifyItems="center" >
                            <div className={classes.btnrecommend}>
                                <Grid container>
                                    <Grid item xs={12} sm={6} md={6} lg={1} xl={1}>
                                        <Button>
                                            <Typography variant="body1" className={classes.buttonLabel}>
                                                All
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1} xl={1}>
                                        <Button>
                                            <Typography variant="body1" className={classes.buttonLabel}>
                                                Anxiety
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1.2} xl={1.2}>
                                        <Button>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Depression
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1.5} xl={1.5}>
                                        <Button className={classes.button}>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Specific phobias
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1.6} xl={1.6}>
                                        <Button className={classes.button}>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Bipolar disorder
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1.4} xl={1.4}>
                                        <Button className={classes.button}>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Schizophrenia
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={2.6} xl={2.6}>
                                        <Button className={classes.button}>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Dissociative identity disorder
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1.3} xl={1.3}>
                                        <Button className={classes.button}>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Eating disorders
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                        <Button>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Attention deficit hyperactivity disorder
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1.8} xl={1.8}>
                                        <Button>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Hoarding disorder
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                                        <Button>
                                            <Typography variant="button" className={classes.buttonLabel}>
                                                Gender dysphoria
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.article} justifyContent="flex-start" justifyItems="center" style={{ marginTop: "50px"  }} >
                        <Grid item xs={10} xl={12} lg={7} md={12} justifyContent="flex-start" justifyItems="center" >


                            <h1 style={{ textAlign: "left", marginLeft: "115px" }}>
                                {post[postId - 1]?.title}
                            </h1>

                        </Grid>
                        <Grid item xs={12} xl={12} lg={5.5} md={5} justifyContent="flex-start" justifyItems="center" style={{ marginTop: "20px" }} >


                            <p style={{ textAlign: "left", marginLeft: "115px" }}>{post[postId - 1]?.description}
                            </p>

                        </Grid>

                        <Grid item xs={12} xl={12} lg={10} md={5} justifyContent="flex-start" justifyItems="center" style={{ marginTop: "20px" }} >


                            <p style={{ textAlign: "left", marginLeft: "115px" }}> By: {post[postId - 1]?.doctor}</p>

                        </Grid>

                    </Grid>
                </Parallax>
            </ParallaxProvider>

            <ParallaxProvider>
                <Parallax speed={20}>     
                    <Grid container  alignContent="center" alignItems="center" justifyContent="center" style={{ padding: "20px 0" }}>
                        <Grid key={post} item xs={12} lg={12} md={10} alignContent="center" alignItems="center">
                            <Paper style={{
                                overflow: "hidden",
                                position: "relative",
                                height: "600px",
                                textAlign: "center",
                                backgroundSize: "100% 100%",
                                backgroundImage: `url(${API_URL}/${post[postId - 1]?.img})`,
                                backgroundRepeat: "no-repeat",
                            }}>
                            </Paper>
                        </Grid>
                    </Grid>      
                </Parallax>
            </ParallaxProvider>
            
            <ParallaxProvider>
                <Parallax speed={0}>
                    <Grid container className={classes.article} justifyContent="flex-start" justifyItems="center"  >
                        <Grid item xs={10} xl={12} lg={11} md={12} justifyContent="flex-start" justifyItems="center" >
                            <p style={{ textAlign: "left", marginLeft: "115px" }}>
                                {post[postId - 1]?.body}
                            </p>
                        </Grid>
                    </Grid>
                </Parallax>
            </ParallaxProvider>


            <Grid container justifyContent="center" justifyItems="center" style={{ marginTop: "20px" }} >
                <Grid item xs={10} xl={12} lg={10} md={12} justifyContent="center" justifyItems="center" >
                    {/* articles */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: "30px" }}>
                        {currentPosts.map((post) => (
                            <Grid key={post} item xs={12} s={12} md={3.7} lg={4}>
                                <Box>
                                    <a href={"/articlepage"} onClick={() => {
                                        localStorage.setItem('postId', post.id);
                                    }}>

                                        <Paper variant="outlined" square className={classes.articlebox} style={{ overflow: "hidden", textAlign: "center", height: "220px", position: "relative", backgroundImage: `url(${API_URL}/${post?.img})`, backgroundSize: "cover" }}>
                                            {/* {post.title}
                                            {post.body} */}
                                            <Grid className={classes.griddesign}>
                                                <h4 >{post?.title}</h4>
                                                <p >By : {post?.doctor}</p>
                                            </Grid>
                                        </Paper>
                                    </a>
                                </Box>

                               

                            </Grid>
                        ))}
                    </Grid>


                </Grid>
            </Grid>

            <Grid container justifyContent="center" justifyItems="center">
                <Grid item xs={12} s={12} md={10.2} l={12} xl={12} justifyContent="center" justifyItems="center">
                    <Box
                        sx={{

                            marginTop: "10px",
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginBottom:"50px"
                        }}
                    >
                        <Link href="/articles" color="inherit" underline="always" style={{ color: "black" }}>
                            See More
                        </Link>
                    </Box>
                </Grid>
            </Grid>




        </Grid>
    );
};

export default ArticlePage;
