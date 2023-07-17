// Importing necessary libraries and hooks
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

// Define UserUpdate component
const UserUpdate = () => {
    // Use the useParams hook to get the id from the URL
    const { id } = useParams();
    // Use the useNavigate hook for navigation
    const navigate = useNavigate();
    // Initialize user state
    const [user, setUser] = useState();
    // Initialize errors state
    const [errors, setErrors] = useState({});
    // Initialize loaded state to handle loading of the component
    const [loaded, setLoaded] = useState(false);

    // Use useEffect to call the API when the component mounts
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${id}`) // Make a GET request to the server
            .then((res) => {
                setUser(res.data); // Update the user state with the response data
                setLoaded(true); // Update the loaded state to true once the data is loaded
            })
            .catch((err) => {
                console.log(err); // Log any errors
            });
    }, [id]); // Only re-run the effect if id changes

    // Define updateUser function to update a user
    const updateUser = (userData) => {
        axios
            .put(`http://localhost:8000/api/users/${id}`, userData) // Make a PUT request to the server
            .then((res) => {
                console.log(res); // Log the response
                navigate("/"); // Navigate to the home page
            })
            .catch((err) => {
                // If there are errors in the response, update the errors state
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                ) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({}); // If no errors in the response, set errors state to an empty object
                }
                console.log(err); // Log any errors
            });
    };

    // Render the component
    return (
        <div className="w-50 mx-auto">
            {/* If the data is loaded, render the UserForm component with the required props */}
            {loaded && (
                <UserForm
                    onSubmitProp={updateUser}
                    initialFirstName={user.firstName}
                    initialLastName={user.lastName}
                    initialEmail={user.email}
                    heading="Update this User"
                    errors={errors}
                />
            )}
        </div>
    );
};

// Export UserUpdate component
export default UserUpdate;
