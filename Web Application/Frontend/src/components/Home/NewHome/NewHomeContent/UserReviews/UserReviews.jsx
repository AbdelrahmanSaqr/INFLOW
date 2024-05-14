import {useState} from 'react';

import photo1 from '../../../../../assets/photo4.png';
import photo4 from '../../../../../assets/photo1.png';
import photo2 from '../../../../../assets/photo2.jpg';
import photo3 from '../../../../../assets/photo3.png';
import photo5 from '../../../../../assets/professionalphoto3.jpg';

import classes from './UserReviews.module.css';

import { Grid } from '@mui/material';

import { useNavigate } from "react-router-dom";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const reviews = [
    {
      id: 1,
      image: require('../../../../../assets/professionalphoto3.jpg'),
      name: 'Menna',
      quotes:'‘’',
      review: ' I had an incredible experience with the life coaching services provided by this website. The coach was knowledgeable, empathetic, and helped me gain clarity in my personal and professional goals. Highly recommended! '
    },
    {
      id: 2,
      image: require('../../../../../assets/professionalphoto2.jpg'),
      name: 'Abdelrhman',
      quotes:'‘’',
      review: ' IFLOW website exceeded my expectations. The coaches are skilled at asking the right questions and providing valuable insights. They helped me overcome obstacles and create a plan for success. I am grateful for their support. '
    },
    {
      id: 3,
      name: 'Dina',
      image: require('../../../../../assets/professionalphoto.jpg'),
      quotes:'‘’',
      review: ' I stumbled upon this life coaching website and it turned out to be a game-changer for me. The coaches are incredibly motivating and they helped me unlock my potential. The tools and resources provided are also very helpful. Definitely worth it! '
    }
];


