import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../UserTable/UserForm";
import UserList from "../UserTable/UserList";

const Main = ({ userListRef }) => {
    // Declare a state variable userList, initialized as an empty array
    const [userList, setUserList] = useState([]);

    // Declare a state variable errors, initialized as an empty array
    const [errors, setErrors] = useState([]);

    // Using the useEffect hook to fetch data from the API when the component mounts
    useEffect(() => {
        // Making a GET request to the API to fetch all users
        axios
            .get("http://localhost:8000/api/users")
            .then((res) => {
                // If the request is successful, update userList state with the received data
                setUserList(res.data);
            })
            .catch((err) => {
                // Log the error if the request is unsuccessful
                console.log(err);
            });
    }, []);

    const createUser = (user) => {
        // Make a POST request to the API to create a new user
        return axios
            .post("http://localhost:8000/api/users", user)
            .then((res) => {
                // If the request is successful, update the userList state to include the new user
                setUserList([...userList, res.data]);
            })
            .catch((err) => {
                // If the request is unsuccessful, update the errors state with the received errors
                setErrors(err.response.data.errors);
            });
    };

    const removeFromDom = (userId) => {
        // Update the userList state to exclude the user with the specified userId
        setUserList(userList.filter((user) => user._id !== userId));
    };

    return (
        // Render the UserForm and UserList components, and pass down the necessary props
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card"></div>
                    <UserForm
                        onSubmitProp={createUser}
                        initialFirstName=""
                        initialLastName=""
                        initialEmail=""
                        errors={errors} // Pass the errors prop
                        heading="Add your User"
                    />

                    <hr />
                    <div ref={userListRef}>
                        <UserList
                            users={userList}
                            removeFromDom={removeFromDom}
                            errors={errors}
                            heading="Manage your Users"
                        />
                    </div>
                </div>
                <div className="m-5">
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Main;
