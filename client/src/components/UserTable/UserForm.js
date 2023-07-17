import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const UserForm = ({
    initialFirstName,
    initialLastName,
    initialEmail,
    onSubmitProp,
    heading,
    errors,
}) => {
    // Define local state for form fields, initialized with empty strings
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // Define local state for initial values for the form fields
    const [initialValues, setInitialValues] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
    });

    // Using the useEffect hook to set the local state for form fields whenever initialValues change
    useEffect(() => {
        setFirstName(initialValues.firstName);
        setLastName(initialValues.lastName);
        setEmail(initialValues.email);
    }, [initialValues]);

    // Handler for form submission
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Clear the form if there are no errors
        if (errors && Object.keys(errors).length === 0) {
            setFirstName("");
            setLastName("");
            setEmail("");
        }
        // Call the onSubmitProp function, passed as a prop, with the current form field values
        onSubmitProp({ firstName, lastName, email });
    };

    // Helper function to format errors into a string
    const formatErrors = (errorObject) => {
        return Object.values(errorObject)
            .map((error) => error.message)
            .join(", ");
    };

    return (
        // Render the form with form fields for first name, last name, and email
        // If there are errors, they are displayed in an Alert component
        // The onSubmitHandler function is called when the form is submitted
        <div className="bg-dark rounded fs-5 text-light mx-auto pb-5 mb-5">
            <h1 className="text-center mt-5 pt-4">{heading}</h1>
            {errors && Object.keys(errors).length > 0 && (
                <Alert variant="danger" className="mt-4 w-75 mx-auto">
                    {formatErrors(errors)}
                </Alert>
            )}
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
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
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
