import classes from './Animations.module.css'

const Animation = () => {
    return(
        <div className={classes.aboutyou}>
            <div className={classes.leftaboutyou}>
                <div className={classes.understandyourself}>Understand yourself</div>
            </div>
            <div className={classes.rightaboutyou}>
                <div className={classes.personalitytest}>Emotional Tests</div>
                <div className={classes.careerchoices}>Career choices</div>
                <div className={classes.knowyourfeeling}>Know your feelings</div>
            </div>

        </div>
    );
};

export default Animation