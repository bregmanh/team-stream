import React, { useState, useEffect } from "react";
import "./Users.css";
import User from "./User";



const Users = props => {
  const [users, setUsers] = useState([]);
  const room = props.room;
 

  useEffect(() => {
    props.socketRef.current.emit('fetch-users-from-session', room);
    props.socketRef.current.on('provide-userlist', users => {
      setUsers(users);
    }) 
  })


  const userComponents = users.map(user => <User user={user}/>);
    return (
        <div className="users">
          <ul className="user-list">
            {userComponents}
          </ul>
        </div>
    );
}

export default Users;