import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PokerForm = () => {
    const { id } = useParams();
    const [result, setResult] = useState("Win");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPokerGame = {
            user: id,
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
                console.log(res);
                console.log(res.data);
                // Reset state here, in the then() callback
                setResult("Win");
                setAmount("");
                setLocation("");
                setDate("");
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <div className="w-50 mx-auto bg-dark text-light rounded m-5">
            <h2 className="fs-2 m-3 pt-5 text-center">Add Poker Game</h2>
            <Form onSubmit={handleSubmit} className="w-50 mx-auto fs-5">
                <Form.Group className="mt-4">
                    <div>
                        <Form.Label className="me-3">Result:</Form.Label>
                        <Form.Check
                            inline
                            type="radio"
                            id="win"
                            label="Win"
                            name="result"
                            value="Win"
                            checked={result === "Win"}
                            onChange={() => setResult("Win")}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="loss"
                            label="Loss"
                            name="result"
                            value="Loss"
                            checked={result === "Loss"}
                            onChange={() => setResult("Loss")}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Add Poker Game
                </Button>
            </Form>
            <Link to={`/users/${id}/poker/games`}>View your Game History</Link>
        </div>
    );
};

export default PokerForm;
