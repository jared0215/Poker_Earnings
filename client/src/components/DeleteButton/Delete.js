import React from "react";
import axios from "axios";

const DeleteButton = (props) => {
    const { userId, successCallback } = props;
    const deleteUser = (e) => {
        axios
            .delete("http://localhost:8000/api/users/" + userId)
            .then((res) => {
                successCallback();
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <button
            className="btn btn-danger ms-1 w-10 mx-auto"
            onClick={deleteUser}
        >
            Delete
        </button>
    );
};
export default DeleteButton;
