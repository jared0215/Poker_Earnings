import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const UserForm = (props) => {
    const {
        initialFirstName,
        initialLastName,
        initialEmail,
        onSubmitProp,
        heading,
    } = props;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [email, setEmail] = useState(initialEmail);
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({ firstName, lastName, email });

        // Clear the field inputs after submitting
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    return (
        <div className="bg-dark rounded fs-5 text-light mx-auto pb-5 mb-5">
            <h1 className="text-center mt-5 pt-4">{heading}</h1>
            <Form
                onSubmit={onSubmitHandler}
                className="d-flex flex-column justify-content-evenly h-100 w-50 mx-auto"
            >
                <Form.Group className="m-2">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <Form.Text className="text-muted">
                        {errors.firstName ? errors.firstName.message : ""}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                    <Form.Text className="text-muted">
                        {errors.lastName ? errors.lastName.message : ""}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Form.Text className="text-muted">
                        {errors.email ? errors.email.message : ""}
                    </Form.Text>
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    className="m-2 mt-4 w-50 mx-auto"
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default UserForm;
