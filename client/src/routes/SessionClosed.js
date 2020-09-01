import React from "react";
import { Link } from "react-router-dom";
import "./SessionClosed.css";

const SessionClosed = (props) => {
  return (
    <div className="session-closed">
      <div className="session-closed-content">
        <h1>Uh oh!</h1>
        <p>This session was terminated by the host</p>
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
};

export default SessionClosed;
