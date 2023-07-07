import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import DeleteButton from "../DeleteButton/Delete";

const UserList = (props) => {
    const { users, removeFromDom } = props;

    return (
        <div>
            <h1>All Users</h1>
            {users.map((user) => {
                return (
                    <p key={user._id}>
                        <Link to={"/users/edit/" + user._id}>
                            {user.firstName}
                            {user.lastName}
                            {user.email}
                        </Link>
                        <DeleteButton
                            userId={user._id}
                            successCallback={() => removeFromDom(user._id)}
                        />
                    </p>
                );
            })}
        </div>
    );
};

export default UserList;
