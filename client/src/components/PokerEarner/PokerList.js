import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DeletePoker from "../DeleteButton/DeletePoker";

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
            <h1>Poker List</h1>
            {error ? (
                <div>
                    <h3>Error</h3>
                    <p>Something went wrong</p>
                </div>
            ) : (
                <div>
                    <ul>
                        {pokerList.map((pokerGame) => (
                            <li key={pokerGame._id}>
                                {/* Display poker game details */}
                                <h3>{pokerGame.location}</h3>
                                <h3>{formatDate(pokerGame.date)}</h3>
                                <h3>{pokerGame.amount}</h3>
                                <h3>{pokerGame.result}</h3>
                                <DeletePoker
                                    pokerGameId={pokerGame._id}
                                    onDelete={handleDeletePoker}
                                />
                                <br />
                            </li>
                        ))}
                    </ul>
                    <h3>Total Amount: {totalAmount}</h3>
                </div>
            )}
        </div>
    );
};

export default PokerList;
