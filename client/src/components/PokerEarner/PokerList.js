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
            .get(`http://localhost:8000/api/users/${id}/poker/games`)
            .then((res) => setPokerList(res.data))
            .catch(() => setError(true));
    }, [id]);

    // UseEffect to calculate total amount whenever poker list changes
    useEffect(() => {
        let total = 0;
        pokerList.forEach((pokerGame) => {
            total +=
                pokerGame.result === "Win"
                    ? pokerGame.amount
                    : -pokerGame.amount;
        });
        setTotalAmount(total);
    }, [pokerList]);

    // UseEffect to sort poker list whenever sort type changes
    useEffect(() => {
        const sortedList = [...pokerList].sort((a, b) => {
            return sortType === "asc"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        });
        setPokerList(sortedList);
    }, [sortType]);

    // Function to format date
    const formatDate = (dateString) => {
        const serverDate = new Date(dateString);
        const adjustedDate = new Date(
            serverDate.getTime() + serverDate.getTimezoneOffset() * 60000
        );
        return adjustedDate.toLocaleDateString(undefined, {
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
                onClick={() => setSortType(sortType === "asc" ? "desc" : "asc")}
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
