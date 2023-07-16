import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

const PokerList = () => {
    const { id } = useParams();
    const [pokerList, setPokerList] = useState([]);
    const [error, setError] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [sortType, setSortType] = useState("asc");

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

    useEffect(() => {
        const sortedList = [...pokerList].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortType === "asc" ? dateA - dateB : dateB - dateA;
        });
        setPokerList(sortedList);
    }, [sortType]);

    const formatDate = (dateString) => {
        let serverDate = new Date(dateString);
        let adjustedDate = new Date(
            serverDate.getTime() + serverDate.getTimezoneOffset() * 60000
        );
        const options = { year: "numeric", month: "long", day: "numeric" };
        let dateToShow = adjustedDate.toLocaleDateString(undefined, options);
        return dateToShow;
    };

    const handleDeletePoker = (pokerGameId) => {
        axios
            .delete(`http://localhost:8000/api/poker/${pokerGameId}`)
            .then((res) => {
                setPokerList((prevList) =>
                    prevList.filter(
                        (pokerGame) => pokerGame._id !== pokerGameId
                    )
                );
            })
            .catch((err) => {
                console.log(err);
                alert("There was an error deleting the game");
            });
    };

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

export default PokerList;
