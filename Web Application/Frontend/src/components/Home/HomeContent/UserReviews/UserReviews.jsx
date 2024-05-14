import photo1 from '../../../../assets/image 102.png';
import photo4 from '../../../../assets/photo1.png';
import photo2 from '../../../../assets/photo2.jpg';
import photo3 from '../../../../assets/photo3.png';

import classes from './UserReviews.module.css';

import { Grid } from '@mui/material';

import { useNavigate } from "react-router-dom";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const reviews = [
    {
      id: 1,
      image: require('../../../../assets/professionalphoto3.jpg'),
      name: 'Menna',
      review: 'Your application really helped me through my toughest moments.'
    },
    {
      id: 2,
      image: require('../../../../assets/professionalphoto2.jpg'),
      name: 'Abdelrhman',
      review: 'Thank god for Inflow, i’m know able to communicate easily with profecienal coaches without the pain of face to face sessions '
    },
    {
      id: 3,
      name: 'Dina',
      image: require('../../../../assets/professionalphoto.jpg'),
      review: 'Your application really helped me through my toughest moments.'
    }
];


const UserReviews =() => {

    const navigate = useNavigate()
    const home = () => {
      navigate("/home")
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };


    return(
        <div className={classes.userreviews}>
            <Grid container>

                <Grid xs={12} md={12} xl={12}>
                    <div  className={classes.header}>
                        <Grid container>
                            <Grid xs={12} md={10} xl={12}  justifyContent="center">
                                <h1 style={{ textAlign: "center"}}>User reviews</h1>
                            </Grid>
                        </Grid>                           
                    </div>

                    <div className={classes.contentdescription}>
                        <Grid container>
                            <Grid xs={12} md={4} xl={4}>
                                <Grid container>
                                    <Grid xs={6} md={4} xl={6}>
                                        <img src={photo1} alt='photo1' />
                                    </Grid>
                                    <Grid xs={6} md={6} xl={6}>
                                        <h2>Abdelrahman</h2>
                                    </Grid>
                                </Grid>
                                <p>Your application really helped me through my toughest moments.</p>

                                <Grid container>
                                    <Grid xs={6} md={4} xl={6}>
                                        <img src={photo2} alt='photo2' />
                                    </Grid>
                                    <Grid xs={6} md={6} xl={6}>
                                        <h2>Abdelrahman</h2>
                                    </Grid>
                                </Grid>
                                <p>Your application really helped me through my toughest moments.</p>
                            </Grid>
                            <Grid xs={12} md={4} xl={4}>
                                <Grid container>
                                    <Grid xs={6} md={4} xl={6}>
                                        <img src={photo3} alt='photo3' />
                                    </Grid>
                                    <Grid xs={6} md={6} xl={6}>
                                        <h2>Abdelrahman</h2>
                                    </Grid>
                                </Grid>
                                <p>Your application really helped me through my toughest moments.</p>
                                
                                <Grid container>
                                    <Grid xs={6} md={4} xl={6}>
                                        <img src={photo4} alt='photo4' />
                                    </Grid>
                                    <Grid xs={6} md={6} xl={6}>
                                        <h2>Abdelrahman</h2>
                                    </Grid>
                                </Grid>
                                <p>Your application really helped me through my toughest moments.</p>
                            </Grid>
                            <Grid xs={12} md={4} xl={4}>
                                <Grid container>
                                    <Grid xs={6} md={4} xl={6}>
                                        <img src={photo2} alt='photo5' />
                                    </Grid>
                                    <Grid xs={6} md={6} xl={6}>
                                        <h2>Abdelrahman</h2>
                                    </Grid>
                                </Grid>
                                <p>Thank god for Inflow, i’m know able to communicate easily with professional </p>
                                
                                <Grid container>
                                    <Grid xs={6} md={4} xl={6}>
                                        <img src={photo3} alt='photo6' />
                                    </Grid>
                                    <Grid xs={6} md={6} xl={6}>
                                        <h2>Abdelrahman</h2>
                                    </Grid>
                                </Grid>
                                <p>Thank god for Inflow, i’m know able to communicate easily with professional </p>
                            </Grid>
                        </Grid>
                    </div>


                </Grid>
            </Grid>

            <Grid container>
                <Grid xs={12} md={12} xl={12}>
                    <div className={classes.content}>
                        
                    </div>
                </Grid>
            </Grid>

            {/* <Grid container>
                <Grid xs={12} md={12} xl={12}>
                    <button className={classes.userreviewsbtn} onClick={home} >Get started</button>
                </Grid>
            </Grid> */}

        </div>
    );
}

export default UserReviews;

{/* <Slider {...settings}>
                            {reviews.map((review) => (
                                <div className={classes.contentdescription} key={review.id}>
                                    <Grid container>
                                        <Grid xs={3} md={2.5} xl={2.5}>
                                            <img  src={review.image} alt="Review" />
                                        </Grid>
                                        <Grid xs={6} md={6} xl={6}>
                                            <h3>{review.name}</h3>
                                        </Grid>
                                        <Grid xs={12} md={12} xl={12}>
                                            <p>{review.review}</p>
                                        </Grid>
                                    </Grid> 
                                </div>
                            ))}
                        </Slider> */}