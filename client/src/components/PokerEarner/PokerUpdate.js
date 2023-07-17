import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Component to update poker game information
const PokerUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Fetch the id from the URL

    // Initialize state variables for form fields and error handling
    const [result, setResult] = useState("Win");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    // Function to format date strings
    const formatDate = (dateString) => {
        let serverDate = new Date(dateString);
        let adjustedDate = new Date(
            serverDate.getTime() + serverDate.getTimezoneOffset() * 60000
        );
        let dateToShow = adjustedDate.toISOString().split("T")[0];
        return dateToShow;
    };

    // UseEffect to fetch game data from the server on component mount
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

    // Function to handle form submission, validates input, makes PUT request to server to update game data
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
                navigate(-1); // After successful submission, navigate back to previous page
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    };

    // Return form with error alert (if any) and form fields for result, amount, location and date
    return (
        <div className="w-75 mx-auto bg-dark text-light rounded m-5 pb-5">
            <h2 className="fs-2 my-5 pt-5 text-center">Update Poker Game</h2>
            <hr />
            <Form onSubmit={updatePokerGame} className="w-50 mx-auto fs-5">
                {error && <Alert variant="danger">{error}</Alert>}
                {/* Form group for result (win/loss) radio buttons */}
                <Form.Group className="mt-5">
                    <div>
                        <Form.Label className="me-3">Result:</Form.Label>
                        {/*... Form.Check code ...*/}
                    </div>
                </Form.Group>
                {/* Form group for amount field */}
                <Form.Group className="mt-4">
                    <Form.Label>Amount:</Form.Label>
                    {/*... Form.Control code ...*/}
                </Form.Group>
                {/* Form group for location field */}
                <Form.Group className="mt-4">
                    <Form.Label>Location:</Form.Label>
                    {/*... Form.Control code ...*/}
                </Form.Group>
                {/* Form group for date field */}
                <Form.Group className="mt-4">
                    <Form.Label>Date:</Form.Label>
                    {/*... Form.Control code ...*/}
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
