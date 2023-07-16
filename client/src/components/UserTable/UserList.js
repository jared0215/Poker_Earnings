import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import DeleteButton from "../DeleteButton/Delete";

const UserList = (props) => {
    const { users, removeFromDom, heading } = props;

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 m-5">{heading}</h1>
            {users.map((user) => (
                <Card key={user._id} className="mb-3 w-100">
                    <Card.Body>
                        <Card.Title className="text-center">
                            <Link to={`/users/${user._id}/poker/`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </Card.Title>
                        <Card.Text className="text-center fs-5">
                            {user.email}
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                            <Link
                                to={`/users/edit/${user._id}`}
                                className="btn btn-primary mx-2"
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
