import React from "react";
import { Link } from 'react-router-dom'


const SessionClosed = (props) => {

    return (
      <div>
        <h1>Uh oh!</h1>
        <p>The session was terminated by the host</p>
        <Link to={'/'}>Home Page</Link>
      </div>
    );
}

export default SessionClosed;