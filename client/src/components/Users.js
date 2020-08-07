import React from "react";
import "./Users.css";
import User from "./User";



const Users = props => {
  const userList = ['Sophie', 'Hannah', 'Aaron', 'Chaim', 'Francis'];
  const userComponents = userList.map(user => <User user={user}/>);
    return (
        <div className="users">
          <ul className="user-list">
            {userComponents}
          </ul>
        </div>
    );
}

export default Users;