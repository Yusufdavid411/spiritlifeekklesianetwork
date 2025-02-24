import React from "react";
import { useNavigate } from "react-router-dom"
import MessagesTable from "./MessagesTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./messages.css"

const Messages = () => {

	const navigate = useNavigate();

	return ( 

		<div className="message-Container">
      <div className="message">
        <span
          onClick={() => navigate("/")}
          className="message-btn"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="option-icon-btn" />
        </span>
        <p>Messages ( Audio & Video)</p>
      </div>

      <MessagesTable />


    </div>

	);
}
 
export default Messages;