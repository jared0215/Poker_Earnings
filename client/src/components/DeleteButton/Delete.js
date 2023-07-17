import React from "react";
import axios from "axios";

// DeleteButton component allows deletion of a user
const DeleteButton = (props) => {
    // Destructure props to get userId and successCallback
    const { userId, successCallback } = props;

    // Function to handle deletion of the user
    const deleteUser = (e) => {
        // Send a DELETE request to the server to remove a user with the specified ID
        axios
            .delete("http://localhost:8000/api/users/" + userId)
            .then((res) => {
                // Call the successCallback function which is passed as a prop
                successCallback();
            })
            .catch((err) => {
                // Log the error in case of failure
                console.log(err);
                console.log(err.response);
            });
    };

    //  Return the DeleteButton component
    return (
        // Render a button that calls deleteUser function when clicked
        <button className="btn btn-danger" onClick={deleteUser}>
            Delete
        </button>
    );
};

export default DeleteButton;
