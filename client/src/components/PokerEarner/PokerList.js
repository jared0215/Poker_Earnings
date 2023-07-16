import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

const PokerList = () => {
    const { id } = useParams();
    const [pokerList, setPokerList] = useState([]);
    const [error, setError] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${id}/poker/games`)
            .then((res) => {
                const user = res.data;
                setPokerList(user);
            })
            .catch((err) => {
                setError(true);
            });
    }, [id]);

    useEffect(() => {
        // Calculate the total amount
        let total = 0;
        pokerList.forEach((pokerGame) => {
            if (pokerGame.result === "Win") {
                total += pokerGame.amount;
            } else if (pokerGame.result === "Loss") {
                total -= pokerGame.amount;
            }
        });
        setTotalAmount(total);
    }, [pokerList]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
    };

    const handleDeletePoker = (pokerGameId) => {
        // Handle deletion logic here
        // For example, update the pokerList state to remove the deleted poker game
        setPokerList(
            pokerList.filter((pokerGame) => pokerGame._id !== pokerGameId)
        );
    };

    return (
        <div>
            <h1 className="mb-4">List of Users Games</h1>
            {error ? (
                <div>
                    <h3>Error</h3>
                    <p>Something went wrong</p>
                </div>
            ) : (
                <div>
                    <ListGroup>
                        {pokerList.map((pokerGame) => (
                            <ListGroupItem
                                key={pokerGame._id}
                                className="d-flex justify-content-between"
                            >
                                <div>
                                    <h5 className="mb-0">
                                        Location: {pokerGame.location}
                                    </h5>
                                    <p className="mb-0">
                                        Date: {formatDate(pokerGame.date)}
                                    </p>
                                    <p className="mb-0">
                                        Amount: {pokerGame.amount}
                                    </p>
                                    <p className="mb-0">
                                        Result: {pokerGame.result}
                                    </p>
                                </div>
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        handleDeletePoker(pokerGame._id)
                                    }
                                >
                                    Delete
                                </Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <h3 className="mt-4">Total Amount: {totalAmount}</h3>
                </div>
            )}
        </div>
    );
};

export default PokerList;
