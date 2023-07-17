// Importing necessary libraries and components
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import DeleteButton from "../DeleteButton/Delete";

// Define UserList Component
const UserList = (props) => {
    // Destructure users, removeFromDom, heading from props
    const { users, removeFromDom, heading } = props;

    // Render the component
    return (
        <div className="d-flex flex-column align-items-center">
            {/* Display heading */}
            <h1 className="fs-1 m-5">{heading}</h1>
            {/* Map through users and display each user's information in a card */}
            {users.map((user) => (
                <Card key={user._id} className="mb-3 w-100">
                    <Card.Body>
                        {/* Link the user's name to their poker page */}
                        <Card.Title className="text-center">
                            <Link to={`/users/${user._id}/poker/`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </Card.Title>
                        {/* Display user's email */}
                        <Card.Text className="text-center fs-5">
                            {user.email}
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                            {/* Link to edit the user's information */}
                            <Link
                                to={`/users/edit/${user._id}`}
                                className="btn btn-primary mx-2"
                            >
                                Edit
                            </Link>
                            {/* Button to delete user */}
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

// Export UserList Component
export default UserList;