const UserReviews =() => {

    const [count, setCount] = useState(0);

    const navigate = useNavigate()
    const home = () => {
      navigate("/home")
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const images = [photo1, photo2, photo3, photo4, photo5];
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        if (count === 0) {
            navigate("/")
        }
        else {
            setCount(count - 1);
        }
        // setActiveIndex((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        if (count === 4) {
            setCount(0);
            // setActiveIndex((prevActiveStep) => {
            //     const isLastDot = prevActiveStep === 4; // replace 5 with the index of the last dot
            //     return isLastDot ? 0 : prevActiveStep + 1;
            //     // we assume that the last dot has an index of 5. 
            //     // If your steps prop is a different value, you'll need to adjust this accordingly.
            // });
        }
        else {
            setCount(count + 1);
            // setActiveIndex((prevActiveStep) => prevActiveStep + 1);
        }
    };


    return(
        <Grid className={classes.userreviews}>
            <div className={classes.userreviewscontent}>
                <h1>What does our users say about us?</h1>
                <div className={classes.imageSlider}>
                    {/* <div className={`${classes.arrow} ${classes.arrowLeft}`} onClick={handlePrev}>
                        <span>&lt;</span>
                    </div> */}
                    <button className={classes.leftbtn} onClick={handlePrev}>
                        <svg width="16" height="19" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.6862 0.000538946C25.3274 -0.0115083 25.9565 0.178679 26.4863 0.544785C27.0161 0.910891 27.4206 1.43481 27.6436 2.04405C27.8667 2.65329 27.8974 3.31771 27.7314 3.94539C27.5654 4.57306 27.211 5.13295 26.7172 5.54757L7.81932 21.9403L26.7289 38.333C27.0744 38.5882 27.3639 38.9132 27.5792 39.2874C27.7944 39.6617 27.9308 40.0771 27.9797 40.5074C28.0286 40.9377 27.9889 41.3737 27.8632 41.7877C27.7374 42.2017 27.5283 42.5848 27.2491 42.9128C26.9699 43.2408 26.6266 43.5067 26.2409 43.6935C25.8552 43.8803 25.4355 43.9841 25.0082 43.9983C24.5809 44.0125 24.1554 43.9368 23.7584 43.776C23.3615 43.6152 23.0017 43.3727 22.7019 43.064L1.08424 24.3413C0.744265 24.047 0.471287 23.6816 0.284109 23.2702C0.0969315 22.8587 0 22.4111 0 21.958C0 21.505 0.0969315 21.0574 0.284109 20.6459C0.471287 20.2345 0.744265 19.8691 1.08424 19.5748L22.7019 0.792971C23.2497 0.298804 23.953 0.0179532 24.6862 0.000538946Z" fill="#4484FF" />
                        </svg>
                    </button>
                    <div className={classes.sliderContainer}>
                        <div className={classes.sliderLine}></div>
                        <div className={classes.sliderImages}>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${classes.sliderImage} ${index === activeIndex ? classes.active : ""}`}
                                    style={{ 
                                        backgroundImage: `url(${image})` ,
                                        // transform: `translateX(${(index - activeIndex) * 100}%)`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <button className={classes.rightbtn} onClick={handleNext}>
                    <svg width="16" height="19" viewBox="0 0 29 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.98322 0.000538946C3.34202 -0.0115083 2.71298 0.178679 2.18314 0.544785C1.6533 0.910891 1.24887 1.43481 1.0258 2.04405C0.802725 2.65329 0.772051 3.31771 0.938021 3.94539C1.10399 4.57306 1.4584 5.13295 1.95219 5.54757L20.8501 21.9403L1.94052 38.333C1.59506 38.5882 1.30555 38.9132 1.09027 39.2874C0.874984 39.6617 0.738599 40.0771 0.689719 40.5074C0.640839 40.9377 0.680526 41.3737 0.806275 41.7877C0.932024 42.2017 1.1411 42.5848 1.42032 42.9128C1.69954 43.2408 2.04283 43.5067 2.42853 43.6935C2.81423 43.8803 3.23396 43.9841 3.66124 43.9983C4.08852 44.0125 4.51407 43.9368 4.91102 43.776C5.30798 43.6152 5.66773 43.3727 5.96756 43.064L27.5852 24.3413C27.9252 24.047 28.1981 23.6816 28.3853 23.2702C28.5725 22.8587 28.6694 22.4111 28.6694 21.958C28.6694 21.505 28.5725 21.0574 28.3853 20.6459C28.1981 20.2345 27.9252 19.8691 27.5852 19.5748L5.96756 0.792971C5.41975 0.298804 4.71647 0.0179532 3.98322 0.000538946Z" fill="#4484FF" />
                                </svg>
                    </button>
                    {/* <div className={`${classes.arrow} ${classes.arrowRight}`} onClick={handleNext}>
                        &gt;
                    </div> */}
                </div>
                <div>
                   {count === 0 && 
                        <div>
                            <p>
                                "I found the website really helpful in finding a life coach that suited my needs. <br/>
                                The search function was easy to use and I was able to find a coach who had <br/>
                                experience in the areas I needed help with."
                            </p>
                            <h2>Menna</h2>
                        </div>
                   }
                   {count === 1 && 
                        <div>
                            <p>
                                "The website was easy to navigate and provided a lot of useful information <br/>
                                about life coaching. I was able to learn more about the process and what to <br/>
                                expect before I made a commitment."
                            </p>
                            <h2>Mona</h2>
                        </div>
                        
                   }
                   {count === 2 && 
                        <div>
                            <p>
                                "I had a great experience using the website to find a life coach. The coach I <br/>
                                found was very knowledgeable and helped me make positive changes in my life <br/>
                                and that helps me much."
                            </p>
                            <h2>Abdelrahman</h2>
                        </div>
                   }
                   {count === 3 && 
                        <div>
                            <p>
                                "The website provided a lot of value with its resources and articles about life <br/>
                                coaching. I learned a lot about the practice and was able to make an informed <br/>
                                decision about whether it was right for me."
                            </p>
                            <h2>Ahmed</h2>
                        </div>
                   }
                   {count === 4 && 
                        <div>
                            <p>
                                "I was hesitant to try life coaching at first, but the website made it easy to find a <br/>
                                coach who was a good fit for me. I'm glad I took the leap and tried it out - it's <br/>
                                made a big difference in my life."
                            </p>
                            <h2>Amal</h2>
                        </div>
                   }
                </div>
            </div>

        </Grid>
    );
}

export default UserReviews;

