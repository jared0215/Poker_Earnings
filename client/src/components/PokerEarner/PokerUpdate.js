import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PokerUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [result, setResult] = useState("Win");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    // Assume `serverDate` is the date you got from the server.
    const formatDate = (dateString) => {
        let serverDate = new Date(dateString);
        let adjustedDate = new Date(
            serverDate.getTime() + serverDate.getTimezoneOffset() * 60000
        );
        let dateToShow = adjustedDate.toISOString().split("T")[0];
        return dateToShow;
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/poker/" + id)
            .then((res) => {
                console.log(res.data);
                setResult(res.data.result);
                setAmount(res.data.amount);
                setLocation(res.data.location);
                setDate(formatDate(res.data.date));
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    }, [id]);

    const updatePokerGame = (e) => {
        e.preventDefault();
        setError(""); // Reset error state

        if (!amount || !location || !date) {
            setError("All fields are required"); // Set error message if any field is empty
            return;
        }

        axios
            .put("http://localhost:8000/api/poker/" + id, {
                result,
                amount,
                location,
                date,
            })
            .then((res) => {
                console.log(res);
                navigate(-1);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <div className="w-75 mx-auto bg-dark text-light rounded m-5 pb-5">
            <h2 className="fs-2 my-5 pt-5 text-center">Update Poker Game</h2>
            <hr />
            <Form onSubmit={updatePokerGame} className="w-50 mx-auto fs-5">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mt-5">
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
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit" className="my-5">
                        Update Poker Game
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PokerUpdate;
