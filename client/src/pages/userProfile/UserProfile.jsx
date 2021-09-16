import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";
import DisplayUser from './DisplayUser'

// styling
import "./UserProfile.scss";

export default function UserProfile() {
    const [user, setUser] = useState({});
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Find one user by username
    const getUser = async () => {
        try {
            const res = await axiosApiInstance.get(
                `/api/username/${localStorage.getItem("username")}`
            );
            console.log(res.data);
            console.log(localStorage.getItem("username"));
            //setUser(res.data)
            //setIsError(false);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
            /* setIsError(true);
            setErrorMessage(error.response.statusText); */
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    // Update user
    const updateUser = async () => {
        try {
            const res = await axiosApiInstance.post(
                `/api/update/${localStorage.getItem("username")}`,
                {
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    email: email,
                }
            );
            console.log(res.data);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
        }
    };

    // Delete a user
    const deleteUser = async () => {
        try {
            const res = await axiosApiInstance.put("/api/delete", {
                userId: localStorage.getItem("user_id"),
            });
            console.log(res.data);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
        }
    };

    return (
        <div className="user-profile-container">
            <header>
            <h2>My profile</h2>
        </header>
        <DisplayUser/>
        <button>Edit profile</button>
        <button>Delete user</button>
        

        </div>
    );
}
