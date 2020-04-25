import React, { Component } from "react";
import { Redirect, Switch, HashRouter, Route, Link } from "react-router-dom";
import "./Users.css";

class Users extends Component {
  constructor() {
    super();
  }

  render() {
    const { users } = this.props;
    //console.log("users", users);
    return (
      <ul className="usersList">
        {users.map(user => (
          <li className="userListItem" key={user.id}>
            <Link to={"/users/"+`${user.id}`}>
              {user.name} has {user.tasks.length} tasks.
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default Users;
