import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';
import classes from './ChatBot.module.css';

const ChatBot = () => {

    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    // const navigate = useNavigate()
    // const continueBtn = () => {
    //     navigate("/Link-Reset")
    // }



    return (


      <div>
      {showChatbot ? (
        <div className={classes.ChatbotContainer}>
          <div className={classes.CloseButton} onClick={toggleChatbot}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <iframe
            title="Chatbot"
            src="https://chatbotinflow.streamlit.app/?embedded=true"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      ) : (
        <div className={classes.ChatBotIcon} onClick={toggleChatbot}>
          <FontAwesomeIcon icon={faComment} />
          <span className={classes.IconText}>Hey there, how can I help you today?</span>
        </div>
      )}
    </div>


    );

}

export default ChatBot;