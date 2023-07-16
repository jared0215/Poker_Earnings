import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import DeleteButton from "../DeleteButton/Delete";

const UserList = (props) => {
    const { users, removeFromDom } = props;

    return (
        <div>
            <h1 className="fs-1 m-5">Manage your Users</h1>
            {users.map((user) => (
                <Card key={user._id} className="mb-3">
                    <Card.Body>
                        <Card.Title>
                            <Link to={`/users/${user._id}/poker/`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                        <div className="d-flex justify-content-evenly w-25 mx-auto">
                            <Link
                                to={`/users/edit/${user._id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                            <DeleteButton
                                variant="danger"
                                userId={user._id}
                                successCallback={() => removeFromDom(user._id)}
                            >
                                Delete
                            </DeleteButton>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default UserList;
