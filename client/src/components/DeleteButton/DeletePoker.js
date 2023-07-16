import React from "react";
import axios from "axios";

const DeletePoker = (props) => {
    const { pokerGameId, onDelete } = props;

    const deletePokerGame = () => {
        axios
            .delete(`http://localhost:8000/api/poker/${pokerGameId}`)
            .then(() => {
                onDelete(pokerGameId); // Call the onDelete callback with the deleted poker game ID
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <button
            className="btn btn-danger ms-1 w-100 mx-auto" // Updated class name to w-100
            onClick={deletePokerGame}
        >
            Delete
        </button>
    );
};

export default DeletePoker;
