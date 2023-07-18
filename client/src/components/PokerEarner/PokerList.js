import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

// PokerList component displays a list of poker games for a specific user
const PokerList = () => {
    // Get user ID from URL
    const { id } = useParams();

    // State variables for poker games list, error status, total amount and sort type
    const [pokerList, setPokerList] = useState([]);
    const [error, setError] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [sortType, setSortType] = useState("asc");

    // UseEffect to fetch data from the API when component mounts or user ID changes
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${id}/poker/games`) // Get poker games for a specific user
            .then((res) => {
                const sortedData = sortPokerList(res.data, sortType); // sort the fetched data
                setPokerList(sortedData); // Set poker list state variable
            })
            .catch(() => setError(true));
    }, [id, sortType]); // adding sortType to the dependency array

    // UseEffect to calculate total amount whenever poker list changes
    useEffect(() => {
        let total = 0;
        pokerList.forEach((pokerGame) => {
            // Iterate over poker list and calculate total amount
            total += // Add or subtract amount from total based on result
                pokerGame.result === "Win" // Check if result is win or loss
                    ? pokerGame.amount // If result is win, add amount to total
                    : -pokerGame.amount; // If result is loss, subtract amount from total
        });
        setTotalAmount(total);
    }, [pokerList]);

    // Function to sort poker list
    const sortPokerList = (list, type) => {
        return [...list].sort((a, b) => {
            // Create a copy of the list and sort it
            return type === "asc" // Check sort type
                ? new Date(a.date) - new Date(b.date) // Sort ascending
                : new Date(b.date) - new Date(a.date); // Sort descending
        });
    };

    // Function to format date
    const formatDate = (dateString) => {
        const serverDate = new Date(dateString); // Create date object from date string
        const adjustedDate = new Date( // Adjust server date to local timezone by creating new date object
            serverDate.getTime() + serverDate.getTimezoneOffset() * 60000 // Adjustment is done by adding/subtracting timezone offset in milliseconds
        );
        return adjustedDate.toLocaleDateString(undefined, {
            // Return formatted date string
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Function to handle delete game operation
    const handleDeletePoker = (pokerGameId) => {
        axios
            .delete(`http://localhost:8000/api/poker/${pokerGameId}`)
            .then(() =>
                setPokerList((prevList) =>
                    prevList.filter(
                        (pokerGame) => pokerGame._id !== pokerGameId
                    )
                )
            )
            .catch((err) => console.log(err));
    };

    // Return statement for rendering the component
    return (
        <div className="w-75 mx-auto mt-5">
            <h1 className="mb-4">List of Users Games</h1>
            <Button
                onClick={() => {
                    setSortType(sortType === "asc" ? "desc" : "asc"); // Toggle sortType
                }}
                className="mb-4 mx-auto"
            >
                Sort by date ({sortType === "asc" ? "Descending" : "Ascending"})
            </Button>

            {error ? (
                // Render error message
                <div>
                    <h3>Error</h3>
                    <p>Something went wrong</p>
                </div>
            ) : (
                // Render poker game list
                <div>
                    {/* Iterate over pokerList and display each poker game */}
                    <ListGroup>
                        {pokerList.map((pokerGame) => (
                            <ListGroupItem
                                key={pokerGame._id}
                                className="d-flex justify-content-between"
                            >
                                {/* Game information */}
                                <div>
                                    <h5 className="mb-0">
                                        Location: {pokerGame.location}
                                    </h5>
                                    <p className="mb-0">
                                        Date: {formatDate(pokerGame.date)}
                                    </p>
                                    <p className="mb-0">
                                        Amount: ${pokerGame.amount}
                                    </p>
                                    <p
                                        className={`mb-0 ${
                                            pokerGame.result === "Win"
                                                ? "text-success"
                                                : "text-danger"
                                        }`}
                                    >
                                        Result: {pokerGame.result}
                                    </p>
                                </div>
                                {/* Edit and delete buttons */}
                                <div className="flex-row h-100 align-self-center">
                                    <Button
                                        variant="danger"
                                        className="h-25 m-3"
                                        onClick={() =>
                                            handleDeletePoker(pokerGame._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/poker/edit/${pokerGame._id}`}>
                                        <Button
                                            variant="primary"
                                            className="h-25"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    {/* Display total amount */}
                    <h3
                        className={`mt-4 ${
                            totalAmount >= 0 ? "text-success" : "text-danger"
                        }`}
                    >
                        Total Amount: $ {totalAmount}
                    </h3>
                </div>
            )}
        </div>
    );
};

// Export PokerList component
export default PokerList;
