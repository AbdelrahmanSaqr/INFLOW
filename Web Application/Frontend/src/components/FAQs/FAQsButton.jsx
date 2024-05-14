import { useNavigate } from "react-router-dom";
import classes from './FAQsButton.module.css';


const FAQsButton =()=>{

    const navigate = useNavigate();
    const FAQsButton = () => {
        navigate("/FAQs")
    };
    const FeessButton = () => {
        navigate("/payment")
    };

    return(    
        <div> 
            <div className={classes.FAQsButton}>
                <button onClick={FAQsButton} >FAQs</button>
            </div>
            <div className={classes.Fees}>
                <button onClick={FeessButton}>Fees</button>
            </div>
        </div>
    );

}

export default FAQsButton;