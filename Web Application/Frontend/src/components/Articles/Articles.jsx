//import { Form, ProgressBar, NavDropdown } from "react-bootstrap";
import React, { useRef, useState, useEffect } from 'react';
import HomeHeader from "../Header/HomeHeader";
import Headerguesthome from "../Header/Headerguesthome"
// import { useNavigate } from "react-router-dom";
import classes from "./Articles.module.css";
import { Autocomplete, Button, InputAdornment, Grid, IconButton, InputBase, Pagination, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import MenuIcon from '@mui/icons-material/Menu';
import { Box, MenuItem, Select, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { API_URL } from "../../api.js"
import ChatBotIcon from '../ChatBot/ChatBot';
import { unstable_useHistory as useHistory } from 'react-router-dom';
import FAQsButton from '../FAQs/FAQsButton';
import photo1 from '../../assets/needs.jpeg';
import photo2 from '../../assets/online.png'


const Articles = (props) => {


    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);



    const [searchCategory, setSearchCategory] = useState('title');
    const [searchQuery, setSearchQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        // Perform the API call whenever the search query changes
        if (typeof searchQuery === 'string' && searchQuery.trim() !== '') {
            axios
                .get('https://backend.inflow2023.online/api/articals/search', {
                    params: {
                        search: searchQuery.trim()
                    }
                })
                .then(response => {
                    const data = response.data;
                    const articles = data.data; // Array of articles matching the search query

                    setArticles(articles);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            // If the search query is empty or not a string, clear the articles array
            setArticles([]);
        }
    }, [searchQuery]);


    useEffect(() => {
        axios.get(`${API_URL}/api/articals`)
            .then(response => {
                setPost(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const postWithId1 = post.find(post => post.id === 1);
    const postWithId2 = post.find(post => post.id === 2);
    const postWithId3 = post.find(post => post.id === 3);


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    // assume you have an array of all your posts called "allPosts"
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const inputRef = useRef(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (typeof searchQuery === 'string' && searchQuery.trim() !== '') {
            axios
                .get('https://backend.inflow2023.online/api/articals/search', {
                    params: {
                        search: searchQuery.trim()
                    }
                })
                .then(response => {
                    const data = response.data;
                    const articles = data.data; // Array of articles matching the search query

                    setArticles(articles);

                    if (articles.length > 0) {
                        const firstArticleId = articles[0].id;
                        localStorage.setItem('postId', firstArticleId);
                        window.location.href = '/articlepage';

                    } else {
                        localStorage.removeItem('postId');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setArticles([]);
            localStorage.removeItem('postId');
        }






    };

    // const handleSearch = () => {
    //     axios.get('https://backend.inflow2023.online/api/articals/search', {
    //       params: {
    //         search: searchQuery
    //       }
    //     })
    //       .then(response => {
    //         const data = response.data;
    //         const articles = data.data; // Array of articles matching the search query

    //         setArticles(articles);
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //       });
    //   };



    const accessToken = localStorage.getItem('token');

    return (
        <Grid>
            <ChatBotIcon />
            {accessToken ? <HomeHeader /> : <Headerguesthome />}
            <FAQsButton />

            <Grid container className={accessToken ? classes.article : classes.articleGuest}>
                <Grid container justifyContent="center" justifyItems="center" >
                    <Grid
                        component="form"
                        className={classes.search}
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 1150 }}
                    >
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            options={articles}
                            getOptionLabel={(article) => article.title}
                            renderOption={(props, article) => (
                                <li {...props}>{article.title}</li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="What are you looking for?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    InputProps={{
                                        ...params.InputProps,
                                        style: {
                                            borderRadius: '15px',
                                        },
                                        disableUnderline: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type="button"
                                                    sx={{ p: '10px' }}
                                                    aria-label="search"
                                                    onClick={handleSearch}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                            sx={{ ml: 1, flex: 1, border: 'none' }}
                        />

                    </Grid>
                </Grid>


                <Grid container justifyContent="center" justifyItems="center">
                    <Grid item xs={12} xl={12} justifyContent="center" justifyItems="center">
                        <h4 className={classes.trendingthisweeek}>Trending this Week</h4>
                    </Grid>
                </Grid>

                {/* top Trending (first article) */}
                <Grid container alignContent="center" alignItems="center" justifyContent="center" style={{ padding: "20px 0" }}>
                    <Grid key={postWithId1} item xs={10} sm={10} md={10} lg={10} xl={10} alignContent="center" alignItems="center" style={{ border: '0px solid', borderRadius: '12px' }}>
                        <a href={"/articlepage"} onClick={() => {
                            localStorage.setItem('postId', postWithId1.id);
                        }}
                        >
                            <Paper style={{
                                overflow: "hidden",
                                position: "relative",
                                height: "400px", textAlign: "center", backgroundSize: "100% 100%",
                                // backgroundImage: `url(${API_URL}/${postWithId1?.img})`
                                backgroundImage: `url(${API_URL}/${postWithId1?.img})`
                            }}
                            >
                                <Grid className={classes.griddesign}>
                                    <h4 >{postWithId1?.title}</h4>
                                    <p>By : {postWithId1?.doctor}</p>
                                </Grid>

                            </Paper>
                        </a>
                    </Grid>
                </Grid>

                {/* second top trending ( left article ) */}
                <Grid container alignContent="center" alignItems="center">
                    <Grid
                        key={postWithId2} item direction="column" xs={10} sm={10} md={5} lg={5} xl={5}
                        alignContent="center" alignItems="center"
                    >
                        <a href={"/articlepage"} onClick={() => {
                            localStorage.setItem('postId', postWithId2.id);
                        }}>
                            <Paper
                                style={{
                                    overflow: "hidden",
                                    textAlign: "center",
                                    position: "relative",
                                    height: "450px",
                                    marginLeft: "19%",
                                    backgroundImage: `url(${API_URL}/${postWithId2?.img})`,
                                    backgroundSize: "100% 100%",
                                    marginTop: '20px'
                                }}
                            >
                                <Grid className={classes.griddesign}>
                                    <h3 >{postWithId2?.title}</h3>
                                    <p>By : {postWithId2?.doctor}</p>
                                </Grid>
                            </Paper></a>
                    </Grid>

                    {/*  top trending ( right articles ) */}
                    <Grid container
                        className={classes.topRightArticle}
                        item direction="row" xs={10} sm={10} md={6} lg={6} xl={6}
                        alignContent="center" alignItems="center"
                    >

                        {/*  top */}
                        <Grid container
                            item direction="row" xs={12} lg={12}
                            alignContent="center" alignItems="center"
                        >
                            {post.filter(post => post.id >= 3 && post.id <= 4).map((post, index) => (
                                <Grid key={post.id} item xs={12} lg={6} alignContent="center" alignItems="center">
                                    <a href={"/articlepage"} onClick={() => {
                                        localStorage.setItem('postId', post.id);
                                    }}>
                                        <Paper
                                            style={{
                                                overflow: "hidden",
                                                position: "relative",
                                                height: "200px",
                                                marginLeft: "30px",
                                                backgroundImage: `url(${API_URL}/${post?.img})`,
                                                // backgroundImage:`url(${photo2})`, 
                                                backgroundSize: "100% 100%",
                                                marginTop: '20px'
                                            }}
                                        >
                                            <Grid className={classes.griddesign}>
                                                <h4>{post.title}</h4>
                                                <p>By : {post.doctor}</p>
                                            </Grid>
                                            {/* <h2>{post.title}</h2>
                                        <p>{post.body}</p> */}
                                        </Paper></a>
                                </Grid>
                            ))}
                        </Grid>

                        {/*  down */}
                        <Grid container item direction="row" xs={12} lg={12} alignContent="center" alignItems="center" style={{ marginTop: "30px" }}>
                            {post.filter(post => post.id >= 5 && post.id <= 6).map((post, index) => (
                                <Grid key={post.id} item xs={12} lg={6} alignContent="center" alignItems="center">
                                    <a href={"/articlepage"} onClick={() => {
                                        localStorage.setItem('postId', post.id);
                                    }}>
                                        <Paper
                                            style={{
                                                overflow: "hidden",
                                                position: "relative",
                                                height: "200px",
                                                marginLeft: "30px",
                                                backgroundImage: `url(${API_URL}/${post?.img})`,
                                                backgroundSize: "100% 100%",
                                                marginTop: '20px'
                                            }}
                                        >
                                            <Grid className={classes.griddesign} >
                                                <h4>{post.title}</h4>
                                                <p>By : {post.doctor}</p>
                                            </Grid>


                                            {/* <h2>{post.title}</h2>
                                        <p>{post.body}</p> */}
                                        </Paper></a>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                {/* recommendation (after trending articles0) */}
                <Grid container justifyContent="center" justifyItems="center" style={{ marginTop: "80px" }} >
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10} justifyContent="center" justifyItems="center" >
                        <div className={classes.recommendation} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Grid container>
                                <Grid item xs={12} sm={4.5} md={3.5} lg={3.5} xl={3.5}>
                                    <h6>Discover more of what matters to you</h6>
                                </Grid>
                                <Grid item xs={12} sm={3} md={2.2} lg={2.2} xl={2.2}>
                                    <p>
                                        <svg width="19" height="20" style={{ marginRight: "10px" }} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_2349_8927)">
                                                <path d="M21.125 19.7891H17.875C16.25 19.7891 15.1125 17.8391 13.975 15.4016C13.4875 16.5391 13 17.8391 12.35 19.1391C13.65 21.4141 15.275 23.0391 17.875 23.0391H21.125V26.2891L26 21.4141L21.125 16.5391V19.7891ZM8.775 11.0141C9.2625 9.87656 9.75 8.57656 10.4 7.43906C9.1 5.16406 7.3125 3.53906 4.875 3.53906H0V6.78906H4.875C6.5 6.78906 7.6375 8.73906 8.775 11.0141Z" fill="#4484FF" />
                                                <path d="M26 5.16406L21.125 0.289062V3.53906H17.875C13.4875 3.53906 11.5375 8.41406 9.75 12.8016C8.45 16.2141 6.9875 19.7891 4.875 19.7891H0V23.0391H4.875C9.1 23.0391 11.05 18.4891 12.8375 13.9391C14.3 10.3641 15.7625 6.78906 17.875 6.78906H21.125V10.0391L26 5.16406Z" fill="#4484FF" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2349_8927">
                                                    <rect width="26" height="26" fill="white" transform="translate(0 0.289062)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Give me random article
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                    <p >
                                        <svg width="23" height="27" style={{ marginRight: "10px" }} viewBox="0 0 33 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M31.2074 16.4934C30.8754 16.3773 30.5236 16.328 30.1724 16.3481C29.8212 16.3683 29.4774 16.4576 29.1608 16.611C28.8442 16.7643 28.561 16.9787 28.3274 17.2417C28.0938 17.5048 27.9145 17.8114 27.7997 18.1439C27.6541 18.5626 27.5054 18.9358 27.3525 19.2938C26.6917 19.2166 26.0221 19.2784 25.3866 19.475C24.7511 19.6717 24.1637 19.9989 23.662 20.4358C23.111 19.028 21.597 18.6299 20.1571 18.7562C14.9205 18.653 7.98543 19.7477 5.1068 25.0328C4.78368 24.7595 4.39378 24.5768 3.97694 24.5034C3.5601 24.4301 3.13125 24.4687 2.73423 24.6154L1.59346 25.0298C0.990564 25.2525 0.499969 25.7041 0.228384 26.2866C-0.0432022 26.8691 -0.0738103 27.5353 0.143217 28.1402L2.63289 34.9824C2.85529 35.5857 3.30702 36.0766 3.88971 36.3484C4.47239 36.6201 5.13885 36.6506 5.74393 36.4333L6.8847 36.0182C7.34987 35.8491 7.7519 35.5412 8.03644 35.1362C8.32098 34.7312 8.47432 34.2486 8.47572 33.7537C19.5206 35.2664 30.2517 29.9121 32.8786 19.8017C33.0853 19.1412 33.0264 18.4261 32.7144 17.8084C32.4023 17.1907 31.8618 16.7189 31.2074 16.4934ZM23.7882 22.0335C24.1307 21.5539 24.5821 21.1624 25.1053 20.8911C25.6285 20.6198 26.2086 20.4765 26.7979 20.4728C25.7485 22.5908 24.1153 24.3646 22.091 25.585C22.2856 24.8743 22.5436 24.1824 22.8616 23.5177C23.3299 23.1424 23.6566 22.619 23.7882 22.0335ZM7.15412 34.2507C6.92779 34.8872 5.86347 35.0613 5.32888 35.2931C5.02641 35.4016 4.69333 35.3863 4.40209 35.2505C4.11084 35.1147 3.88499 34.8694 3.77367 34.568L1.28338 27.7252C0.868336 26.3914 2.196 26.0874 3.14867 25.7555C3.45124 25.6473 3.78427 25.6628 4.07552 25.7985C4.36678 25.9343 4.59277 26.1794 4.70449 26.4806L7.19477 33.3229C7.24978 33.4726 7.27451 33.6318 7.26754 33.7911C7.26056 33.9505 7.22201 34.1063 7.15412 34.2507ZM31.7153 19.4552C29.2335 29.1281 18.6862 34.1263 8.18142 32.4879L5.89623 26.207C8.44295 20.5517 15.7566 19.8308 21.1146 19.9758C22.9672 19.9697 23.2032 22.6311 21.3913 22.8793C19.7196 23.0553 18.3756 23.2483 17.4994 23.4376C15.7918 23.8217 13.5673 25.4175 12.0012 26.69C11.7857 26.8705 11.6311 27.1131 11.5586 27.3847C11.4861 27.6562 11.4992 27.9436 11.5962 28.2075C11.6931 28.4713 11.8691 28.6988 12.1001 28.8589C12.3312 29.019 12.606 29.1039 12.8871 29.102C20.8889 29.0777 26.6189 25.4928 28.949 18.5341C29.0791 18.1774 29.3432 17.8856 29.6851 17.7206C30.027 17.5555 30.4198 17.5303 30.78 17.6502C31.1402 17.7701 31.4395 18.0257 31.6143 18.3628C31.789 18.6998 31.8249 19.0917 31.7153 19.4552ZM21.2912 24.1111C21.0231 24.8355 20.8135 25.5802 20.6644 26.3381C18.2025 27.406 15.5405 27.9347 12.8574 27.8884C12.8273 27.8887 12.7979 27.8797 12.7732 27.8625C12.7486 27.8453 12.7299 27.8208 12.7198 27.7925C12.7097 27.7641 12.7087 27.7334 12.717 27.7044C12.7252 27.6755 12.7423 27.6499 12.7658 27.6311C16.5042 24.687 17.2348 24.5395 21.2912 24.1111Z" fill="#4484FF" />
                                            <path d="M18.7969 16.9465C21.0491 16.9439 23.2084 16.0481 24.801 14.4555C26.3936 12.8629 27.2894 10.7036 27.292 8.45136C26.826 -2.81864 10.7666 -2.8156 10.3018 8.45136C10.3043 10.7036 11.2002 12.8629 12.7928 14.4555C14.3853 16.0481 16.5446 16.9439 18.7969 16.9465ZM18.7969 1.16982C20.7274 1.17191 22.5783 1.93974 23.9434 3.30484C25.3085 4.66994 26.0763 6.52081 26.0784 8.45136C25.6785 18.1115 11.914 18.1085 11.5153 8.45136C11.5174 6.52081 12.2853 4.66994 13.6504 3.30484C15.0155 1.93974 16.8663 1.17191 18.7969 1.16982Z" fill="#4484FF" />
                                            <path d="M18.065 11.3111C18.1788 11.4249 18.3331 11.4888 18.494 11.4888C18.6549 11.4888 18.8092 11.4249 18.923 11.3111L23.4739 6.76019C23.5845 6.64575 23.6456 6.49247 23.6442 6.33337C23.6429 6.17427 23.579 6.02208 23.4665 5.90957C23.354 5.79707 23.2018 5.73325 23.0427 5.73187C22.8836 5.73049 22.7304 5.79165 22.6159 5.90218L18.494 10.0241L16.1924 7.72256C16.078 7.61203 15.9247 7.55087 15.7656 7.55225C15.6065 7.55363 15.4543 7.61745 15.3418 7.72996C15.2293 7.84246 15.1655 7.99465 15.1641 8.15375C15.1627 8.31285 15.2239 8.46613 15.3344 8.58057L18.065 11.3111ZM28.5061 8.45496C28.5061 8.6159 28.57 8.77024 28.6838 8.88403C28.7976 8.99783 28.9519 9.06176 29.1129 9.06176H30.9333C31.0942 9.06176 31.2485 8.99783 31.3623 8.88403C31.4761 8.77024 31.5401 8.6159 31.5401 8.45496C31.5401 8.29403 31.4761 8.13969 31.3623 8.0259C31.2485 7.9121 31.0942 7.84817 30.9333 7.84817H29.1129C28.9519 7.84817 28.7976 7.9121 28.6838 8.0259C28.57 8.13969 28.5061 8.29403 28.5061 8.45496ZM27.9211 5.13459C27.9764 5.28553 28.0892 5.40842 28.2349 5.47632C28.3806 5.54422 28.5473 5.5516 28.6984 5.49684L30.4096 4.87366C30.5599 4.81788 30.682 4.70488 30.7493 4.55935C30.8165 4.41382 30.8235 4.24758 30.7686 4.09695C30.7136 3.94633 30.6014 3.82355 30.4562 3.75545C30.3111 3.68735 30.1449 3.67946 29.9939 3.7335L28.2828 4.35668C28.1318 4.41192 28.009 4.5248 27.9412 4.67053C27.8734 4.81626 27.8662 4.98294 27.9211 5.13398V5.13459ZM26.7003 2.43071C26.8428 2.43085 26.9808 2.38055 27.0898 2.28872L28.4842 1.11882C28.5472 1.06823 28.5994 1.00559 28.6378 0.934557C28.6762 0.863529 28.7001 0.785546 28.708 0.70518C28.7159 0.624812 28.7077 0.543678 28.6838 0.466531C28.6599 0.389384 28.6209 0.317777 28.569 0.255906C28.5171 0.194035 28.4534 0.143145 28.3816 0.106219C28.3098 0.0692921 28.2313 0.0470719 28.1508 0.0408603C28.0703 0.0346487 27.9893 0.0445706 27.9127 0.0700446C27.8361 0.0955186 27.7653 0.136032 27.7045 0.189211L26.3101 1.3585C26.2167 1.43947 26.1501 1.54689 26.1191 1.66654C26.088 1.78619 26.0941 1.91244 26.1364 2.02859C26.1786 2.14474 26.2552 2.24531 26.3559 2.31701C26.4566 2.3887 26.5767 2.42875 26.7003 2.43071Z" fill="#4484FF" />
                                        </svg>

                                        My coach recommendations
                                    </p>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-start" justifyItems="center" style={{ marginTop: "0px" }} >
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


                {/* All articles */}
                <Grid container justifyContent="center" justifyItems="center">
                    <Grid item xs={12} xl={12} justifyContent="center" justifyItems="center">

                        <h4 className={classes.allArticle}>All articles</h4>
                    </Grid>
                </Grid>


                <Grid container alignContent="center" alignItems="center">

                    {/* first article in all articles ( left ) */}
                    <Grid key={post} item direction="column" xs={10} sm={10} md={5} lg={5} xl={5} alignContent="center" alignItems="center">
                        <a href={"/articlepage"}
                            onClick={() => {
                                localStorage.setItem('postId', post[((currentPage - 1) * postsPerPage + 1)].id);
                            }}>

                            <Paper
                                style={{
                                    overflow: "hidden",
                                    textAlign: "center",
                                    position: "relative",
                                    height: "450px",
                                    marginLeft: "19%",
                                    backgroundImage: `url(${API_URL}/${post[((currentPage - 1) * postsPerPage + 1)]?.img})`,
                                    backgroundSize: "100% 100%",
                                    marginTop: '20px'
                                }}
                            >

                                <Grid className={classes.griddesign}>
                                    <h4>{post[(((currentPage - 1) * postsPerPage + 1))]?.title}</h4>
                                    <p>By : {post[((currentPage - 1) * postsPerPage + 1)]?.doctor}</p>
                                </Grid>
                            </Paper></a>
                    </Grid>

                    {/* all articles Right */}
                    <Grid
                        container
                        className={classes.topRightArticle}
                        direction="row"
                        xs={10} sm={10} md={6} lg={6} xl={6}
                        alignContent="center"
                        alignItems="center"
                    >

                        {/* Top */}
                        <Grid container item direction="row" xs={12} lg={12} alignContent="center" alignItems="center">
                            {post.filter(post => post.id >= ((currentPage - 1) * postsPerPage + 3) && post.id <= ((currentPage - 1) * postsPerPage + 4)).map((post, index) => (
                                <Grid key={post.id} item xs={12} lg={6} alignContent="center" alignItems="center">
                                    <a href={"/articlepage"} onClick={() => {
                                        localStorage.setItem('postId', post.id);
                                    }}>
                                        <Paper
                                            style={{
                                                overflow: "hidden",
                                                position: "relative",
                                                height: "200px",
                                                marginLeft: "30px",
                                                backgroundImage: `url(${API_URL}/${post?.img})`,
                                                backgroundSize: "100% 100%",
                                                marginTop: '20px'
                                            }}
                                        >
                                            <Grid className={classes.griddesign}>
                                                <h4>{post?.title}</h4>
                                                <p >By : {post?.doctor}</p>
                                            </Grid>
                                            {/* <h2>{post.title}</h2>
                                        <p>{post.body}</p> */}
                                        </Paper></a>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Down */}
                        <Grid container item direction="row" xs={12} lg={12} alignContent="center" alignItems="center" style={{ marginTop: "30px" }}>
                            {post.filter(post => post.id >= ((currentPage - 1) * postsPerPage + 5) && post.id <= ((currentPage - 1) * postsPerPage + 6)).map((post, index) => (
                                <Grid key={post.id} item xs={12} lg={6} alignContent="center" alignItems="center">
                                    <a href={"/articlepage"} onClick={() => {
                                        localStorage.setItem('postId', post.id);
                                    }}>
                                        <Paper
                                            style={{
                                                overflow: "hidden",
                                                position: "relative",
                                                height: "200px",
                                                marginLeft: "30px",
                                                backgroundImage: `url(${API_URL}/${post?.img})`,
                                                backgroundSize: "100% 100%",
                                                marginTop: '20px'
                                            }}
                                        >
                                            <Grid className={classes.griddesign}>
                                                <h4>{post?.title}</h4>
                                                <p>By : {post?.doctor}</p>
                                            </Grid>
                                        </Paper></a>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        marginTop: "50px",
                        marginBottom: "50px"
                    }}
                >
                    <Grid item container xs={12} lg={12} md={12} justifyContent="center" alignItems="center">

                        <Pagination
                            count={Math.ceil(post.length / postsPerPage)}
                            shape="rounded"
                            size="large"
                            onChange={handlePaginationChange}
                        // className={classes.hideEllipsis} 
                        />

                        {/* <Pagination count={253} shape="rounded" size="large" /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );
};

export default Articles;
