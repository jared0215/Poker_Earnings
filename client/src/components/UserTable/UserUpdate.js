import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/" + id)
            .then((res) => {
                setUser(res.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const updateUser = (user) => {
        axios
            .put("http://localhost:8000/api/users/" + id, user)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
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
                    initialPassword={user.password}
                    initialConfirmPassword={user.confirmPassword}
                    heading="Update this User"
                />
            )}
        </div>
    );
};

export default UserUpdate;
