import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// The PokerForm component is used to create a new poker game for a specific user
const PokerForm = () => {
    // Get the user ID from the URL parameters
    const { id } = useParams();

    // Initialize state for form inputs and error message
    const [result, setResult] = useState("Win");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh

        setError(""); // Reset error state

        // Check if all fields are filled in, otherwise set error state
        if (!amount || !location || !date) {
            setError("All fields are required"); // Set error message if any field is empty
            return;
        }

        // Format date to ISO string
        let serverDate = new Date(date);
        let dateToSend = serverDate.toISOString();

        // Create a new poker game object
        const newPokerGame = {
            user: id, // Set user ID from URL parameters
            result, // Set result from state
            amount, // Set amount from state
            location, // Set location from state
            date: dateToSend, // Set date from state (formatted to ISO string)
        };

        // Post the new poker game to the API
        axios
            .post(`http://localhost:8000/api/poker`, newPokerGame)
            .then((res) => {
                // Log the response from the API
                console.log(res);
                console.log(res.data);

                // Reset form fields
                setResult("Win");
                setAmount("");
                setLocation("");
                setDate("");
            })
            .catch((err) => {
                // Log any errors
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <div className="w-75 mx-auto bg-dark text-light rounded m-5 pb-5">
            <h2 className="fs-2 my-5 pt-5 text-center">Add Poker Game</h2>
            <hr />
            <Form onSubmit={handleSubmit} className="w-50 mx-auto fs-5">
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
                        Add Poker Game
                    </Button>
                    <Link to={`/users/${id}/poker/games`} className="my-5">
                        <Button variant="success">
                            View your Game History
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default PokerForm;
