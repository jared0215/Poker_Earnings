import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../UserTable/UserForm";
import UserList from "../UserTable/UserList";

const Main = () => {
    const [userList, setUserList] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users")
            .then((res) => {
                setUserList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const createUser = (user) => {
        axios
            .post("http://localhost:8000/api/users", user)
            .then((res) => {
                setUserList([...userList, res.data]);
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const removeFromDom = (userId) => {
        axios
            .delete(`http://localhost:8000/api/users/${userId}`)
            .then((res) => {
                setUserList(userList.filter((user) => user._id !== userId));
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card"></div>
                    <UserForm
                        onSubmitProp={createUser}
                        initialFirstName=""
                        initialLastName=""
                        initialEmail=""
                        errors={errors}
                    />
                    <UserList users={userList} removeFromDom={removeFromDom} />
                </div>
            </div>
        </div>
    );
};

export default Main;
