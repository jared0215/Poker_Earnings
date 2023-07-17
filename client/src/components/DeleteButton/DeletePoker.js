import React from "react";
import axios from "axios";

// DeletePoker component allows deletion of a poker game
const DeletePoker = (props) => {
    // Destructure props to get pokerGameId and onDelete
    const { pokerGameId, onDelete } = props;

    // Function to handle deletion of the poker game
    const deletePokerGame = () => {
        // Send a DELETE request to the server to remove a poker game with the specified ID
        axios
            .delete(`http://localhost:8000/api/poker/${pokerGameId}`)
            .then(() => {
                // Call the onDelete callback function which is passed as a prop with the deleted poker game ID
                onDelete(pokerGameId);
            })
            .catch((err) => {
                // Log the error in case of failure
                console.log(err);
                console.log(err.response);
            });
    };

    // Return the DeletePoker component
    return (
        // Render a button that calls deletePokerGame function when clicked
        <button
            className="btn btn-danger ms-1 w-100 mx-auto" // Add Bootstrap classes for styling
            onClick={deletePokerGame}
        >
            Delete
        </button>
    );
};

export default DeletePoker;
