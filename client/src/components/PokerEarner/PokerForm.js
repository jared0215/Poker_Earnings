import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PokerForm = () => {
    const { id } = useParams(); // Get the user id from route params
    const [result, setResult] = useState("Win");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPokerGame = {
            user: id, // Use id here
            result,
            amount,
            location,
            date,
        };
        console.log(newPokerGame);
        console.log("UserID: ", id);
        axios
            .post(`http://localhost:8000/api/poker`, newPokerGame)
            .then((res) => {
                setResult("");
                setAmount("");
                setLocation("");
                setDate("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h2>Add Poker Game</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="radio"
                        id="win"
                        name="result"
                        value="win"
                        checked={result === "Win"}
                        onChange={() => setResult("Win")}
                    />
                    <label htmlFor="win">Win</label>
                    <input
                        type="radio"
                        id="loss"
                        name="result"
                        value="loss"
                        checked={result === "Loss"}
                        onChange={() => setResult("Loss")}
                    />
                    <label htmlFor="loss">Loss</label>
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
            <Link to={`/users/${id}/poker/games`}>View your Game History</Link>
        </div>
    );
};

export default PokerForm;
