import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const UserForm = (props) => {
    const { initialFirstName, initialLastName, initialEmail, onSubmitProp } =
        props;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [email, setEmail] = useState(initialEmail);
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({ firstName, lastName, email });
    };

    return (
        <div>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
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
                <Form.Group>
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
                <Form.Group>
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default UserForm;
