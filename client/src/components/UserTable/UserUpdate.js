import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${id}`)
            .then((res) => {
                setUser(res.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const updateUser = (userData) => {
        axios
            .put(`http://localhost:8000/api/users/${id}`, userData)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                ) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({});
                }
                console.log(err);
            });
    };

    return (
        <div className="w-50 mx-auto">
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

export default UserUpdate;
